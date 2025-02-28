
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

  const handleCalculate = () => {
    // Convert inputs to numbers
    const curSpeed = Number(currentSpeed);
    const curFlow = Number(currentFlow);
    const curPressure = Number(currentPressure);
    const curPower = Number(currentPower);
    const nSpeed = Number(newSpeed);
    
    if (curSpeed <= 0 || nSpeed <= 0) {
      alert("Speed values must be greater than zero");
      return;
    }
    
    const speedRatio = nSpeed / curSpeed;
    
    // Fan Law 1: Flow varies directly with speed
    const nFlow = curFlow * speedRatio;
    setNewFlow(nFlow);
    
    // Fan Law 2: Pressure varies as the square of the speed ratio
    const nPressure = curPressure * (speedRatio * speedRatio);
    setNewPressure(nPressure);
    
    // Fan Law 3: Power varies as the cube of the speed ratio
    const nPower = curPower * (speedRatio * speedRatio * speedRatio);
    setNewPower(nPower);
  };

  const resetCalculator = () => {
    setCurrentSpeed('');
    setCurrentFlow('');
    setCurrentPressure('');
    setCurrentPower('');
    setNewSpeed('');
    setNewFlow(null);
    setNewPressure(null);
    setNewPower(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Fan Laws Calculator</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-blue-800 mb-2">About This Tool</h3>
        <p className="text-blue-700">
          This calculator applies fan laws to predict changes in fan performance when speed is adjusted.
          The fan laws are fundamental equations that describe how flow rate, pressure, and power
          consumption change with fan speed.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Operating Conditions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fan Speed (RPM)</label>
            <input 
              type="number" 
              value={currentSpeed} 
              onChange={(e) => setCurrentSpeed(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter current speed" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flow Rate (CFM)</label>
            <input 
              type="number" 
              value={currentFlow} 
              onChange={(e) => setCurrentFlow(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter current flow rate" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Static Pressure (inwg)</label>
            <input 
              type="number" 
              value={currentPressure} 
              onChange={(e) => setCurrentPressure(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter current pressure" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Power Consumption (kW)</label>
            <input 
              type="number" 
              value={currentPower} 
              onChange={(e) => setCurrentPower(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter current power" 
            />
          </div>
          
          <h3 className="text-lg font-semibold mt-2">New Conditions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Fan Speed (RPM)</label>
            <input 
              type="number" 
              value={newSpeed} 
              onChange={(e) => setNewSpeed(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
              placeholder="Enter new speed" 
            />
          </div>
          
          <div className="flex space-x-2 pt-2">
            <button 
              onClick={handleCalculate} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Calculate
            </button>
            <button 
              onClick={resetCalculator} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {newFlow === null ? (
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">New Flow Rate:</h4>
                  <p className="text-2xl font-bold text-blue-600">{newFlow.toFixed(2)} CFM</p>
                  <p className="text-xs text-gray-500 mt-1">Based on Fan Law 1: Flow ∝ Speed</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">New Static Pressure:</h4>
                  <p className="text-2xl font-bold text-blue-600">{newPressure?.toFixed(4)} inwg</p>
                  <p className="text-xs text-gray-500 mt-1">Based on Fan Law 2: Pressure ∝ Speed²</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">New Power Consumption:</h4>
                  <p className="text-2xl font-bold text-blue-600">{newPower?.toFixed(4)} kW</p>
                  <p className="text-xs text-gray-500 mt-1">Based on Fan Law 3: Power ∝ Speed³</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Fan Laws Reference</h3>
            <div className="bg-yellow-50 p-3 rounded-lg text-sm space-y-2">
              <p><strong>Law 1:</strong> Flow Rate ∝ Speed</p>
              <p><strong>Law 2:</strong> Pressure ∝ Speed²</p>
              <p><strong>Law 3:</strong> Power ∝ Speed³</p>
              <p className="text-xs italic mt-2">Note: These laws apply when fan diameter remains constant</p>
            </div>
            
            <div className="mt-4 text-sm text-gray-700">
              <p className="font-medium">Reference Standards:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>ASHRAE Handbook - HVAC Systems and Equipment</li>
                <li>AMCA Publication 201</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
