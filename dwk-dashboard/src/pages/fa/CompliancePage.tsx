import { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';

const complianceTasks = [
  {
    task: 'Q2 KYC Reviews',
    done: 18, total: 24, due: '30 May',
    pct: 75, color: '#1E86C3',
    pending: ['Robert Hannigan', 'James Thornton', 'Noah Patel', 'Helena Browne', 'Thomas Keller', "Liam O'Brien"],
  },
  {
    task: 'Suitability Assessments',
    done: 12, total: 15, due: '15 Jun',
    pct: 80, color: '#1E86C3',
    pending: ['Robert Hannigan', 'James Thornton', 'Noah Patel'],
  },
  {
    task: 'AML Checks',
    done: 47, total: 47, due: '31 May',
    pct: 100, color: '#22C55E',
    pending: [],
  },
  {
    task: 'Annual Reviews',
    done: 0, total: 6, due: 'Overdue',
    pct: 0, color: '#EF4444',
    pending: ['Sophia Andersson', 'Margaret Chen', 'Thomas Keller', 'Emily Sutherland', "Liam O'Brien", 'David Okonkwo'],
  },
];

const fcaGuidance = [
  {
    title: 'FCA Consumer Duty (July 2023)',
    body: 'Firms must act to deliver good outcomes for retail customers across four outcome areas: products and services, price and value, consumer understanding, and consumer support.',
  },
  {
    title: 'HMRC Self-Assessment Deadlines',
    body: 'Relevant for clients flagged as self-employed. Online submissions are due 31 January following the tax year end. Ensure documentation is complete before the deadline.',
  },
  {
    title: 'FCA Suitability Rules (COBS 9)',
    body: 'Personalised recommendations must be suitable for the client\'s individual circumstances, including their knowledge, experience, financial situation, and investment objectives.',
  },
  {
    title: 'UK GDPR Data Retention',
    body: 'Client financial data must not be retained beyond the agreed period. Ensure data minimisation policies are adhered to and deletion is documented appropriately.',
  },
];

const recentActivity = [
  { action: 'KYC Completed', client: 'Margaret Chen', date: '2026-05-10' },
  { action: 'Suitability Assessment Updated', client: 'Emily Sutherland', date: '2026-05-08' },
  { action: 'AML Screening Passed', client: 'Fatima Al-Rashid', date: '2026-05-06' },
  { action: 'Annual Review Scheduled', client: 'Sophia Andersson', date: '2026-05-04' },
  { action: 'KYC Completed', client: "Liam O'Brien", date: '2026-05-02' },
];

export default function CompliancePage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [fcaOpen, setFcaOpen] = useState<Set<number>>(new Set());

  function toggleTask(task: string) {
    setExpanded(s => { const n = new Set(s); n.has(task) ? n.delete(task) : n.add(task); return n; });
  }

  function toggleFca(i: number) {
    setFcaOpen(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Compliance</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Track regulatory tasks, access FCA guidance, and review compliance activity.</p>
      </div>

      {/* Compliance tasks */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <ShieldCheck size={18} color="var(--primary)" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Compliance Tasks</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {complianceTasks.map(ct => (
            <div key={ct.task}>
              <div style={{ padding: '14px 0', borderBottom: expanded.has(ct.task) ? 'none' : '1px solid var(--divider)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{ct.task}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ct.pct === 100 ? '#22C55E' : 'var(--text-secondary)' }}>{ct.done}/{ct.total}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: ct.due === 'Overdue' ? '#EF4444' : 'var(--text-tertiary)', fontWeight: ct.due === 'Overdue' ? 600 : 400 }}>Due: {ct.due}</span>
                    <Button variant="ghost" size="sm" onClick={() => toggleTask(ct.task)}>
                      {expanded.has(ct.task) ? 'Hide' : 'View Details'}
                    </Button>
                  </div>
                </div>
                <ProgressBar pct={ct.pct} height={6} color={ct.color} />
              </div>

              {expanded.has(ct.task) && (
                <div style={{ padding: '12px 0 16px', borderBottom: '1px solid var(--divider)', background: 'var(--neutral-50)', borderRadius: 8, margin: '4px 0', paddingLeft: 16, paddingRight: 16 }}>
                  {ct.pending.length === 0 ? (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#22C55E', fontWeight: 500 }}>✓ All complete</span>
                  ) : (
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Pending</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {ct.pending.map(name => (
                          <span key={name} style={{ padding: '4px 10px', background: 'rgba(239,68,68,0.12)', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#EF4444', fontWeight: 500 }}>{name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* FCA Reference Panel */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Regulatory Guidance</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {fcaGuidance.map((g, i) => (
            <div key={i} style={{ borderBottom: i < fcaGuidance.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <button
                onClick={() => toggleFca(i)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '14px 0', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{g.title}</span>
                {fcaOpen.has(i) ? <ChevronUp size={16} color="var(--text-tertiary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
              </button>
              {fcaOpen.has(i) && (
                <div style={{ paddingBottom: 14 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{g.body}</p>
                  <button
                    style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => {}}
                  >
                    <ExternalLink size={13} />
                    View full guidance
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Recent activity */}
      <Card>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Compliance Activity</div>
        <div className="table-wrap"><table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--divider)' }}>
              {['ACTION', 'CLIENT', 'DATE'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((a, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                <td style={{ padding: '11px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{a.action}</td>
                <td style={{ padding: '11px 12px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{a.client}</td>
                <td style={{ padding: '11px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-tertiary)' }}>{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </Card>
    </div>
  );
}
