import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import BrandingSettings from './BrandingSettings';
import { Settings, Image, Bell, Users } from 'lucide-react';

export default function AccountSettings() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h2>

            <Tabs defaultValue="branding" className="space-y-6">
              <TabsList className="flex space-x-4 border-b border-gray-200">
                <TabsTrigger
                  value="branding"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <Image className="h-5 w-5 mr-2" />
                  Branding
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Team Management
                </TabsTrigger>
                <TabsTrigger
                  value="general"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  General
                </TabsTrigger>
              </TabsList>

              <TabsContent value="branding">
                <BrandingSettings />
              </TabsContent>

              <TabsContent value="notifications">
                {/* Add NotificationSettings component here */}
                <div className="p-4">Notification settings coming soon...</div>
              </TabsContent>

              <TabsContent value="team">
                {/* Add TeamManagement component here */}
                <div className="p-4">Team management settings coming soon...</div>
              </TabsContent>

              <TabsContent value="general">
                {/* Add GeneralSettings component here */}
                <div className="p-4">General settings coming soon...</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}