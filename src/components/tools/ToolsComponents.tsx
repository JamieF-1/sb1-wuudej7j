
import { Link } from "react-router-dom";
import { Wind, Thermometer, Gauge, Activity, Zap } from "lucide-react";

// Card types
type ToolCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
};

// Tool card component
export const ToolCard = ({ title, description, icon, to }: ToolCardProps) => {
  return (
    <Link
      to={to}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

// Tools grid with all available tools
export const ToolsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Engineering Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          title="Pipe Sizing"
          description="Calculate appropriate pipe sizes based on flow rate, pressure, and fluid properties."
          icon={<Gauge size={24} />}
          to="/tools/pipe-sizing"
        />
        <ToolCard
          title="Refrigerant Charge"
          description="Determine optimal refrigerant charge for HVAC systems."
          icon={<Thermometer size={24} />}
          to="/tools/refrigerant-charge"
        />
        <ToolCard
          title="Air Balance"
          description="Balance airflow in ventilation systems per ASHRAE standards."
          icon={<Wind size={24} />}
          to="/tools/air-balance"
        />
        <ToolCard
          title="Fan Laws"
          description="Apply fan laws to predict performance changes in centrifugal and axial fans."
          icon={<Activity size={24} />}
          to="/tools/fan-laws"
        />
        <ToolCard
          title="Energy Efficiency"
          description="Calculate energy usage, savings, and payback periods for retrofit projects."
          icon={<Zap size={24} />}
          to="/tools/energy"
        />
      </div>
    </div>
  );
};
