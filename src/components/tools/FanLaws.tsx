
import React, { useState } from 'react';

export default function FanLaws() {
  const [currentSpeed, setCurrentSpeed] = useState<number | string>('');
  const [currentFlow, setCurrentFlow] = useState<number | string>('');
  const [currentPressure, setCurrentPressure] = useState<number | string>('');
  const [currentPower, setCurrentPower] = useState<number | string>('');
  
  const [newSpeed, setNewSpeed] = useState<number | string>('');
  const [newFlow, setNewFlow] = useState<number | null>(null);
  const [newPressure, setNewPressure] = useState<number | null>(null);
  const [newPower, setNewPower] = useState<number | null>(null);

  const calculateResults = () => {
    if (!currentSpeed || !newSpeed || currentSpeed === 0) return;
    
    const speedRatio = Number(newSpeed) / Number(currentSpeed);
    
    // Fan Law 1: Flow ∝ Speed
    if (currentFlow) {
      setNewFlow(Number(currentFlow) * speedRatio);
    }
    
    // Fan Law 2: Pressure ∝ Speed²
    if (currentPressure) {
      setNewPressure(Number(currentPressure) * Math.pow(speedRatio, 2));
    }
    
    // Fan Law 3: Power ∝ Speed³
    if (currentPower) {
      setNewPower(Number(currentPower) * Math.pow(speedRatio, 3));
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Fan Laws Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">About This Tool</h3>
          <p className="text-blue-700">
            Fan laws are used to predict the performance of a fan when operating conditions change.
            This calculator helps engineers determine how changes in fan speed affect flow rate, pressure, and power consumption.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Fan Conditions</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fan Speed (RPM)</label>
              <input 
                type="number" 
                value={currentSpeed} 
                onChange={(e) => setCurrentSpeed(e.target.value)} 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder="Enter current RPM"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flow Rate</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={currentFlow} 
                  onChange={(e) => setCurrentFlow(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter current flow rate"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>CFM</option>
                  <option>m³/h</option>
                  <option>L/s</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pressure</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={currentPressure} 
                  onChange={(e) => setCurrentPressure(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter current pressure"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>in.wg</option>
                  <option>Pa</option>
                  <option>kPa</option>
                  <option>psi</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Power Consumption</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={currentPower} 
                  onChange={(e) => setCurrentPower(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter current power"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>kW</option>
                  <option>HP</option>
                  <option>W</option>
                </select>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-6">New Fan Conditions</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Fan Speed (RPM)</label>
              <input 
                type="number" 
                value={newSpeed} 
                onChange={(e) => setNewSpeed(e.target.value)} 
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder="Enter new RPM"
              />
            </div>
            
            <button 
              onClick={calculateResults} 
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Calculate Results
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculated Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {(newFlow === null && newPressure === null && newPower === null) ? (
                <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              ) : (
                <div className="space-y-4">
                  {newFlow !== null && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium">New Flow Rate:</span>
                      <span className="text-blue-600 font-semibold">{newFlow.toFixed(2)} CFM</span>
                    </div>
                  )}
                  
                  {newPressure !== null && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium">New Pressure:</span>
                      <span className="text-blue-600 font-semibold">{newPressure.toFixed(2)} in.wg</span>
                    </div>
                  )}
                  
                  {newPower !== null && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium">New Power Consumption:</span>
                      <span className="text-blue-600 font-semibold">{newPower.toFixed(2)} kW</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Fan Laws</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 bg-blue-50 p-3 rounded">
                <li><strong>Law 1:</strong> Flow rate varies directly with fan speed</li>
                <li><strong>Law 2:</strong> Pressure varies with the square of fan speed</li>
                <li><strong>Law 3:</strong> Power varies with the cube of fan speed</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Industry Standards</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>AMCA Publication 201</li>
                <li>ASHRAE Fundamentals</li>
                <li>CIBSE Guide B</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
