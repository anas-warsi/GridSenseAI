import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GridProvider } from './context/GridContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PublicHome from './pages/PublicHome';
import Complaints from './pages/Complaints';
import Transformers from './pages/Transformers';
import RiskZones from './pages/RiskZones';
import AIInsights from './pages/AIInsights';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <GridProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Homepage Route */}
          <Route path="/" element={<PublicHome />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="transformers" element={<Transformers />} />
            <Route path="risk-zones" element={<RiskZones />} />
            <Route path="ai-insights" element={<AIInsights />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GridProvider>
  );
}

export default App;
