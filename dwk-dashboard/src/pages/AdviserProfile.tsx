import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { advisers, performanceTrends } from '../data/mock';

const morgan = advisers.find(a => a.id === 'a5')!;

const tabs = ['Clients', 'Performance', 'Expertise', 'Activity', 'Notes'];

function AlignmentBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: '#EDF0EF', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: '#1E86C3', borderRadius: 9999,
          width: `${width}%`,
          transition: 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </div>
    </div>
  );
}

function CapacityBar({ current, max }: { current: number; max: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((current / max) * 100), 100);
    return () => clearTimeout(t);
  }, [current, max]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Client Capacity</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-primary)' }}>{current}/{max}</span>
      </div>
      <div style={{ height: 10, background: '#EDF0EF', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: '#1E86C3', borderRadius: 9999,
          width: `${width}%`,
          transition: 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </div>
    </div>
  );
}

const satData = performanceTrends.months.map((m, i) => ({
  month: m,
  Morgan: performanceTrends.satisfaction.morgan[i],
  'Team Avg': performanceTrends.satisfaction.teamAvg[i],
}));

const respData = performanceTrends.months.map((m, i) => ({
  month: m,
  Morgan: performanceTrends.responseTime.morgan[i],
  'Team Avg': performanceTrends.responseTime.teamAvg[i],
}));

export default function AdviserProfile() {
  const [activeTab, setActiveTab] = useState('Performance');

  return (
    <div>
      {/* Header card */}
      <Card style={{ marginBottom: 24, position: 'relative', overflow: 'visible' }}>
        {/* Top Performer badge */}
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <Badge variant="top-performer" icon={<Award size={12} />}>{morgan.badge}</Badge>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {/* Left info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
              <Avatar initials={morgan.avatar} size={80} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 600, color: 'var(--text-primary)' }}>{morgan.name}</h1>
                  <span style={{ border: '1px solid var(--border)', borderRadius: 9999, padding: '2px 10px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{morgan.role}</span>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>
                  Financial Advisor &bull; {morgan.tenure} Tenure &bull; {morgan.location}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {morgan.expertise?.map(tag => (
                    <span key={tag} style={{
                      border: '1px solid var(--border)', borderRadius: 9999, padding: '3px 12px', height: 24,
                      fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <CapacityBar current={morgan.clients} max={morgan.capacityMax!} />
          </div>

          {/* Right dark stats card */}
          <div style={{ background: '#0A1A2F', borderRadius: 12, padding: 20, minWidth: 200 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Total Managed Assets</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 500, color: '#FFFFFF', lineHeight: 1, marginBottom: 4 }}>{morgan.totalAUM}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#1E86C3', marginBottom: 16 }}>{morgan.aumChange}</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>Satisfaction</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#FFFFFF' }}>{morgan.satisfaction}<span style={{ fontSize: 13, color: '#94A3B8' }}>/5</span></div>
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>Retention</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#FFFFFF' }}>{morgan.retention}<span style={{ fontSize: 13, color: '#94A3B8' }}>%</span></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 24, gap: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer',
              marginBottom: -1, transition: 'color 120ms ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Performance' && (
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Performance Trends */}
          <Card style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Performance Trends</span>
              <select style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px', background: 'transparent' }}>
                <option>Last 6 Months</option>
              </select>
            </div>

            <div style={{ marginBottom: 6 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>Client Satisfaction</div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={satData}>
                  <XAxis dataKey="month" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: '#879E9A' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontFamily: "'Inter', sans-serif", fontSize: 12 }} />
                  <Line type="monotone" dataKey="Morgan" stroke="#1E86C3" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Team Avg" stroke="#DDE4E2" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>Response Time (Hours)</div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={respData}>
                  <XAxis dataKey="month" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: '#879E9A' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Morgan" stroke="#1E86C3" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Team Avg" stroke="#DDE4E2" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Expertise Alignment */}
          <Card style={{ width: 320, flexShrink: 0 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Expertise Alignment</div>
            <AlignmentBar label="Tax Advisory Coverage" pct={morgan.expertiseAlignment!.taxAdvisory} delay={100} />
            <AlignmentBar label="Retirement Planning Coverage" pct={morgan.expertiseAlignment!.retirementPlanning} delay={200} />
            <AlignmentBar label="Investment Strategy Coverage" pct={morgan.expertiseAlignment!.investmentStrategy} delay={300} />

            {/* Expertise anomaly note */}
            <div style={{
              background: 'rgba(245,158,11,0.12)',
              borderLeft: '3px solid #F59E0B',
              borderRadius: 8,
              padding: 12,
              marginTop: 8,
            }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#F59E0B', marginBottom: 4 }}>
                Expertise mismatch flagged
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {morgan.anomaly}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab !== 'Performance' && (
        <Card>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', padding: '20px 0', textAlign: 'center' }}>
            {activeTab} content coming soon.
          </div>
        </Card>
      )}
    </div>
  );
}
