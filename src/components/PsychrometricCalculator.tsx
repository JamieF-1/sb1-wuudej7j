import React, { useState } from 'react';
import { Droplets } from 'lucide-react';

interface PsychrometricData {
  dryBulb: number;
  wetBulb: number;
  relativeHumidity: number;
  dewPoint: number;
  enthalpy: number;
  specificVolume: number;
}

export default function PsychrometricCalculator() {
  const [data, setData] = useState<PsychrometricData>({
    dryBulb: 20,
    wetBulb: 15,
    relativeHumidity: 0,
    dewPoint: 0,
    enthalpy: 0,
    specificVolume: 0,
  });

  const calculateProperties = (dryBulb: number, wetBulb: number) => {
    // This is a simplified calculation - in production you'd want to use a proper psychrometric library
    const relativeHumidity = 100 * Math.exp((17.625 * wetBulb) / (243.04 + wetBulb)) / 
                            Math.exp((17.625 * dryBulb) / (243.04 + dryBulb));
    const dewPoint = 243.04 * Math.log(relativeHumidity/100 * Math.exp((17.625 * dryBulb)/(243.04 + dryBulb))) /
                    (17.625 - Math.log(relativeHumidity/100 * Math.exp((17.625 * dryBulb)/(243.04 + dryBulb))));
    const enthalpy = 1.006 * dryBulb + wetBulb * (2501 + 1.86 * dryBulb);
    const specificVolume = 0.287 * (dryBulb + 273.15) * (1 + 1.607858 * relativeHumidity/100);

    setData({
      dryBulb,
      wetBulb,
      relativeHumidity,
      dewPoint,
      enthalpy,
      specificVolume,
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Droplets className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Psychrometric Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dry Bulb Temperature (°C)
            </label>
            <input
              type="number"
              value={data.dryBulb}
              onChange={(e) => calculateProperties(parseFloat(e.target.value), data.wetBulb)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wet Bulb Temperature (°C)
            </label>
            <input
              type="number"
              value={data.wetBulb}
              onChange={(e) => calculateProperties(data.dryBulb, parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-blue-800">Relative Humidity</p>
              <p className="text-lg">{data.relativeHumidity.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Dew Point</p>
              <p className="text-lg">{data.dewPoint.toFixed(1)}°C</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Enthalpy</p>
              <p className="text-lg">{data.enthalpy.toFixed(1)} kJ/kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Specific Volume</p>
              <p className="text-lg">{data.specificVolume.toFixed(3)} m³/kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}