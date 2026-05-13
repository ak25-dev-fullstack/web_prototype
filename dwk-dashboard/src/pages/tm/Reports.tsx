import { useState } from 'react';
import { BarChart2, Download, RefreshCw, Plus, Loader } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ExportButton from '../../components/ui/ExportButton';
import { useToast } from '../../context/ToastContext';

const recentReports = [
  { id: 'r1', title: 'Team Performance Report', subtitle: 'Weekly', date: '2026-05-18', format: 'PDF', canRegenerate: true },
  { id: 'r2', title: 'Product Performance (Anonymised)', subtitle: '', date: '2026-05-15', format: 'PDF', canRegenerate: false },
  { id: 'r3', title: 'Q1 Compliance Summary', subtitle: '', date: '2026-04-01', format: 'PDF', canRegenerate: false },
  { id: 'r4', title: 'AUM Growth Report', subtitle: '', date: '2026-05-01', format: 'Excel', canRegenerate: false },
  { id: 'r5', title: 'Client Satisfaction Survey Results', subtitle: '', date: '2026-04-28', format: 'PDF', canRegenerate: false },
];

const REPORT_TYPES = ['Team Performance', 'Compliance Summary', 'AUM Breakdown', 'Client Satisfaction', 'Adviser Leaderboard'];
const FREQUENCIES = ['Weekly', 'Monthly', 'Quarterly'];
const FORMATS = ['PDF', 'CSV', 'Both'];
const DATE_RANGES = ['Last 7 days', 'Last 30 days', 'Last Quarter', 'Custom'];

export default function Reports() {
  const { showToast } = useToast();
  const [scheduleType, setScheduleType] = useState('Team Performance');
  const [scheduleFreq, setScheduleFreq] = useState('Monthly');
  const [scheduleFormat, setScheduleFormat] = useState('PDF');
  const [genOpen, setGenOpen] = useState(false);
  const [genType, setGenType] = useState('Team Performance');
  const [genRange, setGenRange] = useState('Last 30 days');
  const [genLoading, setGenLoading] = useState(false);
  const [genDone, setGenDone] = useState(false);

  function handleSchedule() {
    const nextDates: Record<string, string> = { Weekly: '20 May 2026', Monthly: '1 Jun 2026', Quarterly: '1 Jul 2026' };
    showToast(`Report scheduled. Next run: ${nextDates[scheduleFreq]}.`);
  }

  function handleGenerate() {
    setGenLoading(true);
    setGenDone(false);
    setTimeout(() => {
      setGenLoading(false);
      setGenDone(true);
    }, 1500);
  }

  function handleDownload(title: string) {
    showToast(`Preparing download: ${title}...`);
  }

  const csvData = recentReports.map(r => ({ Title: r.title, Date: r.date, Format: r.format }));

  const selectStyle = {
    width: '100%', height: 38, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B', cursor: 'pointer', appearance: 'none' as const,
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Reports</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Generate, schedule, and download team reports.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <ExportButton csvData={csvData} csvFilename="reports-index.csv" />
          <Button variant="primary" icon={<Plus size={14} />} onClick={() => { setGenDone(false); setGenOpen(true); }}>Generate Report</Button>
        </div>
      </div>

      {/* Recent reports */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Reports</div>
        <div className="table-wrap"><table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--divider)' }}>
              {['REPORT', 'DATE GENERATED', 'FORMAT', 'ACTIONS'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r, i) => (
              <tr key={r.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <BarChart2 size={16} color="var(--primary)" />
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{r.title}</div>
                      {r.subtitle && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{r.subtitle}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>Generated {r.date}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, background: r.format === 'PDF' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)', color: r.format === 'PDF' ? '#EF4444' : '#22C55E' }}>{r.format}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="ghost" size="sm" icon={<Download size={13} />} onClick={() => handleDownload(r.title)}>Download</Button>
                    {r.canRegenerate && (
                      <Button variant="ghost" size="sm" icon={<RefreshCw size={13} />} onClick={() => showToast(`Regenerating ${r.title}...`)}>Regenerate</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </Card>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {/* Schedule */}
        <Card style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Schedule a Report</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Report Type</label>
              <select value={scheduleType} onChange={e => setScheduleType(e.target.value)} style={selectStyle}>
                {REPORT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Frequency</label>
              <select value={scheduleFreq} onChange={e => setScheduleFreq(e.target.value)} style={selectStyle}>
                {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Format</label>
              <select value={scheduleFormat} onChange={e => setScheduleFormat(e.target.value)} style={selectStyle}>
                {FORMATS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <Button variant="primary" onClick={handleSchedule}>Schedule Report</Button>
          </div>
        </Card>

        {/* Generate now */}
        <Card style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Generate Now</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Immediately generate a report with a custom date range.
          </div>
          <Button variant="dark" icon={<BarChart2 size={14} />} onClick={() => { setGenDone(false); setGenOpen(true); }}>
            Generate Report
          </Button>
        </Card>
      </div>

      {/* Generate modal */}
      <Modal
        open={genOpen}
        onClose={() => { setGenOpen(false); setGenLoading(false); setGenDone(false); }}
        title="Generate Report"
        footer={
          !genDone ? (
            <>
              <Button variant="ghost" onClick={() => { setGenOpen(false); setGenLoading(false); setGenDone(false); }}>Cancel</Button>
              {!genLoading && <Button variant="primary" onClick={handleGenerate}>Generate</Button>}
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => { setGenOpen(false); setGenLoading(false); setGenDone(false); }}>Close</Button>
              <Button variant="primary" icon={<Download size={14} />} onClick={() => { showToast('Downloading PDF...'); setGenOpen(false); setGenDone(false); }}>Download PDF</Button>
            </>
          )
        }
      >
        {!genLoading && !genDone && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Report Type</label>
              <select value={genType} onChange={e => setGenType(e.target.value)} style={selectStyle}>
                {REPORT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Date Range</label>
              <select value={genRange} onChange={e => setGenRange(e.target.value)} style={selectStyle}>
                {DATE_RANGES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
        )}
        {genLoading && (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <Loader size={36} color="var(--primary)" style={{ margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Generating {genType} report…</div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {genDone && (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ fontSize: 22, color: '#22C55E' }}>✓</span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Report ready</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{genType} · {genRange}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
