import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flag, AlertTriangle, Plus, Trash2, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ExportButton from '../../components/ui/ExportButton';
import { useToast } from '../../context/ToastContext';
import { faClients, clientTransactions, clientNotes } from '../../data/faMock';
import type { ClientNote } from '../../data/faMock';

const CATEGORIES = ['All Categories', 'Groceries', 'Tax', 'Transport', 'Housing', 'Entertainment', 'Dining', 'Utilities', 'Savings', 'Healthcare', 'Shopping', 'Business', 'Income'];
const DATE_RANGES = ['Last 30 days', 'Last 90 days', 'Last 12 months'];
const REASON_CODES = ['Industry Mismatch', 'Capacity Overload', 'Client Request', 'Language Barrier', 'Compliance Issue', 'Other'];
const TABS = ['Overview', 'Transactions', 'Spending Report', 'Notes'] as const;
type Tab = typeof TABS[number];

const spendingPie = [
  { name: 'Housing', value: 28, color: '#1E86C3' },
  { name: 'Groceries', value: 22, color: '#1E86C3' },
  { name: 'Tax', value: 18, color: '#1a78b0' },
  { name: 'Transport', value: 12, color: '#5EEAD4' },
  { name: 'Entertainment', value: 8, color: '#99F6E4' },
  { name: 'Other', value: 12, color: 'rgba(30,134,195,0.15)' },
];

const monthlySpend = [
  { month: 'Dec', spend: 2800 },
  { month: 'Jan', spend: 3100 },
  { month: 'Feb', spend: 2950 },
  { month: 'Mar', spend: 3400 },
  { month: 'Apr', spend: 3200 },
  { month: 'May', spend: 3100 },
];

function segmentBg(segment: string) {
  const map: Record<string, string> = {
    'High Net Worth': '#1E86C3',
    'Retail Growth': '#1E86C3',
    'Self-Employed': '#F59E0B',
    'Small Business': '#7C3AED',
  };
  return map[segment] ?? '#6B7280';
}

