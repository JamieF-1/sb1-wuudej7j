// src/components/tools/EnergyEfficiencyCalculator.tsx
import React, { useState } from "react";

const EnergyEfficiencyCalculator: React.FC = () => {
  const [energyConsumed, setEnergyConsumed] = useState<number>(0);
  const [energyOutput, setEnergyOutput] = useState<number>(0);
  const [efficiency, setEfficiency] = useState<number | null>(null);

  // Efficiency (%) = (Energy Output / Energy Consumed) * 100
  const calculateEfficiency = () => {
    if (energyConsumed === 0) {
      setEfficiency(null);
      return;
    }
    const eff = (energyOutput / energyConsumed) * 100;
    setEfficiency(eff);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Energy Efficiency Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Energy Consumed (kWh):
        </label>
        <input
          type="number"
          value={energyConsumed}
          onChange={(e) => setEnergyConsumed(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Enter energy consumed"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Energy Output (kWh):
        </label>
        <input
          type="number"
          value={energyOutput}
          onChange={(e) => setEnergyOutput(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Enter energy output"
        />
      </div>
      <button
        onClick={calculateEfficiency}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate Efficiency
      </button>
      {efficiency !== null && (
        <div className="mt-4">
          <p className="text-xl font-semibold">
            Efficiency: {efficiency.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default EnergyEfficiencyCalculator;
