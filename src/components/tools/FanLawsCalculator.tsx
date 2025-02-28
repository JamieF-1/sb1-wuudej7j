// src/components/tools/FanLawsCalculator.tsx
import React, { useState } from "react";

const FanLawsCalculator: React.FC = () => {
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [currentFlow, setCurrentFlow] = useState<number>(0);
  const [newSpeed, setNewSpeed] = useState<number>(0);
  const [newFlow, setNewFlow] = useState<number | null>(null);

  // Fan Law: New Flow = Current Flow * (New Speed / Current Speed)
  const calculateNewFlow = () => {
    if (currentSpeed === 0) {
      setNewFlow(null);
      return;
    }
    const flow = currentFlow * (newSpeed / currentSpeed);
    setNewFlow(flow);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fan Laws Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Current Fan Speed (RPM):
        </label>
        <input
          type="number"
          value={currentSpeed}
          onChange={(e) => setCurrentSpeed(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Enter current fan speed"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Current Flow Rate (CFM):
        </label>
        <input
          type="number"
          value={currentFlow}
          onChange={(e) => setCurrentFlow(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Enter current flow rate"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          New Fan Speed (RPM):
        </label>
        <input
          type="number"
          value={newSpeed}
          onChange={(e) => setNewSpeed(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Enter new fan speed"
        />
      </div>
      <button
        onClick={calculateNewFlow}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate New Flow Rate
      </button>
      {newFlow !== null && (
        <div className="mt-4">
          <p className="text-xl font-semibold">
            New Flow Rate: {newFlow.toFixed(2)} CFM
          </p>
        </div>
      )}
    </div>
  );
};

export default FanLawsCalculator;
