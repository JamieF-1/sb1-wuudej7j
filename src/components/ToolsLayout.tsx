import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Thermometer, Calculator, Wind, ArrowLeftRight, 
  Home, Droplets, Gauge, Fan, Zap, Scale, 
  BarChart, ThermometerSun 
} from 'lucide-react';

const tools = [
  {
    name: 'Refrigerant Comparator',
    path: '/tools/refrigerant',
    icon: Thermometer,
  },
  {
    name: 'Duct Calculator',
    path: '/tools/duct',
    icon: Calculator,
  },
  {
    name: 'Ventilation Calculator',
    path: '/tools/ventilation',
    icon: Wind,
  },
  {
    name: 'Unit Converter',
    path: '/tools/converter',
    icon: ArrowLeftRight,
  },
  {
    name: 'Psychrometric Calculator',
    path: '/tools/psychrometric',
    icon: Droplets,
  },
  {
    name: 'Heat Load Calculator',
    path: '/tools/heat-load',
    icon: ThermometerSun,
  },
  {
    name: 'Pipe Sizing',
    path: '/tools/pipe-sizing',
    icon: Gauge,
  },
  {
    name: 'Refrigerant Charge',
    path: '/tools/refrigerant-charge',
    icon: Scale,
  },
  {
    name: 'Air Balance',
    path: '/tools/air-balance',
    icon: BarChart,
  },
  {
    name: 'Fan Laws',
    path: '/tools/fan-laws',
    icon: Fan,
  },
  {
    name: 'Energy Efficiency',
    path: '/tools/energy',
    icon: Zap,
  },
];

export default function ToolsLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center py-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 py-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === tool.path
                        ? 'text-white bg-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}