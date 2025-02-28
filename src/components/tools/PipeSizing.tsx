
import React, { useState } from 'react';
import { Pipe } from 'lucide-react';

interface PipeSizingData {
  flowRate: number;
  fluidType: string;
  velocityLimit: number;
  pipeMaterial: string;
  calculatedDiameter: number | null;
  pressure: number | null;
}

export default function PipeSizing() {
  const [data, setData] = useState<PipeSizingData>({
    flowRate: 0,
    fluidType: 'water',
    velocityLimit: 2.0,
    pipeMaterial: 'copper',
    calculatedDiameter: null,
    pressure: null
  });

  const calculatePipeSize = () => {
    // Basic pipe sizing calculation (simplified)
    // Formula: Diameter = sqrt((4 * Flow Rate) / (π * Velocity Limit))
    const flowRateM3s = data.flowRate / 3600; // Convert from m³/h to m³/s
    const area = flowRateM3s / data.velocityLimit;
    const diameter = Math.sqrt((4 * area) / Math.PI) * 1000; // Convert to mm
    
    // Simplified pressure drop calculation
    // This is a very basic approximation
    let pressureFactor = 1.0;
    if (data.pipeMaterial === 'copper') pressureFactor = 0.8;
    if (data.pipeMaterial === 'pvc') pressureFactor = 0.6;
    if (data.pipeMaterial === 'steel') pressureFactor = 1.2;
    
    const pressureDrop = (data.flowRate * data.flowRate * pressureFactor) / (diameter * diameter) * 0.01;
    
    setData({
      ...data,
      calculatedDiameter: parseFloat(diameter.toFixed(2)),
      pressure: parseFloat(pressureDrop.toFixed(2))
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Pipe className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Pipe Sizing Calculator</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flow Rate (m³/h)
            </label>
            <input
              type="number"
              value={data.flowRate || ''}
              onChange={(e) => setData({...data, flowRate: parseFloat(e.target.value) || 0})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fluid Type
            </label>
            <select
              value={data.fluidType}
              onChange={(e) => setData({...data, fluidType: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="water">Water</option>
              <option value="glycol">Glycol Solution</option>
              <option value="refrigerant">Refrigerant</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Velocity Limit (m/s)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.velocityLimit || ''}
              onChange={(e) => setData({...data, velocityLimit: parseFloat(e.target.value) || 0})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pipe Material
            </label>
            <select
              value={data.pipeMaterial}
              onChange={(e) => setData({...data, pipeMaterial: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="copper">Copper</option>
              <option value="pvc">PVC</option>
              <option value="steel">Steel</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={calculatePipeSize}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Pipe Size
          </button>
        </div>
        
        {data.calculatedDiameter !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Calculated Pipe Diameter:</p>
                <p className="text-lg font-medium">{data.calculatedDiameter} mm</p>
                <p className="text-sm text-gray-500 mt-1">
                  Nearest standard sizes:
                  {data.calculatedDiameter <= 15 ? " 15mm (1/2\")" : 
                   data.calculatedDiameter <= 22 ? " 22mm (3/4\")" : 
                   data.calculatedDiameter <= 28 ? " 28mm (1\")" : 
                   data.calculatedDiameter <= 35 ? " 35mm (1 1/4\")" : 
                   data.calculatedDiameter <= 42 ? " 42mm (1 1/2\")" : 
                   " 54mm (2\")"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Pressure Drop:</p>
                <p className="text-lg font-medium">{data.pressure} kPa/m</p>
                <p className="text-sm text-gray-500 mt-1">
                  Recommended range: 0.1 - 0.4 kPa/m
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Velocity Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Water Systems</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Supply mains: 1.2 - 2.1 m/s</li>
                <li>Risers: 0.9 - 1.5 m/s</li>
                <li>Branch lines: 0.6 - 1.2 m/s</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Refrigerant Lines</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Suction lines: 4.5 - 20 m/s</li>
                <li>Discharge lines: 10 - 18 m/s</li>
                <li>Liquid lines: 0.5 - 1.5 m/s</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
