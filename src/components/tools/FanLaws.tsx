
import React, { useState } from 'react';

interface FanData {
  type: 'speed' | 'diameter' | 'density';
  initialSpeed?: number;
  finalSpeed?: number;
  initialDiameter?: number;
  finalDiameter?: number;
  initialDensity?: number;
  finalDensity?: number;
  initialVolume?: number;
  initialPressure?: number;
  initialPower?: number;
}

export default function FanLaws() {
  const [fanData, setFanData] = useState<FanData>({
    type: 'speed',
    initialSpeed: 1450,
    finalSpeed: 1750,
    initialVolume: 5000,
    initialPressure: 500,
    initialPower: 2.5
  });
  
  const [results, setResults] = useState<{
    volumeChange: number;
    pressureChange: number;
    powerChange: number;
    finalVolume: number;
    finalPressure: number;
    finalPower: number;
  } | null>(null);

  const calculateFanLaws = () => {
    let volumeRatio = 1;
    let pressureRatio = 1;
    let powerRatio = 1;
    
    if (fanData.type === 'speed' && fanData.initialSpeed && fanData.finalSpeed) {
      // Fan Laws for speed change
      volumeRatio = fanData.finalSpeed / fanData.initialSpeed;
      pressureRatio = Math.pow(volumeRatio, 2);
      powerRatio = Math.pow(volumeRatio, 3);
    } 
    else if (fanData.type === 'diameter' && fanData.initialDiameter && fanData.finalDiameter) {
      // Fan Laws for diameter change
      volumeRatio = fanData.finalDiameter / fanData.initialDiameter;
      pressureRatio = Math.pow(volumeRatio, 2);
      powerRatio = Math.pow(volumeRatio, 5);
    }
    else if (fanData.type === 'density' && fanData.initialDensity && fanData.finalDensity) {
      // Fan Laws for air density change
      volumeRatio = 1; // Volume flow remains constant
      pressureRatio = fanData.finalDensity / fanData.initialDensity;
      powerRatio = pressureRatio;
    }
    
    // Calculate final values
    const finalVolume = (fanData.initialVolume || 0) * volumeRatio;
    const finalPressure = (fanData.initialPressure || 0) * pressureRatio;
    const finalPower = (fanData.initialPower || 0) * powerRatio;
    
    setResults({
      volumeChange: parseFloat((volumeRatio * 100).toFixed(1)),
      pressureChange: parseFloat((pressureRatio * 100).toFixed(1)),
      powerChange: parseFloat((powerRatio * 100).toFixed(1)),
      finalVolume: parseFloat(finalVolume.toFixed(1)),
      finalPressure: parseFloat(finalPressure.toFixed(1)),
      finalPower: parseFloat(finalPower.toFixed(2))
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Fan Laws Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What parameter is changing?
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="speed"
                name="changingParam"
                type="radio"
                checked={fanData.type === 'speed'}
                onChange={() => setFanData({ ...fanData, type: 'speed' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="speed" className="ml-2 block text-sm text-gray-700">
                Fan Speed
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="diameter"
                name="changingParam"
                type="radio"
                checked={fanData.type === 'diameter'}
                onChange={() => setFanData({ ...fanData, type: 'diameter' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="diameter" className="ml-2 block text-sm text-gray-700">
                Fan Diameter
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="density"
                name="changingParam"
                type="radio"
                checked={fanData.type === 'density'}
                onChange={() => setFanData({ ...fanData, type: 'density' })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="density" className="ml-2 block text-sm text-gray-700">
                Air Density
              </label>
            </div>
          </div>
        </div>
        
        <div>
          {fanData.type === 'speed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Speed (RPM)
                </label>
                <input
                  type="number"
                  value={fanData.initialSpeed || ''}
                  onChange={(e) => setFanData({ ...fanData, initialSpeed: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Final Speed (RPM)
                </label>
                <input
                  type="number"
                  value={fanData.finalSpeed || ''}
                  onChange={(e) => setFanData({ ...fanData, finalSpeed: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          
          {fanData.type === 'diameter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Diameter (mm)
                </label>
                <input
                  type="number"
                  value={fanData.initialDiameter || ''}
                  onChange={(e) => setFanData({ ...fanData, initialDiameter: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Final Diameter (mm)
                </label>
                <input
                  type="number"
                  value={fanData.finalDiameter || ''}
                  onChange={(e) => setFanData({ ...fanData, finalDiameter: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          
          {fanData.type === 'density' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Air Density (kg/m³)
                </label>
                <input
                  type="number"
                  value={fanData.initialDensity || ''}
                  onChange={(e) => setFanData({ ...fanData, initialDensity: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Final Air Density (kg/m³)
                </label>
                <input
                  type="number"
                  value={fanData.finalDensity || ''}
                  onChange={(e) => setFanData({ ...fanData, finalDensity: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Initial Volume Flow Rate (m³/h)
          </label>
          <input
            type="number"
            value={fanData.initialVolume || ''}
            onChange={(e) => setFanData({ ...fanData, initialVolume: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Initial Pressure (Pa)
          </label>
          <input
            type="number"
            value={fanData.initialPressure || ''}
            onChange={(e) => setFanData({ ...fanData, initialPressure: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Initial Power (kW)
          </label>
          <input
            type="number"
            value={fanData.initialPower || ''}
            onChange={(e) => setFanData({ ...fanData, initialPower: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={calculateFanLaws}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate
        </button>
      </div>
      
      {results && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Volume Flow Change</p>
              <p className="text-lg font-semibold">{results.volumeChange}%</p>
              <p className="text-sm text-gray-500 mt-1">New: {results.finalVolume} m³/h</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Pressure Change</p>
              <p className="text-lg font-semibold">{results.pressureChange}%</p>
              <p className="text-sm text-gray-500 mt-1">New: {results.finalPressure} Pa</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Power Change</p>
              <p className="text-lg font-semibold">{results.powerChange}%</p>
              <p className="text-sm text-gray-500 mt-1">New: {results.finalPower} kW</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Fan Laws</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Volume Flow ∝ Speed (or Diameter)</li>
              <li>Pressure ∝ Speed² (or Diameter²)</li>
              <li>Power ∝ Speed³ (or Diameter⁵)</li>
              <li>When density changes, volume flow remains constant</li>
              <li>Pressure and power are directly proportional to density</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
