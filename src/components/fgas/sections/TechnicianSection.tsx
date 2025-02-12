import React from 'react';
import { TechnicianDetails } from '../../../types/fgas';

interface Props {
  data: TechnicianDetails;
  onChange: (data: Partial<TechnicianDetails>) => void;
}

export default function TechnicianSection({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Technician Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Technician Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            F-Gas Certification Number
          </label>
          <input
            type="text"
            value={data.certificationNumber}
            onChange={(e) => onChange({ certificationNumber: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}