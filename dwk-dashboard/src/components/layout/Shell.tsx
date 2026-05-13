import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Shell() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{
        marginLeft: 220,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <TopBar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--background)',
          padding: 24,
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
