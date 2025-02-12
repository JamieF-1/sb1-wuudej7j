import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, FileSpreadsheet, History, Wrench } from 'lucide-react';
import Header from './layout/Header';
import { supabase } from '../lib/supabase';
import { useAuth } from './auth/AuthContext';

interface RecentForm {
  id: string;
  type: 'fgas' | 'vrf' | 'breakdown';
  created_at: string;
  status: string;
  site_name?: string;
  reference?: string;
}

export default function Dashboard() {
  const [recentForms, setRecentForms] = useState<RecentForm[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const backgroundImage = React.useMemo(() => {
    const images = [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  useEffect(() => {
    const fetchRecentForms = async () => {
      try {
        const { data: fgasData, error: fgasError } = await supabase
          .from('fgas_logs')
          .select(`
            id,
            status,
            created_at,
            system_id,
            systems (
              site_id,
              sites (
                client_name
              )
            )
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        if (fgasError) throw fgasError;

        const recentData = (fgasData || []).map(form => ({
          id: form.id,
          type: 'fgas' as const,
          created_at: form.created_at,
          status: form.status,
          site_name: form.systems?.sites?.client_name
        }));

        setRecentForms(recentData);
      } catch (error) {
        console.error('Error fetching recent forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentForms();
  }, [user]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/fgas-form"
              className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <ClipboardCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">F-Gas Form</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create a new F-Gas compliance record
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/vrf-commissioning"
              className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-emerald-500 rounded-md p-3">
                    <FileSpreadsheet className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">VRF Commissioning</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Complete a VRF system commissioning sheet
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/breakdown-form"
              className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                    <Wrench className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Service Visit</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Record a breakdown or service call
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/history"
              className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <History className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Form History</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      View and manage previous forms
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Forms */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Forms</h2>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : recentForms.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentForms.map((form) => (
                        <tr key={form.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              {form.type === 'fgas' ? 'F-Gas Form' : 
                               form.type === 'vrf' ? 'VRF Commissioning' : 
                               'Service Visit'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">{form.site_name || 'N/A'}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              form.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {form.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(form.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No recent forms found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}