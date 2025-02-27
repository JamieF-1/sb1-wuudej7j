
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function TestLoginHelper() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  // Test account credentials - replace these with actual test accounts from your Supabase
  const testUsers = [
    { email: 'test@example.com', password: 'password123', role: 'Admin' },
    { email: 'user@example.com', password: 'password123', role: 'User' }
  ];
  
  const handleQuickLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      console.error('Test login failed:', error);
      alert('Test login failed. Make sure this user exists in your Supabase database.');
    }
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-md mb-6">
      <h3 className="text-md font-bold text-gray-700 mb-2">Test Accounts</h3>
      <p className="text-sm text-gray-500 mb-3">Click on any account to quickly sign in for testing.</p>
      
      <div className="space-y-2">
        {testUsers.map((user) => (
          <button
            key={user.email}
            onClick={() => handleQuickLogin(user.email, user.password)}
            className="w-full text-left flex justify-between items-center bg-white p-2 rounded border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <div>
              <div className="text-sm font-medium">{user.email}</div>
              <div className="text-xs text-gray-500">Role: {user.role}</div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Quick Login
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>Note: These are test accounts. Update TestLoginHelper.tsx with valid credentials from your Supabase database.</p>
      </div>
    </div>
  );
}
