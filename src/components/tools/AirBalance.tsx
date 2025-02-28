
import React, { useState } from 'react';
import { Wind } from 'lucide-react';

interface AirBalanceData {
  systemType: string;
  totalAirflow: number;
  zones: Array<{
    id: string;
    name: string;
    requiredAirflow: number;
    actualAirflow: number | null;
    percentOfDesign: number | null;
  }>;
}

export default function AirBalance() {
  const [data, setData] = useState<AirBalanceData>({
    systemType: 'vav',
    totalAirflow: 1000,
    zones: [
      { id: '1', name: 'Zone 1', requiredAirflow: 250, actualAirflow: null, percentOfDesign: null },
      { id: '2', name: 'Zone 2', requiredAirflow: 250, actualAirflow: null, percentOfDesign: null },
      { id: '3', name: 'Zone 3', requiredAirflow: 250, actualAirflow: null, percentOfDesign: null },
      { id: '4', name: 'Zone 4', requiredAirflow: 250, actualAirflow: null, percentOfDesign: null }
    ]
  });

  const addZone = () => {
    const newZone = {
      id: Date.now().toString(),
      name: `Zone ${data.zones.length + 1}`,
      requiredAirflow: 0,
      actualAirflow: null,
      percentOfDesign: null
    };
    setData({...data, zones: [...data.zones, newZone]});
  };

  const removeZone = (id: string) => {
    setData({...data, zones: data.zones.filter(zone => zone.id !== id)});
  };

  const updateZone = (id: string, field: string, value: any) => {
    const updatedZones = data.zones.map(zone => {
      if (zone.id === id) {
        return { ...zone, [field]: value };
      }
      return zone;
    });
    setData({...data, zones: updatedZones});
  };

  const calculatePercentages = () => {
    const updatedZones = data.zones.map(zone => {
      const percentOfDesign = zone.actualAirflow 
        ? parseFloat(((zone.actualAirflow / zone.requiredAirflow) * 100).toFixed(1))
        : null;
      return { ...zone, percentOfDesign };
    });
    setData({...data, zones: updatedZones});
  };

  const getTotalRequiredAirflow = () => {
    return data.zones.reduce((total, zone) => total + zone.requiredAirflow, 0);
  };

  const getTotalActualAirflow = () => {
    return data.zones.reduce((total, zone) => total + (zone.actualAirflow || 0), 0);
  };

  const getSystemBalance = () => {
    const totalRequired = getTotalRequiredAirflow();
    const totalActual = getTotalActualAirflow();
    return totalRequired ? parseFloat(((totalActual / totalRequired) * 100).toFixed(1)) : 0;
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Wind className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Air Balance Calculator</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Type
            </label>
            <select
              value={data.systemType}
              onChange={(e) => setData({...data, systemType: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="vav">VAV System</option>
              <option value="cav">CAV System</option>
              <option value="vrf">VRF/VRV with Ducted Units</option>
              <option value="doas">DOAS</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Design Airflow (L/s)
            </label>
            <input
              type="number"
              value={data.totalAirflow || ''}
              onChange={(e) => setData({...data, totalAirflow: parseFloat(e.target.value) || 0})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Zone Configuration</h2>
            <button
              onClick={addZone}
              className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Zone
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required (L/s)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual (L/s)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Design</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.zones.map((zone) => (
                  <tr key={zone.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={zone.name}
                        onChange={(e) => updateZone(zone.id, 'name', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={zone.requiredAirflow || ''}
                        onChange={(e) => updateZone(zone.id, 'requiredAirflow', parseFloat(e.target.value) || 0)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={zone.actualAirflow || ''}
                        onChange={(e) => updateZone(zone.id, 'actualAirflow', parseFloat(e.target.value) || 0)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {zone.percentOfDesign !== null ? (
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${zone.percentOfDesign > 110 ? 'bg-red-100 text-red-800' : 
                          zone.percentOfDesign < 90 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                          {zone.percentOfDesign}%
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeZone(zone.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-3 text-sm font-medium">Totals</td>
                  <td className="px-6 py-3 text-sm font-medium">{getTotalRequiredAirflow()}</td>
                  <td className="px-6 py-3 text-sm font-medium">{getTotalActualAirflow()}</td>
                  <td className="px-6 py-3 text-sm font-medium">
                    {getSystemBalance() > 0 ? (
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${getSystemBalance() > 110 ? 'bg-red-100 text-red-800' : 
                        getSystemBalance() < 90 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                        {getSystemBalance()}%
                      </span>
                    ) : '-'}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-6">
            <button
              onClick={calculatePercentages}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Percentages
            </button>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Air Balance Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Acceptable Tolerances</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Supply air: ±10% of design</li>
                <li>Return air: ±10% of design</li>
                <li>Exhaust air: ±10% of design</li>
                <li>Outdoor air: +10% to -5% of design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Common Issues</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Dirty filters or coils</li>
                <li>Fan belt slippage</li>
                <li>Damper malfunctions</li>
                <li>Duct leakage or blockage</li>
                <li>Fan speed settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
