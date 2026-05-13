import { Users, TrendingUp, Star, ClipboardList, Calendar, ShieldCheck, Clock } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const recentClients = [
  { initials: 'MC', name: 'Margaret Chen', action: 'Portfolio review completed', time: '2h ago', tag: 'completed' },
  { initials: 'RH', name: 'Robert Hannigan', action: 'Risk assessment pending', time: '4h ago', tag: 'pending' },
  { initials: 'SA', name: 'Sophia Andersson', action: 'Annual review due soon', time: 'Yesterday', tag: 'due' },
  { initials: 'DO', name: 'David Okonkwo', action: 'New investment enquiry', time: '2 days ago', tag: 'new' },
  { initials: 'PW', name: 'Patricia Walsh', action: 'Documentation signed', time: '3 days ago', tag: 'completed' },
];

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

const portfolioCategories = [
  { label: 'Growth Equities', aum: '$8.2M', pct: 78 },
  { label: 'Fixed Income', aum: '$6.1M', pct: 58 },
  { label: 'Alternatives', aum: '$7.8M', pct: 74 },
  { label: 'Cash & Money Market', aum: '$6.3M', pct: 60 },
];

const tagVariant: Record<string, string> = {
  completed: '#059669',
  pending: '#D97706',
  due: '#DC2626',
  new: '#2563EB',
};

const tagLabel: Record<string, string> = {
  completed: 'Completed',
  pending: 'Pending',
  due: 'Due',
  new: 'New',
};

const typeColor: Record<string, string> = {
  meeting: '#0D9488',
  call: '#2563EB',
  internal: '#6B7280',
};

export default function AdviserDashboard() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
          Good morning, Sarah
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
          You have 4 client meetings and 2 compliance tasks due this week.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <StatCard label="My Clients" value={47} sub="↑ 3 new this month" icon={<Users size={20} />} />
        <StatCard label="Total AUM" value="$28.4M" sub="↑ 2.3% this quarter" icon={<TrendingUp size={20} />} />
        <StatCard label="Client Satisfaction" value={4.7} sub="Target: 4.5★" icon={<Star size={20} />} decimals={1} />
        <StatCard label="Reviews Due" value={6} sub="Next due in 3 days" icon={<ClipboardList size={20} />} critical />
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>

          {/* Recent client activity */}
          <Card>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Client Activity</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                  {['CLIENT', 'LAST ACTION', 'TIME', 'STATUS'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentClients.map((c, i) => (
                  <tr key={c.name} style={{ background: i % 2 === 0 ? '#fff' : 'var(--neutral-50)', borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initials={c.initials} size={34} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{c.action}</td>
                    <td style={{ padding: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{c.time}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        display: 'inline-block', padding: '2px 10px', borderRadius: 20,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                        background: tagVariant[c.tag] + '18', color: tagVariant[c.tag],
                      }}>
                        {tagLabel[c.tag]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Portfolio snapshot */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600 }}>Portfolio Snapshot</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Total AUM: <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: 'var(--text-primary)' }}>$28.4M</span></span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {portfolioCategories.map(c => (
                <div key={c.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{c.label}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{c.aum}</span>
                  </div>
                  <ProgressBar pct={c.pct} height={8} color="#0D9488" />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--neutral-50)', borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
              Detailed portfolio analytics coming soon
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Today's schedule */}
          <div style={{ background: '#0D2B27', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Calendar size={16} color="#2DD4BF" />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Today's Schedule</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {schedule.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#2DD4BF', flexShrink: 0, marginTop: 2 }}>{s.time}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: '#FFFFFF', marginBottom: 2 }}>{s.title}</div>
                    {s.client && (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#A8C4BF' }}>{s.client}</div>
                    )}
                    <span style={{
                      display: 'inline-block', marginTop: 2, padding: '1px 8px', borderRadius: 20,
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                      background: typeColor[s.type] + '25', color: typeColor[s.type],
                    }}>
                      {s.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance checklist */}
          <Card padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <ShieldCheck size={16} color="#0D9488" />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600 }}>Compliance Tasks</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {compliance.map(c => {
                const pct = Math.round((c.done / c.total) * 100);
                const done = c.done === c.total;
                return (
                  <div key={c.task}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: done ? 'var(--text-tertiary)' : 'var(--text-primary)', fontWeight: 500 }}>
                        {c.task}
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: done ? '#059669' : 'var(--text-secondary)' }}>
                        {c.done}/{c.total}
                      </span>
                    </div>
                    <ProgressBar pct={pct} height={5} color={done ? '#059669' : '#0D9488'} animated={false} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-tertiary)' }}>Due: {c.due}</span>
                      {done && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#059669', fontWeight: 600 }}>✓ Done</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick links placeholder */}
          <Card padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Clock size={16} color="#0D9488" />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600 }}>Upcoming Reviews</span>
            </div>
            {[
              { name: 'Sophia Andersson', date: '15 May', initials: 'SA' },
              { name: 'Tom Nguyen', date: '17 May', initials: 'TN' },
              { name: 'Lucy Pearce', date: '20 May', initials: 'LP' },
            ].map(r => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar initials={r.initials} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{r.date}</div>
                </div>
                <Badge variant="review-required">Due</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
