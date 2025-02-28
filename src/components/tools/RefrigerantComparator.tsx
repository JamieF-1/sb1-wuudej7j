// src/pages/RefrigerantComparator.tsx
import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Refrigerant = "R22" | "R410A" | "R134a";

interface DataPoint {
  temperature: number;
  pressure: number;
}

// Sample data for refrigerants (example values)
const refrigerantData: Record<Refrigerant, DataPoint[]> = {
  R22: [
    { temperature: -40, pressure: 10 },
    { temperature: -20, pressure: 20 },
    { temperature: 0, pressure: 40 },
    { temperature: 20, pressure: 70 },
    { temperature: 40, pressure: 110 },
    { temperature: 60, pressure: 160 },
    { temperature: 80, pressure: 220 },
  ],
  R410A: [
    { temperature: -40, pressure: 15 },
    { temperature: -20, pressure: 30 },
    { temperature: 0, pressure: 55 },
    { temperature: 20, pressure: 90 },
    { temperature: 40, pressure: 140 },
    { temperature: 60, pressure: 200 },
    { temperature: 80, pressure: 270 },
  ],
  R134a: [
    { temperature: -40, pressure: 5 },
    { temperature: -20, pressure: 15 },
    { temperature: 0, pressure: 35 },
    { temperature: 20, pressure: 60 },
    { temperature: 40, pressure: 95 },
    { temperature: 60, pressure: 145 },
    { temperature: 80, pressure: 205 },
  ],
};

const RefrigerantComparator: React.FC = () => {
  // State for selected refrigerant and temperature slider
  const [selectedRefrigerant, setSelectedRefrigerant] = useState<Refrigerant>("R22");
  const [selectedTemp, setSelectedTemp] = useState<number>(20); // default temperature

  // Retrieve the data points for the selected refrigerant
  const dataPoints = refrigerantData[selectedRefrigerant];

  // Find the point closest to the selected temperature (for display)
  const closestPoint = dataPoints.reduce((prev, curr) =>
    Math.abs(curr.temperature - selectedTemp) < Math.abs(prev.temperature - selectedTemp)
      ? curr
      : prev
  );

  // Prepare chart data
  const chartData = useMemo(
    () => ({
      labels: dataPoints.map((point) => point.temperature + "°C"),
      datasets: [
        {
          label: `${selectedRefrigerant} Pressure vs Temperature`,
          data: dataPoints.map((point) => point.pressure),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.2,
        },
      ],
    }),
    [dataPoints, selectedRefrigerant]
  );

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Pressure (psi)",
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Refrigerant Comparator</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Refrigerant:</label>
        <select
          value={selectedRefrigerant}
          onChange={(e) => setSelectedRefrigerant(e.target.value as Refrigerant)}
          className="border p-1 rounded"
        >
          <option value="R22">R22</option>
          <option value="R410A">R410A</option>
          <option value="R134a">R134a</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-2 font-semibold">
          Selected Temperature: {selectedTemp}°C
        </label>
        <input
          type="range"
          min={-40}
          max={80}
          step={1}
          value={selectedTemp}
          onChange={(e) => setSelectedTemp(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-6">
        <p className="font-semibold">
          {selectedRefrigerant} Pressure at {selectedTemp}°C is approximately{" "}
          <span className="text-blue-600">{closestPoint.pressure} psi</span>.
        </p>
      </div>
      <div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RefrigerantComparator;
