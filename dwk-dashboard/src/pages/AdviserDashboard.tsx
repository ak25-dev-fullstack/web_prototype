import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, Calendar, Database, FileText,
  Star, ClipboardList, ShieldCheck, Clock,
  ChevronRight, AlertTriangle, Check, Users,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import ProgressBar from '../components/ui/ProgressBar';
import PIIBadge from '../components/ui/PIIBadge';
import { useToast } from '../context/ToastContext';

// ── Queue data ─────────────────────────────────────────────────────────────

type QueueType = 'message' | 'booking' | 'import' | 'report';

interface QueueItem {
  id: string;
  type: QueueType;
  time: string;
  timeSort: number;
  client: string;
  clientInitials: string;
  title: string;
  detail: string;
  priority?: boolean;
  needsAction?: boolean;
  badge?: string;
  route?: string;
}

const queue: QueueItem[] = [
  {
    id: 'q1', type: 'booking', time: '12 mins ago', timeSort: 1,
    client: 'James Thornton', clientInitials: 'JT',
    title: 'Meeting request',
    detail: 'Requesting 15 May at 10:00 AM — New Client Onboarding',
    needsAction: true, priority: true,
    route: '/adviser/calendar',
  },
  {
    id: 'q2', type: 'import', time: '1 hour ago', timeSort: 2,
    client: 'Emily Sutherland', clientInitials: 'ES',
    title: '8 new transactions imported',
    detail: '3 transactions need categorisation review — low confidence scores flagged',
    needsAction: true, priority: true, badge: '3 pending',
    route: '/adviser/categorisation',
  },
  {
    id: 'q3', type: 'message', time: '2 hours ago', timeSort: 3,
    client: 'Margaret Chen', clientInitials: 'MC',
    title: 'Client message',
    detail: '"Can we discuss my portfolio rebalancing before end of month? Happy to do a quick call."',
    needsAction: true,
    route: '/adviser/clients/mc',
  },
  {
    id: 'q4', type: 'report', time: '3 hours ago', timeSort: 4,
    client: 'Robert Hannigan', clientInitials: 'RH',
    title: 'Q1 Spending Report updated',
    detail: 'Report is ready for client sign-off. Last edited by Sarah Mitchell.',
    needsAction: true, badge: 'Awaiting sign-off',
    route: '/adviser/documents',
  },
  {
    id: 'q5', type: 'import', time: 'Yesterday', timeSort: 5,
    client: 'Sophia Andersson', clientInitials: 'SA',
    title: '12 new transactions imported',
    detail: 'All 12 transactions auto-confirmed (confidence ≥ 85%).',
    needsAction: false,
    route: '/adviser/categorisation',
  },
  {
    id: 'q6', type: 'message', time: 'Yesterday', timeSort: 6,
    client: 'David Okonkwo', clientInitials: 'DO',
    title: 'Client message',
    detail: '"Following up on ISA contribution timing — should I top up now or wait until June?"',
    needsAction: false,
    route: '/adviser/clients/do',
  },
  {
    id: 'q7', type: 'booking', time: '2 days ago', timeSort: 7,
    client: 'Thomas Keller', clientInitials: 'TK',
    title: 'Reschedule request',
    detail: 'Requesting to move 14 May 14:00 → 17 May at any available time.',
    needsAction: false,
    route: '/adviser/calendar',
  },
  {
    id: 'q8', type: 'report', time: '3 days ago', timeSort: 8,
    client: 'Thomas Keller', clientInitials: 'TK',
    title: 'Annual Review Summary updated',
    detail: 'Pending team manager review before client delivery.',
    needsAction: false, badge: 'Manager review',
    route: '/adviser/documents',
  },
];

const typeConfig: Record<QueueType, { Icon: React.FC<{ size?: number; color?: string }>; color: string; label: string }> = {
  message: { Icon: MessageSquare, color: '#1E86C3', label: 'Message' },
  booking: { Icon: Calendar,      color: '#8B5CF6', label: 'Booking Request' },
  import:  { Icon: Database,      color: '#22C55E', label: 'Bank Import' },
  report:  { Icon: FileText,      color: '#F59E0B', label: 'Report' },
};

const schedule = [
  { time: '09:00', title: 'Portfolio Review', client: 'Margaret Chen', type: 'meeting' },
  { time: '11:30', title: 'Risk Assessment Call', client: 'Robert Hannigan', type: 'call' },
  { time: '14:00', title: 'Annual Review', client: 'Sophia Andersson', type: 'meeting' },
  { time: '16:00', title: 'Team Briefing', client: '', type: 'internal' },
];

