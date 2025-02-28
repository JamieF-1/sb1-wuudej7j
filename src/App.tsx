import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/layout/ProtectedRoute';
import FGasForm from './components/fgas/FGasForm';
import VRFCommissioningForm from './components/VRFCommissioningForm';
import BreakdownForm from './components/BreakdownForm';
import Dashboard from './components/Dashboard';
import History from './components/History';
import ToolsLayout from './components/tools/ToolsLayout';
import { ToolsGrid } from './components/tools/ToolsComponents';
import PipeSizing from './components/tools/PipeSizing';
import RefrigerantCharge from './components/tools/RefrigerantCharge';
import AirBalance from './components/tools/AirBalance';
import FanLaws from './components/tools/FanLaws';
import EnergyEfficiency from './components/tools/EnergyEfficiency';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/fgas-form",
    element: (
      <ProtectedRoute>
        <FGasForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/fgas-form/:id",
    element: (
      <ProtectedRoute>
        <FGasForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vrf-commissioning",
    element: (
      <ProtectedRoute>
        <VRFCommissioningForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vrf-commissioning/:id",
    element: (
      <ProtectedRoute>
        <VRFCommissioningForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/breakdown-form",
    element: (
      <ProtectedRoute>
        <BreakdownForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/breakdown-form/:id",
    element: (
      <ProtectedRoute>
        <BreakdownForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tools",
    element: (
      <ProtectedRoute>
        <ToolsLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <ToolsGrid />,
      },
      {
        path: "pipe-sizing",
        element: <PipeSizing />,
      },
      {
        path: "refrigerant-charge",
        element: <RefrigerantCharge />,
      },
      {
        path: "air-balance",
        element: <AirBalance />,
      },
      {
        path: "fan-laws",
        element: <FanLaws />,
      },
      {
        path: "energy",
        element: <EnergyEfficiency />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  // Added signup route - assuming SignUp component exists
  {
    path: "/signup",
    element: <div>Signup Page (Implementation Needed)</div>, // Placeholder
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;