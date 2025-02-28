import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Thermometer, Wind, Scale, Fan, Zap, Pipe } from "lucide-react";

export default function ToolsLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">HVAC Technical Tools</h1>

        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          <NavLink
            to="/tools"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            All Tools
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
            <Thermometer className="h-4 w-4 mr-1" />
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
            <Scale className="h-4 w-4 mr-1" />
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

        <Outlet />
      </div>
    </div>
  );
}