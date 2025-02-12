export interface Organization {
  id: string;
  name: string;
  email: string;
  subscription_type: 'solo' | 'company';
  max_users: number;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  organization_id: string;
  stripe_subscription_id?: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationUser {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  organization_id: string;
  form_type: string;
  form_id: string;
  recipient_email: string;
  status: string;
  error?: string;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'solo' | 'company';
  price: number;
  maxUsers: number;
  features: string[];
}