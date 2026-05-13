import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useLayout } from '../../context/LayoutContext';

export default function Shell() {
  const { isMobile, collapsed, sidebarOpen, closeSidebar } = useLayout();

  const sidebarW = isMobile ? 0 : collapsed ? 64 : 220;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
            zIndex: 99, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <div style={{
        marginLeft: sidebarW,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'margin-left 220ms ease',
        minWidth: 0,
      }}>
        <TopBar />
        <main className="main-scroll" style={{
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
