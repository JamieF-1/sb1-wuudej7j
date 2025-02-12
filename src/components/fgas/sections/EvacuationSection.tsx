import React from 'react';
import { EvacuationData } from '../../../types/fgas';

interface Props {
  data: EvacuationData;
  onChange: (data: Partial<EvacuationData>) => void;
}

export default function EvacuationSection({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Evacuation</h3>
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
            Target Vacuum Level (µbar)
          </label>
          <input
            type="number"
            value={data.targetVacuum}
            onChange={(e) => onChange({ targetVacuum: parseFloat(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Achieved Vacuum Level (µbar)
          </label>
          <input
            type="number"
            value={data.achievedVacuum}
            onChange={(e) => onChange({ achievedVacuum: parseFloat(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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