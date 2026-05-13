import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, TrendingUp, Calendar,
  FileText, ShieldCheck, Settings,
} from 'lucide-react';
import DWKLogo from '../ui/DWKLogo';

const navItems = [
  { to: '/adviser/dashboard',   label: 'Dashboard',   Icon: LayoutDashboard },
  { to: '/adviser/clients',     label: 'My Clients',  Icon: Users },
  { to: '/adviser/portfolio',   label: 'Portfolio',   Icon: TrendingUp },
  { to: '/adviser/calendar',    label: 'Calendar',    Icon: Calendar },
  { to: '/adviser/documents',   label: 'Documents',   Icon: FileText },
  { to: '/adviser/compliance',  label: 'Compliance',  Icon: ShieldCheck },
];

const linkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 8, height: 40,
  margin: '2px 12px', padding: '0 12px', borderRadius: 8,
  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
  color: isActive ? '#FFFFFF' : 'var(--sidebar-text)',
  background: isActive ? 'var(--sidebar-item-active-bg)' : 'transparent',
  borderLeft: isActive ? '3px solid #2DD4BF' : '3px solid transparent',
  textDecoration: 'none', transition: 'background 120ms ease, color 120ms ease',
});

export default function FASidebar() {
  return (
    <nav style={{
      width: 220, minWidth: 220, height: '100vh',
      background: 'var(--sidebar-bg)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', left: 0, top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <DWKLogo size="sm" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--sidebar-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Financial Adviser
          </span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => linkStyle(isActive)}
            onMouseEnter={e => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                e.currentTarget.style.background = 'var(--sidebar-item-hover)';
                e.currentTarget.style.color = '#FFFFFF';
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                e.currentTarget.style.background = '';
                e.currentTarget.style.color = '';
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
          to="/adviser/settings"
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
      </div>
    </nav>
  );
}
