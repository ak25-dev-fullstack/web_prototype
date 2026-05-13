import { Outlet } from 'react-router-dom';
import FASidebar from './FASidebar';
import TopBar from './TopBar';

export default function FAShell() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <FASidebar />
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--background)', padding: 24 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
