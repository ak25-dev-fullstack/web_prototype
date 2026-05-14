import { useState } from 'react';
import {
  BarChart2, Download, RefreshCw, Plus, Loader, Trash2, Check,
  FileText, Clock, LayoutTemplate, X, Pencil,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ProgressBar from '../../components/ui/ProgressBar';
import ExportButton from '../../components/ui/ExportButton';
import { useToast } from '../../context/ToastContext';
import {
  faTemplates, faMetricOptions,
  type ReportTemplate, type ReportCategory,
} from '../../data/reportTemplates';
import { faClients } from '../../data/faMock';

// ── Mock preview data ──────────────────────────────────────────────────────

const spendingCategories = [
  { category: 'Housing', amount: 1325 },
  { category: 'Groceries', amount: 420 },
  { category: 'Transport', amount: 295 },
  { category: 'Utilities', amount: 185 },
  { category: 'Dining', amount: 245 },
  { category: 'Entertainment', amount: 98 },
  { category: 'Healthcare', amount: 78 },
  { category: 'Savings', amount: 535 },
];

const incomeVsSpend = [
  { month: 'Dec', income: 8200, spend: 4900 },
  { month: 'Jan', income: 8400, spend: 5100 },
  { month: 'Feb', income: 8100, spend: 4800 },
  { month: 'Mar', income: 8600, spend: 5300 },
  { month: 'Apr', income: 9100, spend: 5600 },
  { month: 'May', income: 8900, spend: 5200 },
];

const compliance = [
  { task: 'KYC Reviews', done: 10, total: 12 },
  { task: 'Suitability Assessments', done: 8, total: 10 },
  { task: 'AML Checks', done: 12, total: 12 },
  { task: 'Annual Reviews', done: 7, total: 12 },
];

const reviewStatus = [
  { name: 'Completed', value: 7 },
  { name: 'In Progress', value: 3 },
  { name: 'Overdue', value: 2 },
];

const savingsData = faClients.slice(0, 6).map(c => ({
  name: c.initials,
  rate: parseInt(c.savingsRate),
}));

const CHART_COLORS = ['#1E86C3', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

const recentReports = [
  { id: 'r2', title: 'Spending Analysis Report', period: 'April 2026', date: '2026-05-01', format: 'PDF' },
  { id: 'r3', title: 'Compliance Activity Report', period: 'Q1 2026', date: '2026-04-01', format: 'PDF' },
  { id: 'r4', title: 'Client Review Summary', period: 'Monthly', date: '2026-05-05', format: 'PDF' },
];

const DATE_RANGES = ['Last 7 days', 'Last 30 days', 'Last Quarter', 'Last 6 Months', 'Year to Date'];
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
const FORMATS = ['PDF', 'CSV', 'Both'];
const CATEGORIES: ReportCategory[] = ['Performance', 'Compliance', 'Financial', 'Client', 'Operations'];

const catColor: Record<ReportCategory, string> = {
  Performance: '#1E86C3',
  Compliance: '#F59E0B',
  Financial: '#22C55E',
  Client: '#8B5CF6',
  Operations: '#F97316',
};

const selectSt = {
  height: 36, borderRadius: 8, border: '1px solid var(--border)',
  padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 13,
  color: 'var(--text-primary)', background: '#1E293B', cursor: 'pointer',
};

const labelSt = {
  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 as const,
  color: 'var(--text-secondary)', display: 'block' as const, marginBottom: 6,
};

// ── Preview components ─────────────────────────────────────────────────────

function PreviewSpending() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'Avg Monthly Spend', value: '£5,181', sub: 'Across 12 clients' },
          { label: 'Avg Savings Rate', value: '38%', sub: '↑ 2% vs last period' },
          { label: 'Highest Category', value: 'Housing', sub: '£1,325 avg' },
          { label: 'Low Savers', value: '2', sub: 'Clients below 10%' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#263446', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Avg Spending by Category (£/month)</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={spendingCategories}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="category" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8 }} formatter={(v) => [`£${v}`]} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {spendingCategories.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Avg Income vs Expenditure (£)</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={incomeVsSpend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8 }} formatter={(v) => [`£${Number(v).toLocaleString()}`]} />
            <Legend wrapperStyle={{ fontFamily: "'Inter', sans-serif", fontSize: 12 }} />
            <Line type="monotone" dataKey="income" name="Income" stroke="#22C55E" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="spend" name="Expenditure" stroke="#EF4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PreviewCompliance() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 2 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Compliance Task Completion</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {compliance.map(c => {
              const pct = Math.round((c.done / c.total) * 100);
              return (
                <div key={c.task}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{c.task}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: pct === 100 ? '#22C55E' : 'var(--text-primary)' }}>{c.done}/{c.total}</span>
                  </div>
                  <ProgressBar pct={pct} height={7} color={pct === 100 ? '#22C55E' : pct < 80 ? '#F59E0B' : '#1E86C3'} animated={false} />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Status Overview</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Fully compliant', value: '7', color: '#22C55E' },
              { label: 'In progress', value: '3', color: '#1E86C3' },
              { label: 'Flagged / overdue', value: '2', color: '#EF4444' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#263446', borderRadius: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{s.label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewReviews() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'Reviews Completed', value: '7/12', color: '#22C55E' },
          { label: 'In Progress', value: '3', color: '#1E86C3' },
          { label: 'Overdue', value: '2', color: '#EF4444' },
          { label: 'Avg Completion', value: '4.2 days', color: 'var(--text-primary)' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#263446', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Review Status Breakdown</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={reviewStatus} cx="50%" cy="50%" outerRadius={75} dataKey="value" strokeWidth={0} label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {reviewStatus.map((_, i) => <Cell key={i} fill={['#22C55E', '#1E86C3', '#EF4444'][i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Upcoming Reviews</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faClients.filter(c => c.status === 'Due' || c.status === 'Review').slice(0, 5).map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#263446', borderRadius: 8 }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: c.status === 'Due' ? 'rgba(239,68,68,0.15)' : 'rgba(30,134,195,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: c.status === 'Due' ? '#EF4444' : '#1E86C3', flexShrink: 0 }}>{c.initials}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, flex: 1 }}>{c.name}</span>
                <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontFamily: "'Inter', sans-serif", background: c.status === 'Due' ? 'rgba(239,68,68,0.12)' : 'rgba(30,134,195,0.12)', color: c.status === 'Due' ? '#EF4444' : '#1E86C3' }}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewSavings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'Avg Savings Rate', value: '38%', sub: '↑ 2% vs last period' },
          { label: 'ISA Contributions', value: '£48.2K', sub: 'YTD total' },
          { label: 'Pension Contribs', value: '£41.7K', sub: 'YTD total' },
          { label: 'Below Target', value: '2', sub: 'Clients < 20% rate' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#263446', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 600, color: '#22C55E', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Savings Rate by Client (%)</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 70]} unit="%" />
            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8 }} formatter={(v) => [`${v}%`, 'Savings Rate']} />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {savingsData.map((d, i) => <Cell key={i} fill={d.rate < 20 ? '#EF4444' : d.rate < 35 ? '#F59E0B' : '#22C55E'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Savings Rate Targets</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faClients.slice(0, 6).map(c => {
            const rate = parseInt(c.savingsRate);
            return (
              <div key={c.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{c.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: rate < 20 ? '#EF4444' : '#22C55E' }}>{c.savingsRate}</span>
                </div>
                <ProgressBar pct={rate} height={5} color={rate < 20 ? '#EF4444' : rate < 35 ? '#F59E0B' : '#22C55E'} animated={false} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, React.FC> = {
  'fa-spending': PreviewSpending,
  'fa-compliance': PreviewCompliance,
  'fa-reviews': PreviewReviews,
  'fa-savings': PreviewSavings,
};

// ── Template card ──────────────────────────────────────────────────────────

function TemplateCard({ t, active, onSelect, onDelete }: {
  t: ReportTemplate; active: boolean; onSelect: () => void; onDelete?: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: active ? '2px solid #1E86C3' : '1px solid var(--border)',
        borderRadius: 12, background: active ? 'rgba(30,134,195,0.06)' : '#1E293B',
        padding: '14px 16px', cursor: 'pointer', transition: 'all 150ms ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 500, fontFamily: "'Inter', sans-serif", background: catColor[t.category] + '20', color: catColor[t.category] }}>{t.category}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {t.isPrebuilt && <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontFamily: "'Inter', sans-serif", background: '#263446', color: 'var(--text-tertiary)' }}>Pre-built</span>}
          {!t.isPrebuilt && onDelete && (
            <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 2, borderRadius: 4 }}
              onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{t.name}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{t.description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {t.metrics.slice(0, 3).map(m => (
          <span key={m} style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontFamily: "'Inter', sans-serif", background: '#263446', color: 'var(--text-secondary)' }}>{m}</span>
        ))}
        {t.metrics.length > 3 && <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontFamily: "'Inter', sans-serif", background: '#263446', color: 'var(--text-tertiary)' }}>+{t.metrics.length - 3} more</span>}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function FAReports() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'templates' | 'generated' | 'scheduled'>('templates');
  const [selected, setSelected] = useState<ReportTemplate | null>(faTemplates[0]);
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [customTemplates, setCustomTemplates] = useState<ReportTemplate[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [customiseOpen, setCustomiseOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState<ReportCategory>('Financial');
  const [newMetrics, setNewMetrics] = useState<string[]>([]);
  const [newDesc, setNewDesc] = useState('');

  function openCustomise() {
    if (!selected) return;
    setNewName(selected.name + ' (Custom)');
    setNewDesc(selected.description);
    setNewCat(selected.category);
    setNewMetrics([...selected.metrics]);
    setCustomiseOpen(true);
  }

  const [schedFreq, setSchedFreq] = useState('Monthly');
  const [schedFormat, setSchedFormat] = useState('PDF');
  const [schedReports, setSchedReports] = useState([
    { id: 's1', title: 'Client Portfolio Overview', frequency: 'Monthly', nextRun: '1 Jun 2026', format: 'PDF' },
    { id: 's2', title: 'Compliance Activity Report', frequency: 'Quarterly', nextRun: '1 Jul 2026', format: 'PDF' },
  ]);

  const allTemplates = [...faTemplates, ...customTemplates];

  function handleGenerate() {
    setGenerating(true); setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500);
  }

  function handleCreateTemplate() {
    if (!newName.trim()) return;
    const t: ReportTemplate = {
      id: `fa-custom-${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim() || `Custom ${newCat} report.`,
      category: newCat,
      metrics: newMetrics.length ? newMetrics : ['Custom metric'],
      isPrebuilt: false,
    };
    setCustomTemplates(p => [...p, t]);
    setSelected(t);
    setCreateOpen(false);
    setNewName(''); setNewDesc(''); setNewMetrics([]); setNewCat('Financial');
    showToast(`Template "${t.name}" saved.`);
  }

  function handleDeleteTemplate(id: string) {
    setCustomTemplates(p => p.filter(t => t.id !== id));
    if (selected?.id === id) setSelected(faTemplates[0]);
    showToast('Template deleted.');
  }

  function handleSchedule() {
    const name = selected?.name ?? 'Report';
    const nextMap: Record<string, string> = { Daily: '15 May 2026', Weekly: '20 May 2026', Monthly: '1 Jun 2026', Quarterly: '1 Jul 2026' };
    setSchedReports(p => [...p, { id: `s${Date.now()}`, title: name, frequency: schedFreq, nextRun: nextMap[schedFreq], format: schedFormat }]);
    showToast(`Scheduled: ${name} — ${schedFreq}`);
  }

  const csvData = recentReports.map(r => ({ Title: r.title, Period: r.period, Date: r.date, Format: r.format }));
  const PreviewChart = selected ? PREVIEWS[selected.id] : null;

  const tabs = [
    { id: 'templates' as const, label: 'Templates', Icon: LayoutTemplate },
    { id: 'generated' as const, label: 'Generated Reports', Icon: FileText },
    { id: 'scheduled' as const, label: 'Scheduled', Icon: Clock },
  ];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Reports</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
            Build, preview, and schedule client reports from pre-built or custom templates.
          </p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: 10 }}>
          <ExportButton csvData={csvData} csvFilename="fa-reports-index.csv" />
          <Button variant="primary" icon={<Plus size={14} />} onClick={() => setCreateOpen(true)}>New Template</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? '#1E86C3' : 'var(--text-secondary)',
            borderBottom: tab === t.id ? '2px solid #1E86C3' : '2px solid transparent',
            marginBottom: -1, transition: 'color 120ms ease',
          }}>
            <t.Icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'templates' && (
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Pre-built</div>
            {faTemplates.map(t => (
              <TemplateCard key={t.id} t={t} active={selected?.id === t.id} onSelect={() => { setSelected(t); setGenerated(false); }} />
            ))}
            {customTemplates.length > 0 && (
              <>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 8, marginBottom: 2 }}>My Templates</div>
                {customTemplates.map(t => (
                  <TemplateCard key={t.id} t={t} active={selected?.id === t.id} onSelect={() => { setSelected(t); setGenerated(false); }} onDelete={() => handleDeleteTemplate(t.id)} />
                ))}
              </>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {selected ? (
              <div>
                <Card style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700 }}>{selected.name}</span>
                        <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontFamily: "'Inter', sans-serif", background: catColor[selected.category] + '20', color: catColor[selected.category] }}>{selected.category}</span>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{selected.description}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <label style={labelSt}>Date Range</label>
                      <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={selectSt}>
                        {DATE_RANGES.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 20 }}>
                      <Button variant="dark" icon={<Pencil size={14} />} onClick={openCustomise}>Customise</Button>
                      {!generating && !generated && (
                        <Button variant="primary" icon={<BarChart2 size={14} />} onClick={handleGenerate}>Generate Report</Button>
                      )}
                      {generating && (
                        <Button variant="dark">
                          <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                          Generating…
                          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                        </Button>
                      )}
                      {generated && !generating && (
                        <>
                          <Button variant="primary" icon={<Download size={14} />} onClick={() => showToast('Downloading PDF…')}>Download PDF</Button>
                          <Button variant="ghost" icon={<RefreshCw size={14} />} onClick={() => setGenerated(false)}>Reset</Button>
                        </>
                      )}
                    </div>
                  </div>
                  {generated && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--success-bg)', borderRadius: 8, border: '1px solid var(--success-border)', marginTop: 14 }}>
                      <Check size={15} color="#22C55E" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#22C55E' }}>Report generated — {dateRange}</span>
                    </div>
                  )}
                </Card>
                <Card>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BarChart2 size={16} color="#1E86C3" />
                    Preview — {selected.name}
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 400 }}>{dateRange}</span>
                  </div>
                  {PreviewChart ? (
                    <PreviewChart />
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selected.metrics.map(m => (
                        <span key={m} style={{ padding: '6px 12px', borderRadius: 20, background: '#263446', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{m}</span>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--text-tertiary)', fontFamily: "'Inter', sans-serif", fontSize: 14 }}>
                Select a template to preview
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'generated' && (
        <Card>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Generated Reports</div>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                  {['REPORT', 'PERIOD', 'DATE GENERATED', 'FORMAT', 'ACTIONS'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r, i) => (
                  <tr key={r.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <BarChart2 size={15} color="var(--primary)" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{r.title}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{r.period}</td>
                    <td style={{ padding: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{r.date}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, background: r.format === 'PDF' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)', color: r.format === 'PDF' ? '#EF4444' : '#22C55E' }}>{r.format}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Button variant="ghost" size="sm" icon={<Download size={13} />} onClick={() => showToast(`Downloading: ${r.title}…`)}>Download</Button>
                        <Button variant="ghost" size="sm" icon={<RefreshCw size={13} />} onClick={() => showToast(`Regenerating: ${r.title}…`)}>Regenerate</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'scheduled' && (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Card style={{ flex: 2, minWidth: 320 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Active Schedules</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {schedReports.map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: '#263446', borderRadius: 10 }}>
                  <Clock size={16} color="#1E86C3" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                      {s.frequency} · Next run: <span style={{ color: 'var(--text-primary)' }}>{s.nextRun}</span>
                    </div>
                  </div>
                  <span style={{ padding: '2px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, background: s.format === 'PDF' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)', color: s.format === 'PDF' ? '#EF4444' : '#22C55E' }}>{s.format}</span>
                  <button onClick={() => { setSchedReports(p => p.filter(x => x.id !== s.id)); showToast('Schedule removed.'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 4, borderRadius: 4, display: 'flex' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                  ><X size={15} /></button>
                </div>
              ))}
              {schedReports.length === 0 && (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-tertiary)', padding: '20px 0', textAlign: 'center' }}>No active schedules.</div>
              )}
            </div>
          </Card>
          <Card style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Schedule a Report</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelSt}>Report Template</label>
                <select value={selected?.id ?? ''} onChange={e => setSelected(allTemplates.find(t => t.id === e.target.value) ?? null)} style={{ ...selectSt, width: '100%' }}>
                  {allTemplates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelSt}>Frequency</label>
                <select value={schedFreq} onChange={e => setSchedFreq(e.target.value)} style={{ ...selectSt, width: '100%' }}>
                  {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label style={labelSt}>Format</label>
                <select value={schedFormat} onChange={e => setSchedFormat(e.target.value)} style={{ ...selectSt, width: '100%' }}>
                  {FORMATS.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <Button variant="primary" fullWidth onClick={handleSchedule}>Add Schedule</Button>
            </div>
          </Card>
        </div>
      )}

      {/* ── Customise modal ── */}
      <Modal
        open={customiseOpen}
        onClose={() => setCustomiseOpen(false)}
        title={`Customise: ${selected?.name ?? ''}`}
        width={560}
        footer={
          <>
            <Button variant="ghost" onClick={() => setCustomiseOpen(false)}>Cancel</Button>
            <Button variant="primary" icon={<Check size={14} />} onClick={() => {
              if (!newName.trim()) return;
              const t: ReportTemplate = {
                id: `fa-custom-${Date.now()}`,
                name: newName.trim(),
                description: newDesc.trim() || selected?.description ?? '',
                category: newCat,
                metrics: newMetrics.length ? newMetrics : (selected?.metrics ?? []),
                isPrebuilt: false,
              };
              setCustomTemplates(p => [...p, t]);
              setSelected(t);
              setCustomiseOpen(false);
              showToast(`Saved as "${t.name}".`);
            }}>Save as My Template</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '10px 14px', background: 'rgba(30,134,195,0.08)', borderRadius: 8, border: '1px solid rgba(30,134,195,0.2)', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
            Based on <strong style={{ color: 'var(--text-primary)' }}>{selected?.name}</strong>. Edits will be saved as a new template in "My Templates" — the original is unchanged.
          </div>
          <div>
            <label style={labelSt}>Template Name</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} style={{ width: '100%', ...selectSt, padding: '0 12px' }} />
          </div>
          <div>
            <label style={labelSt}>Description</label>
            <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)}
              style={{ width: '100%', minHeight: 64, borderRadius: 8, border: '1px solid var(--border)', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)', background: '#1E293B', resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelSt}>Category</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setNewCat(c)} style={{
                  padding: '5px 12px', borderRadius: 20, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13,
                  background: newCat === c ? catColor[c] + '25' : '#263446',
                  color: newCat === c ? catColor[c] : 'var(--text-secondary)',
                  border: newCat === c ? `1.5px solid ${catColor[c]}` : '1.5px solid transparent',
                  transition: 'all 120ms ease',
                }}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelSt}>Metrics</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 200, overflowY: 'auto', padding: '4px 0' }}>
              {faMetricOptions.map(m => {
                const active = newMetrics.includes(m);
                return (
                  <button key={m} onClick={() => setNewMetrics(p => active ? p.filter(x => x !== m) : [...p, m])} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 20, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12,
                    background: active ? 'rgba(30,134,195,0.15)' : '#263446',
                    color: active ? '#1E86C3' : 'var(--text-secondary)',
                    border: active ? '1.5px solid rgba(30,134,195,0.4)' : '1.5px solid transparent',
                    transition: 'all 120ms ease',
                  }}>
                    {active && <Check size={11} />}
                    {m}
                  </button>
                );
              })}
            </div>
            {newMetrics.length > 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>{newMetrics.length} metric{newMetrics.length !== 1 ? 's' : ''} selected</div>}
          </div>
        </div>
      </Modal>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New Report Template" width={560}
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateTemplate} icon={<Check size={14} />}>Save Template</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelSt}>Template Name</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Quarterly Client Summary"
              style={{ width: '100%', ...selectSt, padding: '0 12px' }} />
          </div>
          <div>
            <label style={labelSt}>Description <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(optional)</span></label>
            <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="What does this report cover?"
              style={{ width: '100%', minHeight: 64, borderRadius: 8, border: '1px solid var(--border)', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)', background: '#1E293B', resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelSt}>Category</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setNewCat(c)} style={{
                  padding: '5px 12px', borderRadius: 20, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13,
                  background: newCat === c ? catColor[c] + '25' : '#263446',
                  color: newCat === c ? catColor[c] : 'var(--text-secondary)',
                  border: newCat === c ? `1.5px solid ${catColor[c]}` : '1.5px solid transparent',
                  transition: 'all 120ms ease',
                }}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelSt}>Metrics to Include</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 200, overflowY: 'auto', padding: '4px 0' }}>
              {faMetricOptions.map(m => {
                const active = newMetrics.includes(m);
                return (
                  <button key={m} onClick={() => setNewMetrics(p => active ? p.filter(x => x !== m) : [...p, m])} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 20, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 12,
                    background: active ? 'rgba(30,134,195,0.15)' : '#263446',
                    color: active ? '#1E86C3' : 'var(--text-secondary)',
                    border: active ? '1.5px solid rgba(30,134,195,0.4)' : '1.5px solid transparent',
                    transition: 'all 120ms ease',
                  }}>
                    {active && <Check size={11} />}
                    {m}
                  </button>
                );
              })}
            </div>
            {newMetrics.length > 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>{newMetrics.length} metric{newMetrics.length !== 1 ? 's' : ''} selected</div>}
          </div>
        </div>
      </Modal>
    </div>
  );
}
