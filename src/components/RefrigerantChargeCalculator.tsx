import React, { useState } from 'react';
import { Scale } from 'lucide-react';

interface SystemData {
  refrigerantType: string;
  liquidLineLength: number;
  liquidLineDiameter: number;
  suctionLineLength: number;
  suctionLineDiameter: number;
  indoorUnits: number;
  outdoorUnit: number;
}

export default function RefrigerantChargeCalculator() {
  const [system, setSystem] = useState<SystemData>({
    refrigerantType: 'R410A',
    liquidLineLength: 0,
    liquidLineDiameter: 9.52, // 3/8"
    suctionLineLength: 0,
    suctionLineDiameter: 15.88, // 5/8"
    indoorUnits: 0,
    outdoorUnit: 0,
  });

  const calculateCharge = () => {
    // Refrigerant density (kg/m³) at typical conditions
    const density = {
      'R410A': { liquid: 946, vapor: 37.5 },
      'R32': { liquid: 925, vapor: 34.2 },
      'R134a': { liquid: 1206, vapor: 32.4 },
    }[system.refrigerantType] || { liquid: 1000, vapor: 35 };

    // Calculate volumes
    const liquidVolume = Math.PI * Math.pow(system.liquidLineDiameter / 2000, 2) * system.liquidLineLength;
    const suctionVolume = Math.PI * Math.pow(system.suctionLineDiameter / 2000, 2) * system.suctionLineLength;

    // Calculate pipe charges
    const liquidCharge = liquidVolume * density.liquid;
    const suctionCharge = suctionVolume * density.vapor;

    // Estimate additional charge for components (simplified)
    const unitCharge = system.indoorUnits * 0.2 + system.outdoorUnit;

    return {
      liquidCharge,
      suctionCharge,
      unitCharge,
      totalCharge: liquidCharge + suctionCharge + unitCharge,
    };
  };

  const result = calculateCharge();

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Scale className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Refrigerant Charge Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </select>
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
              <option value="22.23">7/8" (22.23mm)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Indoor Units
            </label>
            <input
              type="number"
              value={system.indoorUnits || ''}
              onChange={(e) => setSystem({ ...system, indoorUnits: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Outdoor Unit Base Charge (kg)
            </label>
            <input
              type="number"
              value={system.outdoorUnit || ''}
              onChange={(e) => setSystem({ ...system, outdoorUnit: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Charge Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-blue-800">Liquid Line Charge</p>
              <p className="text-lg">{result.liquidCharge.toFixed(2)} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Suction Line Charge</p>
              <p className="text-lg">{result.suctionCharge.toFixed(2)} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Unit Charge</p>
              <p className="text-lg">{result.unitCharge.toFixed(2)} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Total System Charge</p>
              <p className="text-lg font-bold text-blue-900">{result.totalCharge.toFixed(2)} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}