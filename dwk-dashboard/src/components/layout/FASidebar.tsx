import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar,
  FileText, ShieldCheck, GraduationCap, BarChart2, Settings, X,
} from 'lucide-react';
import DWKLogo from '../ui/DWKLogo';
import { useLayout } from '../../context/LayoutContext';

const navItems = [
  { to: '/adviser/dashboard',   label: 'Dashboard',   Icon: LayoutDashboard },
  { to: '/adviser/clients',     label: 'My Clients',  Icon: Users },
  { to: '/adviser/calendar',    label: 'Calendar',    Icon: Calendar },
  { to: '/adviser/documents',   label: 'Documents',   Icon: FileText },
  { to: '/adviser/compliance',  label: 'Compliance',  Icon: ShieldCheck },
  { to: '/adviser/reports',     label: 'Reports',     Icon: BarChart2 },
  { to: '/adviser/education',   label: 'Education',   Icon: GraduationCap },
];

export default function FASidebar() {
  const { isMobile, collapsed, sidebarOpen, toggleCollapsed, closeSidebar } = useLayout();

  const isCollapsed = isMobile ? false : collapsed;
  const w = isCollapsed ? 64 : 220;

  const translateX = isMobile
    ? sidebarOpen ? '0' : '-100%'
    : '0';

  function handleLogoClick() {
    if (isMobile) closeSidebar();
    else toggleCollapsed();
  }

  return (
    <nav style={{
      width: isMobile ? 260 : w,
      minWidth: isMobile ? 260 : w,
      height: '100vh',
      background: '#1E293B',
      borderRight: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      overflow: 'hidden',
      transform: `translateX(${translateX})`,
      transition: isMobile
        ? 'transform 240ms ease'
        : 'width 220ms ease, min-width 220ms ease',
    }}>
      {/* Logo row */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center',
        padding: isCollapsed ? '0' : '0 16px',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid #334155', flexShrink: 0,
      }}>
        <button
          onClick={handleLogoClick}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            display: 'flex', alignItems: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: isCollapsed ? '8px' : '0',
            borderRadius: 8, transition: 'background 120ms ease',
            flex: isCollapsed ? undefined : 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,134,195,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
        >
          {isCollapsed ? (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 800, color: '#9580C8', userSelect: 'none', letterSpacing: '0.04em' }}>DWK</span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>
              <DWKLogo size="sm" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Financial Adviser
              </span>
            </div>
          )}
        </button>

        {isMobile && (
          <button
            onClick={closeSidebar}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 6, borderRadius: 6, display: 'flex' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={isCollapsed ? label : undefined}
            onClick={isMobile ? closeSidebar : undefined}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center',
              gap: isCollapsed ? 0 : 9,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              height: 40,
              margin: isCollapsed ? '2px 8px' : '2px 10px',
              padding: isCollapsed ? '0' : '0 12px',
              borderRadius: 10,
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#F8FAFC' : 'var(--text-secondary)',
              background: isActive ? 'rgba(30,134,195,0.15)' : 'transparent',
              borderLeft: !isCollapsed && isActive ? '3px solid #1E86C3' : '3px solid transparent',
              textDecoration: 'none',
              transition: 'background 120ms ease, color 120ms ease',
              overflow: 'hidden', whiteSpace: 'nowrap',
            })}
            onMouseEnter={e => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                e.currentTarget.style.background = 'rgba(30,134,195,0.08)';
                e.currentTarget.style.color = '#F8FAFC';
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                e.currentTarget.style.background = '';
                e.currentTarget.style.color = '';
              }
            }}
          >
            <Icon size={18} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            {!isCollapsed && label}
          </NavLink>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: '8px 0 16px', borderTop: '1px solid #334155' }}>
        <NavLink
          to="/adviser/settings"
          title={isCollapsed ? 'Settings' : undefined}
          onClick={isMobile ? closeSidebar : undefined}
          style={{
            display: 'flex', alignItems: 'center',
            gap: isCollapsed ? 0 : 9,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            height: 40,
            margin: isCollapsed ? '2px 8px' : '2px 10px',
            padding: isCollapsed ? '0' : '0 12px',
            borderRadius: 10,
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400,
            color: 'var(--text-secondary)', borderLeft: '3px solid transparent',
            textDecoration: 'none', transition: 'background 120ms ease, color 120ms ease',
            whiteSpace: 'nowrap', overflow: 'hidden',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,134,195,0.08)'; e.currentTarget.style.color = '#F8FAFC'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
        >
          <Settings size={18} strokeWidth={1.5} style={{ flexShrink: 0 }} />
          {!isCollapsed && 'Settings'}
        </NavLink>
      </div>
    </nav>
  );
}
