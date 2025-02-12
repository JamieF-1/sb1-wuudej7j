/*
  # Add organization branding settings

  1. New Tables
    - `organization_branding`
      - Store organization branding preferences
      - Header image storage
      - PDF customization settings

  2. Security
    - Enable RLS on new table
    - Add policies for organization access
*/

-- Create organization_branding table
CREATE TABLE IF NOT EXISTS organization_branding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  header_image_url text,
  company_name text,
  primary_color text,
  footer_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id)
);

-- Enable Row Level Security
ALTER TABLE organization_branding ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their organization branding"
  ON organization_branding
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organization_branding.organization_id
      AND organization_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Owners and admins can update organization branding"
  ON organization_branding
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organization_branding.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role IN ('owner', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organization_branding.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role IN ('owner', 'admin')
    )
  );

-- Add index for performance
CREATE INDEX idx_org_branding_org_id ON organization_branding(organization_id);