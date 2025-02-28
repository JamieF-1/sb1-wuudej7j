import React from "react";
import { Link } from "react-router-dom";
import {
  Pipette,
  Thermometer,
  Fan,
  Scale,
  Wind,
  Zap,
  Waves,
  ArrowRightLeft,
  Calculator,
  BarChart3
} from "lucide-react";

// Replace tools data with correct icon - Pipe -> Pipette
const tools = [
  {
    name: "Pipe Sizing",
    description: "Calculate optimal pipe dimensions for HVAC systems",
    icon: <Pipette className="h-8 w-8 text-blue-500" />,
    path: "/tools/pipe-sizing",
    color: "bg-blue-50 border-blue-200"
  },
  {
    name: "Refrigerant Charge",
    description: "Calculate refrigerant charge requirements",
    icon: <Thermometer className="h-8 w-8 text-blue-500" />,
    path: "/tools/refrigerant-charge",
    color: "bg-blue-50 border-blue-200"
  },
  {
    name: "Air Balance",
    description: "Balance airflow in HVAC distribution systems",
    icon: <Wind className="h-8 w-8 text-green-500" />,
    path: "/tools/air-balance",
    color: "bg-green-50 border-green-200"
  },
  {
    name: "Fan Laws",
    description: "Calculate changes in fan performance",
    icon: <Fan className="h-8 w-8 text-green-500" />,
    path: "/tools/fan-laws",
    color: "bg-green-50 border-green-200"
  },
  {
    name: "Energy Efficiency",
    description: "Evaluate system efficiency and savings",
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    path: "/tools/energy",
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    name: "Duct Sizing",
    description: "Size ducts based on airflow requirements",
    icon: <Scale className="h-8 w-8 text-purple-500" />,
    path: "/tools/duct-sizing",
    color: "bg-purple-50 border-purple-200",
    comingSoon: true,
  },
  {
    name: "Cooling Load",
    description: "Calculate cooling loads for spaces",
    icon: <Waves className="h-8 w-8 text-purple-500" />,
    path: "/tools/cooling-load",
    color: "bg-purple-50 border-purple-200",
    comingSoon: true,
  },
  {
    name: "Pressure Conversion",
    description: "Convert between pressure units",
    icon: <ArrowRightLeft className="h-8 w-8 text-red-500" />,
    path: "/tools/pressure-conversion",
    color: "bg-red-50 border-red-200",
    comingSoon: true,
  },
  {
    name: "Refrigerant Properties",
    description: "View refrigerant data and characteristics",
    icon: <BarChart3 className="h-8 w-8 text-red-500" />,
    path: "/tools/refrigerant-properties",
    color: "bg-red-50 border-red-200",
    comingSoon: true,
  },
  {
    name: "Psychrometrics",
    description: "Calculate air properties and conditions",
    icon: <Calculator className="h-8 w-8 text-indigo-500" />,
    path: "/tools/psychrometrics",
    color: "bg-indigo-50 border-indigo-200",
    comingSoon: true,
  },
];

export function ToolsGrid() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">HVAC Technical Tools</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className={`border rounded-lg p-4 ${tool.color} relative`}
          >
            {tool.comingSoon && (
              <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Coming Soon
              </div>
            )}
            <div className="mb-3">{tool.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
            {!tool.comingSoon ? (
              <Link
                to={tool.path}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Open Tool &rarr;
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-400">
                Open Tool &rarr;
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}