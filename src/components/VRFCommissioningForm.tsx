import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Plus } from 'lucide-react';

interface IndoorUnit {
  id: number;
  location: string;
  model: string;
  serial: string;
  systemAddress: string;
  drainageType: 'pump' | 'gravity';
  voltage: string;
  current: string;
  coolingSupplyTemp: string;
  coolingReturnTemp: string;
  heatingSupplyTemp: string;
  heatingReturnTemp: string;
}

interface FormData {
  projectName: string;
  date: string;
  contractor: string;
  // F-gas Information
  fGasCompany: string;
  fGasNumber: string;
  refrigerantType: string;
  refrigerantKg: string;
  hasAdditionalCharge: boolean;
  additionalCharge: {
    bottleNumber: string;
    amountAdded: string;
  };
  // Pressure Test
  strengthTestDate: string;
  strengthTestDuration: string;
  strengthTestAmbientTemp: string;
  strengthTestPassed: boolean;
  tightnessTestDate: string;
  tightnessTestDuration: string;
  tightnessTestAmbientTemp: string;
  tightnessTestPassed: boolean;
  // Vacuum Test
  vacuumValue: string;
  vacuumHeld: boolean;
  // Outdoor Unit
  outdoorMake: string;
  outdoorModel: string;
  outdoorSerial: string;
  powerSupplyType: 'single' | 'three';
  voltage: {
    l1: string;
    l2: string;
    l3: string;
  };
  current: {
    l1: string;
    l2: string;
    l3: string;
  };
  outdoorSuctionTemp: string;
  outdoorDischargeTemp: string;
  // Indoor Units
  indoorUnits: IndoorUnit[];
}

const initialIndoorUnit: IndoorUnit = {
  id: 1,
  location: '',
  model: '',
  serial: '',
  systemAddress: '',
  drainageType: 'gravity',
  voltage: '',
  current: '',
  coolingSupplyTemp: '',
  coolingReturnTemp: '',
  heatingSupplyTemp: '',
  heatingReturnTemp: '',
};

const initialFormData: FormData = {
  projectName: '',
  date: '',
  contractor: '',
  fGasCompany: '',
  fGasNumber: '',
  refrigerantType: '',
  refrigerantKg: '',
  hasAdditionalCharge: false,
  additionalCharge: {
    bottleNumber: '',
    amountAdded: '',
  },
  strengthTestDate: '',
  strengthTestDuration: '',
  strengthTestAmbientTemp: '',
  strengthTestPassed: false,
  tightnessTestDate: '',
  tightnessTestDuration: '',
  tightnessTestAmbientTemp: '',
  tightnessTestPassed: false,
  vacuumValue: '',
  vacuumHeld: false,
  outdoorMake: '',
  outdoorModel: '',
  outdoorSerial: '',
  powerSupplyType: 'single',
  voltage: {
    l1: '',
    l2: '',
    l3: '',
  },
  current: {
    l1: '',
    l2: '',
    l3: '',
  },
  outdoorSuctionTemp: '',
  outdoorDischargeTemp: '',
  indoorUnits: Array(5).fill(null).map((_, index) => ({
    ...initialIndoorUnit,
    id: index + 1,
  })),
};

function VRFCommissioningForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleIndoorUnitChange = (id: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      indoorUnits: prev.indoorUnits.map((unit) =>
        unit.id === id ? { ...unit, [field]: value } : unit
      ),
    }));
  };

  const addIndoorUnit = () => {
    setFormData((prev) => ({
      ...prev,
      indoorUnits: [
        ...prev.indoorUnits,
        {
          ...initialIndoorUnit,
          id: prev.indoorUnits.length + 1,
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'your-email@example.com',
          project_name: formData.projectName,
          form_data: JSON.stringify(formData, null, 2),
        },
        'YOUR_PUBLIC_KEY'
      );

      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully</h2>
        <p className="text-gray-600 mb-4">The commissioning data has been sent to your email.</p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData(initialFormData);
          }}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Submit Another Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Project Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Project Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contractor Name</label>
            <input
              type="text"
              name="contractor"
              value={formData.contractor}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* F-Gas Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">F-Gas Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">F-Gas Company</label>
            <input
              type="text"
              name="fGasCompany"
              value={formData.fGasCompany}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">F-Gas Number</label>
            <input
              type="text"
              name="fGasNumber"
              value={formData.fGasNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Refrigerant Type</label>
            <input
              type="text"
              name="refrigerantType"
              value={formData.refrigerantType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Refrigerant Amount (kg)</label>
            <input
              type="number"
              step="0.01"
              name="refrigerantKg"
              value={formData.refrigerantKg}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="hasAdditionalCharge"
                checked={formData.hasAdditionalCharge}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Additional/Trim Charge Required
              </label>
            </div>
            {formData.hasAdditionalCharge && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bottle Number</label>
                  <input
                    type="text"
                    name="additionalCharge.bottleNumber"
                    value={formData.additionalCharge.bottleNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount Added (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="additionalCharge.amountAdded"
                    value={formData.additionalCharge.amountAdded}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pressure Test */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Pressure Test</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Strength Test</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="strengthTestDate"
                  value={formData.strengthTestDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  name="strengthTestDuration"
                  value={formData.strengthTestDuration}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ambient Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="strengthTestAmbientTemp"
                  value={formData.strengthTestAmbientTemp}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="strengthTestPassed"
                  checked={formData.strengthTestPassed}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Test Passed
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Tightness Test</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="tightnessTestDate"
                  value={formData.tightnessTestDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  name="tightnessTestDuration"
                  value={formData.tightnessTestDuration}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ambient Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="tightnessTestAmbientTemp"
                  value={formData.tightnessTestAmbientTemp}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tightnessTestPassed"
                  checked={formData.tightnessTestPassed}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Test Passed
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vacuum Test */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Vacuum Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vacuum Reading (Torr)</label>
            <input
              type="number"
              step="0.1"
              name="vacuumValue"
              value={formData.vacuumValue}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="vacuumHeld"
              checked={formData.vacuumHeld}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Vacuum held for minimum 15 minutes
            </label>
          </div>
        </div>
      </div>

      {/* Outdoor Unit */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Outdoor Unit Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <input
              type="text"
              name="outdoorMake"
              value={formData.outdoorMake}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model Number</label>
            <input
              type="text"
              name="outdoorModel"
              value={formData.outdoorModel}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              type="text"
              name="outdoorSerial"
              value={formData.outdoorSerial}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Power Supply Type</label>
            <select
              name="powerSupplyType"
              value={formData.powerSupplyType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="single">Single Phase</option>
              <option value="three">Three Phase</option>
            </select>
          </div>
          
          {/* Voltage Readings */}
          <div className="col-span-2">
            <h3 className="text-lg font-medium mb-4">Voltage Readings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">L1 (V)</label>
                <input
                  type="number"
                  name="voltage.l1"
                  value={formData.voltage.l1}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {formData.powerSupplyType === 'three' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">L2 (V)</label>
                    <input
                      type="number"
                      name="voltage.l2"
                      value={formData.voltage.l2}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">L3 (V)</label>
                    <input
                      type="number"
                      name="voltage.l3"
                      value={formData.voltage.l3}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Current Readings */}
          <div className="col-span-2">
            <h3 className="text-lg font-medium mb-4">Current Readings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">L1 (A)</label>
                <input
                  type="number"
                  step="0.1"
                  name="current.l1"
                  value={formData.current.l1}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {formData.powerSupplyType === 'three' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">L2 (A)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="current.l2"
                      value={formData.current.l2}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">L3 (A)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="current.l3"
                      value={formData.current.l3}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Suction Temperature (°C)</label>
            <input
              type="number"
              step="0.1"
              name="outdoorSuctionTemp"
              value={formData.outdoorSuctionTemp}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discharge Temperature (°C)</label>
            <input
              type="number"
              step="0.1"
              name="outdoorDischargeTemp"
              value={formData.outdoorDischargeTemp}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Indoor Units */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Indoor Units</h2>
          <button
            type="button"
            onClick={addIndoorUnit}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Indoor Unit
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drainage</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voltage (V)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current (A)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooling Supply (°C)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cooling Return (°C)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heating Supply (°C)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heating Return (°C)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.indoorUnits.map((unit, index) => (
                <tr key={unit.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={unit.location}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'location', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={unit.systemAddress}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'systemAddress', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={unit.model}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'model', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={unit.serial}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'serial', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={unit.drainageType}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'drainageType', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="gravity">Gravity</option>
                      <option value="pump">Pump</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={unit.voltage}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'voltage', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.1"
                      value={unit.current}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'current', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.1"
                      value={unit.coolingSupplyTemp}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'coolingSupplyTemp', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.1"
                      value={unit.coolingReturnTemp}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'coolingReturnTemp', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.1"
                      value={unit.heatingSupplyTemp}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'heatingSupplyTemp', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.1"
                      value={unit.heatingReturnTemp}
                      onChange={(e) => handleIndoorUnitChange(unit.id, 'heatingReturnTemp', e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Commissioning Form'}
        </button>
      </div>
    </form>
  );
}

export default VRFCommissioningForm;