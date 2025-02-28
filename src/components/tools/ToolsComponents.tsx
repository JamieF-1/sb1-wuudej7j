
import React from "react";
import { Link } from "react-router-dom";
import { 
  Pipe, 
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

export const ToolsGrid: React.FC = () => {
  const tools = [
    {
      name: "Pipe Sizing",
      description: "Calculate pipe sizes, pressure drops, and flow rates",
      icon: <Pipe className="h-8 w-8 text-blue-500" />,
      path: "/tools/pipe-sizing",
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Refrigerant Charge",
      description: "Determine refrigerant charge for various systems",
      icon: <Thermometer className="h-8 w-8 text-blue-500" />,
      path: "/tools/refrigerant-charge",
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Air Balance",
      description: "Balance airflow and measure system performance",
      icon: <Scale className="h-8 w-8 text-green-500" />,
      path: "/tools/air-balance",
      color: "bg-green-50 border-green-200",
    },
    {
      name: "Fan Laws",
      description: "Calculate fan performance with changing parameters",
      icon: <Fan className="h-8 w-8 text-green-500" />,
      path: "/tools/fan-laws",
      color: "bg-green-50 border-green-200",
    },
    {
      name: "Energy Efficiency",
      description: "Analyze energy usage and calculate savings",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      path: "/tools/energy",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      name: "Duct Sizing",
      description: "Size ductwork for proper airflow distribution",
      icon: <Wind className="h-8 w-8 text-purple-500" />,
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">HVAC Technical Tools</h1>
      <p className="text-gray-600 mb-8">
        Tools to assist with calculations and reference data for onsite engineers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className={`${tool.color} relative border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md`}
          >
            {tool.comingSoon ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>{tool.icon}</div>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{tool.name}</h2>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            ) : (
              <Link
                to={tool.path}
                className="block p-6 h-full transition-all hover:bg-opacity-80"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>{tool.icon}</div>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{tool.name}</h2>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Standards & Regulations Reference</h2>
        <p className="text-gray-600 mb-4">
          Our tools are designed to help you comply with industry standards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">ASHRAE Standards</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Standard 15 (Safety)</li>
              <li>Standard 34 (Refrigerants)</li>
              <li>Standard 62.1 (Ventilation)</li>
              <li>Standard 90.1 (Energy)</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">Refrigerant Regulations</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>EPA Section 608</li>
              <li>F-Gas Regulations</li>
              <li>Montreal Protocol</li>
              <li>Kigali Amendment</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">Industry Guidelines</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>SMACNA</li>
              <li>NADCA</li>
              <li>ACCA Manuals</li>
              <li>IMC/UMC</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-1">Energy Efficiency</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Energy Star</li>
              <li>LEED Requirements</li>
              <li>Building Energy Codes</li>
              <li>SEER/EER Standards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
