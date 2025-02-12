import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { supabase } from '../../lib/supabase';
import { OrganizationBranding } from '../../types/branding';
import { Upload, Save } from 'lucide-react';

export default function BrandingSettings() {
  const { user } = useAuth();
  const [branding, setBranding] = useState<OrganizationBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchBranding();
  }, [user]);

  const fetchBranding = async () => {
    if (!user) return;

    try {
      const { data: orgData } = await supabase
        .from('organization_users')
        .select('organization_id')
        .eq('user_id', user.id)
        .single();

      if (orgData) {
        const { data: brandingData } = await supabase
          .from('organization_branding')
          .select('*')
          .eq('organization_id', orgData.organization_id)
          .single();

        setBranding(brandingData);
        if (brandingData?.header_image_url) {
          setPreviewUrl(brandingData.header_image_url);
        }
      }
    } catch (error) {
      console.error('Error fetching branding:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branding) return;

    setSaving(true);
    try {
      let headerImageUrl = branding.header_image_url;

      if (headerImage) {
        const fileExt = headerImage.name.split('.').pop();
        const fileName = `${branding.organization_id}/header.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('organization-assets')
          .upload(fileName, headerImage, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('organization-assets')
          .getPublicUrl(fileName);

        headerImageUrl = publicUrl;
      }

      const { error: updateError } = await supabase
        .from('organization_branding')
        .upsert({
          ...branding,
          header_image_url: headerImageUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      await fetchBranding();
    } catch (error) {
      console.error('Error saving branding:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Branding Settings
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Header Image
              </label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Header preview"
                      className="h-32 w-auto object-contain"
                    />
                  ) : (
                    <div className="h-32 w-48 bg-gray-100 flex items-center justify-center rounded">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={branding?.company_name || ''}
                onChange={(e) =>
                  setBranding(prev => prev ? { ...prev, company_name: e.target.value } : null)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <input
                type="color"
                value={branding?.primary_color || '#000000'}
                onChange={(e) =>
                  setBranding(prev => prev ? { ...prev, primary_color: e.target.value } : null)
                }
                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Footer Text
              </label>
              <textarea
                value={branding?.footer_text || ''}
                onChange={(e) =>
                  setBranding(prev => prev ? { ...prev, footer_text: e.target.value } : null)
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}