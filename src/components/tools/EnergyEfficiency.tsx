
import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface EnergyData {
  systemType: string;
  coolingCapacity: number;
  heatingCapacity: number;
  coolingPower: number;
  heatingPower: number;
  annualCoolingHours: number;
  annualHeatingHours: number;
  electricityRate: number;
  coolingEER: number | null;
  heatingCOP: number | null;
  annualEnergyCost: number | null;
}

export default function EnergyEfficiency() {
  const [data, setData] = useState<EnergyData>({
    systemType: 'split',
    coolingCapacity: 5,   // kW
    heatingCapacity: 5.5, // kW
    coolingPower: 1.5,    // kW
    heatingPower: 1.6,    // kW
    annualCoolingHours: 1000,
    annualHeatingHours: 1500,
    electricityRate: 0.20, // £/kWh
    coolingEER: null,
    heatingCOP: null,
    annualEnergyCost: null
  });

  const calculateEfficiency = () => {
    // EER = Cooling Capacity (kW) / Power Input (kW)
    const eer = data.coolingCapacity / data.coolingPower;
    
    // COP = Heating Capacity (kW) / Power Input (kW)
    const cop = data.heatingCapacity / data.heatingPower;
    
    // Annual energy consumption
    const annualCoolingEnergy = data.coolingPower * data.annualCoolingHours;
    const annualHeatingEnergy = data.heatingPower * data.annualHeatingHours;
    const totalAnnualEnergy = annualCoolingEnergy + annualHeatingEnergy;
    
    // Annual energy cost
    const annualCost = totalAnnualEnergy * data.electricityRate;
    
    setData({
      ...data,
      coolingEER: parseFloat(eer.toFixed(2)),
      heatingCOP: parseFloat(cop.toFixed(2)),
      annualEnergyCost: parseFloat(annualCost.toFixed(2))
    });
  };

  const getEfficiencyRating = (value: number | null, type: 'eer' | 'cop') => {
    if (value === null) return { rating: '', color: '' };
    
    if (type === 'eer') {
      if (value >= 4.1) return { rating: 'A+++', color: 'bg-green-500' };
      if (value >= 3.6) return { rating: 'A++', color: 'bg-green-400' };
      if (value >= 3.1) return { rating: 'A+', color: 'bg-green-300' };
      if (value >= 2.6) return { rating: 'A', color: 'bg-green-200' };
      if (value >= 2.1) return { rating: 'B', color: 'bg-yellow-200' };
      if (value >= 1.8) return { rating: 'C', color: 'bg-yellow-300' };
      return { rating: 'D', color: 'bg-red-300' };
    } else {
      if (value >= 4.6) return { rating: 'A+++', color: 'bg-green-500' };
      if (value >= 4.0) return { rating: 'A++', color: 'bg-green-400' };
      if (value >= 3.4) return { rating: 'A+', color: 'bg-green-300' };
      if (value >= 2.8) return { rating: 'A', color: 'bg-green-200' };
      if (value >= 2.2) return { rating: 'B', color: 'bg-yellow-200' };
      if (value >= 1.8) return { rating: 'C', color: 'bg-yellow-300' };
      return { rating: 'D', color: 'bg-red-300' };
    }
  };
  
  const eerRating = getEfficiencyRating(data.coolingEER, 'eer');
  const copRating = getEfficiencyRating(data.heatingCOP, 'cop');

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Zap className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Energy Efficiency Calculator</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Type
              </label>
              <select
                value={data.systemType}
                onChange={(e) => setData({...data, systemType: e.target.value})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="split">Split System</option>
                <option value="vrf">VRF/VRV System</option>
                <option value="rooftop">Rooftop Unit</option>
                <option value="chiller">Chiller System</option>
              </select>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cooling Capacity (kW)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={data.coolingCapacity || ''}
                  onChange={(e) => setData({...data, coolingCapacity: parseFloat(e.target.value) || 0})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cooling Power Input (kW)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={data.coolingPower || ''}
                  onChange={(e) => setData({...data, coolingPower: parseFloat(e.target.value) || 0})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heating Capacity (kW)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={data.heatingCapacity || ''}
                  onChange={(e) => setData({...data, heatingCapacity: parseFloat(e.target.value) || 0})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heating Power Input (kW)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={data.heatingPower || ''}
                  onChange={(e) => setData({...data, heatingPower: parseFloat(e.target.value) || 0})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Usage & Cost</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Cooling Hours
              </label>
              <input
                type="number"
                value={data.annualCoolingHours || ''}
                onChange={(e) => setData({...data, annualCoolingHours: parseInt(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Heating Hours
              </label>
              <input
                type="number"
                value={data.annualHeatingHours || ''}
                onChange={(e) => setData({...data, annualHeatingHours: parseInt(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Electricity Rate (£/kWh)
              </label>
              <input
                type="number"
                step="0.01"
                value={data.electricityRate || ''}
                onChange={(e) => setData({...data, electricityRate: parseFloat(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <button
            onClick={calculateEfficiency}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Efficiency
          </button>
        </div>
        
        {data.coolingEER !== null && data.heatingCOP !== null && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Efficiency Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Cooling Efficiency (EER)</h3>
                    <p className="text-3xl font-bold text-blue-600">{data.coolingEER}</p>
                    <p className="text-sm text-gray-500 mt-1">Energy Efficiency Ratio</p>
                  </div>
                  <div className={`text-center ${eerRating.color} text-white rounded-full w-12 h-12 flex items-center justify-center`}>
                    <span className="font-bold text-sm">{eerRating.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Heating Efficiency (COP)</h3>
                    <p className="text-3xl font-bold text-red-600">{data.heatingCOP}</p>
                    <p className="text-sm text-gray-500 mt-1">Coefficient of Performance</p>
                  </div>
                  <div className={`text-center ${copRating.color} text-white rounded-full w-12 h-12 flex items-center justify-center`}>
                    <span className="font-bold text-sm">{copRating.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-2">Annual Energy Cost</h3>
                <p className="text-3xl font-bold text-gray-900">£{data.annualEnergyCost}</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Annual Cooling Energy:</p>
                    <p className="font-medium">{data.coolingPower * data.annualCoolingHours} kWh</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Heating Energy:</p>
                    <p className="font-medium">{data.heatingPower * data.annualHeatingHours} kWh</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 mb-2">Seasonal Efficiency</h3>
              <p className="text-sm text-gray-600 mb-4">
                The values above reflect nominal efficiency. For a more accurate assessment, consider seasonal efficiency metrics (SEER for cooling and SCOP for heating) which account for variable operating conditions throughout the year.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="border border-gray-200 rounded-md p-3">
                  <h4 className="font-medium">Improving System Efficiency:</h4>
                  <ul className="list-disc list-inside mt-1 text-gray-600 space-y-1">
                    <li>Regular maintenance and filter cleaning</li>
                    <li>Optimal temperature setpoints (24-26°C cooling, 19-21°C heating)</li>
                    <li>Night setback and scheduling</li>
                    <li>Proper insulation of ductwork and pipework</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-md p-3">
                  <h4 className="font-medium">Efficiency Rating Scales:</h4>
                  <ul className="list-disc list-inside mt-1 text-gray-600 space-y-1">
                    <li>A+++ to D (highest to lowest efficiency)</li>
                    <li>Higher EER/COP values indicate better efficiency</li>
                    <li>UK minimum standards require at least class C</li>
                    <li>Modern high-efficiency systems typically achieve A+ or better</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
