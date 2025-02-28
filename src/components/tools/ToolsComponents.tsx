import React from "react";
import { Link } from "react-router-dom";
import { 
  Gauge, 
  Thermometer, 
  Wind, 
  Fan, 
  Zap 
} from "lucide-react";

export const ToolsGrid: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">HVAC Engineering Tools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard 
          title="Pipe Sizing" 
          description="Calculate optimal pipe sizes based on flow rate and pressure drop requirements for hydronic systems."
          icon={<Gauge className="h-8 w-8 text-blue-500" />}
          link="/tools/pipe-sizing"
        />

        <ToolCard 
          title="Refrigerant Charge" 
          description="Calculate proper refrigerant charge for different system types and track F-Gas compliance."
          icon={<Thermometer className="h-8 w-8 text-red-500" />}
          link="/tools/refrigerant-charge"
        />

        <ToolCard 
          title="Air Balance" 
          description="Calculate airflow requirements and balance air distribution systems according to design specifications."
          icon={<Wind className="h-8 w-8 text-green-500" />}
          link="/tools/air-balance"
        />

        <ToolCard 
          title="Fan Laws" 
          description="Apply fan laws to predict performance changes when adjusting speed, diameter or air density."
          icon={<Fan className="h-8 w-8 text-purple-500" />}
          link="/tools/fan-laws"
        />

        <ToolCard 
          title="Energy Efficiency" 
          description="Calculate energy usage, efficiency ratios and estimate potential savings for HVAC systems."
          icon={<Zap className="h-8 w-8 text-yellow-500" />}
          link="/tools/energy"
        />
      </div>
    </div>
  );
};

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link to={link} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow p-6 flex flex-col">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
      <div className="mt-4">
        <span className="text-blue-600 text-sm font-medium inline-flex items-center">
          Use Tool
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};