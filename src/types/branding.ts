export interface OrganizationBranding {
  id: string;
  organization_id: string;
  header_image_url: string | null;
  company_name: string | null;
  primary_color: string | null;
  footer_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface PDFOptions {
  headerImage?: string;
  companyName?: string;
  primaryColor?: string;
  footerText?: string;
}