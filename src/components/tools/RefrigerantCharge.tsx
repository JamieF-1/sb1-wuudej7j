
import { useState } from 'react';
import { Thermometer, Calculator } from 'lucide-react';

export default function RefrigerantCharge() {
  const [formData, setFormData] = useState({
    refrigerantType: 'r410a',
    systemType: 'split',
    lineSet: 25, // feet
    liquidLineSize: 0.375, // inches
    evaporatorCapacity: 3, // tons
    additionalComponents: {
      receiver: false,
      filter: false,
      sightGlass: false,
      economizer: false
    }
  });

  const [results, setResults] = useState({
    baseCharge: 0,
    lineSetCharge: 0,
    componentCharge: 0,
    totalCharge: 0,
    co2Equivalent: 0
  });

  const [showResults, setShowResults] = useState(false);

  const refrigerantData = {
    r410a: { density: 0.065, gwp: 2088 }, // lb/ft³, Global Warming Potential
    r32: { density: 0.058, gwp: 675 },
    r134a: { density: 0.081, gwp: 1430 },
    r407c: { density: 0.071, gwp: 1774 },
    r404a: { density: 0.068, gwp: 3922 }
  };

  const systemBaseCharge = {
    split: 0.25, // lb per ton
    packaged: 0.15, // lb per ton
    minisplit: 0.2, // lb per ton
    vrf: 0.3 // lb per ton
  };

  const liquidLineCharge = {
    0.25: 0.023, // lb per ft
    0.375: 0.038, // lb per ft
    0.5: 0.065, // lb per ft
    0.625: 0.094, // lb per ft
    0.75: 0.14, // lb per ft
    0.875: 0.185, // lb per ft
    1.125: 0.3 // lb per ft
  };

  const componentAdditionalCharge = {
    receiver: 1.2, // lb
    filter: 0.1, // lb
    sightGlass: 0.05, // lb
    economizer: 0.8 // lb
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
    setShowResults(false);
  };

  const handleCheckboxChange = (component: string) => {
    setFormData({
      ...formData,
      additionalComponents: {
        ...formData.additionalComponents,
        [component]: !formData.additionalComponents[component as keyof typeof formData.additionalComponents]
      }
    });
    setShowResults(false);
  };

  const calculateCharge = () => {
    // Calculate base charge based on system type and capacity
    const baseCharge = systemBaseCharge[formData.systemType as keyof typeof systemBaseCharge] * formData.evaporatorCapacity;
    
    // Calculate line set charge based on liquid line size and length
    const lineSetCharge = liquidLineCharge[formData.liquidLineSize as keyof typeof liquidLineCharge] * formData.lineSet;
    
    // Calculate additional components charge
    let componentCharge = 0;
    Object.entries(formData.additionalComponents).forEach(([component, isIncluded]) => {
      if (isIncluded) {
        componentCharge += componentAdditionalCharge[component as keyof typeof componentAdditionalCharge];
      }
    });
    
    // Calculate total charge
    const totalCharge = baseCharge + lineSetCharge + componentCharge;
    
    // Calculate CO2 equivalent
    const co2Equivalent = totalCharge * refrigerantData[formData.refrigerantType as keyof typeof refrigerantData].gwp / 1000; // in metric tons of CO2
    
    setResults({
      baseCharge,
      lineSetCharge,
      componentCharge,
      totalCharge,
      co2Equivalent
    });
    
    setShowResults(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Thermometer className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold">Refrigerant Charge Calculator</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Calculate the required refrigerant charge for different HVAC systems based on system type, 
        line set length, and additional components.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">System Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refrigerant Type
              </label>
              <select
                value={formData.refrigerantType}
                onChange={(e) => handleInputChange('refrigerantType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="r410a">R-410A</option>
                <option value="r32">R-32</option>
                <option value="r134a">R-134a</option>
                <option value="r407c">R-407C</option>
                <option value="r404a">R-404A</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Type
              </label>
              <select
                value={formData.systemType}
                onChange={(e) => handleInputChange('systemType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="split">Split System</option>
                <option value="packaged">Packaged Unit</option>
                <option value="minisplit">Mini-Split</option>
                <option value="vrf">VRF/VRV System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Capacity (Tons)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.evaporatorCapacity}
                onChange={(e) => handleInputChange('evaporatorCapacity', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Line Set Length (ft)
              </label>
              <input
                type="number"
                value={formData.lineSet}
                onChange={(e) => handleInputChange('lineSet', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Liquid Line Size (inches)
              </label>
              <select
                value={formData.liquidLineSize}
                onChange={(e) => handleInputChange('liquidLineSize', parseFloat(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="0.25">1/4"</option>
                <option value="0.375">3/8"</option>
                <option value="0.5">1/2"</option>
                <option value="0.625">5/8"</option>
                <option value="0.75">3/4"</option>
                <option value="0.875">7/8"</option>
                <option value="1.125">1-1/8"</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Components
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="receiver"
                    checked={formData.additionalComponents.receiver}
                    onChange={() => handleCheckboxChange('receiver')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="receiver" className="ml-2 text-sm text-gray-700">
                    Receiver
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="filter"
                    checked={formData.additionalComponents.filter}
                    onChange={() => handleCheckboxChange('filter')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="filter" className="ml-2 text-sm text-gray-700">
                    Filter Drier
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sightGlass"
                    checked={formData.additionalComponents.sightGlass}
                    onChange={() => handleCheckboxChange('sightGlass')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="sightGlass" className="ml-2 text-sm text-gray-700">
                    Sight Glass
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="economizer"
                    checked={formData.additionalComponents.economizer}
                    onChange={() => handleCheckboxChange('economizer')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="economizer" className="ml-2 text-sm text-gray-700">
                    Economizer
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={calculateCharge}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Charge
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Charge Results</h3>
          
          {showResults ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Total Required Charge</h4>
                <p className="text-3xl font-bold text-blue-700">{results.totalCharge.toFixed(2)} lbs</p>
                <p className="text-sm text-blue-600 mt-1">
                  ({(results.totalCharge * 16).toFixed(2)} oz)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Base System Charge</h4>
                    <p className="text-lg font-semibold">{results.baseCharge.toFixed(2)} lbs</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Line Set Charge</h4>
                    <p className="text-lg font-semibold">{results.lineSetCharge.toFixed(2)} lbs</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Component Charge</h4>
                    <p className="text-lg font-semibold">{results.componentCharge.toFixed(2)} lbs</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">CO2 Equivalent</h4>
                    <p className="text-lg font-semibold">{results.co2Equivalent.toFixed(2)} tonnes</p>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                    <li>This is an estimation. Always verify with manufacturer specifications.</li>
                    <li>For VRF systems, consult manufacturer software for precise calculations.</li>
                    <li>Consider adding 5-10% extra for system variations.</li>
                    <li>Vertical risers may require additional charge adjustments.</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <p className="text-gray-500 text-center mb-4">Enter system parameters and click Calculate</p>
              <div className="text-blue-500">
                <Thermometer className="h-12 w-12 opacity-30" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Refrigerant Information</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Refrigerant</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Common Applications</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">GWP</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">R-410A</td>
                <td className="px-4 py-2">Residential/commercial AC, heat pumps</td>
                <td className="px-4 py-2">2,088</td>
                <td className="px-4 py-2">Being phased down</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">R-32</td>
                <td className="px-4 py-2">Newer residential AC, heat pumps</td>
                <td className="px-4 py-2">675</td>
                <td className="px-4 py-2">Current alternative</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">R-134a</td>
                <td className="px-4 py-2">Chillers, automotive AC</td>
                <td className="px-4 py-2">1,430</td>
                <td className="px-4 py-2">Being phased down</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">R-407C</td>
                <td className="px-4 py-2">Commercial AC, retrofits</td>
                <td className="px-4 py-2">1,774</td>
                <td className="px-4 py-2">Transitional blend</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-2">R-404A</td>
                <td className="px-4 py-2">Commercial refrigeration</td>
                <td className="px-4 py-2">3,922</td>
                <td className="px-4 py-2">Being phased out</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
