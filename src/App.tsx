
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ToolsLayout from "./components/tools/ToolsLayout";
import PipeSizing from "./components/tools/PipeSizing";
import RefrigerantCharge from "./components/tools/RefrigerantCharge";
import AirBalance from "./components/tools/AirBalance";
import FanLaws from "./components/tools/FanLaws";
import EnergyEfficiency from "./components/tools/EnergyEfficiency";
import { ToolsGrid } from "./components/tools/ToolsComponents";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tools" element={<ToolsLayout />}>
          <Route index element={<ToolsGrid />} />
          <Route path="pipe-sizing" element={<PipeSizing />} />
          <Route path="refrigerant-charge" element={<RefrigerantCharge />} />
          <Route path="air-balance" element={<AirBalance />} />
          <Route path="fan-laws" element={<FanLaws />} />
          <Route path="energy" element={<EnergyEfficiency />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
