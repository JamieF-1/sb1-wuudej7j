
import { useState } from 'react';
import { Zap, Calculator } from 'lucide-react';

export default function EnergyEfficiency() {
  const [formData, setFormData] = useState({
    systemType: 'cooling',
    capacity: 5,
    currentEER: 10,
    newEER: 16,
    hoursPerDay: 8,
    daysPerYear: 250,
    electricityRate: 0.15,
  });

  const [results, setResults] = useState({
    currentAnnualCost: 0,
    newAnnualCost: 0,
    annualSavings: 0,
    savingsPercentage: 0,
    co2Reduction: 0,
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setShowResults(false);
  };

  const calculateEfficiency = () => {
    // For cooling: kW = (Capacity in tons × 12,000) ÷ (EER × 1000)
    // For heating: kW = (Capacity in kBtu/h) ÷ (HSPF)

    let currentPowerConsumption = 0;
    let newPowerConsumption = 0;

    if (formData.systemType === 'cooling') {
      // Convert tons to kW based on EER
      currentPowerConsumption = (formData.capacity * 12000) / (formData.currentEER * 1000);
      newPowerConsumption = (formData.capacity * 12000) / (formData.newEER * 1000);
    } else {
      // Assume HSPF for heating (simplified)
      currentPowerConsumption = (formData.capacity * 3.412) / formData.currentEER;
      newPowerConsumption = (formData.capacity * 3.412) / formData.newEER;
    }

    // Calculate annual energy consumption in kWh
    const currentAnnualEnergy = currentPowerConsumption * formData.hoursPerDay * formData.daysPerYear;
    const newAnnualEnergy = newPowerConsumption * formData.hoursPerDay * formData.daysPerYear;

    // Calculate annual cost
    const currentAnnualCost = currentAnnualEnergy * formData.electricityRate;
    const newAnnualCost = newAnnualEnergy * formData.electricityRate;

    // Calculate savings
    const annualSavings = currentAnnualCost - newAnnualCost;
    const savingsPercentage = (annualSavings / currentAnnualCost) * 100;

    // Calculate CO2 reduction (average 0.85 lbs CO2 per kWh)
    const energySaved = currentAnnualEnergy - newAnnualEnergy;
    const co2Reduction = energySaved * 0.85 / 2.205; // Convert to kg

    setResults({
      currentAnnualCost,
      newAnnualCost,
      annualSavings,
      savingsPercentage,
      co2Reduction,
    });

    setShowResults(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Zap className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold">Energy Efficiency Calculator</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Calculate potential energy savings and return on investment when upgrading to more efficient HVAC equipment.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">System Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Type
              </label>
              <select
                value={formData.systemType}
                onChange={(e) => handleInputChange('systemType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="cooling">Cooling System</option>
                <option value="heating">Heating System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.systemType === 'cooling' ? 'Capacity (Tons)' : 'Capacity (kBtu/h)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.systemType === 'cooling' ? 'Current EER' : 'Current HSPF'}
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.currentEER}
                onChange={(e) => handleInputChange('currentEER', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.systemType === 'cooling' ? 'New EER' : 'New HSPF'}
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.newEER}
                onChange={(e) => handleInputChange('newEER', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Usage & Costs</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operating Hours Per Day
              </label>
              <input
                type="number"
                value={formData.hoursPerDay}
                onChange={(e) => handleInputChange('hoursPerDay', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operating Days Per Year
              </label>
              <input
                type="number"
                value={formData.daysPerYear}
                onChange={(e) => handleInputChange('daysPerYear', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Electricity Rate ($/kWh)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.electricityRate}
                onChange={(e) => handleInputChange('electricityRate', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="pt-4">
              <button
                onClick={calculateEfficiency}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Savings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showResults && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-green-800 mb-4">Energy Savings Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-gray-700 mb-2">Annual Savings</h4>
              <p className="text-2xl font-bold text-green-600">${results.annualSavings.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {results.savingsPercentage.toFixed(1)}% reduction in energy costs
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-gray-700 mb-2">Current vs New Cost</h4>
              <p className="text-lg font-medium text-red-500">${results.currentAnnualCost.toFixed(2)}/year</p>
              <p className="text-lg font-medium text-green-500">${results.newAnnualCost.toFixed(2)}/year</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-gray-700 mb-2">Environmental Impact</h4>
              <p className="text-lg font-medium text-green-600">{results.co2Reduction.toFixed(2)} kg CO2</p>
              <p className="text-sm text-gray-500 mt-1">
                Estimated annual reduction
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Typical Efficiency Ratings</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">System Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Standard</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">High-Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm">Air Conditioners (EER)</td>
                <td className="px-4 py-2 text-sm">8-11</td>
                <td className="px-4 py-2 text-sm">12-16+</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm">Heat Pumps (HSPF)</td>
                <td className="px-4 py-2 text-sm">7-8.5</td>
                <td className="px-4 py-2 text-sm">9-10+</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm">Furnaces (AFUE)</td>
                <td className="px-4 py-2 text-sm">80-83%</td>
                <td className="px-4 py-2 text-sm">90-98%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Energy-Saving Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Regular maintenance of equipment</li>
            <li>Clean or replace air filters monthly</li>
            <li>Seal ductwork to prevent leakage</li>
            <li>Install programmable thermostats</li>
            <li>Use economizers when appropriate</li>
            <li>Consider variable speed drives</li>
            <li>Implement proper building insulation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
