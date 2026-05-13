import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { Role } from './context/AuthContext';
import Login from './pages/Login';
import Shell from './components/layout/Shell';
import FAShell from './components/layout/FAShell';
import Overview from './pages/Overview';
import Advisers from './pages/Advisers';
import AdviserProfile from './pages/AdviserProfile';
import Assignments from './pages/Assignments';
import Escalations from './pages/Escalations';
import AdviserDashboard from './pages/AdviserDashboard';

function Placeholder({ text }: { text: string }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-secondary)', padding: 20 }}>
      {text}
    </div>
  );
}

function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === 'financial-adviser' ? '/adviser/dashboard' : '/overview'} replace />;
  }
  return <>{children}</>;
}

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'financial-adviser' ? '/adviser/dashboard' : '/overview'} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RoleRedirect />} />

      {/* Team Manager routes */}
      <Route element={<RequireRole role="team-manager"><Shell /></RequireRole>}>
        <Route path="overview"       element={<Overview />} />
        <Route path="advisers"       element={<Advisers />} />
        <Route path="advisers/:id"   element={<AdviserProfile />} />
        <Route path="clients"        element={<Placeholder text="Clients page coming soon." />} />
        <Route path="assignments"    element={<Assignments />} />
        <Route path="reports"        element={<Placeholder text="Reports page coming soon." />} />
        <Route path="escalations"    element={<Escalations />} />
        <Route path="settings"       element={<Placeholder text="Settings coming soon." />} />
      </Route>

      {/* Financial Adviser routes */}
      <Route path="adviser" element={<RequireRole role="financial-adviser"><FAShell /></RequireRole>}>
        <Route index                  element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"       element={<AdviserDashboard />} />
        <Route path="clients"         element={<Placeholder text="My Clients coming soon." />} />
        <Route path="portfolio"       element={<Placeholder text="Portfolio coming soon." />} />
        <Route path="calendar"        element={<Placeholder text="Calendar coming soon." />} />
        <Route path="documents"       element={<Placeholder text="Documents coming soon." />} />
        <Route path="compliance"      element={<Placeholder text="Compliance coming soon." />} />
        <Route path="settings"        element={<Placeholder text="Settings coming soon." />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
