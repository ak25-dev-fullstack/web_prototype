import { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, LogOut, CheckCheck, X, User, Settings, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { useLayout } from '../../context/LayoutContext';

const NOTIFICATIONS = [
  { id: 1, type: 'alert',   title: 'Critical complaint: Robert Hannigan', body: 'Escalated by Sarah Mitchell — requires immediate review.', time: '2m ago',  read: false },
  { id: 2, type: 'info',    title: 'New client assigned', body: 'David Okonkwo has been assigned to James Whitfield.', time: '18m ago', read: false },
  { id: 3, type: 'warning', title: 'Capacity threshold reached', body: 'Sarah Mitchell is at 97% capacity (48/50 clients).', time: '1h ago',  read: false },
  { id: 4, type: 'success', title: 'Report generated', body: 'Q2 Performance Report is ready to download.', time: '3h ago',  read: false },
];

const FAQS = [
  { q: 'How do I assign a client to an adviser?', a: 'Go to Clients, find the client, click "Reassign" and select the new adviser from the dropdown.' },
  { q: 'How do I generate a report?', a: 'Navigate to Reports and click "Generate Report Now". Choose type and date range, then confirm.' },
  { q: 'How do I flag a client for reassignment?', a: 'Open the client profile and click "Flag for Reassignment". Select a reason code and submit.' },
  { q: 'How do I resolve an escalation?', a: 'Go to Escalations, expand the case and click "Resolve". Add a resolution note if needed.' },
  { q: 'What does the capacity bar show?', a: 'It shows the percentage of an adviser\'s maximum client capacity currently occupied.' },
  { q: 'How do I export table data?', a: 'Click the "Export" button at the top of any table and choose PDF or CSV format.' },
];

const typeAccent: Record<string, string> = {
  alert: '#EF4444', info: '#1E86C3', warning: '#F59E0B', success: '#22C55E',
};

function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, cb]);
}

