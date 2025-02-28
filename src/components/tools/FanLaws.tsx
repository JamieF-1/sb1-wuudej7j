
import React, { useState } from 'react';
import { Fan } from 'lucide-react';

export default function FanLaws() {
  const [formData, setFormData] = useState({
    currentSpeed: '',
    currentFlow: '',
    currentPressure: '',
    currentPower: '',
    newSpeed: '',
    targetParameter: 'flow', // flow, pressure, or power
  });

  const [results, setResults] = useState({
    newFlow: null,
    newPressure: null,
    newPower: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateResults = () => {
    const { currentSpeed, newSpeed, currentFlow, currentPressure, currentPower } = formData;
    
    // Convert inputs to numbers
    const cs = Number(currentSpeed);
    const ns = Number(newSpeed);
    const cf = Number(currentFlow);
    const cp = Number(currentPressure);
    const cpow = Number(currentPower);
    
    // Speed ratio
    const ratio = ns / cs;
    
    // Fan laws calculations
    const newFlow = cf * ratio;
    const newPressure = cp * (ratio ** 2);
    const newPower = cpow * (ratio ** 3);
    
    setResults({
      newFlow,
      newPressure,
      newPower,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Fan className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold">Fan Laws Calculator</h2>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-blue-800 mb-2">About This Tool</h3>
        <p className="text-blue-700">
          This calculator uses fan laws to determine how changes in fan speed affect flow rate, pressure, and power consumption.
          Fan laws are fundamental principles that describe the relationships between these parameters.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Conditions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fan Speed (RPM)</label>
            <input 
              type="number" 
              name="currentSpeed"
              value={formData.currentSpeed}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter current fan speed" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flow Rate (CFM)</label>
            <input 
              type="number"
              name="currentFlow"
              value={formData.currentFlow}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter current flow rate" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Static Pressure (inWC)</label>
            <input 
              type="number" 
              name="currentPressure"
              value={formData.currentPressure}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter current static pressure" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Power Consumption (kW)</label>
            <input 
              type="number" 
              name="currentPower"
              value={formData.currentPower}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter current power consumption" 
            />
          </div>
          
          <h3 className="text-lg font-semibold mt-4">New Conditions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Fan Speed (RPM)</label>
            <input 
              type="number" 
              name="newSpeed"
              value={formData.newSpeed}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter new fan speed" 
            />
          </div>
          
          <button 
            onClick={calculateResults}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Calculate Results
          </button>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          
          {results.newFlow !== null ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">New Flow Rate:</div>
                  <div>{results.newFlow.toFixed(2)} CFM</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">New Static Pressure:</div>
                  <div>{results.newPressure.toFixed(4)} inWC</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">New Power Consumption:</div>
                  <div>{results.newPower.toFixed(2)} kW</div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Fan Laws</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Flow ∝ Speed (Q₂ = Q₁ × (n₂/n₁))</li>
                  <li>• Pressure ∝ Speed² (P₂ = P₁ × (n₂/n₁)²)</li>
                  <li>• Power ∝ Speed³ (W₂ = W₁ × (n₂/n₁)³)</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Industry References</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>ASHRAE Fundamentals Handbook</li>
              <li>AMCA Publication 201</li>
              <li>SMACNA HVAC Systems Testing, Adjusting & Balancing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
