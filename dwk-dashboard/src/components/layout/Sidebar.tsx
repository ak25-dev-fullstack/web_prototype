import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCheck, ClipboardList, BarChart2,
  AlertTriangle, Settings, Plus
} from 'lucide-react';
import DWKLogo from '../ui/DWKLogo';

const navItems = [
  { to: '/overview',     label: 'Overview',     Icon: LayoutDashboard },
  { to: '/advisers',     label: 'Advisers',     Icon: Users },
  { to: '/clients',      label: 'Clients',      Icon: UserCheck },
  { to: '/assignments',  label: 'Assignments',  Icon: ClipboardList },
  { to: '/reports',      label: 'Reports',      Icon: BarChart2 },
  { to: '/escalations',  label: 'Escalations',  Icon: AlertTriangle },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav style={{
      width: 220,
      minWidth: 220,
      height: '100vh',
      background: 'var(--sidebar-bg)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <DWKLogo size="sm" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--sidebar-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Team Manager
          </span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              height: 40,
              margin: '2px 12px',
              padding: '0 12px',
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: isActive ? '#FFFFFF' : 'var(--sidebar-text)',
              background: isActive ? 'var(--sidebar-item-active-bg)' : 'transparent',
              borderLeft: isActive ? '3px solid #2DD4BF' : '3px solid transparent',
              textDecoration: 'none',
              transition: 'background 120ms ease, color 120ms ease',
            })}
            onMouseEnter={e => {
              const el = e.currentTarget;
              if (!el.classList.contains('active')) {
                el.style.background = 'var(--sidebar-item-hover)';
                el.style.color = '#FFFFFF';
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              if (!el.getAttribute('aria-current')) {
                el.style.background = '';
                el.style.color = '';
              }
            }}
          >
            <Icon size={18} strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: '8px 0 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <NavLink
          to="/settings"
          style={{
            display: 'flex', alignItems: 'center', gap: 8, height: 40,
            margin: '2px 12px', padding: '0 12px', borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: 'var(--sidebar-text)', borderLeft: '3px solid transparent',
            textDecoration: 'none', transition: 'background 120ms ease, color 120ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--sidebar-item-hover)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
        >
          <Settings size={18} strokeWidth={1.5} />
          Settings
        </NavLink>

        <div style={{ padding: '8px 12px 0' }}>
          <button
            onClick={() => navigate('/reports')}
            style={{
              width: '100%', height: 40, borderRadius: 8, background: '#0D9488',
              color: '#FFFFFF', fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600,
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6, transition: 'background 120ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0F766E'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0D9488'; }}
          >
            <Plus size={16} />
            Generate Report
          </button>
        </div>
      </div>
    </nav>
  );
}
