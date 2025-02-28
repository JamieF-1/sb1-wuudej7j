
import React, { useState } from 'react';

export default function EnergyEfficiency() {
  const [equipmentType, setEquipmentType] = useState('hvac');
  const [currentEfficiency, setCurrentEfficiency] = useState('');
  const [proposedEfficiency, setProposedEfficiency] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [energyRate, setEnergyRate] = useState('');
  const [capacity, setCapacity] = useState('');
  
  const [annualSavings, setAnnualSavings] = useState<string | null>(null);
  const [paybackPeriod, setPaybackPeriod] = useState<string | null>(null);
  const [co2Reduction, setCo2Reduction] = useState<string | null>(null);

  const calculateEfficiency = () => {
    if (!currentEfficiency || !proposedEfficiency || !operatingHours || !energyRate || !capacity) return;
    
    const current = parseFloat(currentEfficiency);
    const proposed = parseFloat(proposedEfficiency);
    const hours = parseFloat(operatingHours);
    const rate = parseFloat(energyRate);
    const cap = parseFloat(capacity);
    
    let currentConsumption = 0;
    let proposedConsumption = 0;
    let installationCost = 0;
    
    // Different calculation methods based on equipment type
    if (equipmentType === 'hvac') {
      // For HVAC, higher efficiency means lower consumption
      // SEER or COP based calculation (simplified)
      currentConsumption = (cap * hours) / current;
      proposedConsumption = (cap * hours) / proposed;
      installationCost = cap * 500; // Rough estimate: $500 per ton
    } 
    else if (equipmentType === 'lighting') {
      // For lighting, use wattage directly
      currentConsumption = (cap * current * hours) / 1000; // kWh
      proposedConsumption = (cap * proposed * hours) / 1000; // kWh
      installationCost = cap * 25; // Rough estimate: $25 per fixture
    }
    else if (equipmentType === 'motors') {
      // For motors, use efficiency percentage
      currentConsumption = (cap * hours * (100 / current)) / 100;
      proposedConsumption = (cap * hours * (100 / proposed)) / 100;
      installationCost = cap * 100; // Rough estimate: $100 per HP
    }
    
    // Calculate savings
    const energySavings = currentConsumption - proposedConsumption;
    const costSavings = energySavings * rate;
    const payback = installationCost / costSavings;
    
    // CO2 reduction (using average 0.85 lbs CO2 per kWh)
    const carbonReduction = energySavings * 0.85 / 2000; // tons of CO2
    
    setAnnualSavings(costSavings.toFixed(2));
    setPaybackPeriod(payback.toFixed(2));
    setCo2Reduction(carbonReduction.toFixed(2));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Energy Efficiency Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-medium text-emerald-800 mb-2">About This Tool</h3>
          <p className="text-emerald-700">
            Calculate potential energy savings, cost benefits, and environmental impact 
            of upgrading to more efficient equipment. This tool helps make the business 
            case for energy efficiency investments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Equipment Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
              <select 
                value={equipmentType} 
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="hvac">HVAC System</option>
                <option value="lighting">Lighting</option>
                <option value="motors">Motors</option>
                <option value="boilers">Boilers</option>
                <option value="chillers">Chillers</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {equipmentType === 'hvac' ? 'Current Efficiency (SEER/COP)' : 
                 equipmentType === 'lighting' ? 'Current Wattage per Fixture' :
                 equipmentType === 'motors' ? 'Current Efficiency (%)' :
                 'Current Efficiency'}
              </label>
              <input 
                type="number" 
                value={currentEfficiency} 
                onChange={(e) => setCurrentEfficiency(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder={`Enter current ${equipmentType === 'lighting' ? 'wattage' : 'efficiency'}`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {equipmentType === 'hvac' ? 'Proposed Efficiency (SEER/COP)' : 
                 equipmentType === 'lighting' ? 'Proposed Wattage per Fixture' :
                 equipmentType === 'motors' ? 'Proposed Efficiency (%)' :
                 'Proposed Efficiency'}
              </label>
              <input 
                type="number" 
                value={proposedEfficiency} 
                onChange={(e) => setProposedEfficiency(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder={`Enter proposed ${equipmentType === 'lighting' ? 'wattage' : 'efficiency'}`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {equipmentType === 'hvac' ? 'System Capacity (Tons)' : 
                 equipmentType === 'lighting' ? 'Number of Fixtures' :
                 equipmentType === 'motors' ? 'Motor Size (HP)' :
                 'System Capacity'}
              </label>
              <input 
                type="number" 
                value={capacity} 
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder={`Enter ${equipmentType === 'lighting' ? 'number of fixtures' : 'capacity'}`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Operating Hours</label>
              <input 
                type="number" 
                value={operatingHours} 
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                placeholder="Enter hours per year"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Energy Rate</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={energyRate} 
                  onChange={(e) => setEnergyRate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter energy rate"
                />
                <span className="ml-2 text-gray-500">$/kWh</span>
              </div>
            </div>
            
            <button 
              onClick={calculateEfficiency} 
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded"
            >
              Calculate Savings
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {!annualSavings ? (
                <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Annual Cost Savings:</span>
                    <span className="text-emerald-600 font-semibold">${annualSavings}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Simple Payback Period:</span>
                    <span className="text-emerald-600 font-semibold">{paybackPeriod} years</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Annual CO₂ Reduction:</span>
                    <span className="text-emerald-600 font-semibold">{co2Reduction} tons</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Efficiency Standards</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>ASHRAE 90.1 Energy Standard</li>
                <li>DOE Minimum Efficiency Standards</li>
                <li>Energy Star Certification Requirements</li>
                <li>IECC (International Energy Conservation Code)</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Additional Benefits</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Improved comfort and indoor air quality</li>
                <li>Reduced maintenance costs</li>
                <li>Extended equipment life</li>
                <li>Potential utility rebates and tax incentives</li>
                <li>Enhanced building value and ESG performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
