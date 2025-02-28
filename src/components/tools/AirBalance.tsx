
import React, { useState } from 'react';

export default function AirBalance() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Air Balance Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">About This Tool</h3>
          <p className="text-green-700">
            Calculate airflow requirements, measure system performance, and balance air distribution systems.
            This tool helps ensure proper ventilation and comfort in accordance with industry standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Parameters</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Constant Volume</option>
                <option>Variable Air Volume (VAV)</option>
                <option>Dedicated Outdoor Air System (DOAS)</option>
                <option>Single Zone</option>
                <option>Multi-Zone</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total System Airflow</label>
              <div className="flex items-center">
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                  <option>CFM</option>
                  <option>L/s</option>
                  <option>m³/h</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Outlets/Terminals</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Deviation (%)</label>
              <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="10" />
            </div>
            
            <h3 className="text-lg font-semibold mt-6">Terminal/Diffuser Flow Distribution</h3>
            
            <div className="border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Terminal Airflows</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">+ Add Terminal</button>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-2 items-center">
                  <span className="text-xs text-gray-500 col-span-1">#1</span>
                  <div className="col-span-3">
                    <input type="text" placeholder="Location/Name" className="w-full text-sm border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" placeholder="CFM" className="w-full text-sm border border-gray-300 rounded px-2 py-1" />
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2 items-center">
                  <span className="text-xs text-gray-500 col-span-1">#2</span>
                  <div className="col-span-3">
                    <input type="text" placeholder="Location/Name" className="w-full text-sm border border-gray-300 rounded px-2 py-1" />
                  </div>
                  <div className="col-span-2">
                    <input type="number" placeholder="CFM" className="w-full text-sm border border-gray-300 rounded px-2 py-1" />
                  </div>
                </div>
              </div>
            </div>
            
            <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
              Calculate Balance
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Balance Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              
              {/* Demo result structure */}
              <div className="hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">System Balance Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Within Tolerance</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="font-medium">Total Measured Flow:</div>
                  <div>1,250 CFM</div>
                  
                  <div className="font-medium">Design Flow:</div>
                  <div>1,200 CFM</div>
                  
                  <div className="font-medium">Deviation:</div>
                  <div>+4.2%</div>
                </div>
                
                <h4 className="font-medium mt-4 mb-2">Terminal Balance Status</h4>
                <div className="border-t border-gray-200 pt-2">
                  <div className="text-sm grid grid-cols-5 gap-1 font-medium text-gray-700 mb-1">
                    <div>Terminal</div>
                    <div>Design</div>
                    <div>Actual</div>
                    <div>Dev %</div>
                    <div>Status</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Industry Standards</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>ASHRAE Standard 111</li>
                <li>NEBB Procedural Standards</li>
                <li>ACCA Manual B</li>
                <li>SMACNA HVAC Systems Testing, Adjusting & Balancing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
