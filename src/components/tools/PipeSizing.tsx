
import React, { useState } from 'react';

export default function PipeSizing() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Pipe Sizing Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">About This Tool</h3>
          <p className="text-blue-700">
            Calculate appropriate pipe sizes based on flow rates, pressure drop, and fluid properties. 
            This tool follows industry standards for pipe sizing in HVAC and refrigeration systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Input Parameters</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fluid Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Water</option>
                <option>Glycol Solution (30%)</option>
                <option>Refrigerant R-410A</option>
                <option>Refrigerant R-134a</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flow Rate</label>
              <div className="flex items-center">
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>GPM</option>
                  <option>L/s</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Pressure Drop</label>
              <div className="flex items-center">
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>ft/100ft</option>
                  <option>psi/100ft</option>
                  <option>kPa/m</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pipe Material</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Copper Type L</option>
                <option>Steel Schedule 40</option>
                <option>PVC Schedule 40</option>
                <option>PEX</option>
              </select>
            </div>
            
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Calculate Pipe Size
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              
              {/* Demo result structure */}
              <div className="hidden">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="font-medium">Recommended Pipe Size:</div>
                  <div>1-1/2" (38mm)</div>
                  
                  <div className="font-medium">Velocity:</div>
                  <div>5.2 ft/s (1.6 m/s)</div>
                  
                  <div className="font-medium">Actual Pressure Drop:</div>
                  <div>2.4 ft/100ft (0.28 psi/100ft)</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Reference Standards</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>ASHRAE Handbooks</li>
                <li>International Mechanical Code</li>
                <li>Uniform Mechanical Code</li>
                <li>ASPE Data Book</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
