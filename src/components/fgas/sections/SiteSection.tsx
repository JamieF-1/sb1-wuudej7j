import React from 'react';
import { SiteDetails } from '../../../types/fgas';

interface Props {
  data: SiteDetails;
  onChange: (data: Partial<SiteDetails>) => void;
}

export default function SiteSection({ data, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Site Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client/Company Name
          </label>
          <input
            type="text"
            value={data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Site Address
          </label>
          <textarea
            value={data.siteAddress}
            onChange={(e) => onChange({ siteAddress: e.target.value })}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Person
          </label>
          <input
            type="text"
            value={data.contactPerson}
            onChange={(e) => onChange({ contactPerson: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="tel"
            value={data.contactNumber}
            onChange={(e) => onChange({ contactNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Reference
          </label>
          <input
            type="text"
            value={data.jobReference}
            onChange={(e) => onChange({ jobReference: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}