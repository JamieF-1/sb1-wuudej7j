
import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';

interface RefrigerantData {
  refrigerantType: string;
  pipeLength: number;
  liquidLineSize: number;
  suctionLineSize: number;
  indoorUnits: number;
  baseCharge: number;
  totalCharge: number | null;
}

export default function RefrigerantCharge() {
  const [data, setData] = useState<RefrigerantData>({
    refrigerantType: 'R410A',
    pipeLength: 0,
    liquidLineSize: 9.52, // mm
    suctionLineSize: 15.88, // mm
    indoorUnits: 1,
    baseCharge: 0,
    totalCharge: null
  });

  const calculateCharge = () => {
    // Simplified refrigerant charge calculation
    let liquidLineChargeFactor = 0;
    
    // Liquid line charge factors (g/m) based on diameter
    if (data.liquidLineSize === 6.35) liquidLineChargeFactor = 22; // 1/4"
    else if (data.liquidLineSize === 9.52) liquidLineChargeFactor = 50; // 3/8"
    else if (data.liquidLineSize === 12.7) liquidLineChargeFactor = 90; // 1/2"
    else if (data.liquidLineSize === 15.88) liquidLineChargeFactor = 140; // 5/8"
    
    // Simple calculation: base charge + (pipe length * charge factor)
    const pipeCharge = data.pipeLength * liquidLineChargeFactor;
    const indoorUnitExtra = (data.indoorUnits - 1) * 200; // Assume 200g per additional indoor unit
    const totalCharge = data.baseCharge + pipeCharge + indoorUnitExtra;
    
    setData({
      ...data,
      totalCharge: parseFloat((totalCharge / 1000).toFixed(2)) // Convert to kg and round to 2 decimal places
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Thermometer className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Refrigerant Charge Calculator</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refrigerant Type
            </label>
            <select
              value={data.refrigerantType}
              onChange={(e) => setData({...data, refrigerantType: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="R410A">R-410A</option>
              <option value="R32">R-32</option>
              <option value="R134a">R-134a</option>
              <option value="R407C">R-407C</option>
              <option value="R404A">R-404A</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Charge (g)
            </label>
            <input
              type="number"
              value={data.baseCharge || ''}
              onChange={(e) => setData({...data, baseCharge: parseFloat(e.target.value) || 0})}
              placeholder="From manufacturer's data"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pipe Length (m)
            </label>
            <input
              type="number"
              value={data.pipeLength || ''}
              onChange={(e) => setData({...data, pipeLength: parseFloat(e.target.value) || 0})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Liquid Line Size (mm)
            </label>
            <select
              value={data.liquidLineSize}
              onChange={(e) => setData({...data, liquidLineSize: parseFloat(e.target.value)})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="6.35">6.35mm (1/4")</option>
              <option value="9.52">9.52mm (3/8")</option>
              <option value="12.7">12.7mm (1/2")</option>
              <option value="15.88">15.88mm (5/8")</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suction Line Size (mm)
            </label>
            <select
              value={data.suctionLineSize}
              onChange={(e) => setData({...data, suctionLineSize: parseFloat(e.target.value)})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="9.52">9.52mm (3/8")</option>
              <option value="12.7">12.7mm (1/2")</option>
              <option value="15.88">15.88mm (5/8")</option>
              <option value="19.05">19.05mm (3/4")</option>
              <option value="22.2">22.2mm (7/8")</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Indoor Units
            </label>
            <input
              type="number"
              min="1"
              value={data.indoorUnits || ''}
              onChange={(e) => setData({...data, indoorUnits: parseInt(e.target.value) || 1})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={calculateCharge}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Refrigerant Charge
          </button>
        </div>
        
        {data.totalCharge !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Calculated Refrigerant Charge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Base Charge:</p>
                <p className="text-lg font-medium">{(data.baseCharge / 1000).toFixed(2)} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Additional for Piping:</p>
                <p className="text-lg font-medium">
                  {((data.totalCharge || 0) - (data.baseCharge / 1000)).toFixed(2)} kg
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Total Charge Required:</p>
                <p className="text-2xl font-bold text-blue-700">{data.totalCharge} kg</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Important Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Always consult the manufacturer's specifications for accurate base charge values.</li>
            <li>This calculator provides an estimate. Actual charge may need to be fine-tuned based on system performance.</li>
            <li>Refrigerant charging should only be performed by certified technicians.</li>
            <li>For VRF/VRV systems, refer to the manufacturer's pipe length calculation tables.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
