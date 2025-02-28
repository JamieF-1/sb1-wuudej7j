
import React, { useState } from 'react';

interface PipeCalculation {
  pipeMaterial: 'copper' | 'steel' | 'pvc';
  fluidType: 'water' | 'refrigerant';
  flowRate: number;
  length: number;
  calculatedDiameter?: number;
  velocityLimits?: { min: number; max: number };
  pressureDrop?: number;
}

export default function PipeSizing() {
  const [pipe, setPipe] = useState<PipeCalculation>({
    pipeMaterial: 'copper',
    fluidType: 'water',
    flowRate: 0,
    length: 0
  });
  const [results, setResults] = useState<{ 
    recommendedSize: string;
    velocity: number;
    pressureDrop: number;
  } | null>(null);

  const calculatePipeSizing = () => {
    // This is a simplified calculation for demonstration purposes
    // In a real application, you would use more complex formulas based on fluid dynamics
    
    // Velocity limits based on pipe material and fluid type (m/s)
    const velocityLimits = {
      copper: { water: { min: 0.5, max: 2.5 }, refrigerant: { min: 4, max: 15 } },
      steel: { water: { min: 0.5, max: 3 }, refrigerant: { min: 5, max: 20 } },
      pvc: { water: { min: 0.5, max: 2 }, refrigerant: { min: 3, max: 12 } }
    };

    // Get velocity limits based on pipe material and fluid type
    const limits = velocityLimits[pipe.pipeMaterial][pipe.fluidType];
    
    // Simplified formulas for pipe diameter calculation (for demonstration)
    const avgVelocity = (limits.min + limits.max) / 2;
    
    // Area = Flow Rate / Velocity
    // Diameter = sqrt(4 * Area / π)
    const flowRateM3s = pipe.flowRate / 1000 / 3600; // Convert from L/h to m³/s
    const area = flowRateM3s / avgVelocity; // m²
    const diameter = Math.sqrt(4 * area / Math.PI) * 1000; // Convert to mm
    
    // Simplified pressure drop calculation (for demonstration)
    // Using Darcy-Weisbach equation with simplifications
    const roughness = { copper: 0.0015, steel: 0.045, pvc: 0.007 }[pipe.pipeMaterial];
    const frictionFactor = 0.02; // Simplified constant for demonstration
    const density = pipe.fluidType === 'water' ? 1000 : 1.2; // kg/m³
    
    const pressureDrop = frictionFactor * (pipe.length / (diameter/1000)) * 
                          (density * Math.pow(avgVelocity, 2)) / 2;
    
    // Find nearest standard pipe size (simplified)
    const standardSizes = [15, 22, 28, 35, 42, 54, 67, 76, 108];
    let recommendedSize = standardSizes[0];
    for (const size of standardSizes) {
      if (diameter <= size) {
        recommendedSize = size;
        break;
      }
    }
    
    setResults({
      recommendedSize: `${recommendedSize} mm`,
      velocity: parseFloat(avgVelocity.toFixed(2)),
      pressureDrop: parseFloat((pressureDrop / 1000).toFixed(2)) // Convert to kPa
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Pipe Sizing Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pipe Material
          </label>
          <select
            value={pipe.pipeMaterial}
            onChange={(e) => setPipe({ ...pipe, pipeMaterial: e.target.value as 'copper' | 'steel' | 'pvc' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="copper">Copper</option>
            <option value="steel">Steel</option>
            <option value="pvc">PVC</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fluid Type
          </label>
          <select
            value={pipe.fluidType}
            onChange={(e) => setPipe({ ...pipe, fluidType: e.target.value as 'water' | 'refrigerant' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="water">Water</option>
            <option value="refrigerant">Refrigerant</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Flow Rate (L/hour)
          </label>
          <input
            type="number"
            value={pipe.flowRate || ''}
            onChange={(e) => setPipe({ ...pipe, flowRate: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pipe Length (m)
          </label>
          <input
            type="number"
            value={pipe.length || ''}
            onChange={(e) => setPipe({ ...pipe, length: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={calculatePipeSizing}
          disabled={!pipe.flowRate || !pipe.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Calculate
        </button>
      </div>
      
      {results && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Recommended Pipe Size</p>
                <p className="text-lg font-semibold">{results.recommendedSize}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Velocity</p>
                <p className="text-lg font-semibold">{results.velocity} m/s</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pressure Drop</p>
                <p className="text-lg font-semibold">{results.pressureDrop} kPa/m</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Design Notes</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Recommended velocities for water in copper pipes: 0.5 - 2.5 m/s</li>
              <li>Recommended velocities for refrigerant in copper pipes: 4 - 15 m/s</li>
              <li>Keep pressure drop below 200 Pa/m for most HVAC applications</li>
              <li>Consider additional pressure losses from fittings and components</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