const dropdownBase: React.CSSProperties = {
  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
  background: '#1E293B', border: '1px solid #334155',
  borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
  zIndex: 200, animation: 'card-in 140ms ease both',
};

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();
  const { isMobile, isTablet, toggleSidebar } = useLayout();

  const [notifOpen, setNotifOpen]   = useState(false);
  const [faqOpen,   setFaqOpen]     = useState(false);
  const [profOpen,  setProfOpen]    = useState(false);
  const [notifs, setNotifs]         = useState(NOTIFICATIONS);
  const [faqIdx,  setFaqIdx]        = useState<number | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const faqRef   = useRef<HTMLDivElement>(null);
  const profRef  = useRef<HTMLDivElement>(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(faqRef,   () => setFaqOpen(false));
  useClickOutside(profRef,  () => setProfOpen(false));

  const unread = notifs.filter(n => !n.read).length;

  function markAllRead() { setNotifs(ns => ns.map(n => ({ ...n, read: true }))); }
  function dismissNotif(id: number) { setNotifs(ns => ns.filter(n => n.id !== id)); }

  function handleLogout() { logout(); navigate('/login'); }

  const iconBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 36, height: 36, borderRadius: 9, cursor: 'pointer',
    transition: 'background 120ms ease', background: 'transparent',
    border: 'none', color: 'var(--text-secondary)',
  };

  return (
    <header style={{
      height: 56, background: '#1E293B', borderBottom: '1px solid #334155',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0,
    }}>
      {/* Hamburger — mobile/tablet */}
      {(isMobile || isTablet) && (
        <button
          onClick={toggleSidebar}
          style={{ ...iconBtn, marginRight: 4 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Search */}
      <div style={{ position: 'relative', flex: 1, maxWidth: isMobile ? '100%' : 300, minWidth: 0 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape') setQuery(''); }}
          placeholder="Search advisers, clients, or cases..."
          style={{
            width: '100%', height: 36, borderRadius: 9999,
            background: '#0F172A', border: '1.5px solid #334155',
            paddingLeft: 36, paddingRight: 12,
            fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>

        {/* ── Notifications ── */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            style={iconBtn}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            onClick={() => { setNotifOpen(o => !o); setFaqOpen(false); setProfOpen(false); }}
          >
            <Bell size={19} />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 5, right: 5, width: 15, height: 15,
                background: '#EF4444', borderRadius: '50%', color: '#fff',
                fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Inter', sans-serif", pointerEvents: 'none',
              }}>{unread}</span>
            )}
          </button>

          {notifOpen && (
            <div style={{ ...dropdownBase, width: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid #334155' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#F8FAFC' }}>Notifications</span>
                {unread > 0 && (
                  <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#1E86C3', fontWeight: 500 }}>
                    <CheckCheck size={13} /> Mark all read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                {notifs.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-muted)' }}>
                    No notifications
                  </div>
                ) : notifs.map(n => (
                  <div key={n.id} style={{
                    display: 'flex', gap: 10, padding: '12px 16px',
                    borderBottom: '1px solid #263446',
                    background: n.read ? 'transparent' : 'rgba(30,134,195,0.05)',
                    transition: 'background 120ms',
                  }}>
                    <div style={{ width: 4, borderRadius: 2, background: n.read ? 'transparent' : typeAccent[n.type], flexShrink: 0, alignSelf: 'stretch', minHeight: 36 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#F8FAFC', marginBottom: 3, lineHeight: 1.3 }}>{n.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 4 }}>{n.body}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{n.time}</div>
                    </div>
                    <button onClick={() => dismissNotif(n.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, flexShrink: 0, alignSelf: 'flex-start' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#F8FAFC'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── FAQ / Help ── */}
        <div ref={faqRef} style={{ position: 'relative' }}>
          <button
            style={iconBtn}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            onClick={() => { setFaqOpen(o => !o); setNotifOpen(false); setProfOpen(false); }}
          >
            <HelpCircle size={19} />
          </button>

          {faqOpen && (
            <div style={{ ...dropdownBase, width: 380 }}>
              <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #334155' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#F8FAFC', marginBottom: 2 }}>Help & FAQ</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>Common questions about DWK Finance</div>
              </div>
              <div style={{ maxHeight: 380, overflowY: 'auto', padding: '8px 0' }}>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #263446' : undefined }}>
                    <button
                      onClick={() => setFaqIdx(faqIdx === i ? null : i)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        gap: 10, padding: '12px 16px', background: 'none', border: 'none',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 100ms',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#F8FAFC', lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
                      <ChevronDown size={15} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2, transform: faqIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
                    </button>
                    {faqIdx === i && (
                      <div style={{ padding: '0 16px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Profile ── */}
        <div ref={profRef} style={{ position: 'relative', marginLeft: 6 }}>
          <button
            onClick={() => { setProfOpen(o => !o); setNotifOpen(false); setFaqOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px 4px 4px', borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', transition: 'background 120ms' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <Avatar initials={user?.initials ?? 'U'} size={32} />
            {!isMobile && (
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{user?.name ?? ''}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.2 }}>{user?.title ?? ''}</div>
              </div>
            )}
            <ChevronDown size={14} color="var(--text-muted)" style={{ transform: profOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
          </button>

          {profOpen && (
            <div style={{ ...dropdownBase, width: 240 }}>
              {/* Header */}
              <div style={{ padding: '16px', borderBottom: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar initials={user?.initials ?? 'U'} size={42} />
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>{user?.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{user?.title}</div>
                  </div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 20, background: 'rgba(30,134,195,0.12)', border: '1px solid rgba(30,134,195,0.25)' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#1E86C3' }}>Online</span>
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: '6px 0' }}>
                {[
                  { icon: <User size={15} />, label: 'Edit Profile', action: () => { setProfOpen(false); navigate(user?.role === 'financial-adviser' ? '/adviser/settings' : '/settings'); } },
                  { icon: <Settings size={15} />, label: 'Settings', action: () => { setProfOpen(false); navigate(user?.role === 'financial-adviser' ? '/adviser/settings' : '/settings'); } },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)', transition: 'background 100ms', textAlign: 'left' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #334155', padding: '6px 0' }}>
                <button
                  onClick={handleLogout}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#EF4444', transition: 'background 100ms', textAlign: 'left' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
