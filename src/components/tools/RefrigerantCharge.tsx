
import React, { useState } from 'react';

export default function RefrigerantCharge() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Refrigerant Charge Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">About This Tool</h3>
          <p className="text-blue-700">
            Determine appropriate refrigerant charge for various HVAC and refrigeration systems. 
            This tool helps ensure optimal system performance and compliance with manufacturer specifications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Refrigerant Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>R-410A</option>
                <option>R-134a</option>
                <option>R-22 (Legacy)</option>
                <option>R-32</option>
                <option>R-407C</option>
                <option>R-404A</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Split System Air Conditioner</option>
                <option>Package Unit</option>
                <option>Mini-Split System</option>
                <option>VRF/VRV System</option>
                <option>Refrigeration System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Capacity</label>
              <div className="flex items-center">
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>Tons</option>
                  <option>kW</option>
                  <option>BTU/h</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Line Set Length</label>
              <div className="flex items-center">
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>Feet</option>
                  <option>Meters</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Line Sizes</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Liquid Line</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>1/4"</option>
                    <option>3/8"</option>
                    <option>1/2"</option>
                    <option>5/8"</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Suction Line</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>5/8"</option>
                    <option>3/4"</option>
                    <option>7/8"</option>
                    <option>1-1/8"</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Calculate Charge
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Charge Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              
              {/* Demo result structure */}
              <div className="hidden">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="font-medium">Base System Charge:</div>
                  <div>6.2 lbs (2.8 kg)</div>
                  
                  <div className="font-medium">Additional Line Set Charge:</div>
                  <div>0.8 lbs (0.36 kg)</div>
                  
                  <div className="font-medium">Total Required Charge:</div>
                  <div className="font-bold">7.0 lbs (3.16 kg)</div>
                </div>
                
                <div className="mt-4 text-sm text-gray-700">
                  <p className="font-medium">Recommended Charging Method:</p>
                  <p className="mt-1">Subcooling method - Measure liquid line temperature and pressure to verify 
                  proper subcooling (10°F ± 2°F) at operating conditions.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Reference Guidelines</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>EPA Regulations (Section 608)</li>
                <li>Manufacturer Specifications</li>
                <li>ASHRAE Guidelines</li>
                <li>Industry Best Practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
