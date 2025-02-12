/*
  # Add subscription and organization features

  1. New Tables
    - `organizations`
      - Organization/company details
      - Subscription plan information
    - `subscriptions`
      - Subscription details and status
    - `organization_users`
      - Links users to organizations with roles
    - `email_logs`
      - Track email notifications for form completions

  2. Security
    - Enable RLS on all new tables
    - Add policies for organization access
    - Add policies for subscription management
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subscription_type text NOT NULL CHECK (subscription_type IN ('solo', 'company')),
  max_users integer NOT NULL DEFAULT 1,
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  stripe_subscription_id text,
  status text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create organization_users table
CREATE TABLE IF NOT EXISTS organization_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'user')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  form_type text NOT NULL,
  form_id uuid NOT NULL,
  recipient_email text NOT NULL,
  status text NOT NULL,
  error text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Organization Policies
CREATE POLICY "Users can view their organizations"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organizations.id
      AND organization_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can update their organizations"
  ON organizations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organizations.id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role = 'owner'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organizations.id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role = 'owner'
    )
  );

-- Subscription Policies
CREATE POLICY "Users can view their organization subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = subscriptions.organization_id
      AND organization_users.user_id = auth.uid()
    )
  );

-- Organization Users Policies
CREATE POLICY "Users can view organization members"
  ON organization_users
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_users
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Owners and admins can manage organization users"
  ON organization_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organization_users.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role IN ('owner', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organization_users.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role IN ('owner', 'admin')
    )
  );

-- Email Logs Policies
CREATE POLICY "Users can view their organization email logs"
  ON email_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = email_logs.organization_id
      AND organization_users.user_id = auth.uid()
    )
  );

-- Add functions for user management
CREATE OR REPLACE FUNCTION check_user_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM organization_users
    WHERE organization_id = NEW.organization_id
  ) > (
    SELECT max_users
    FROM organizations
    WHERE id = NEW.organization_id
  ) THEN
    RAISE EXCEPTION 'Organization has reached maximum user limit';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user limit
CREATE TRIGGER enforce_user_limit
  BEFORE INSERT ON organization_users
  FOR EACH ROW
  EXECUTE FUNCTION check_user_limit();

-- Add indexes for performance
CREATE INDEX idx_org_users_user_id ON organization_users(user_id);
CREATE INDEX idx_org_users_org_id ON organization_users(organization_id);
CREATE INDEX idx_subscriptions_org_id ON subscriptions(organization_id);
CREATE INDEX idx_email_logs_org_id ON email_logs(organization_id);