
import React, { useState } from 'react';

export default function RefrigerantCharge() {
  const [systemType, setSystemType] = useState('split');
  const [refrigerantType, setRefrigerantType] = useState('R410A');
  const [lineLength, setLineLength] = useState('');
  const [lineDiameter, setLineDiameter] = useState('');
  const [capacity, setCapacity] = useState('');
  const [calculatedCharge, setCalculatedCharge] = useState<string | null>(null);

  // Simplified calculation function
  const calculateCharge = () => {
    if (!lineLength || !lineDiameter || !capacity) return;
    
    const length = parseFloat(lineLength);
    const diameter = parseFloat(lineDiameter);
    const tons = parseFloat(capacity);
    
    let baseCharge = 0;
    let additionalCharge = 0;
    
    // These calculations are simplified for demonstration
    // Real calculations would be more complex and based on manufacturer specs
    
    if (systemType === 'split') {
      if (refrigerantType === 'R410A') {
        baseCharge = tons * 2.5; // lbs per ton (approximate)
        additionalCharge = length * 0.6 * (diameter / 8); // Additional oz per foot
      } else if (refrigerantType === 'R32') {
        baseCharge = tons * 2.2;
        additionalCharge = length * 0.5 * (diameter / 8);
      } else if (refrigerantType === 'R22') {
        baseCharge = tons * 2.8;
        additionalCharge = length * 0.7 * (diameter / 8);
      }
    } else if (systemType === 'packaged') {
      if (refrigerantType === 'R410A') {
        baseCharge = tons * 3.0;
        additionalCharge = 0; // Already pre-charged
      } else if (refrigerantType === 'R32') {
        baseCharge = tons * 2.7;
        additionalCharge = 0;
      } else if (refrigerantType === 'R22') {
        baseCharge = tons * 3.2;
        additionalCharge = 0;
      }
    }
    
    const totalChargeOz = (baseCharge * 16) + additionalCharge;
    const totalChargeLbs = totalChargeOz / 16;
    
    setCalculatedCharge(totalChargeLbs.toFixed(2));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Refrigerant Charge Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-cyan-50 p-4 rounded-lg">
          <h3 className="font-medium text-cyan-800 mb-2">About This Tool</h3>
          <p className="text-cyan-700">
            Calculate the correct refrigerant charge for HVAC systems based on system type, 
            refrigerant type, line length, and capacity. Proper refrigerant charge is critical 
            for system efficiency, performance, and longevity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Type</label>
              <select 
                value={systemType} 
                onChange={(e) => setSystemType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="split">Split System</option>
                <option value="packaged">Packaged Unit</option>
                <option value="mini-split">Mini-Split</option>
                <option value="vrf">VRF/VRV System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Refrigerant Type</label>
              <select 
                value={refrigerantType} 
                onChange={(e) => setRefrigerantType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="R410A">R-410A</option>
                <option value="R32">R-32</option>
                <option value="R22">R-22 (Legacy)</option>
                <option value="R134a">R-134a</option>
                <option value="R407C">R-407C</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Capacity</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter capacity"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>Tons</option>
                  <option>kW</option>
                  <option>BTU/h</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Refrigerant Line Length</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={lineLength} 
                  onChange={(e) => setLineLength(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter length"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>feet</option>
                  <option>meters</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Liquid Line Diameter</label>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={lineDiameter} 
                  onChange={(e) => setLineDiameter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2" 
                  placeholder="Enter diameter"
                />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>inches</option>
                  <option>mm</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={calculateCharge} 
              className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded"
            >
              Calculate Charge
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Charge Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {!calculatedCharge ? (
                <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Recommended Charge:</span>
                    <span className="text-cyan-600 font-semibold">{calculatedCharge} lbs</span>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-yellow-700 text-sm">
                      <strong>Note:</strong> This is an estimate only. Always refer to manufacturer 
                      specifications and adjust based on system subcooling/superheat measurements.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Regulations & Compliance</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>EPA Section 608 Refrigerant Management Regulations</li>
                <li>F-Gas Regulations (EU)</li>
                <li>Montreal Protocol</li>
                <li>Kigali Amendment</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Verify charge using subcooling method for TXV systems</li>
                <li>Use superheat method for fixed orifice systems</li>
                <li>Consider ambient temperature effects on charge calculations</li>
                <li>Record charge amount on equipment nameplate</li>
                <li>Recover refrigerant when servicing systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
