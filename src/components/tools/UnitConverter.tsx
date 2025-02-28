import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

type ConversionCategory = 'temperature' | 'pressure' | 'flow' | 'power';

interface ConversionOption {
  from: string;
  to: string;
  formula: (value: number) => number;
}

const conversions: Record<ConversionCategory, ConversionOption[]> = {
  temperature: [
    {
      from: '°C',
      to: '°F',
      formula: (c) => (c * 9/5) + 32,
    },
    {
      from: '°F',
      to: '°C',
      formula: (f) => (f - 32) * 5/9,
    },
  ],
  pressure: [
    {
      from: 'bar',
      to: 'psi',
      formula: (bar) => bar * 14.5038,
    },
    {
      from: 'psi',
      to: 'bar',
      formula: (psi) => psi / 14.5038,
    },
    {
      from: 'bar',
      to: 'kPa',
      formula: (bar) => bar * 100,
    },
  ],
  flow: [
    {
      from: 'm³/h',
      to: 'L/s',
      formula: (m3h) => m3h / 3.6,
    },
    {
      from: 'L/s',
      to: 'm³/h',
      formula: (ls) => ls * 3.6,
    },
  ],
  power: [
    {
      from: 'kW',
      to: 'BTU/h',
      formula: (kw) => kw * 3412.14,
    },
    {
      from: 'BTU/h',
      to: 'kW',
      formula: (btu) => btu / 3412.14,
    },
  ],
};

export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('temperature');
  const [selectedConversion, setSelectedConversion] = useState<ConversionOption>(conversions.temperature[0]);
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setResult(selectedConversion.formula(numValue));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <ArrowLeftRight className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">HVAC Unit Converter</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                const newCategory = e.target.value as ConversionCategory;
                setCategory(newCategory);
                setSelectedConversion(conversions[newCategory][0]);
                setResult(null);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="temperature">Temperature</option>
              <option value="pressure">Pressure</option>
              <option value="flow">Flow Rate</option>
              <option value="power">Power</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion
            </label>
            <select
              value={`${selectedConversion.from}-${selectedConversion.to}`}
              onChange={(e) => {
                const [from, to] = e.target.value.split('-');
                const newConversion = conversions[category].find(
                  c => c.from === from && c.to === to
                );
                if (newConversion) {
                  setSelectedConversion(newConversion);
                  setResult(null);
                }
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {conversions[category].map((conv) => (
                <option key={`${conv.from}-${conv.to}`} value={`${conv.from}-${conv.to}`}>
                  {conv.from} to {conv.to}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value ({selectedConversion.from})
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleConvert(e.target.value);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {result !== null && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Result</h3>
              <p className="text-blue-800">
                {inputValue} {selectedConversion.from} = {result.toFixed(2)} {selectedConversion.to}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}