import React from 'react';
import { PressureTest } from '../../../types/fgas';

interface Props {
  data: PressureTest;
  onChange: (data: Partial<PressureTest>) => void;
}

export default function PressureTestSection({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Pressure Test</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Test Pressure (bar)
          </label>
          <input
            type="number"
            step="0.1"
            value={data.pressure}
            onChange={(e) => onChange({ pressure: parseFloat(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={data.duration}
            onChange={(e) => onChange({ duration: parseInt(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pressureTestPassed"
              checked={data.passed}
              onChange={(e) => onChange({ passed: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="pressureTestPassed" className="ml-2 block text-sm text-gray-700">
              Test Passed
            </label>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            value={data.comments}
            onChange={(e) => onChange({ comments: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}