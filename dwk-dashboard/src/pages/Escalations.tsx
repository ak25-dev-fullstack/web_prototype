import type { ReactElement } from 'react';
import { SlidersHorizontal, Zap, MessageSquare, BarChart2, FileSearch } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { escalations } from '../data/mock';

const accentColor: Record<string, string> = {
  'critical-complaint': '#DC2626',
  'capacity-overload':  '#D97706',
  'fin-ai-handover':    '#2563EB',
};

const badgeVariant: Record<string, 'critical-complaint' | 'capacity-overload' | 'fin-ai-handover'> = {
  'critical-complaint': 'critical-complaint',
  'capacity-overload':  'capacity-overload',
  'fin-ai-handover':    'fin-ai-handover',
};

const actionIcon: Record<string, ReactElement> = {
  'View Chat History':         <MessageSquare size={13} />,
  'View Performance Metrics':  <BarChart2 size={13} />,
  'Review AI Logs':            <FileSearch size={13} />,
};

export default function Escalations() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            Escalations Queue
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
            Active management required for 4 critical items in the queue.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="ghost" icon={<SlidersHorizontal size={15} />}>Filters</Button>
          <Button variant="primary" icon={<Zap size={15} />}>Quick Resolve</Button>
        </div>
      </div>

      {/* Escalation cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {escalations.map((esc, i) => (
          <div
            key={esc.id}
            className="card-anim"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              borderLeft: `4px solid ${accentColor[esc.type]}`,
              padding: 20,
              boxShadow: 'var(--shadow-card)',
              animationDelay: `${i * 60}ms`,
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Badge variant={badgeVariant[esc.type]}>{esc.label}</Badge>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>Case #{esc.id}</span>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>{esc.timeAgo}</span>
            </div>

            {/* Title */}
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
              {esc.title}
            </div>

            {/* People row */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
              {esc.client && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials={esc.client.avatar} size={28} />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Client</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{esc.client.name}</div>
                  </div>
                </div>
              )}
              {esc.queueType && (
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Queue</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{esc.queueType}</div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {esc.adviser ? (
                  <>
                    <Avatar initials={esc.adviser.avatar} size={28} />
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Assigned Adviser</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{esc.adviser.name}</div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Assigned Adviser</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: '#DC2626' }}>Unassigned</div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--divider)', marginBottom: 14 }} />

            {/* Actions row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                {esc.actions.map(action => (
                  <button key={action} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--primary)',
                    padding: 0,
                  }}>
                    {actionIcon[action]}
                    {action}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {esc.buttons.filter(b => b !== esc.primaryButton).map(btn => (
                  <Button key={btn} variant="ghost" size="sm">{btn}</Button>
                ))}
                <Button variant={esc.primaryButton === 'Resolve' ? 'dark' : 'primary'} size="sm">
                  {esc.primaryButton}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