export default function ClientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagReason, setFlagReason] = useState('');
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [editReport, setEditReport] = useState(false);
  const [notes, setNotes] = useState<ClientNote[]>(() => clientNotes[id ?? ''] ?? []);
  const [reportText, setReportText] = useState("Client's discretionary spend increased 14% in Q1 2026, primarily driven by entertainment and dining categories. Housing costs remain stable and represent the largest single expense at 28% of monthly outgoings. Savings rate has improved marginally versus Q4 2025, with regular ISA contributions maintained throughout the period. No significant anomalies detected in recurring transactions beyond the items noted below.");

  const client = faClients.find(c => c.id === id);

  const txns = useMemo(() => {
    const all = clientTransactions[id ?? ''] ?? [];
    return all.filter(t => {
      const matchCat = categoryFilter === 'All Categories' || t.category === categoryFilter;
      return matchCat;
    });
  }, [id, categoryFilter]);

  if (!client) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: 'var(--text-secondary)' }}>Client not found.</div>
        <Button variant="ghost" onClick={() => navigate('/adviser/clients')} style={{ marginTop: 16 }} icon={<ArrowLeft size={14} />}>Back to Clients</Button>
      </div>
    );
  }

  function handleAddNote() {
    if (!newNoteText.trim()) return;
    const note: ClientNote = {
      id: `n${Date.now()}`,
      author: 'Sarah Mitchell',
      authorInitials: 'SM',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      text: newNoteText.trim(),
    };
    setNotes(n => [note, ...n]);
    setNewNoteText('');
    setNoteModalOpen(false);
    showToast('Note added successfully.');
  }

  function handleDeleteNote(noteId: string) {
    setNotes(n => n.filter(x => x.id !== noteId));
    showToast('Note deleted.');
  }

  function handleFlagSubmit() {
    if (!flagReason) return;
    setShowFlagModal(false);
    showToast('Client flagged for reassignment. The Team Manager has been notified.');
  }

  const inputStyle = {
    width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', background: '#1E293B',
  };

  const csvTxns = txns.map(t => ({ Date: t.date, Description: t.description, Category: t.category, Amount: t.amount, Type: t.type }));

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => navigate('/adviser/clients')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, padding: 0 }}
      >
        <ArrowLeft size={15} />
        Back to My Clients
      </button>

      {/* Header */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar initials={client.initials} size={56} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{client.name}</h1>
                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, background: segmentBg(client.segment), color: '#FFFFFF' }}>{client.segment}</span>
                {client.riskFlag !== 'None' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
                    <AlertTriangle size={12} />{client.riskFlag}
                  </span>
                )}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                Client since {client.since} · {client.email} · {client.phone}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost" size="sm" icon={<Flag size={13} />} style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)' }} onClick={() => setShowFlagModal(true)}>Flag for Reassignment</Button>
          </div>
        </div>

        {/* Key metrics */}
        <div style={{ display: 'flex', gap: 24, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--divider)', flexWrap: 'wrap' }}>
          {[
            { label: 'AUM', value: client.aum },
            { label: 'Monthly Income', value: client.monthlyIncome },
            { label: 'Monthly Spend', value: client.monthlySpend },
            { label: 'Savings Rate', value: client.savingsRate },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{m.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--divider)', marginBottom: 24 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: -1, transition: 'color 120ms ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Activity timeline */}
          <Card>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { time: '2 days ago', action: 'Portfolio review completed — Q2 2026 rebalancing discussed', type: 'meeting' },
                { time: '1 week ago', action: 'Document uploaded: Q1 Spending Report', type: 'document' },
                { time: '2 weeks ago', action: 'Suitability assessment updated', type: 'compliance' },
                { time: '3 weeks ago', action: 'Annual review scheduled for 15 May', type: 'meeting' },
                { time: '1 month ago', action: 'KYC form renewed and confirmed', type: 'compliance' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.type === 'meeting' ? '#1E86C3' : item.type === 'document' ? '#1E86C3' : '#F59E0B', flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{item.action}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Risk flags */}
          <Card>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Risk Flags</div>
            {client.riskFlag === 'None' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(34,197,94,0.12)', borderRadius: 8 }}>
                <span style={{ color: '#22C55E', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>✓ No active risk flags</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(239,68,68,0.12)', borderRadius: 8 }}>
                <AlertTriangle size={16} color="#EF4444" />
                <span style={{ color: '#EF4444', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{client.riskFlag}</span>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Transactions tab */}
      {activeTab === 'Transactions' && (
        <div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ height: 36, borderRadius: 8, border: '1px solid var(--border)', padding: '0 32px 0 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)', background: '#1E293B', appearance: 'none', cursor: 'pointer' }}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-tertiary)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ height: 36, borderRadius: 8, border: '1px solid var(--border)', padding: '0 32px 0 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)', background: '#1E293B', appearance: 'none', cursor: 'pointer' }}>
                  {DATE_RANGES.map(d => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown size={13} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-tertiary)' }} />
              </div>
            </div>
            <ExportButton csvData={csvTxns} csvFilename={`transactions-${client.id}.csv`} />
          </div>
          <Card padding={0}>
            {txns.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>No transactions match the selected filters.</div>
            ) : (
              <div className="table-wrap"><table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                    {['DATE', 'DESCRIPTION', 'CATEGORY', 'AMOUNT', 'TYPE'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {txns.map((t, i) => (
                    <tr key={t.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                      <td style={{ padding: '11px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{t.date}</td>
                      <td style={{ padding: '11px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{t.description}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 20, background: 'var(--neutral-50)', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{t.category}</span>
                      </td>
                      <td style={{ padding: '11px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: t.type === 'Credit' ? '#22C55E' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        {t.type === 'Credit' ? '+' : ''}{t.amount}
                      </td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, background: t.type === 'Credit' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: t.type === 'Credit' ? '#22C55E' : '#EF4444' }}>{t.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
            )}
          </Card>
        </div>
      )}

      {/* Spending Report tab */}
      {activeTab === 'Spending Report' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="ghost" size="sm" onClick={() => setEditReport(e => !e)}>{editReport ? 'Save Report' : 'Edit Report'}</Button>
            <ExportButton csvData={spendingPie.map(s => ({ Category: s.name, Percentage: s.value }))} csvFilename="spending-report.csv" />
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* Pie chart */}
            <Card style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Spending by Category</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 180, height: 180, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={spendingPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" strokeWidth={0}>
                        {spendingPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {spendingPie.map(s => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{s.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, marginLeft: 'auto' }}>{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Bar chart */}
            <Card style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Monthly Spend (Last 6 Months)</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthlySpend} barSize={28}>
                  <XAxis dataKey="month" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}k`} />
                  <Tooltip formatter={(v) => `£${Number(v).toLocaleString()}`} cursor={{ fill: 'var(--neutral-50)' }} />
                  <Bar dataKey="spend" fill="#1E86C3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Written summary */}
          <Card>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Spending Pattern Analysis</div>
            {editReport ? (
              <textarea
                value={reportText}
                onChange={e => setReportText(e.target.value)}
                rows={5}
                style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', padding: '10px 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', resize: 'vertical' }}
              />
            ) : (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{reportText}</p>
            )}
          </Card>

          {/* Anomalies */}
          <Card>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Anomalies</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Unusual tax payment of £1,200 on 9 May — confirm with client if this is Q1 self-assessment or an unexpected liability.',
                'Dining category spend is 34% above monthly average for May — possible one-off business entertainment event.',
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 14px', background: 'rgba(245,158,11,0.12)', borderRadius: 8, borderLeft: '3px solid #F59E0B' }}>
                  <AlertTriangle size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#92400E' }}>{a}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Notes tab */}
      {activeTab === 'Notes' && (
        <div>
          <div style={{ display: 'flex', padding: '10px 14px', background: 'var(--neutral-50)', borderRadius: 8, marginBottom: 16, alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Notes are private — not visible to the client.</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => setNoteModalOpen(true)}>Add Note</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {notes.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>No notes yet</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Click "Add Note" to record your first note for this client.</div>
              </div>
            ) : notes.map(note => (
              <Card key={note.id} padding={16}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                    <Avatar initials={note.authorInitials} size={34} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{note.author}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-tertiary)' }}>{note.timestamp}</span>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{note.text}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    style={{ color: 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', transition: 'color 120ms' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = ''; }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Flag modal */}
      <Modal
        open={showFlagModal}
        onClose={() => setShowFlagModal(false)}
        title="Flag for Reassignment"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowFlagModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleFlagSubmit}>Submit Flag</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Client</label>
            <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'var(--neutral-50)', color: 'var(--text-secondary)' }}>{client.name}</div>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reason Code <span style={{ color: '#EF4444' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <select value={flagReason} onChange={e => setFlagReason(e.target.value)} style={{ ...inputStyle, paddingRight: 36, appearance: 'none', cursor: 'pointer' }}>
                <option value="">Select reason...</option>
                {REASON_CODES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </Modal>

      {/* Add note modal */}
      <Modal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        title="Add Private Note"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNoteModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddNote}>Save Note</Button>
          </>
        }
      >
        <textarea
          value={newNoteText}
          onChange={e => setNewNoteText(e.target.value)}
          rows={5}
          placeholder="Enter your private note here..."
          style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)', padding: '10px 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', resize: 'vertical' }}
        />
      </Modal>
    </div>
  );
}
