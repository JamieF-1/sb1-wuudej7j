
import React, { useState } from 'react';

interface Room {
  id: string;
  name: string;
  area: number;
  desiredAirChanges: number;
  calculatedFlow?: number;
}

export default function AirBalance() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Living Room', area: 20, desiredAirChanges: 4 },
    { id: '2', name: 'Bedroom', area: 15, desiredAirChanges: 3 },
    { id: '3', name: 'Kitchen', area: 12, desiredAirChanges: 8 }
  ]);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({ name: '', area: 0, desiredAirChanges: 4 });
  const [calculatedResults, setCalculatedResults] = useState(false);
  const [totalFlow, setTotalFlow] = useState(0);

  const addRoom = () => {
    if (newRoom.name && newRoom.area) {
      setRooms([
        ...rooms, 
        { 
          id: Date.now().toString(), 
          name: newRoom.name, 
          area: Number(newRoom.area), 
          desiredAirChanges: Number(newRoom.desiredAirChanges) || 4 
        }
      ]);
      setNewRoom({ name: '', area: 0, desiredAirChanges: 4 });
    }
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
    setCalculatedResults(false);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, ...updates } : room
    ));
    setCalculatedResults(false);
  };

  const calculateAirflow = () => {
    // Heights are assumed to be standard 2.5m per room
    const roomHeight = 2.5; // meters
    
    const updatedRooms = rooms.map(room => {
      // Calculate volume
      const volume = room.area * roomHeight; // m³
      
      // Calculate required air flow in m³/h based on air changes per hour
      const airflow = volume * room.desiredAirChanges;
      
      return {
        ...room,
        calculatedFlow: Math.round(airflow)
      };
    });
    
    setRooms(updatedRooms);
    setTotalFlow(updatedRooms.reduce((sum, room) => sum + (room.calculatedFlow || 0), 0));
    setCalculatedResults(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Air Balance Calculator</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Room Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (m²)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Air Changes/Hour</th>
                {calculatedResults && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Airflow (m³/h)</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map(room => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={room.name}
                      onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={room.area}
                      onChange={(e) => updateRoom(room.id, { area: parseFloat(e.target.value) })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={room.desiredAirChanges}
                      onChange={(e) => updateRoom(room.id, { desiredAirChanges: parseFloat(e.target.value) })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  {calculatedResults && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{room.calculatedFlow} m³/h</span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                    placeholder="Room name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={newRoom.area || ''}
                    onChange={(e) => setNewRoom({...newRoom, area: parseFloat(e.target.value)})}
                    placeholder="Area in m²"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={newRoom.desiredAirChanges || ''}
                    onChange={(e) => setNewRoom({...newRoom, desiredAirChanges: parseFloat(e.target.value)})}
                    placeholder="Air changes per hour"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                {calculatedResults && <td></td>}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={addRoom}
                    disabled={!newRoom.name || !newRoom.area}
                    className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                  >
                    Add Room
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={calculateAirflow}
          disabled={rooms.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Calculate Air Balance
        </button>
      </div>
      
      {calculatedResults && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Total System Airflow Required</p>
                <p className="text-lg font-semibold">{totalFlow} m³/h</p>
                <p className="text-sm text-gray-500 mt-1">({Math.round(totalFlow / 3.6)} L/s)</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Required Fan Power (estimated)</p>
                <p className="text-lg font-semibold">{Math.round(totalFlow * 0.35 / 1000)} kW</p>
                <p className="text-sm text-gray-500 mt-1">Based on typical fan efficiency</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Typical Air Changes per Hour</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Commercial Spaces</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Offices: 4-8 ACH</li>
                  <li>Conference Rooms: 6-10 ACH</li>
                  <li>Restaurants: 8-12 ACH</li>
                  <li>Kitchens: 15-30 ACH</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Residential Spaces</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Living Rooms: 3-6 ACH</li>
                  <li>Bedrooms: 2-4 ACH</li>
                  <li>Bathrooms: 6-12 ACH</li>
                  <li>Kitchens: 7-15 ACH</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