const compliance = [
  { task: 'Q2 KYC Reviews', done: 18, total: 24, due: '30 May' },
  { task: 'Suitability Assessments', done: 12, total: 15, due: '15 Jun' },
  { task: 'AML Checks', done: 47, total: 47, due: 'Complete' },
  { task: 'MiFID II Training', done: 0, total: 1, due: '20 Jun' },
];

const typeColor: Record<string, string> = {
  meeting: '#1E86C3',
  call: '#1E86C3',
  internal: '#6B7280',
};

export default function AdviserDashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | QueueType>('all');
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = queue.filter(q => {
    if (dismissed.has(q.id)) return false;
    if (filter === 'all') return true;
    return q.type === filter;
  });

  const pendingCount = queue.filter(q => q.needsAction && !dismissed.has(q.id)).length;
  const importPending = queue.filter(q => q.type === 'import' && q.needsAction && !dismissed.has(q.id)).length;

  const filterOptions: { id: 'all' | QueueType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'message', label: 'Messages' },
    { id: 'booking', label: 'Bookings' },
    { id: 'import', label: 'Imports' },
    { id: 'report', label: 'Reports' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            Good morning, Sarah
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
            {pendingCount > 0 ? `${pendingCount} item${pendingCount !== 1 ? 's' : ''} need your attention.` : 'All caught up — no urgent items.'}
          </p>
        </div>
        <PIIBadge />
      </div>

      {/* Stat cards */}
      <div className="stat-row" style={{ marginBottom: 24 }}>
        {[
          { label: 'Queue Items', value: pendingCount, sub: 'Needing action', icon: <ClipboardList size={18} />, critical: pendingCount > 5 },
          { label: 'Categorisation', value: importPending, sub: 'Pending review', icon: <Database size={18} />, critical: importPending > 0, route: '/adviser/categorisation' },
          { label: 'Reviews Due', value: 6, sub: 'Next in 3 days', icon: <Clock size={18} />, critical: true },
          { label: 'CSAT Score', value: '4.7', sub: 'Target: 4.5★', icon: <Star size={18} /> },
        ].map(s => (
          <div
            key={s.label}
            onClick={s.route ? () => navigate(s.route!) : undefined}
            style={{
              flex: 1,
              background: s.critical ? 'rgba(239,68,68,0.08)' : '#1E293B',
              border: `1px solid ${s.critical ? 'rgba(239,68,68,0.3)' : '#334155'}`,
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              cursor: s.route ? 'pointer' : 'default',
              transition: 'border-color 150ms ease',
            }}
            onMouseEnter={e => { if (s.route) (e.currentTarget as HTMLDivElement).style.borderColor = '#1E86C3'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = s.critical ? 'rgba(239,68,68,0.3)' : '#334155'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</span>
              <span style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.critical ? 'rgba(239,68,68,0.12)' : 'rgba(30,134,195,0.15)', color: s.critical ? '#EF4444' : '#1E86C3', flexShrink: 0 }}>
                {s.icon}
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 600, lineHeight: 1, color: s.critical ? '#EF4444' : 'var(--text-primary)' }}>{s.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: s.critical ? '#F59E0B' : 'var(--text-secondary)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="two-col" style={{ gap: 24 }}>
        {/* Left — Work Queue */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Card>
            {/* Queue header + filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Work Queue</span>
                {pendingCount > 0 && (
                  <span style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 20, padding: '2px 8px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600 }}>
                    {pendingCount} pending
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {filterOptions.map(f => (
                  <button key={f.id} onClick={() => setFilter(f.id)} style={{
                    padding: '4px 10px', borderRadius: 20, cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif", fontSize: 12,
                    background: filter === f.id ? 'rgba(30,134,195,0.15)' : 'transparent',
                    color: filter === f.id ? '#1E86C3' : 'var(--text-secondary)',
                    border: filter === f.id ? '1px solid rgba(30,134,195,0.3)' : '1px solid transparent',
                    transition: 'all 120ms ease',
                  }}>{f.label}</button>
                ))}
              </div>
            </div>

            {/* Queue items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {visible.length === 0 && (
                <div style={{ padding: '32px 0', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-tertiary)' }}>
                  No items in this category.
                </div>
              )}
              {visible.map((item, i) => {
                const cfg = typeConfig[item.type];
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      padding: '14px 12px',
                      background: item.needsAction ? 'rgba(30,134,195,0.04)' : 'transparent',
                      borderRadius: 10,
                      borderLeft: item.priority ? '3px solid #1E86C3' : '3px solid transparent',
                      transition: 'background 120ms ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#263446'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = item.needsAction ? 'rgba(30,134,195,0.04)' : 'transparent'; }}
                  >
                    {/* Type icon */}
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: cfg.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <cfg.Icon size={16} color={cfg.color} />
                    </div>

                    {/* Client avatar */}
                    <Avatar initials={item.clientInitials} size={32} style={{ flexShrink: 0, marginTop: 2 }} />

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.client}</span>
                        <span style={{ padding: '1px 7px', borderRadius: 20, background: cfg.color + '18', color: cfg.color, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500 }}>{cfg.label}</span>
                        {item.badge && (
                          <span style={{ padding: '1px 7px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', color: '#F59E0B', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500 }}>{item.badge}</span>
                        )}
                        {!item.needsAction && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '1px 7px', borderRadius: 20, background: 'rgba(34,197,94,0.1)', color: '#22C55E', fontFamily: "'Inter', sans-serif", fontSize: 11 }}>
                            <Check size={10} /> Done
                          </span>
                        )}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.detail}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{item.time}</div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                      {item.route && (
                        <button
                          onClick={() => navigate(item.route!)}
                          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 8, background: '#263446', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-primary)', transition: 'background 120ms ease', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,134,195,0.15)'; e.currentTarget.style.borderColor = 'rgba(30,134,195,0.3)'; e.currentTarget.style.color = '#1E86C3'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#263446'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        >
                          View <ChevronRight size={12} />
                        </button>
                      )}
                      {item.needsAction && (
                        <button
                          onClick={() => { setDismissed(d => new Set([...d, item.id])); showToast(`Dismissed: ${item.client} — ${item.title}`); }}
                          style={{ padding: '5px 10px', borderRadius: 8, background: 'transparent', border: '1px solid transparent', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', transition: 'all 120ms ease', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#22C55E'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right rail */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Today's schedule */}
          <div style={{ background: '#0A1A2F', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Calendar size={16} color="#1E86C3" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Today's Schedule</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {schedule.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#1E86C3', flexShrink: 0, marginTop: 2 }}>{s.time}</span>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#FFFFFF', marginBottom: 2 }}>{s.title}</div>
                    {s.client && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#94A3B8' }}>{s.client}</div>}
                    <span style={{ display: 'inline-block', marginTop: 2, padding: '1px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, background: typeColor[s.type] + '25', color: typeColor[s.type] }}>
                      {s.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/adviser/calendar')}
              style={{ width: '100%', height: 36, borderRadius: 8, background: '#1E86C3', color: '#FFFFFF', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
            >
              View Full Calendar <ChevronRight size={13} />
            </button>
          </div>

          {/* Compliance tasks */}
          <Card padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <ShieldCheck size={16} color="#1E86C3" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600 }}>Compliance Tasks</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {compliance.map(c => {
                const pct = Math.round((c.done / c.total) * 100);
                const done = c.done === c.total;
                return (
                  <div key={c.task}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: done ? 'var(--text-tertiary)' : 'var(--text-primary)', fontWeight: 500 }}>{c.task}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: done ? '#22C55E' : 'var(--text-secondary)' }}>{c.done}/{c.total}</span>
                    </div>
                    <ProgressBar pct={pct} height={5} color={done ? '#22C55E' : pct < 50 ? '#EF4444' : '#1E86C3'} animated={false} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)' }}>Due: {c.due}</span>
                      {done && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#22C55E', fontWeight: 600 }}>✓ Done</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Upcoming reviews */}
          <Card padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={16} color="#1E86C3" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600 }}>Upcoming Reviews</span>
            </div>
            {[
              { name: 'Sophia Andersson', date: '15 May', initials: 'SA', overdue: true },
              { name: 'Robert Hannigan',  date: '17 May', initials: 'RH', overdue: false },
              { name: 'James Thornton',   date: '20 May', initials: 'JT', overdue: false },
            ].map(r => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar initials={r.initials} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{r.date}</div>
                </div>
                {r.overdue && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 20, background: 'rgba(239,68,68,0.12)', color: '#EF4444', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600 }}>
                    <AlertTriangle size={10} /> Overdue
                  </span>
                )}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
