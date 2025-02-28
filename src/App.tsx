import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/layout/ProtectedRoute';
import FGasForm from './components/fgas/FGasForm';
import VRFCommissioningForm from './components/VRFCommissioningForm';
import BreakdownForm from './components/BreakdownForm';
import Dashboard from './components/Dashboard';
import History from './components/History';
import ToolsLayout from './components/tools/ToolsLayout';
import {
  RefrigerantComparator,
  DuctCalculator,
  VentilationCalculator,
  UnitConverter,
  PsychrometricCalculator,
  HeatLoadCalculator,
  PipeSizing,
  RefrigerantCharge,
  AirBalance,
  FanLaws,
  EnergyEfficiency
} from './components/tools/ToolsComponents';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fgas-form"
            element={
              <ProtectedRoute>
                <FGasForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fgas-form/:id"
            element={
              <ProtectedRoute>
                <FGasForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vrf-commissioning"
            element={
              <ProtectedRoute>
                <VRFCommissioningForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vrf-commissioning/:id"
            element={
              <ProtectedRoute>
                <VRFCommissioningForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/breakdown-form"
            element={
              <ProtectedRoute>
                <BreakdownForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/breakdown-form/:id"
            element={
              <ProtectedRoute>
                <BreakdownForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools"
            element={
              <ProtectedRoute>
                <ToolsLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/tools/refrigerant" replace />} />
            <Route path="refrigerant" element={<RefrigerantComparator />} />
            <Route path="duct" element={<DuctCalculator />} />
            <Route path="ventilation" element={<VentilationCalculator />} />
            <Route path="converter" element={<UnitConverter />} />
            <Route path="psychrometric" element={<PsychrometricCalculator />} />
            <Route path="heat-load" element={<HeatLoadCalculator />} />
            <Route path="pipe-sizing" element={<PipeSizing />} />
            <Route path="refrigerant-charge" element={<RefrigerantCharge />} />
            <Route path="air-balance" element={<AirBalance />} />
            <Route path="fan-laws" element={<FanLaws />} />
            <Route path="energy" element={<EnergyEfficiency />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;