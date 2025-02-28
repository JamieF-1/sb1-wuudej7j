
import React, { useState } from "react";
import { Fan } from "lucide-react";

export default function FanLaws() {
  const [formData, setFormData] = useState({
    calculationType: "speed",
    currentSpeed: "",
    newSpeed: "",
    currentFlow: "",
    currentPressure: "",
    currentPower: "",
  });

  const [results, setResults] = useState<{
    newFlow?: number;
    newPressure?: number;
    newPower?: number;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateResults = () => {
    const {
      calculationType,
      currentSpeed,
      newSpeed,
      currentFlow,
      currentPressure,
      currentPower,
    } = formData;

    if (calculationType === "speed" && currentSpeed && newSpeed) {
      const speedRatio = parseFloat(newSpeed) / parseFloat(currentSpeed);
      
      const newFlow = parseFloat(currentFlow) * speedRatio;
      const newPressure = parseFloat(currentPressure) * Math.pow(speedRatio, 2);
      const newPower = parseFloat(currentPower) * Math.pow(speedRatio, 3);
      
      setResults({ newFlow, newPressure, newPower });
    } else {
      setResults(null);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Fan Laws Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-medium text-purple-800 mb-2">About This Tool</h3>
          <p className="text-purple-700">
            Calculate how changes in fan speed, impeller diameter, or air density affect fan performance metrics 
            including flow rate, pressure, and power consumption.
            These laws help engineers predict system behavior when making adjustments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Input Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calculation Type</label>
              <select
                name="calculationType"
                value={formData.calculationType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="speed">Speed Change</option>
                <option value="diameter">Impeller Diameter Change</option>
                <option value="density">Air Density Change</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Fan Speed (RPM)
              </label>
              <input
                type="number"
                name="currentSpeed"
                value={formData.currentSpeed}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Fan Speed (RPM)
              </label>
              <input
                type="number"
                name="newSpeed"
                value={formData.newSpeed}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Flow Rate (CFM)
              </label>
              <input
                type="number"
                name="currentFlow"
                value={formData.currentFlow}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Pressure (in. wg)
              </label>
              <input
                type="number"
                name="currentPressure"
                value={formData.currentPressure}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Power (kW)
              </label>
              <input
                type="number"
                name="currentPower"
                value={formData.currentPower}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <button
              onClick={calculateResults}
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
            >
              Calculate
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {results ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">New Flow Rate:</span>
                    <span>{results.newFlow?.toFixed(2)} CFM</span>
                    
                    <span className="font-medium">New Pressure:</span>
                    <span>{results.newPressure?.toFixed(4)} in. wg</span>
                    
                    <span className="font-medium">New Power:</span>
                    <span>{results.newPower?.toFixed(4)} kW</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <h4 className="font-medium text-purple-700 mb-1">Fan Laws:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Flow ∝ Speed</li>
                      <li>• Pressure ∝ Speed²</li>
                      <li>• Power ∝ Speed³</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Enter values and click Calculate to see results.</p>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Application Notes</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Use these calculations for preliminary estimates only</li>
                <li>Actual performance may vary based on system effects</li>
                <li>Fan laws assume geometric similarity and negligible changes in efficiency</li>
                <li>Consult manufacturer data for precise values</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
