import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, ClipboardList, Search, ChevronDown, Flag } from 'lucide-react';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import ExportButton from '../../components/ui/ExportButton';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useSearch } from '../../context/SearchContext';
import { faClients } from '../../data/faMock';
import type { FAClient } from '../../data/faMock';

const SEGMENTS = ['All Segments', 'Retail Growth', 'Self-Employed', 'High Net Worth', 'Small Business'];
const STATUSES = ['All Statuses', 'Active', 'Review', 'Due', 'Flagged', 'New'];
const REASON_CODES = ['Industry Mismatch', 'Capacity Overload', 'Client Request', 'Language Barrier', 'Compliance Issue', 'Other'];

const statusColors: Record<FAClient['status'], { bg: string; color: string }> = {
  Active:  { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' },
  Review:  { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  Due:     { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  Flagged: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  New:     { bg: 'rgba(30,134,195,0.12)', color: '#1E86C3' },
};

const riskColors: Record<string, string> = {
  None: '#22C55E',
};

function getRiskColor(flag: string) {
  return riskColors[flag] ?? '#EF4444';
}

function FlagModal({ client }: { client: FAClient; onClose: () => void }) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const inputStyle = {
    width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Client</label>
        <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'var(--neutral-50)', color: 'var(--text-secondary)', cursor: 'default' }}>{client.name}</div>
      </div>
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reason Code <span style={{ color: '#EF4444' }}>*</span></label>
        <div style={{ position: 'relative' }}>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            style={{ ...inputStyle, paddingRight: 36, appearance: 'none', cursor: 'pointer' }}
          >
            <option value="">Select reason...</option>
            {REASON_CODES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
        </div>
      </div>
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reason Details <span style={{ color: 'var(--text-tertiary)', fontSize: 12, fontWeight: 400 }}>(optional, max 300 chars)</span></label>
        <textarea
          value={details}
          onChange={e => setDetails(e.target.value.slice(0, 300))}
          rows={3}
          placeholder="Add any additional context..."
          style={{
            width: '100%', borderRadius: 8, border: '1px solid var(--border)',
            padding: '10px 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
            color: 'var(--text-primary)', resize: 'vertical', background: '#1E293B',
          }}
        />
        <div style={{ textAlign: 'right', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{details.length}/300</div>
      </div>
    </div>
  );
}

export default function MyClients() {
  const navigate = useNavigate();
  const { query } = useSearch();
  const [localSearch, setLocalSearch] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [flagClient, setFlagClient] = useState<FAClient | null>(null);
  const { showToast } = useToast();

  const searchTerm = query || localSearch;

  const filtered = useMemo(() => {
    return faClients.filter(c => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.segment.toLowerCase().includes(q);
      const matchSeg = segmentFilter === 'All Segments' || c.segment === segmentFilter;
      const matchStat = statusFilter === 'All Statuses' || c.status === statusFilter;
      return matchSearch && matchSeg && matchStat;
    });
  }, [searchTerm, segmentFilter, statusFilter]);

  const csvData = filtered.map(c => ({ Name: c.name, Segment: c.segment, AUM: c.aum, 'Last Contact': c.lastContact, 'Risk Flag': c.riskFlag, Status: c.status }));

  const selectStyle = {
    height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B', cursor: 'pointer',
    paddingRight: 28,
  };

  function handleFlagSubmit() {
    setFlagClient(null);
    showToast('Client flagged for reassignment. The Team Manager has been notified.');
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>My Clients</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Manage and monitor your client portfolio.</p>
        </div>
        <ExportButton csvData={csvData} csvFilename="my-clients.csv" />
      </div>

      {/* Summary bar */}
      <div className="stat-row" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Clients', value: '47', sub: '↑ 3 new this month', icon: <Users size={20} />, color: 'var(--primary)' },
          { label: 'Avg AUM', value: '£603K', sub: 'Across all segments', icon: <TrendingUp size={20} />, color: 'var(--primary)' },
          { label: 'Reviews Due', value: '6', sub: 'Next due in 3 days', icon: <ClipboardList size={20} />, color: '#EF4444' },
        ].map(m => (
          <Card key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{m.label}</span>
              <span style={{ color: m.color }}>{m.icon}</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500, color: m.label === 'Reviews Due' ? '#EF4444' : 'var(--text-primary)' }}>{m.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: m.label === 'Reviews Due' ? '#EF4444' : 'var(--text-secondary)' }}>{m.sub}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setLocalSearch(''); }}
            placeholder="Search clients..."
            style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)', paddingLeft: 34, paddingRight: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', background: '#1E293B' }}
          />
        </div>
        <select value={segmentFilter} onChange={e => setSegmentFilter(e.target.value)} style={selectStyle}>
          {SEGMENTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
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
                  {['CLIENT', 'SEGMENT', 'AUM', 'LAST CONTACT', 'RISK FLAG', 'STATUS', 'ACTIONS'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initials={c.initials} size={34} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{c.segment}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>{c.aum}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{c.lastContact}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: getRiskColor(c.riskFlag), fontWeight: c.riskFlag === 'None' ? 400 : 500 }}>
                        {c.riskFlag === 'None' ? '—' : c.riskFlag}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, background: statusColors[c.status].bg, color: statusColors[c.status].color }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/adviser/clients/${c.id}`)}>View Profile</Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Flag size={13} />}
                          style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)' }}
                          onClick={() => setFlagClient(c)}
                        >
                          Flag
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Flag modal */}
      <Modal
        open={!!flagClient}
        onClose={() => setFlagClient(null)}
        title="Flag for Reassignment"
        footer={
          <>
            <Button variant="ghost" onClick={() => setFlagClient(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleFlagSubmit}>Submit Flag</Button>
          </>
        }
      >
        {flagClient && <FlagModal client={flagClient} onClose={() => setFlagClient(null)} />}
      </Modal>
    </div>
  );
}
