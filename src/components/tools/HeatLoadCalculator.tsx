import React, { useState } from 'react';
import { ThermometerSun } from 'lucide-react';

interface RoomData {
  length: number;
  width: number;
  height: number;
  occupants: number;
  windows: number;
  equipment: number;
  outdoorTemp: number;
  indoorTemp: number;
}

export default function HeatLoadCalculator() {
  const [room, setRoom] = useState<RoomData>({
    length: 0,
    width: 0,
    height: 0,
    occupants: 0,
    windows: 0,
    equipment: 0,
    outdoorTemp: 35,
    indoorTemp: 22,
  });

  const calculateHeatLoad = () => {
    // Basic heat load calculation (simplified for demonstration)
    const volume = room.length * room.width * room.height;
    const surfaceArea = 2 * (room.length * room.width + room.length * room.height + room.width * room.height);
    const tempDiff = room.outdoorTemp - room.indoorTemp;
    
    // Heat gains (in watts)
    const structuralGain = surfaceArea * 2.5 * tempDiff; // Simplified U-value of 2.5
    const windowGain = room.windows * 200; // Assume 200W per window
    const occupantGain = room.occupants * 100; // Assume 100W per person
    const equipmentGain = room.equipment * 150; // Assume 150W per equipment
    
    return {
      structural: structuralGain,
      windows: windowGain,
      occupants: occupantGain,
      equipment: equipmentGain,
      total: structuralGain + windowGain + occupantGain + equipmentGain,
    };
  };

  const heatLoad = calculateHeatLoad();

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <ThermometerSun className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Heat Load Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Length (m)
            </label>
            <input
              type="number"
              value={room.length || ''}
              onChange={(e) => setRoom({ ...room, length: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Width (m)
            </label>
            <input
              type="number"
              value={room.width || ''}
              onChange={(e) => setRoom({ ...room, width: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Height (m)
            </label>
            <input
              type="number"
              value={room.height || ''}
              onChange={(e) => setRoom({ ...room, height: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Occupants
            </label>
            <input
              type="number"
              value={room.occupants || ''}
              onChange={(e) => setRoom({ ...room, occupants: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Windows
            </label>
            <input
              type="number"
              value={room.windows || ''}
              onChange={(e) => setRoom({ ...room, windows: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Equipment (pieces)
            </label>
            <input
              type="number"
              value={room.equipment || ''}
              onChange={(e) => setRoom({ ...room, equipment: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Outdoor Temperature (°C)
            </label>
            <input
              type="number"
              value={room.outdoorTemp || ''}
              onChange={(e) => setRoom({ ...room, outdoorTemp: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Indoor Temperature (°C)
            </label>
            <input
              type="number"
              value={room.indoorTemp || ''}
              onChange={(e) => setRoom({ ...room, indoorTemp: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Heat Load Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-blue-800">Structural Heat Gain</p>
              <p className="text-lg">{heatLoad.structural.toFixed(0)} W</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Window Heat Gain</p>
              <p className="text-lg">{heatLoad.windows.toFixed(0)} W</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Occupant Heat Gain</p>
              <p className="text-lg">{heatLoad.occupants.toFixed(0)} W</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Equipment Heat Gain</p>
              <p className="text-lg">{heatLoad.equipment.toFixed(0)} W</p>
            </div>
            <div className="col-span-full">
              <p className="text-sm font-medium text-blue-800">Total Heat Load</p>
              <p className="text-2xl font-bold text-blue-900">{heatLoad.total.toFixed(0)} W ({(heatLoad.total / 1000 * 3.412).toFixed(1)} BTU/h)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}