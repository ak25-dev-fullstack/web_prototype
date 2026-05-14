import { useState, useMemo } from 'react';
import type { ReactElement } from 'react';
import { Zap, MessageSquare, BarChart2, FileSearch, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ExportButton from '../components/ui/ExportButton';
import { useToast } from '../context/ToastContext';
import { useSearch } from '../context/SearchContext';
import { escalations as initialEscalations, advisers } from '../data/mock';

type EscStatus = 'Open' | 'In Progress' | 'Resolved';

const STATUS_COLORS: Record<EscStatus, { bg: string; color: string }> = {
  Open:        { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  'In Progress': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  Resolved:    { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' },
};

const accentColor: Record<string, string> = {
  'critical-complaint':  '#EF4444',
  'capacity-overload':   '#F59E0B',
  'unassigned-handover': '#1E86C3',
};

const badgeVariant: Record<string, 'critical-complaint' | 'capacity-overload' | 'unassigned-handover'> = {
  'critical-complaint':  'critical-complaint',
  'capacity-overload':   'capacity-overload',
  'unassigned-handover': 'unassigned-handover',
};

const actionIcon: Record<string, ReactElement> = {
  'View Chat History':        <MessageSquare size={13} />,
  'View Performance Metrics': <BarChart2 size={13} />,
  'View Case Notes':          <FileSearch size={13} />,
};

const REASONS = ['Capacity Overload', 'Expertise Mismatch', 'Client Request', 'Complaint Resolution', 'Adviser Leaving', 'Other'];
const FILTER_OPTIONS = ['All', 'Open', 'In Progress', 'Resolved', 'Critical Only'] as const;
type FilterOpt = typeof FILTER_OPTIONS[number];

interface EscState {
  id: string;
  status: EscStatus;
  expanded: boolean;
  adviserNotes: string;
  resolutionSummary: string;
  timeline: { time: string; action: string }[];
}

const initialState: Record<string, EscState> = Object.fromEntries(
  initialEscalations.map(e => [e.id, {
    id: e.id,
    status: 'Open',
    expanded: false,
    adviserNotes: '',
    resolutionSummary: '',
    timeline: [
      { time: e.timeAgo, action: 'Case opened — ' + e.label },
    ],
  }])
);

export default function Escalations() {
  const { query } = useSearch();
  const { showToast } = useToast();
  const [states, setStates] = useState<Record<string, EscState>>(initialState);
  const [filter, setFilter] = useState<FilterOpt>('All');
  const [reassignEsc, setReassignEsc] = useState<string | null>(null);
  const [newAdviser, setNewAdviser] = useState('');
  const [reassignReason, setReassignReason] = useState('');

  function updateState(id: string, patch: Partial<EscState>) {
    setStates(s => ({ ...s, [id]: { ...s[id], ...patch } }));
  }

  function handleResolve(id: string) {
    updateState(id, {
      status: 'Resolved',
      timeline: [...(states[id]?.timeline ?? []), { time: 'Just now', action: 'Case resolved by Jonathan Sterling' }],
    });
    showToast(`Case ${id} resolved.`);
  }

  function handleReassign() {
    if (!reassignEsc || !newAdviser || !reassignReason) return;
    const adviserName = advisers.find(a => a.id === newAdviser)?.name ?? newAdviser;
    updateState(reassignEsc, {
      status: 'In Progress',
      timeline: [...(states[reassignEsc]?.timeline ?? []), { time: 'Just now', action: `Reassigned to ${adviserName}` }],
    });
    showToast(`Case ${reassignEsc} reassigned to ${adviserName}. Both advisers have been notified.`);
    setReassignEsc(null);
    setNewAdviser('');
    setReassignReason('');
  }

  const filtered = useMemo(() => {
    return initialEscalations.filter(e => {
      const st = states[e.id]?.status ?? 'Open';
      const q = query.toLowerCase();
      const matchSearch = !q || e.id.toLowerCase().includes(q) || (e.client?.name ?? '').toLowerCase().includes(q) || (e.adviser?.name ?? '').toLowerCase().includes(q);
      if (filter === 'All') return matchSearch;
      if (filter === 'Critical Only') return matchSearch && e.type === 'critical-complaint';
      return matchSearch && st === filter;
    });
  }, [states, filter, query]);

  const csvData = initialEscalations.map(e => ({ Case: e.id, Title: e.title, Type: e.label, Status: states[e.id]?.status ?? 'Open' }));

  const inputStyle = {
    width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            Escalations Queue
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
            Active management required for {filtered.filter(e => (states[e.id]?.status ?? 'Open') !== 'Resolved').length} items.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <ExportButton csvData={csvData} csvFilename="escalations.csv" />
          <Button variant="primary" icon={<Zap size={15} />}>Quick Resolve</Button>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            style={{
              padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: filter === opt ? 600 : 400,
              background: filter === opt ? 'var(--primary)' : '#FFFFFF',
              color: filter === opt ? '#FFFFFF' : 'var(--text-secondary)',
              border: filter === opt ? 'none' : '1px solid var(--border)',
              transition: 'background 120ms ease, color 120ms ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Escalation cards */}
      {filtered.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', background: '#1E293B', borderRadius: 12, border: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>No escalations found</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Try adjusting your filters.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((esc, i) => {
            const st = states[esc.id]?.status ?? 'Open';
            const sc = STATUS_COLORS[st];
            const isExpanded = states[esc.id]?.expanded ?? false;

            return (
              <div
                key={esc.id}
                className="card-anim"
                style={{
                  background: '#1E293B',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  borderLeft: `4px solid ${accentColor[esc.type]}`,
                  boxShadow: 'var(--shadow-card)',
                  animationDelay: `${i * 60}ms`,
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: 20 }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Badge variant={badgeVariant[esc.type]}>{esc.label}</Badge>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>Case #{esc.id}</span>
                      <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, background: sc.bg, color: sc.color }}>{st}</span>
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{esc.timeAgo}</span>
                  </div>

                  {/* Title */}
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
                    {esc.title}
                  </div>

                  {/* People row */}
                  <div style={{ display: 'flex', gap: 24, marginBottom: 14, flexWrap: 'wrap' }}>
                    {esc.client && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={esc.client.avatar} size={28} />
                        <div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Client</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>{esc.client.name}</div>
                        </div>
                      </div>
                    )}
                    {esc.queueType && (
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Queue</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>{esc.queueType}</div>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {esc.adviser ? (
                        <>
                          <Avatar initials={esc.adviser.avatar} size={28} />
                          <div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Assigned Adviser</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>{esc.adviser.name}</div>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Assigned Adviser</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#EF4444' }}>Unassigned</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid var(--divider)', marginBottom: 14 }} />

                  {/* Actions row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      {esc.actions.map(action => (
                        <button key={action} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--primary)', padding: 0 }}>
                          {actionIcon[action]}
                          {action}
                        </button>
                      ))}
                      <button
                        onClick={() => updateState(esc.id, { expanded: !isExpanded })}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', padding: 0 }}
                      >
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        {isExpanded ? 'Collapse' : 'Details'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {st !== 'Resolved' && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => { setReassignEsc(esc.id); setNewAdviser(''); setReassignReason(''); }}>Reassign</Button>
                          <Button variant="dark" size="sm" onClick={() => handleResolve(esc.id)}>Resolve</Button>
                        </>
                      )}
                      {st === 'Resolved' && (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#22C55E', fontWeight: 600 }}>✓ Resolved</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--divider)', padding: 20, background: 'var(--neutral-50)' }}>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      {/* Timeline */}
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Timeline</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {(states[esc.id]?.timeline ?? []).map((t, ti) => (
                            <div key={ti} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 5 }} />
                              <div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{t.action}</div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-tertiary)' }}>{t.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes fields */}
                      <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 6 }}>Adviser Notes</label>
                          <textarea
                            value={states[esc.id]?.adviserNotes ?? ''}
                            onChange={e => updateState(esc.id, { adviserNotes: e.target.value })}
                            rows={3}
                            placeholder="Add notes from the assigned adviser..."
                            style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, resize: 'vertical', background: '#1E293B' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 6 }}>Resolution Summary</label>
                          <textarea
                            value={states[esc.id]?.resolutionSummary ?? ''}
                            onChange={e => updateState(esc.id, { resolutionSummary: e.target.value })}
                            rows={3}
                            placeholder="Describe how this was resolved..."
                            style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, resize: 'vertical', background: '#1E293B' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reassign modal */}
      <Modal
        open={!!reassignEsc}
        onClose={() => setReassignEsc(null)}
        title="Reassign Case"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReassignEsc(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleReassign}>Confirm Reassignment</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Case</label>
            <div style={{ height: 36, borderRadius: 8, border: '1px solid var(--border)', padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, background: 'var(--neutral-50)', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>{reassignEsc}</div>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>New Adviser <span style={{ color: '#EF4444' }}>*</span></label>
            <select value={newAdviser} onChange={e => setNewAdviser(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="">Select adviser...</option>
              {advisers.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reason for Reassignment <span style={{ color: '#EF4444' }}>*</span></label>
            <select value={reassignReason} onChange={e => setReassignReason(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="">Select reason...</option>
              {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
