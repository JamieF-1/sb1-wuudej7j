import React, { useState } from 'react';
import { Wind } from 'lucide-react';

interface VentilationData {
  roomVolume: number;
  airChanges: number;
  flowRate: number;
}

export default function VentilationCalculator() {
  const [ventData, setVentData] = useState<VentilationData>({
    roomVolume: 0,
    airChanges: 0,
    flowRate: 0,
  });

  const calculateFlowRate = (volume: number, changes: number) => {
    // Flow rate (m³/h) = Room Volume (m³) × Air Changes per Hour
    const flowRate = volume * changes;
    setVentData({ roomVolume: volume, airChanges: changes, flowRate });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Wind className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Ventilation Flow Rate Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Volume (m³)
            </label>
            <input
              type="number"
              value={ventData.roomVolume || ''}
              onChange={(e) => {
                const volume = parseFloat(e.target.value);
                calculateFlowRate(volume, ventData.airChanges);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Air Changes per Hour (ACH)
            </label>
            <input
              type="number"
              value={ventData.airChanges || ''}
              onChange={(e) => {
                const changes = parseFloat(e.target.value);
                calculateFlowRate(ventData.roomVolume, changes);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {ventData.flowRate > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Results</h3>
            <div className="space-y-2">
              <p className="text-blue-800">
                Required Flow Rate: {ventData.flowRate.toFixed(1)} m³/h
              </p>
              <p className="text-blue-800">
                Flow Rate (L/s): {(ventData.flowRate / 3.6).toFixed(1)} L/s
              </p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Typical Air Changes per Hour</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Commercial Spaces</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Offices: 4-8 ACH</li>
                <li>Conference Rooms: 6-10 ACH</li>
                <li>Restaurants: 8-12 ACH</li>
                <li>Kitchens: 15-30 ACH</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Industrial Spaces</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Factories: 4-10 ACH</li>
                <li>Workshops: 6-12 ACH</li>
                <li>Storage Areas: 3-6 ACH</li>
                <li>Clean Rooms: 10-100 ACH</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}