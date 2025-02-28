import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Clipboard, BarChart, FileText } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { supabase } from '../lib/supabaseClient';
import Header from './layout/Header';

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
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/fgas-form"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Clipboard className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">New F-Gas Log</span>
                </Link>
                <Link
                  to="/vrf-commissioning"
                  className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <BarChart className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">VRF Commissioning</span>
                </Link>
                <Link
                  to="/breakdown-form"
                  className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Wrench className="h-8 w-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Breakdown Report</span>
                </Link>
                <Link
                  to="/tools"
                  className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <FileText className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Tools & Calculators</span>
                </Link>
              </div>
            </div>
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
                            <span className="text-sm text-gray-900">
                              {form.type === 'fgas' ? 'F-Gas' : form.type === 'vrf' ? 'VRF' : 'Breakdown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{form.site_name || 'N/A'}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${form.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                form.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {form.status === 'completed' ? 'Completed' : 
                                form.status === 'in_progress' ? 'In Progress' : 
                                form.status}
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