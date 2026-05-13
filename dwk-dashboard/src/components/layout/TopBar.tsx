import { Search, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header style={{
      height: 56,
      background: '#FFFFFF',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      flexShrink: 0,
    }}>
      {/* Search */}
      <div style={{ position: 'relative', width: 280 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
        <input
          placeholder="Search advisers, clients, or cases..."
          style={{
            width: '100%', height: 36, borderRadius: 9999,
            background: 'var(--background)', border: '1px solid var(--border)',
            paddingLeft: 36, paddingRight: 12,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-secondary)" />
          <span style={{
            position: 'absolute', top: -4, right: -4, width: 16, height: 16,
            background: '#DC2626', borderRadius: '50%', color: '#fff',
            fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'DM Sans', sans-serif",
          }}>4</span>
        </div>

        <HelpCircle size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar initials={user?.initials ?? 'U'} size={32} />
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {user?.name ?? ''}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.2 }}>
              {user?.title ?? ''}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Sign out"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 8, color: 'var(--text-secondary)',
            transition: 'background 120ms ease, color 120ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-dim)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
