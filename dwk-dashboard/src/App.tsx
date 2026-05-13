import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Overview from './pages/Overview';
import Advisers from './pages/Advisers';
import AdviserProfile from './pages/AdviserProfile';
import Assignments from './pages/Assignments';
import Escalations from './pages/Escalations';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview"      element={<Overview />} />
          <Route path="advisers"      element={<Advisers />} />
          <Route path="advisers/:id"  element={<AdviserProfile />} />
          <Route path="clients"       element={<div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-secondary)', padding: 20 }}>Clients page coming soon.</div>} />
          <Route path="assignments"   element={<Assignments />} />
          <Route path="reports"       element={<div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-secondary)', padding: 20 }}>Reports page coming soon.</div>} />
          <Route path="escalations"   element={<Escalations />} />
          <Route path="settings"      element={<div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-secondary)', padding: 20 }}>Settings coming soon.</div>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
