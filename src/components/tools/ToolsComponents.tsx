import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Thermometer, Fan, Zap, Ruler } from 'lucide-react';

export function ToolCard({ title, description, icon, to }: { title: string; description: string; icon: React.ReactNode; to: string }) {
  return (
    <Link to={to} className="bg-white shadow hover:shadow-md transition-shadow rounded-lg overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="text-blue-500 mr-3">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100 text-blue-600 text-sm font-medium">
        Open Tool →
      </div>
    </Link>
  );
}

export function ToolsGrid() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">HVAC Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          title="Pipe Sizing"
          description="Calculate optimal pipe sizes based on flow rate and pressure drop requirements."
          icon={<Ruler className="h-5 w-5" />}
          to="/tools/pipe-sizing"
        />
        <ToolCard
          title="Refrigerant Charge"
          description="Calculate refrigerant charge quantities for different system types and sizes."
          icon={<Thermometer className="h-5 w-5" />}
          to="/tools/refrigerant-charge"
        />
        <ToolCard
          title="Air Balance"
          description="Calculate and balance airflow in HVAC systems across multiple outlets."
          icon={<Wind className="h-5 w-5" />}
          to="/tools/air-balance"
        />
        <ToolCard
          title="Fan Laws"
          description="Calculate fan performance changes when speed, diameter, or air density changes."
          icon={<Fan className="h-5 w-5" />}
          to="/tools/fan-laws"
        />
        <ToolCard
          title="Energy Efficiency"
          description="Calculate energy savings when upgrading to more efficient equipment."
          icon={<Zap className="h-5 w-5" />}
          to="/tools/energy"
        />
        {/* Add more ToolCards here as needed */}
      </div>
    </div>
  );
}

export { ToolsGrid, ToolCard };