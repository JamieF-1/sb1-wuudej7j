
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">HVAC Service Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Link to="/fgas-form" className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-all shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-4xl text-blue-500 mb-4">🧊</div>
              <h2 className="text-xl font-semibold text-center mb-2">F-Gas Record</h2>
              <p className="text-gray-600 text-center">Document refrigerant usage and system checks</p>
            </Link>
            
            <Link to="/vrf-commissioning" className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-all shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-4xl text-green-500 mb-4">🔧</div>
              <h2 className="text-xl font-semibold text-center mb-2">VRF Commissioning</h2>
              <p className="text-gray-600 text-center">Complete commissioning records for VRF systems</p>
            </Link>
            
            <Link to="/breakdown-form" className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-all shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-4xl text-red-500 mb-4">🔥</div>
              <h2 className="text-xl font-semibold text-center mb-2">Breakdown Report</h2>
              <p className="text-gray-600 text-center">Document system failures and repairs</p>
            </Link>
            
            <Link to="/tools" className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-all shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-4xl text-purple-500 mb-4">🧰</div>
              <h2 className="text-xl font-semibold text-center mb-2">HVAC Tools</h2>
              <p className="text-gray-600 text-center">Access calculation tools and references</p>
            </Link>
            
            <Link to="/history" className="bg-white/90 backdrop-blur-sm hover:bg-white/100 transition-all shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-4xl text-yellow-500 mb-4">📋</div>
              <h2 className="text-xl font-semibold text-center mb-2">Service History</h2>
              <p className="text-gray-600 text-center">View past service records and reports</p>
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
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {form.type === 'fgas' ? 'F-Gas' : form.type === 'vrf' ? 'VRF' : 'Breakdown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.site_name || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              form.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              form.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
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
