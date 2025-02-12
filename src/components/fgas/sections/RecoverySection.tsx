import React from 'react';
import { RecoveryData } from '../../../types/fgas';

interface Props {
  data: RecoveryData;
  onChange: (data: Partial<RecoveryData>) => void;
}

export default function RecoverySection({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recovery Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="datetime-local"
            value={data.startTime}
            onChange={(e) => onChange({ startTime: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="datetime-local"
            value={data.endTime}
            onChange={(e) => onChange({ endTime: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount Recovered (kg)
          </label>
          <input
            type="number"
            step="0.01"
            value={data.amountRecovered}
            onChange={(e) => onChange({ amountRecovered: parseFloat(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recovery Equipment Used
          </label>
          <input
            type="text"
            value={data.equipment}
            onChange={(e) => onChange({ equipment: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}