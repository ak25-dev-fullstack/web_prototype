import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { Role } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext';
import { LayoutProvider } from './context/LayoutContext';
import Login from './pages/Login';
import Shell from './components/layout/Shell';
import FAShell from './components/layout/FAShell';
import Overview from './pages/Overview';
import Advisers from './pages/Advisers';
import AdviserProfile from './pages/AdviserProfile';
import Assignments from './pages/Assignments';
import Escalations from './pages/Escalations';
import AdviserDashboard from './pages/AdviserDashboard';
import MyClients from './pages/fa/MyClients';
import ClientProfile from './pages/fa/ClientProfile';
import CalendarPage from './pages/fa/CalendarPage';
import DocumentsPage from './pages/fa/DocumentsPage';
import CompliancePage from './pages/fa/CompliancePage';
import SettingsPage from './pages/SettingsPage';
import TMClients from './pages/tm/TMClients';
import Reports from './pages/tm/Reports';
import EducationPage from './pages/fa/EducationPage';
import FAReports from './pages/fa/FAReports';
import { Info } from 'lucide-react';

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

function FeatureInDevelopment({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{
        background: '#1E293B', borderRadius: 12, padding: '40px 48px',
        textAlign: 'center', maxWidth: 420,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        <Info size={36} color="#1E86C3" style={{ marginBottom: 16 }} />
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
          {title}
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          This feature is currently in development and will be available in a future release.
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RoleRedirect />} />

        {/* Team Manager routes */}
        <Route element={<RequireRole role="team-manager"><Shell /></RequireRole>}>
          <Route path="overview"       element={<Overview />} />
          <Route path="advisers"       element={<Advisers />} />
          <Route path="advisers/:id"   element={<AdviserProfile />} />
          <Route path="clients"        element={<TMClients />} />
          <Route path="assignments"    element={<Assignments />} />
          <Route path="reports"        element={<Reports />} />
          <Route path="escalations"    element={<Escalations />} />
          <Route path="settings"       element={<SettingsPage />} />
        </Route>

        {/* Financial Adviser routes */}
        <Route path="adviser" element={<RequireRole role="financial-adviser"><FAShell /></RequireRole>}>
          <Route index                  element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"       element={<AdviserDashboard />} />
          <Route path="clients"         element={<MyClients />} />
          <Route path="clients/:id"     element={<ClientProfile />} />
          <Route path="calendar"        element={<CalendarPage />} />
          <Route path="documents"       element={<DocumentsPage />} />
          <Route path="compliance"      element={<CompliancePage />} />
          <Route path="education"       element={<EducationPage />} />
          <Route path="reports"         element={<FAReports />} />
          <Route path="settings"        element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </SearchProvider>
  );
}

export default function App() {
  return (
    <LayoutProvider>
      <ToastProvider>
        <AuthProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </AuthProvider>
      </ToastProvider>
    </LayoutProvider>
  );
}
