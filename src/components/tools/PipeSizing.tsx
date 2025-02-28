
import { useState } from 'react';
import { Ruler } from 'lucide-react';

export default function PipeSizing() {
  const [formData, setFormData] = useState({
    pipeType: 'copper',
    fluidType: 'water',
    flowRate: 10, // gallons per minute
    velocity: 4, // feet per second
    pressureDrop: 2.5, // feet of head per 100 ft
    calculationMethod: 'flowRate',
  });

  const [results, setResults] = useState({
    recommendedSize: '',
    velocity: 0,
    pressureDrop: 0,
    reynoldsNumber: 0,
    frictionFactor: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const calculatePipeSize = () => {
    // This is a simplified calculation for demonstration
    // In a real application, you would use more complex fluid dynamics formulas
    
    // Get pipe characteristics based on type
    const pipeCharacteristics = {
      copper: { roughness: 0.00005, sizes: [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4] },
      steel: { roughness: 0.0002, sizes: [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 6, 8] },
      pvc: { roughness: 0.000005, sizes: [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4, 6] },
    }[formData.pipeType as keyof typeof pipeCharacteristics];
    
    // Get fluid properties
    const fluidProperties = {
      water: { density: 62.4, viscosity: 0.000002 },
      refrigerant: { density: 75, viscosity: 0.0000025 },
      glycol: { density: 65, viscosity: 0.000005 },
    }[formData.fluidType as keyof typeof fluidProperties];
    
    // Calculate flow area needed based on flow rate and velocity
    // A = Q/V where A is area in ft², Q is flow rate in ft³/s, V is velocity in ft/s
    
    // Convert gpm to ft³/s
    const flowRateFtCuSec = formData.flowRate / 448.8;
    
    // Calculate required area in square feet
    const requiredArea = flowRateFtCuSec / formData.velocity;
    
    // Convert to square inches
    const requiredAreaSqIn = requiredArea * 144;
    
    // Calculate required diameter in inches
    const requiredDiameter = Math.sqrt((4 * requiredAreaSqIn) / Math.PI);
    
    // Find the next standard size up
    let recommendedSize = pipeCharacteristics.sizes[0];
    for (const size of pipeCharacteristics.sizes) {
      if (size >= requiredDiameter) {
        recommendedSize = size;
        break;
      }
    }
    
    // Calculate actual velocity with the recommended size
    const actualArea = (Math.PI * Math.pow(recommendedSize, 2)) / 4 / 144; // in ft²
    const actualVelocity = flowRateFtCuSec / actualArea;
    
    // Calculate Reynolds number
    // Re = ρVD/μ where ρ is density, V is velocity, D is diameter, μ is viscosity
    const reynoldsNumber = (fluidProperties.density * actualVelocity * (recommendedSize/12)) / fluidProperties.viscosity;
    
    // Calculate friction factor using Colebrook-White equation approximation
    // This is a simplified version
    const relativeRoughness = pipeCharacteristics.roughness / (recommendedSize/12);
    const frictionFactor = 0.25 / Math.pow(Math.log10(relativeRoughness/3.7 + 5.74/Math.pow(reynoldsNumber, 0.9)), 2);
    
    // Calculate pressure drop using Darcy-Weisbach equation
    // hf = fLV²/(2gD) where f is friction factor, L is length, V is velocity, g is gravity, D is diameter
    const pressureDrop = frictionFactor * 100 * Math.pow(actualVelocity, 2) / (2 * 32.2 * (recommendedSize/12));
    
    setResults({
      recommendedSize: `${recommendedSize} inch`,
      velocity: actualVelocity,
      pressureDrop: pressureDrop,
      reynoldsNumber: reynoldsNumber,
      frictionFactor: frictionFactor
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Ruler className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold">Pipe Sizing Calculator</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Calculate the recommended pipe size based on flow rate, velocity, and pressure drop requirements.
        This tool helps ensure proper hydraulic performance in HVAC and plumbing systems.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">System Parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pipe Material
              </label>
              <select
                value={formData.pipeType}
                onChange={(e) => handleInputChange('pipeType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="copper">Copper</option>
                <option value="steel">Steel</option>
                <option value="pvc">PVC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fluid Type
              </label>
              <select
                value={formData.fluidType}
                onChange={(e) => handleInputChange('fluidType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="water">Water</option>
                <option value="refrigerant">Refrigerant</option>
                <option value="glycol">Glycol (40%)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calculation Method
              </label>
              <select
                value={formData.calculationMethod}
                onChange={(e) => handleInputChange('calculationMethod', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="flowRate">Flow Rate & Velocity</option>
                <option value="pressureDrop">Flow Rate & Pressure Drop</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flow Rate (GPM)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.flowRate}
                onChange={(e) => handleInputChange('flowRate', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            {formData.calculationMethod === 'flowRate' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Velocity (ft/s)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.velocity}
                  onChange={(e) => handleInputChange('velocity', parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Pressure Drop (ft of head per 100 ft)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.pressureDrop}
                  onChange={(e) => handleInputChange('pressureDrop', parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            )}
            
            <div className="pt-4">
              <button
                onClick={calculatePipeSize}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Calculate Pipe Size
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Results</h3>
          
          {results.recommendedSize ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Recommended Pipe Size</h4>
                <p className="text-2xl font-bold text-blue-600">{results.recommendedSize}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Velocity</h4>
                  <p className="text-lg font-semibold">{results.velocity.toFixed(2)} ft/s</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Pressure Drop</h4>
                  <p className="text-lg font-semibold">{results.pressureDrop.toFixed(2)} ft/100ft</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Reynolds Number</h4>
                  <p className="text-lg font-semibold">{Math.round(results.reynoldsNumber).toLocaleString()}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Friction Factor</h4>
                  <p className="text-lg font-semibold">{results.frictionFactor.toFixed(4)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <p className="text-gray-500 text-center mb-4">Enter system parameters and click Calculate</p>
              <div className="text-blue-500">
                <Ruler className="h-12 w-12 opacity-30" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Recommended Design Velocities</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Application</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Velocity Range</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">Pump Suction Lines</td>
                <td className="px-4 py-2">2-4 ft/s</td>
                <td className="px-4 py-2">Lower velocities to prevent cavitation</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">Pump Discharge Lines</td>
                <td className="px-4 py-2">4-8 ft/s</td>
                <td className="px-4 py-2">Balance between size and pressure drop</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">Chilled Water Lines</td>
                <td className="px-4 py-2">3-8 ft/s</td>
                <td className="px-4 py-2">4 ft/s typical for primary loops</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">Heating Water Lines</td>
                <td className="px-4 py-2">3-10 ft/s</td>
                <td className="px-4 py-2">Higher velocities acceptable for hot water</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">Steam Lines (Low Pressure)</td>
                <td className="px-4 py-2">30-80 ft/s</td>
                <td className="px-4 py-2">Higher velocities for steam service</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">Refrigerant Liquid Lines</td>
                <td className="px-4 py-2">4-8 ft/s</td>
                <td className="px-4 py-2">Keep velocity below 10 ft/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
