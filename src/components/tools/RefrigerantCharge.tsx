
import React, { useState } from 'react';

interface SystemDetails {
  refrigerantType: string;
  indoorUnitCapacity: number;
  liquidLineLength: number;
  liquidLineDiameter: number;
  suctionLineLength: number;
  suctionLineDiameter: number;
}

export default function RefrigerantCharge() {
  const [system, setSystem] = useState<SystemDetails>({
    refrigerantType: 'R410A',
    indoorUnitCapacity: 5,
    liquidLineLength: 10,
    liquidLineDiameter: 9.52,
    suctionLineLength: 10,
    suctionLineDiameter: 15.88
  });
  
  const [results, setResults] = useState<{
    baseCharge: number;
    additionalCharge: number;
    totalCharge: number;
  } | null>(null);

  const calculateRefrigerantCharge = () => {
    // This is a simplified calculation for demonstration purposes
    // In a real application, you would use manufacturer-specific formulas
    
    // Base charge based on indoor unit capacity (simplified)
    const baseCharge = system.indoorUnitCapacity * 0.25; // kg
    
    // Additional charge based on pipe lengths (simplified calculations)
    // Values are based on typical refrigerant charge per meter of pipe
    const refrigerantDensities = {
      'R410A': { liquid: 0.04, suction: 0.005 },
      'R32': { liquid: 0.03, suction: 0.004 },
      'R134a': { liquid: 0.05, suction: 0.006 },
      'R407C': { liquid: 0.045, suction: 0.0055 }
    };
    
    // Diameter correction factors (simplified)
    const diameterFactor = {
      6.35: 0.7, // 1/4"
      9.52: 1.0, // 3/8"
      12.7: 1.5, // 1/2"
      15.88: 2.0, // 5/8"
      19.05: 2.5  // 3/4"
    };
    
    const liquidCharge = system.liquidLineLength * 
                         refrigerantDensities[system.refrigerantType].liquid * 
                         diameterFactor[system.liquidLineDiameter];
    
    const suctionCharge = system.suctionLineLength * 
                          refrigerantDensities[system.refrigerantType].suction * 
                          diameterFactor[system.suctionLineDiameter];
    
    const additionalCharge = liquidCharge + suctionCharge;
    const totalCharge = baseCharge + additionalCharge;
    
    setResults({
      baseCharge: parseFloat(baseCharge.toFixed(2)),
      additionalCharge: parseFloat(additionalCharge.toFixed(2)),
      totalCharge: parseFloat(totalCharge.toFixed(2))
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Refrigerant Charge Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Refrigerant Type
          </label>
          <select
            value={system.refrigerantType}
            onChange={(e) => setSystem({ ...system, refrigerantType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="R410A">R410A</option>
            <option value="R32">R32</option>
            <option value="R134a">R134a</option>
            <option value="R407C">R407C</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Indoor Unit Capacity (kW)
          </label>
          <input
            type="number"
            value={system.indoorUnitCapacity || ''}
            onChange={(e) => setSystem({ ...system, indoorUnitCapacity: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Liquid Line Length (m)
          </label>
          <input
            type="number"
            value={system.liquidLineLength || ''}
            onChange={(e) => setSystem({ ...system, liquidLineLength: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Liquid Line Diameter (mm)
          </label>
          <select
            value={system.liquidLineDiameter}
            onChange={(e) => setSystem({ ...system, liquidLineDiameter: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="6.35">1/4" (6.35mm)</option>
            <option value="9.52">3/8" (9.52mm)</option>
            <option value="12.7">1/2" (12.7mm)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Suction Line Length (m)
          </label>
          <input
            type="number"
            value={system.suctionLineLength || ''}
            onChange={(e) => setSystem({ ...system, suctionLineLength: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Suction Line Diameter (mm)
          </label>
          <select
            value={system.suctionLineDiameter}
            onChange={(e) => setSystem({ ...system, suctionLineDiameter: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="12.7">1/2" (12.7mm)</option>
            <option value="15.88">5/8" (15.88mm)</option>
            <option value="19.05">3/4" (19.05mm)</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={calculateRefrigerantCharge}
          disabled={!system.indoorUnitCapacity || !system.liquidLineLength || !system.suctionLineLength}
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
                <p className="text-sm font-medium text-gray-500">Base Charge</p>
                <p className="text-lg font-semibold">{results.baseCharge} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Additional Pipe Charge</p>
                <p className="text-lg font-semibold">{results.additionalCharge} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Refrigerant Charge</p>
                <p className="text-lg font-semibold">{results.totalCharge} kg</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Important Notes</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Always verify against manufacturer specifications</li>
              <li>Consider height differences between indoor and outdoor units</li>
              <li>Additional charge may be needed for branch boxes and headers in VRF systems</li>
              <li>This calculation is simplified for demonstration purposes</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
