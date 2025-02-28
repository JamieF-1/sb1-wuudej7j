
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Thermometer, 
  Wind, 
  Scale, 
  Droplet, 
  BarChart, 
  Pipe,
  Gauge,
  Fan,
  Zap
} from 'lucide-react';

export default function ToolsLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">HVAC Technical Tools</h1>
        
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          <NavLink
            to="/tools/refrigerant"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Thermometer className="h-4 w-4 mr-1" />
            Refrigerant Comparator
          </NavLink>
          
          <NavLink
            to="/tools/duct"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Wind className="h-4 w-4 mr-1" />
            Duct Calculator
          </NavLink>
          
          <NavLink
            to="/tools/ventilation"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Wind className="h-4 w-4 mr-1" />
            Ventilation Calculator
          </NavLink>
          
          <NavLink
            to="/tools/converter"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Scale className="h-4 w-4 mr-1" />
            Unit Converter
          </NavLink>
          
          <NavLink
            to="/tools/psychrometric"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Droplet className="h-4 w-4 mr-1" />
            Psychrometric Calculator
          </NavLink>
          
          <NavLink
            to="/tools/heat-load"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <BarChart className="h-4 w-4 mr-1" />
            Heat Load Calculator
          </NavLink>
          
          <NavLink
            to="/tools/pipe-sizing"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Pipe className="h-4 w-4 mr-1" />
            Pipe Sizing
          </NavLink>
          
          <NavLink
            to="/tools/refrigerant-charge"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Gauge className="h-4 w-4 mr-1" />
            Refrigerant Charge
          </NavLink>
          
          <NavLink
            to="/tools/air-balance"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Wind className="h-4 w-4 mr-1" />
            Air Balance
          </NavLink>
          
          <NavLink
            to="/tools/fan-laws"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Fan className="h-4 w-4 mr-1" />
            Fan Laws
          </NavLink>
          
          <NavLink
            to="/tools/energy"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Zap className="h-4 w-4 mr-1" />
            Energy Efficiency
          </NavLink>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
