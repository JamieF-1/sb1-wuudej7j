import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface DuctSize {
  width: number;
  height: number;
  diameter: number;
}

export default function DuctCalculator() {
  const [ductSize, setDuctSize] = useState<DuctSize>({
    width: 0,
    height: 0,
    diameter: 0,
  });

  const calculateEquivalentDiameter = (width: number, height: number) => {
    // Formula: D = 1.3 * (a * b)^0.625 / (a + b)^0.25
    // where a = width, b = height
    const diameter = 1.3 * Math.pow(width * height, 0.625) / Math.pow(width + height, 0.25);
    setDuctSize({ width, height, diameter });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">Equivalent Duct Size Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rectangular Duct Width (mm)
            </label>
            <input
              type="number"
              value={ductSize.width || ''}
              onChange={(e) => {
                const width = parseFloat(e.target.value);
                calculateEquivalentDiameter(width, ductSize.height);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rectangular Duct Height (mm)
            </label>
            <input
              type="number"
              value={ductSize.height || ''}
              onChange={(e) => {
                const height = parseFloat(e.target.value);
                calculateEquivalentDiameter(ductSize.width, height);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {ductSize.diameter > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Result</h3>
            <p className="text-blue-800">
              Equivalent Round Duct Diameter: {ductSize.diameter.toFixed(1)} mm
            </p>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">How to Use</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Enter the width of your rectangular duct in millimeters</li>
            <li>Enter the height of your rectangular duct in millimeters</li>
            <li>The calculator will automatically show the equivalent round duct diameter</li>
            <li>Use this diameter when you need to match the flow characteristics of the rectangular duct</li>
          </ul>
        </div>
      </div>
    </div>
  );
}