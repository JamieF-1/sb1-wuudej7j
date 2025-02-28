
import React, { useState } from 'react';

export default function EnergyEfficiency() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Energy Efficiency Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-medium text-yellow-800 mb-2">About This Tool</h3>
          <p className="text-yellow-700">
            Analyze energy usage and calculate potential savings through efficiency improvements.
            This tool helps optimize system performance and reduce operational costs while meeting energy standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Equipment Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Air Conditioning Unit</option>
                <option>Heat Pump</option>
                <option>Chiller</option>
                <option>Boiler</option>
                <option>Air Handler</option>
                <option>Package Unit</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Equipment age" />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">Current Performance</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Efficiency Rating</label>
                  <div className="flex items-center">
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                    <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                      <option>SEER</option>
                      <option>EER</option>
                      <option>COP</option>
                      <option>AFUE%</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Energy Use</label>
                  <div className="flex items-center">
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                    <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                      <option>kWh</option>
                      <option>therms</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Energy Cost</label>
                <div className="flex items-center">
                  <span className="border border-gray-300 bg-gray-50 px-3 py-2 rounded-l-md">$</span>
                  <input type="number" step="0.01" className="w-full border-y border-r border-gray-300 rounded-r-md px-3 py-2" placeholder="Cost per kWh/therm" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">Proposed Upgrade</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Efficiency Rating</label>
                  <div className="flex items-center">
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                    <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                      <option>SEER</option>
                      <option>EER</option>
                      <option>COP</option>
                      <option>AFUE%</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
                  <div className="flex items-center">
                    <span className="border border-gray-300 bg-gray-50 px-3 py-2 rounded-l-md">$</span>
                    <input type="number" className="w-full border-y border-r border-gray-300 rounded-r-md px-3 py-2" placeholder="Upgrade cost" />
                  </div>
                </div>
              </div>
              
              <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded w-full">
                Calculate Savings
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Energy Analysis Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              
              {/* Demo result structure */}
              <div className="hidden">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Annual Savings Potential</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Energy Reduction:</div>
                    <div>3,240 kWh (27%)</div>
                    
                    <div className="font-medium">Cost Savings:</div>
                    <div>$388.80 per year</div>
                    
                    <div className="font-medium">CO₂ Reduction:</div>
                    <div>2,290 kg per year</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-2">Financial Analysis</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Simple Payback:</div>
                    <div>6.4 years</div>
                    
                    <div className="font-medium">ROI (10-yr):</div>
                    <div>56%</div>
                    
                    <div className="font-medium">Lifetime Savings:</div>
                    <div>$5,832</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Energy Standards Reference</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                <p className="font-medium mb-2">Current Minimum Efficiency Standards:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Split AC: 14 SEER (ASHRAE 90.1-2019)</li>
                  <li>Heat Pumps: 15 SEER, 8.8 HSPF (2023 standards)</li>
                  <li>Chillers: Varies by type and size</li>
                  <li>Boilers: 84-90% AFUE (depending on size)</li>
                </ul>
                <p className="mt-4 text-gray-600">Efficiency requirements vary by region and are subject to change. Always consult current standards when specifying equipment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
