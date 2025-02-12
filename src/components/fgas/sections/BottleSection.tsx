import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { BottleData } from '../../../types/fgas';

interface Props {
  bottles: BottleData[];
  onChange: (bottles: BottleData[]) => void;
}

export default function BottleSection({ bottles, onChange }: Props) {
  const addBottle = () => {
    onChange([
      ...bottles,
      {
        bottleNumber: '',
        refrigerantType: '',
        weightBefore: 0,
        weightAfter: 0,
      },
    ]);
  };

  const removeBottle = (index: number) => {
    onChange(bottles.filter((_, i) => i !== index));
  };

  const updateBottle = (index: number, field: keyof BottleData, value: any) => {
    const updatedBottles = bottles.map((bottle, i) =>
      i === index ? { ...bottle, [field]: value } : bottle
    );
    onChange(updatedBottles);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Bottle Data</h3>
        <button
          type="button"
          onClick={addBottle}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Bottle
        </button>
      </div>

      <div className="space-y-6">
        {bottles.map((bottle, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-md font-medium text-gray-700">
                Bottle {index + 1}
              </h4>
              {bottles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBottle(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bottle Number
                </label>
                <input
                  type="text"
                  value={bottle.bottleNumber}
                  onChange={(e) =>
                    updateBottle(index, 'bottleNumber', e.target.value)
                  }
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Refrigerant Type
                </label>
                <select
                  value={bottle.refrigerantType}
                  onChange={(e) =>
                    updateBottle(index, 'refrigerantType', e.target.value)
                  }
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Refrigerant</option>
                  <option value="R410A">R410A</option>
                  <option value="R32">R32</option>
                  <option value="R407C">R407C</option>
                  <option value="R134a">R134a</option>
                  <option value="R404A">R404A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight Before (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={bottle.weightBefore}
                  onChange={(e) =>
                    updateBottle(index, 'weightBefore', parseFloat(e.target.value))
                  }
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight After (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={bottle.weightAfter}
                  onChange={(e) =>
                    updateBottle(index, 'weightAfter', parseFloat(e.target.value))
                  }
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}