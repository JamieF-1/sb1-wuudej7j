
import React, { useState } from 'react';

interface SystemData {
  coolingCapacity: number;
  heatingCapacity: number;
  coolingPower: number;
  heatingPower: number;
  operatingHours: number;
  electricityCost: number;
}

export default function EnergyEfficiency() {
  const [system, setSystem] = useState<SystemData>({
    coolingCapacity: 10,
    heatingCapacity: 12,
    coolingPower: 3.5,
    heatingPower: 3.8,
    operatingHours: 2000,
    electricityCost: 0.15
  });
  
  const [results, setResults] = useState<{
    coolingEER: number;
    heatingCOP: number;
    seer: number;
    hspf: number;
    annualEnergyCost: number;
    annualConsumption: number;
  } | null>(null);

  const calculateEfficiency = () => {
    // Calculate EER (Energy Efficiency Ratio) for cooling
    // EER = Cooling Capacity (Btu/h) / Power Input (W)
    // 1 kW = 3412 Btu/h
    const coolingCapacityBtu = system.coolingCapacity * 3412;
    const coolingEER = coolingCapacityBtu / (system.coolingPower * 1000);
    
    // Calculate COP (Coefficient of Performance) for heating
    // COP = Heating Capacity (kW) / Power Input (kW)
    const heatingCOP = system.heatingCapacity / system.heatingPower;
    
    // Approximate SEER and HSPF from EER and COP
    // These are rough conversions for demonstration
    const seer = coolingEER * 1.2; // Simplified approximation
    const hspf = heatingCOP * 2.4; // Simplified approximation
    
    // Calculate annual energy consumption
    // Assumption: 50% cooling, 50% heating of the operating hours
    const coolingConsumption = system.coolingPower * (system.operatingHours * 0.5);
    const heatingConsumption = system.heatingPower * (system.operatingHours * 0.5);
    const annualConsumption = coolingConsumption + heatingConsumption;
    
    // Calculate annual energy cost
    const annualEnergyCost = annualConsumption * system.electricityCost;
    
    setResults({
      coolingEER: parseFloat(coolingEER.toFixed(2)),
      heatingCOP: parseFloat(heatingCOP.toFixed(2)),
      seer: parseFloat(seer.toFixed(2)),
      hspf: parseFloat(hspf.toFixed(2)),
      annualConsumption: parseFloat(annualConsumption.toFixed(0)),
      annualEnergyCost: parseFloat(annualEnergyCost.toFixed(2))
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Energy Efficiency Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cooling Capacity (kW)
          </label>
          <input
            type="number"
            step="0.1"
            value={system.coolingCapacity || ''}
            onChange={(e) => setSystem({ ...system, coolingCapacity: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heating Capacity (kW)
          </label>
          <input
            type="number"
            step="0.1"
            value={system.heatingCapacity || ''}
            onChange={(e) => setSystem({ ...system, heatingCapacity: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cooling Power Input (kW)
          </label>
          <input
            type="number"
            step="0.1"
            value={system.coolingPower || ''}
            onChange={(e) => setSystem({ ...system, coolingPower: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heating Power Input (kW)
          </label>
          <input
            type="number"
            step="0.1"
            value={system.heatingPower || ''}
            onChange={(e) => setSystem({ ...system, heatingPower: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Annual Operating Hours
          </label>
          <input
            type="number"
            value={system.operatingHours || ''}
            onChange={(e) => setSystem({ ...system, operatingHours: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Electricity Cost ($/kWh)
          </label>
          <input
            type="number"
            step="0.01"
            value={system.electricityCost || ''}
            onChange={(e) => setSystem({ ...system, electricityCost: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={calculateEfficiency}
          disabled={!system.coolingCapacity || !system.heatingCapacity || 
                   !system.coolingPower || !system.heatingPower || 
                   !system.operatingHours || !system.electricityCost}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Calculate
        </button>
      </div>
      
      {results && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Efficiency Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">EER (Cooling)</p>
              <p className="text-lg font-semibold">{results.coolingEER}</p>
              <p className="text-sm text-gray-500 mt-1">Btu/Wh</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">COP (Heating)</p>
              <p className="text-lg font-semibold">{results.heatingCOP}</p>
              <p className="text-sm text-gray-500 mt-1">kW/kW</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Estimated SEER</p>
              <p className="text-lg font-semibold">{results.seer}</p>
              <p className="text-sm text-gray-500 mt-1">Seasonal Rating</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Estimated HSPF</p>
              <p className="text-lg font-semibold">{results.hspf}</p>
              <p className="text-sm text-gray-500 mt-1">Seasonal Rating</p>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">Energy Consumption</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Annual Energy Consumption</p>
              <p className="text-lg font-semibold">{results.annualConsumption} kWh</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Annual Energy Cost</p>
              <p className="text-lg font-semibold">${results.annualEnergyCost}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Efficiency Ratings Guide</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>EER (Energy Efficiency Ratio): Higher values indicate better cooling efficiency</li>
              <li>COP (Coefficient of Performance): Higher values indicate better heating efficiency</li>
              <li>SEER (Seasonal Energy Efficiency Ratio): Used to rate cooling efficiency over a season</li>
              <li>HSPF (Heating Seasonal Performance Factor): Used to rate heating efficiency over a season</li>
              <li>Modern efficient systems typically have EER > 11, COP > 4, SEER > 16, HSPF > 8</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
