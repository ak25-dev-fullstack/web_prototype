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
    const startVal = 0;

    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((startVal + (target - startVal) * ease).toFixed(decimals)));
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
        background: critical ? '#FEF2F2' : '#FFFFFF',
        border: `1px solid ${critical ? '#FECACA' : '#DDE4E2'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', fontWeight: 400 }}>
          {label}
        </span>
        <span style={{ color: critical ? '#DC2626' : 'var(--primary)', opacity: 0.8 }}>
          {icon}
        </span>
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 500, lineHeight: 1, color: critical ? '#DC2626' : 'var(--text-primary)' }}>
        {display}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: critical ? '#DC2626' : 'var(--text-secondary)' }}>
        {sub}
      </div>
    </Card>
  );
}
