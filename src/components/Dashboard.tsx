import React from 'react';
import { Link } from 'react-router-dom';
import { ToolsGrid } from './tools/ToolsComponents';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HVAC Technical Assistant</h1>
        <p className="text-gray-600 mb-8">Your digital toolbox for HVAC professionals</p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Technical Tools</h2>
            <p className="mb-4">Access all calculation tools and reference guides for onsite work</p>
            <Link to="/tools" className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50">
              Open Tools
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Service Reports</h2>
            <p className="mb-4">Create and manage service reports and maintenance records</p>
            <button className="inline-block px-4 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50">
              Coming Soon
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Regulations</h2>
            <p className="mb-4">Access updated standards and compliance information</p>
            <button className="inline-block px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50">
              Coming Soon
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Quick Access Tools</h2>
        <ToolsGrid />
      </div>
    </div>
  );
}