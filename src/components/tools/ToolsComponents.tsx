import React from 'react';
import { Link } from 'react-router-dom';
import { Fan, Thermometer, Wind, Gauge, BarChart3 } from 'lucide-react';

// Tool card component for the tools grid
export const ToolCard = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 h-full border border-gray-100">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-50 rounded-full mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

// Tools grid for the main tools page
export const ToolsGrid = () => {
  const tools = [
    {
      icon: <Gauge className="h-5 w-5 text-blue-600" />,
      title: "Pipe Sizing",
      description: "Calculate optimal pipe sizes for various HVAC and plumbing applications.",
      link: "/tools/pipe-sizing",
    },
    {
      icon: <Thermometer className="h-5 w-5 text-blue-600" />,
      title: "Refrigerant Charge",
      description: "Determine proper refrigerant charge for various refrigeration systems.",
      link: "/tools/refrigerant-charge",
    },
    {
      icon: <Wind className="h-5 w-5 text-blue-600" />,
      title: "Air Balance",
      description: "Calculate airflow requirements and balance air distribution systems.",
      link: "/tools/air-balance",
    },
    {
      icon: <Fan className="h-5 w-5 text-blue-600" />,
      title: "Fan Laws",
      description: "Apply fan laws to calculate changes in fan performance.",
      link: "/tools/fan-laws",
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
      title: "Energy Efficiency",
      description: "Calculate energy usage and savings for HVAC equipment.",
      link: "/tools/energy",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Engineering Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard key={index} {...tool} />
        ))}
      </div>
    </div>
  );
};