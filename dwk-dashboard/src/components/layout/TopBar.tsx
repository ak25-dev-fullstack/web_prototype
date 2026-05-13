import { Search, Bell, HelpCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function TopBar() {
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
        {/* Bell */}
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
          <Avatar initials="JS" size={32} />
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Jonathan Sterling
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.2 }}>
              Regional Team Manager
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
