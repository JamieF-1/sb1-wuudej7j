
import React, { useState } from 'react';
import { Fan } from 'lucide-react';

interface FanData {
  initialSpeed: number;
  initialAirflow: number;
  initialPressure: number;
  initialPower: number;
  newSpeed: number | null;
  newAirflow: number | null;
  newPressure: number | null;
  newPower: number | null;
  calculationType: 'speed' | 'airflow' | 'pressure' | 'power';
}

export default function FanLaws() {
  const [data, setData] = useState<FanData>({
    initialSpeed: 1000,
    initialAirflow: 1000,
    initialPressure: 500,
    initialPower: 2.2,
    newSpeed: null,
    newAirflow: null,
    newPressure: null,
    newPower: null,
    calculationType: 'speed'
  });

  const handleCalculation = () => {
    // Fan Law calculations
    let newSpeed, newAirflow, newPressure, newPower;
    
    const {
      initialSpeed, initialAirflow, initialPressure, initialPower, calculationType
    } = data;
    
    switch (calculationType) {
      case 'speed':
        const targetSpeed = data.newSpeed || 0;
        // Speed ratio
        const speedRatio = targetSpeed / initialSpeed;
        // Airflow ∝ Speed
        newAirflow = initialAirflow * speedRatio;
        // Pressure ∝ Speed²
        newPressure = initialPressure * Math.pow(speedRatio, 2);
        // Power ∝ Speed³
        newPower = initialPower * Math.pow(speedRatio, 3);
        break;
        
      case 'airflow':
        const targetAirflow = data.newAirflow || 0;
        // Airflow ratio
        const airflowRatio = targetAirflow / initialAirflow;
        // Speed ∝ Airflow
        newSpeed = initialSpeed * airflowRatio;
        // Pressure ∝ Airflow²
        newPressure = initialPressure * Math.pow(airflowRatio, 2);
        // Power ∝ Airflow³
        newPower = initialPower * Math.pow(airflowRatio, 3);
        break;
        
      case 'pressure':
        const targetPressure = data.newPressure || 0;
        // Pressure ratio
        const pressureRatio = targetPressure / initialPressure;
        // Speed ∝ √Pressure
        newSpeed = initialSpeed * Math.sqrt(pressureRatio);
        // Airflow ∝ √Pressure
        newAirflow = initialAirflow * Math.sqrt(pressureRatio);
        // Power ∝ Pressure^(3/2)
        newPower = initialPower * Math.pow(pressureRatio, 1.5);
        break;
        
      case 'power':
        const targetPower = data.newPower || 0;
        // Power ratio
        const powerRatio = targetPower / initialPower;
        // Speed ∝ ∛Power
        newSpeed = initialSpeed * Math.pow(powerRatio, 1/3);
        // Airflow ∝ ∛Power
        newAirflow = initialAirflow * Math.pow(powerRatio, 1/3);
        // Pressure ∝ Power^(2/3)
        newPressure = initialPressure * Math.pow(powerRatio, 2/3);
        break;
    }
    
    setData({
      ...data,
      newSpeed: newSpeed !== undefined ? parseFloat(newSpeed.toFixed(2)) : data.newSpeed,
      newAirflow: newAirflow !== undefined ? parseFloat(newAirflow.toFixed(2)) : data.newAirflow,
      newPressure: newPressure !== undefined ? parseFloat(newPressure.toFixed(2)) : data.newPressure,
      newPower: newPower !== undefined ? parseFloat(newPower.toFixed(2)) : data.newPower
    });
  };

  const handleChangeCaldulationType = (type: 'speed' | 'airflow' | 'pressure' | 'power') => {
    setData({
      ...data,
      calculationType: type,
      newSpeed: type !== 'speed' ? null : data.newSpeed,
      newAirflow: type !== 'airflow' ? null : data.newAirflow,
      newPressure: type !== 'pressure' ? null : data.newPressure,
      newPower: type !== 'power' ? null : data.newPower
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Fan className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Fan Laws Calculator</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Initial Fan Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fan Speed (RPM)
              </label>
              <input
                type="number"
                value={data.initialSpeed || ''}
                onChange={(e) => setData({...data, initialSpeed: parseFloat(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Airflow (L/s)
              </label>
              <input
                type="number"
                value={data.initialAirflow || ''}
                onChange={(e) => setData({...data, initialAirflow: parseFloat(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pressure (Pa)
              </label>
              <input
                type="number"
                value={data.initialPressure || ''}
                onChange={(e) => setData({...data, initialPressure: parseFloat(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power (kW)
              </label>
              <input
                type="number"
                step="0.01"
                value={data.initialPower || ''}
                onChange={(e) => setData({...data, initialPower: parseFloat(e.target.value) || 0})}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Calculate Based On:</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleChangeCaldulationType('speed')}
              className={`px-4 py-2 border rounded-md text-sm font-medium 
                ${data.calculationType === 'speed' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              New Speed
            </button>
            <button
              onClick={() => handleChangeCaldulationType('airflow')}
              className={`px-4 py-2 border rounded-md text-sm font-medium 
                ${data.calculationType === 'airflow' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              New Airflow
            </button>
            <button
              onClick={() => handleChangeCaldulationType('pressure')}
              className={`px-4 py-2 border rounded-md text-sm font-medium 
                ${data.calculationType === 'pressure' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              New Pressure
            </button>
            <button
              onClick={() => handleChangeCaldulationType('power')}
              className={`px-4 py-2 border rounded-md text-sm font-medium 
                ${data.calculationType === 'power' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              New Power
            </button>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {data.calculationType === 'speed' ? 'New Fan Speed (RPM)' :
                data.calculationType === 'airflow' ? 'New Airflow (L/s)' :
                data.calculationType === 'pressure' ? 'New Pressure (Pa)' :
                'New Power (kW)'}
            </label>
            <input
              type="number"
              step={data.calculationType === 'power' ? "0.01" : "1"}
              value={
                data.calculationType === 'speed' ? (data.newSpeed || '') :
                data.calculationType === 'airflow' ? (data.newAirflow || '') :
                data.calculationType === 'pressure' ? (data.newPressure || '') :
                (data.newPower || '')
              }
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                switch (data.calculationType) {
                  case 'speed':
                    setData({...data, newSpeed: value});
                    break;
                  case 'airflow':
                    setData({...data, newAirflow: value});
                    break;
                  case 'pressure':
                    setData({...data, newPressure: value});
                    break;
                  case 'power':
                    setData({...data, newPower: value});
                    break;
                }
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleCalculation}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Fan Laws
            </button>
          </div>
        </div>
        
        {(data.newSpeed !== null || data.newAirflow !== null || data.newPressure !== null || data.newPower !== null) && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Fan Speed</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Initial:</span>
                    <p className="text-lg font-medium">{data.initialSpeed} RPM</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">New:</span>
                    <p className="text-lg font-medium">{data.newSpeed || '-'} RPM</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Airflow</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Initial:</span>
                    <p className="text-lg font-medium">{data.initialAirflow} L/s</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">New:</span>
                    <p className="text-lg font-medium">{data.newAirflow || '-'} L/s</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Pressure</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Initial:</span>
                    <p className="text-lg font-medium">{data.initialPressure} Pa</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">New:</span>
                    <p className="text-lg font-medium">{data.newPressure || '-'} Pa</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Power</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Initial:</span>
                    <p className="text-lg font-medium">{data.initialPower} kW</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">New:</span>
                    <p className="text-lg font-medium">{data.newPower || '-'} kW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fan Laws Reference</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fan Law</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formula</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">First Law</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q₂/Q₁ = N₂/N₁</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Airflow varies directly with fan speed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Second Law</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">P₂/P₁ = (N₂/N₁)²</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Pressure varies with the square of fan speed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Third Law</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">W₂/W₁ = (N₂/N₁)³</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Power varies with the cube of fan speed</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Where: Q = Airflow, N = Fan Speed, P = Pressure, W = Power</p>
          </div>
        </div>
      </div>
    </div>
  );
}
