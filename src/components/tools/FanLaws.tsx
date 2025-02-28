
import React, { useState } from 'react';

export default function FanLaws() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Fan Laws Calculator</h2>
      
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 mb-2">About This Tool</h3>
          <p className="text-green-700">
            Calculate how changes in fan speed, diameter, or air density affect fan performance metrics 
            like airflow, pressure, and power consumption using the fan affinity laws.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Calculation Type</h3>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 bg-green-600 text-white rounded-md">Speed Change</button>
              <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md">Diameter Change</button>
              <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md">Density Change</button>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">Original Conditions</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speed (RPM)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter original speed" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Airflow</label>
                  <div className="flex items-center">
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                    <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                      <option>CFM</option>
                      <option>m³/s</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Static Pressure</label>
                  <div className="flex items-center">
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value" />
                    <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                      <option>in WC</option>
                      <option>Pa</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Power Consumption</label>
                  <div className="flex items-center">
                    <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter value (optional)" />
                    <select className="ml-2 border border-gray-300 rounded-md px-3 py-2">
                      <option>HP</option>
                      <option>kW</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">New Conditions</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Speed (RPM)</label>
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter new speed" />
              </div>
              
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded w-full">
                Calculate New Performance
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculated Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 italic">Results will appear here after calculation.</p>
              
              {/* Demo result structure */}
              <div className="hidden">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">New Performance Values</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">New Airflow:</div>
                    <div>1,500 CFM</div>
                    
                    <div className="font-medium">New Static Pressure:</div>
                    <div>1.44 in WC</div>
                    
                    <div className="font-medium">New Power:</div>
                    <div>1.95 HP</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-2">Percentage Changes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Speed Change:</div>
                    <div>+20%</div>
                    
                    <div className="font-medium">Airflow Change:</div>
                    <div>+20%</div>
                    
                    <div className="font-medium">Pressure Change:</div>
                    <div>+44%</div>
                    
                    <div className="font-medium">Power Change:</div>
                    <div>+73%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Fan Laws Reference</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                <p className="font-medium mb-2">Fan Affinity Laws:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Airflow ∝ Speed</li>
                  <li>Pressure ∝ Speed²</li>
                  <li>Power ∝ Speed³</li>
                  <li className="mt-2">Airflow ∝ Diameter³</li>
                  <li>Pressure ∝ Diameter²</li>
                  <li>Power ∝ Diameter⁵</li>
                </ul>
                <p className="mt-4 text-gray-600">These calculations assume no change in fan efficiency and that the system curve remains constant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
