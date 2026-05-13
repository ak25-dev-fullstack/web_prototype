import { Users, UserCheck, Star, AlertTriangle, Calendar, BarChart2, FileText, Download } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { teamStats, heatmapData, clientSegmentation, aumByCategory, advisers, recentReports, communications, dailyBriefing } from '../data/mock';

const heatColor = (score: number) => {
  if (score <= 2) return 'var(--chart-1)';
  if (score <= 3) return 'var(--chart-2)';
  if (score <= 4) return 'var(--chart-3)';
  if (score <= 5) return 'var(--chart-4)';
  if (score <= 6) return 'var(--chart-6)';
  return 'var(--chart-7)';
};

const capacityColor = (pct: number) => pct > 90 ? '#EF4444' : pct > 80 ? '#F59E0B' : '#1E86C3';

function Heatmap() {
  return (
    <Card className="card-anim" style={{ animationDelay: '60ms' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Team Performance Heatmap</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>
          <Calendar size={14} /> Last 8 Weeks
        </span>
      </div>

      <div className="table-wrap" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: '4px 6px', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: 80, textAlign: 'left', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 400, paddingBottom: 4 }}>Adviser</th>
              {heatmapData.weeks.map(w => (
                <th key={w} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 400, textAlign: 'center', paddingBottom: 4 }}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.advisers.map((adv, ri) => (
              <tr key={adv.name}>
                <td style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', paddingRight: 8, whiteSpace: 'nowrap' }}>{adv.name}</td>
                {adv.scores.map((score, ci) => (
                  <td key={ci} style={{ padding: 0 }}>
                    <div
                      title={`Score: ${score}`}
                      style={{
                        width: 40, height: 32, borderRadius: 4,
                        background: heatColor(score),
                        cursor: 'pointer',
                        transition: 'transform 120ms ease',
                        opacity: 0,
                        animation: `card-in 200ms ease both`,
                        animationDelay: `${(ri * 8 + ci) * 30}ms`,
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function DonutChart() {
  return (
    <Card className="card-anim" style={{ flex: 1, animationDelay: '120ms' }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Client Segmentation</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={clientSegmentation.map(d => ({ name: d.label, value: d.pct }))} cx="50%" cy="50%" innerRadius={70} outerRadius={95} dataKey="value" strokeWidth={0}>
                {clientSegmentation.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1 }}>1.4k</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Total</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {clientSegmentation.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{d.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function AUMBars() {
  const max = Math.max(...aumByCategory.map(d => d.value));
  return (
    <Card className="card-anim" style={{ flex: 1, animationDelay: '180ms' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>AUM by Portfolio Category</span>
        <BarChart2 size={18} color="var(--text-tertiary)" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {aumByCategory.map((d) => (
          <div key={d.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{d.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{d.display}</span>
            </div>
            <ProgressBar pct={(d.value / max) * 100} height={8} color="#1E86C3" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function LeaderboardTable() {
  return (
    <Card className="card-anim" style={{ animationDelay: '240ms' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Adviser Leaderboard</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>May 12 – May 18, 2025</span>
          <button style={{ padding: '4px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)', cursor: 'pointer' }}>Filters</button>
        </div>
      </div>
      <div className="table-wrap"><table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--divider)' }}>
            {['ADVISER', 'WORKLOAD DISTRIBUTION', 'SATISFACTION', 'COMPLAINTS', 'STATUS'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {advisers.slice(0, 4).map((adv, i) => (
            <tr key={adv.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initials={adv.avatar} size={36} />
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{adv.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{adv.role}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ width: 120, marginBottom: 4 }}>
                  <ProgressBar pct={adv.capacityPct} height={6} color={capacityColor(adv.capacityPct)} animated={false} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>
                  {adv.clients} Clients / <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{adv.capacityPct}%</span> Cap
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} fill="#1E86C3" color="#1E86C3" />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{adv.satisfaction}</span>
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: adv.complaints > 3 ? '#EF4444' : 'var(--text-primary)' }}>
                  {adv.complaints}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <Badge variant={adv.status === 'on-track' ? 'on-track' : 'review-required'}>
                  {adv.status === 'on-track' ? 'On Track' : 'Review Required'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </Card>
  );
}

function DailyBriefing() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Briefing card */}
      <div style={{ background: '#0A1A2F', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={16} color="#1E86C3" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#FFFFFF' }}>Daily Briefing</span>
          </div>
          <Calendar size={16} color="var(--sidebar-text)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {dailyBriefing.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#1E86C3', flexShrink: 0, minWidth: 48 }}>{item.time}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#94A3B8' }}>{item.text}</span>
            </div>
          ))}
        </div>
        <button style={{
          width: '100%', height: 36, borderRadius: 8, background: '#1E86C3',
          color: '#FFFFFF', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
          border: 'none', cursor: 'pointer',
        }}>
          View Full Feed
        </button>
      </div>

      {/* Recent Reports */}
      <Card padding={16}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Recent Reports</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recentReports.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>{r.title} <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>{r.subtitle}</span></div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{r.date}</div>
              </div>
              <button style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)' }}>
                <Download size={13} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Communications */}
      <Card padding={16}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Communications</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--primary)', cursor: 'pointer' }}>View all</span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', borderBottom: '2px solid var(--primary)', paddingBottom: 4 }}>Recent</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Unread (3)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {communications.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>{c.from}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{c.subject}</div>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{c.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="two-col" style={{ gap: 24 }}>
      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 16 }}>
          <StatCard label="Team Size" value={teamStats.teamSize} sub={teamStats.teamSizeChange} icon={<Users size={20} />} />
          <StatCard label="Active Clients" value={teamStats.activeClients} sub={`Avg ${teamStats.avgClientsPerAdviser} per adviser`} icon={<UserCheck size={20} />} />
          <StatCard label="Client SAT (CSAT)" value={teamStats.csatScore} sub={teamStats.csatTarget} icon={<Star size={20} />} decimals={2} />
          <StatCard label="Open Escalations" value={teamStats.openEscalations} sub={`${teamStats.criticalEscalations} Critical Priority`} icon={<AlertTriangle size={20} />} critical />
        </div>

        <Heatmap />

        <div style={{ display: 'flex', gap: 16 }}>
          <DonutChart />
          <AUMBars />
        </div>

        <LeaderboardTable />
      </div>

      {/* Right sidebar */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <DailyBriefing />
      </div>
    </div>
  );
}
