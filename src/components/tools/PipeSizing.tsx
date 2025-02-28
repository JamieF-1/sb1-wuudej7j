
import React, { useState } from 'react';

export default function PipeSizing() {
  const [flowRate, setFlowRate] = useState<string>('');
  const [fluidType, setFluidType] = useState<string>('water');
  const [pressureDrop, setPressureDrop] = useState<string>('');
  const [pipeLength, setPipeLength] = useState<string>('');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);
  const [velocityResult, setVelocityResult] = useState<string | null>(null);

  const calculatePipeSize = () => {
    if (!flowRate || !pressureDrop || !pipeLength) return;
    
    // This is a simplified calculation for demonstration purposes
    // In a real application, you would use more complex formulas based on 
    // fluid dynamics, Reynolds number, friction factors, etc.
    
    const flow = parseFloat(flowRate);
    const length = parseFloat(pipeLength);
    const pressure = parseFloat(pressureDrop);
    
    // Simple demonstration calculation (not accurate for real engineering use)
    // In reality, calculations would depend on fluid type, temperature, viscosity, etc.
    let pipeSize = 0;
    let velocity = 0;
    
    if (fluidType === 'water') {
      // Very simplified formula for demonstration
      pipeSize = Math.sqrt((0.0005 * flow * length) / pressure);
      velocity = flow / (3.14159 * Math.pow(pipeSize/2, 2));
      
      // Convert to standard pipe sizes (in inches)
      const standardSizes = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 6, 8, 10, 12];
      
      // Find the next larger standard pipe size
      for (let i = 0; i < standardSizes.length; i++) {
        if (standardSizes[i] >= pipeSize) {
          pipeSize = standardSizes[i];
          break;
        }
      }
    } else if (fluidType === 'air') {
      // Different calculation for air
      pipeSize = Math.sqrt((0.001 * flow * length) / pressure);
      velocity = flow / (3.14159 * Math.pow(pipeSize/2, 2));
      
      // Convert to standard duct sizes (in inches)
      const standardSizes = [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 30, 36];
      
      // Find the next larger standard size
      for (let i = 0; i < standardSizes.length; i++) {
        if (standardSizes[i] >= pipeSize) {
          pipeSize = standardSizes[i];
          break;
        }
      }
    }
    
    setCalculatedSize(pipeSize.toFixed(2));
    setVelocityResult(velocity.toFixed(2));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Pipe Sizing Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">About This Tool</h3>
          <p className="text-blue-700">
            Calculate the appropriate pipe or duct size based on flow requirements, 
            pressure drop, and fluid properties. This tool helps ensure efficient and 
            economical fluid transport in your systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fluid Type</label>
              <select 
                value={fluidType} 
                onChange={(e) => setFluidType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="water">Water</option>
                <option value="air">Air</option>
                <option value="refrigerant">Refrigerant</option>
                <option value="oil">Oil</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flow Rate</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={flowRate} 
                  onChange={(e) => setFlowRate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter flow rate"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>{fluidType === 'air' ? 'CFM' : 'GPM'}</option>
                  <option>{fluidType === 'air' ? 'm³/hr' : 'L/s'}</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pressure Drop</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={pressureDrop} 
                  onChange={(e) => setPressureDrop(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter pressure drop"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>{fluidType === 'air' ? 'in.wg/100ft' : 'psi/100ft'}</option>
                  <option>{fluidType === 'air' ? 'Pa/m' : 'kPa/m'}</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pipe/Duct Length</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={pipeLength} 
                  onChange={(e) => setPipeLength(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter length"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>feet</option>
                  <option>meters</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={calculatePipeSize} 
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Calculate Size
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Sizing Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {!calculatedSize ? (
                <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Recommended {fluidType === 'air' ? 'Duct' : 'Pipe'} Size:</span>
                    <span className="text-blue-600 font-semibold">{calculatedSize} inches</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Fluid Velocity:</span>
                    <span className="text-blue-600 font-semibold">{velocityResult} {fluidType === 'air' ? 'ft/min' : 'ft/s'}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Industry Standards</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>ASHRAE Fundamentals Handbook</li>
                <li>ASME B31.9 Building Services Piping</li>
                <li>IMC (International Mechanical Code)</li>
                <li>NFPA Standards</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Design Considerations</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>For water systems, velocity typically 2-10 ft/s</li>
                <li>For air systems, velocity typically 800-1,200 ft/min for low pressure</li>
                <li>Consider noise, erosion, and water hammer effects</li>
                <li>Account for equivalent length of fittings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
