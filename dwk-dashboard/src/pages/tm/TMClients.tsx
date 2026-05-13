import { useState, useMemo } from 'react';
import { Users, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ExportButton from '../../components/ui/ExportButton';
import { useToast } from '../../context/ToastContext';
import { useSearch } from '../../context/SearchContext';
import { advisers } from '../../data/mock';
import { tmClients as allClients } from '../../data/tmMock';
import type { TMClient } from '../../data/tmMock';

const SEGMENTS = ['All Segments', 'High Net Worth', 'Retail Growth', 'Self-Employed', 'Small Business'];
const STATUSES = ['All Statuses', 'Active', 'Review', 'Flagged', 'New'];
const REASONS = ['Capacity Overload', 'Expertise Mismatch', 'Client Request', 'Complaint Resolution', 'Adviser Leaving', 'Other'];

const statusColors: Record<TMClient['status'], { bg: string; color: string }> = {
  Active:  { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' },
  Review:  { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  Flagged: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  New:     { bg: 'rgba(30,134,195,0.12)', color: '#1E86C3' },
};

interface ReassignState {
  client: TMClient;
  newAdviser: string;
  reason: string;
  notes: string;
}

export default function TMClients() {
  const { query } = useSearch();
  const { showToast } = useToast();
  const [localSearch, setLocalSearch] = useState('');
  const [adviserFilter, setAdviserFilter] = useState('All Advisers');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [reassign, setReassign] = useState<ReassignState | null>(null);
  const [clients, setClients] = useState(allClients);

  const searchTerm = query || localSearch;

  const filtered = useMemo(() => {
    return clients.filter(c => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.adviser.toLowerCase().includes(q);
      const matchAdv = adviserFilter === 'All Advisers' || c.adviser === adviserFilter;
      const matchSeg = segmentFilter === 'All Segments' || c.segment === segmentFilter;
      const matchStat = statusFilter === 'All Statuses' || c.status === statusFilter;
      return matchSearch && matchAdv && matchSeg && matchStat;
    });
  }, [clients, searchTerm, adviserFilter, segmentFilter, statusFilter]);

  const csvData = filtered.map(c => ({ Name: c.name, Adviser: c.adviser, Segment: c.segment, AUM: c.aum, Status: c.status, 'Last Activity': c.lastActivity }));
  const adviserNames = ['All Advisers', ...Array.from(new Set(allClients.map(c => c.adviser))).sort()];

  function handleReassign() {
    if (!reassign || !reassign.newAdviser || !reassign.reason) return;
    const newAdviserName = advisers.find(a => a.id === reassign.newAdviser)?.name ?? reassign.newAdviser;
    setClients(cs => cs.map(c => c.id === reassign.client.id ? { ...c, adviser: newAdviserName, adviserInitials: newAdviserName.split(' ').map(w => w[0]).join('').slice(0, 2) } : c));
    const name = reassign.client.name;
    setReassign(null);
    showToast(`${name} reassigned to ${newAdviserName}. Both advisers have been notified.`);
  }

  const selectStyle = {
    height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B', cursor: 'pointer',
  };

  const inputStyle = {
    width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Clients</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>All clients across your advisory team.</p>
        </div>
        <ExportButton csvData={csvData} csvFilename="team-clients.csv" />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 180, maxWidth: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setLocalSearch(''); }}
            placeholder="Search clients or advisers..."
            style={{ ...inputStyle, paddingLeft: 34 }}
          />
        </div>
        <select value={adviserFilter} onChange={e => setAdviserFilter(e.target.value)} style={selectStyle}>
          {adviserNames.map(a => <option key={a}>{a}</option>)}
        </select>
        <select value={segmentFilter} onChange={e => setSegmentFilter(e.target.value)} style={selectStyle}>
          {SEGMENTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <Card padding={0}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <Users size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>No clients found</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</div>
          </div>
        ) : (
          <div className="table-wrap" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                  {['CLIENT', 'ASSIGNED ADVISER', 'SEGMENT', 'AUM', 'STATUS', 'LAST ACTIVITY', 'ACTIONS'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initials={c.initials} size={32} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={c.adviserInitials} size={26} bg="#0A1A2F" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{c.adviser}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{c.segment}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>{c.aum}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, background: statusColors[c.status].bg, color: statusColors[c.status].color }}>{c.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{c.lastActivity}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Button variant="ghost" size="sm" onClick={() => setReassign({ client: c, newAdviser: '', reason: '', notes: '' })}>Reassign</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Reassign modal */}
      <Modal
        open={!!reassign}
        onClose={() => setReassign(null)}
        title="Reassign Client"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReassign(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleReassign}>Confirm Reassignment</Button>
          </>
        }
      >
        {reassign && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Client</label>
              <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'var(--neutral-50)', color: 'var(--text-secondary)' }}>{reassign.client.name}</div>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Current Adviser</label>
              <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'var(--neutral-50)', color: 'var(--text-secondary)' }}>{reassign.client.adviser}</div>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>New Adviser <span style={{ color: '#EF4444' }}>*</span></label>
              <select value={reassign.newAdviser} onChange={e => setReassign(r => r ? { ...r, newAdviser: e.target.value } : r)} style={{ ...inputStyle, appearance: 'none' }}>
                <option value="">Select adviser...</option>
                {advisers.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reason <span style={{ color: '#EF4444' }}>*</span></label>
              <select value={reassign.reason} onChange={e => setReassign(r => r ? { ...r, reason: e.target.value } : r)} style={{ ...inputStyle, appearance: 'none' }}>
                <option value="">Select reason...</option>
                {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Notes (optional)</label>
              <textarea value={reassign.notes} onChange={e => setReassign(r => r ? { ...r, notes: e.target.value } : r)} rows={3} placeholder="Additional context..." style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', padding: '10px 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', resize: 'vertical' }} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
