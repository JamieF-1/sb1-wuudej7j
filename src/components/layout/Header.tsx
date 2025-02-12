import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { signOut } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            {!isHome && (
              <Link
                to="/"
                className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Home className="h-5 w-5 mr-2" />
                <span className="font-medium">Home</span>
              </Link>
            )}
            <h1 className="text-2xl font-bold text-indigo-600">F-Gas Compliance System</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}