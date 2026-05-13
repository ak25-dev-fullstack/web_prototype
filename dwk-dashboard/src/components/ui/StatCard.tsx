import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Card from './Card';

interface StatCardProps {
  label: string;
  value: number | string;
  sub: string;
  icon: ReactNode;
  critical?: boolean;
  decimals?: number;
}

function useCountUp(target: number, decimals = 0, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((0 + (target - 0) * ease).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [target, decimals, duration]);

  return count;
}

export default function StatCard({ label, value, sub, icon, critical, decimals = 0 }: StatCardProps) {
  const numericValue = typeof value === 'number' ? value : 0;
  const count = useCountUp(numericValue, decimals);
  const display = typeof value === 'string' ? value : decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <Card
      className="card-anim"
      style={{
        background: critical ? 'rgba(239,68,68,0.08)' : '#1E293B',
        border: `1px solid ${critical ? 'rgba(239,68,68,0.3)' : '#334155'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', fontWeight: 400 }}>
          {label}
        </span>
        <span style={{
          width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: critical ? 'rgba(239,68,68,0.12)' : 'rgba(30,134,195,0.15)',
          color: critical ? '#EF4444' : '#1E86C3', flexShrink: 0,
        }}>
          {icon}
        </span>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 600, lineHeight: 1, color: critical ? '#EF4444' : 'var(--text-primary)' }}>
        {display}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: critical ? '#F59E0B' : 'var(--text-secondary)' }}>
        {sub}
      </div>
    </Card>
  );
}
