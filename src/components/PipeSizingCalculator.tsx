import React, { useState } from 'react';
import { Gauge } from 'lucide-react';

interface PipeData {
  flowRate: number;
  velocity: number;
  material: 'copper' | 'steel' | 'pvc';
  fluidType: 'water' | 'refrigerant';
  pressureDrop: number;
}

export default function PipeSizingCalculator() {
  const [pipe, setPipe] = useState<PipeData>({
    flowRate: 0,
    velocity: 2,
    material: 'copper',
    fluidType: 'water',
    pressureDrop: 0,
  });

  const calculatePipeSize = () => {
    // Basic pipe size calculation using continuity equation
    // A = Q/v where A is area, Q is flow rate, v is velocity
    const flowRateMs = pipe.flowRate / 3600; // Convert from m³/h to m³/s
    const area = flowRateMs / pipe.velocity;
    const diameter = Math.sqrt((4 * area) / Math.PI) * 1000; // Convert to mm
    
    // Simplified pressure drop calculation using Darcy-Weisbach
    const roughness = {
      copper: 0.0015,
      steel: 0.045,
      pvc: 0.0015,
    }[pipe.material];
    
    const density = pipe.fluidType === 'water' ? 1000 : 1.2;
    const length = 1; // 1 meter reference length
    const reynolds = (pipe.velocity * diameter / 1000) / (1.5e-5);
    const friction = 0.25 / Math.pow(Math.log10(roughness / (3.7 * diameter) + 5.74 / Math.pow(reynolds, 0.9)), 2);
    const pressureDrop = friction * length * density * Math.pow(pipe.velocity, 2) / (2 * diameter / 1000);
    
    return {
      diameter,
      pressureDrop,
      recommendedSize: Math.ceil(diameter / 10) * 10, // Round up to nearest 10mm
    };
  };

  const result = calculatePipeSize();

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Gauge className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Pipe Sizing Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Flow Rate (m³/h)
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
              Design Velocity (m/s)
            </label>
            <input
              type="number"
              value={pipe.velocity || ''}
              onChange={(e) => setPipe({ ...pipe, velocity: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pipe Material
            </label>
            <select
              value={pipe.material}
              onChange={(e) => setPipe({ ...pipe, material: e.target.value as 'copper' | 'steel' | 'pvc' })}
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
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-blue-800">Calculated Diameter</p>
              <p className="text-lg">{result.diameter.toFixed(1)} mm</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Recommended Size</p>
              <p className="text-lg">{result.recommendedSize} mm</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Pressure Drop</p>
              <p className="text-lg">{result.pressureDrop.toFixed(2)} Pa/m</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <h4 className="font-medium mb-2">Recommended Velocities:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Water (supply mains): 1.2 - 2.1 m/s</li>
            <li>Water (distribution): 0.9 - 1.5 m/s</li>
            <li>Refrigerant (suction): 4.5 - 20 m/s</li>
            <li>Refrigerant (liquid): 0.5 - 1.2 m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
}