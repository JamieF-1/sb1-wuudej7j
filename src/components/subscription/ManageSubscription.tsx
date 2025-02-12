import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { supabase } from '../../lib/supabase';
import { manageSubscription } from '../../lib/stripe';
import { Organization, Subscription, OrganizationUser } from '../../types/subscription';
import { Users, Settings, Mail } from 'lucide-react';

export default function ManageSubscription() {
  const { user } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [users, setUsers] = useState<OrganizationUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch organization details
        const { data: orgData } = await supabase
          .from('organizations')
          .select('*')
          .single();

        if (orgData) {
          setOrganization(orgData);

          // Fetch subscription
          const { data: subData } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('organization_id', orgData.id)
            .single();

          setSubscription(subData);

          // Fetch users
          const { data: userData } = await supabase
            .from('organization_users')
            .select('*')
            .eq('organization_id', orgData.id);

          setUsers(userData || []);
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleManageSubscription = async () => {
    if (!organization) return;
    try {
      await manageSubscription(organization.id);
    } catch (error) {
      console.error('Error managing subscription:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">No Active Subscription</h2>
        <p className="mt-2 text-gray-600">Please subscribe to a plan to continue.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Subscription Details
          </h3>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center">
                <Settings className="h-6 w-6 text-blue-500" />
                <h4 className="ml-3 text-lg font-medium text-gray-900">Plan Details</h4>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Plan:</span> {organization.subscription_type}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span>{' '}
                  {subscription?.status || 'Unknown'}
                </p>
                {subscription && (
                  <p className="text-gray-600">
                    <span className="font-medium">Renewal Date:</span>{' '}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={handleManageSubscription}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Manage Subscription
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-500" />
                <h4 className="ml-3 text-lg font-medium text-gray-900">Team Members</h4>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  <span className="font-medium">Active Users:</span> {users.length} /{' '}
                  {organization.max_users}
                </p>
                <div className="mt-2 space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between py-2 border-b border-gray-200"
                    >
                      <span className="text-gray-700">{user.user_id}</span>
                      <span className="text-sm text-gray-500">{user.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-500" />
                <h4 className="ml-3 text-lg font-medium text-gray-900">
                  Notification Settings
                </h4>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label
                    htmlFor="email-notifications"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Receive email notifications for completed forms
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}