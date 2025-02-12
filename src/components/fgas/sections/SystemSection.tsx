import React from 'react';
import { SystemDetails } from '../../../types/fgas';

interface Props {
  data: SystemDetails;
  onChange: (data: Partial<SystemDetails>) => void;
}

export default function SystemSection({ data, onChange }: Props) {
  const systemTypes = [
    'Split System',
    'VRF/VRV',
    'Chiller',
    'Close Control',
    'Other',
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">System Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Manufacturer
          </label>
          <input
            type="text"
            value={data.manufacturer}
            onChange={(e) => onChange({ manufacturer: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            value={data.model}
            onChange={(e) => onChange({ model: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Serial Number
          </label>
          <input
            type="text"
            value={data.serialNumber}
            onChange={(e) => onChange({ serialNumber: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Type
          </label>
          <select
            value={data.systemType}
            onChange={(e) => onChange({ systemType: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select System Type</option>
            {systemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Capacity (kW)
          </label>
          <input
            type="number"
            step="0.1"
            value={data.capacity}
            onChange={(e) => onChange({ capacity: parseFloat(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Initial Charge (kg)
          </label>
          <input
            type="number"
            step="0.01"
            value={data.initialCharge}
            onChange={(e) => onChange({ initialCharge: parseFloat(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Refrigerant Type
          </label>
          <select
            value={data.refrigerantType}
            onChange={(e) => onChange({ refrigerantType: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Refrigerant</option>
            <option value="R410A">R410A</option>
            <option value="R32">R32</option>
            <option value="R407C">R407C</option>
            <option value="R134a">R134a</option>
            <option value="R404A">R404A</option>
          </select>
        </div>
      </div>
    </div>
  );
}