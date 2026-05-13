import { useEffect, useState } from 'react';

interface ProgressBarProps {
  pct: number;
  height?: number;
  color?: string;
  animated?: boolean;
}

export default function ProgressBar({ pct, height = 6, color = '#1E86C3', animated = true }: ProgressBarProps) {
  const [width, setWidth] = useState(animated ? 0 : pct);

  useEffect(() => {
    if (!animated) return;
    const t = setTimeout(() => setWidth(pct), 50);
    return () => clearTimeout(t);
  }, [pct, animated]);

  return (
    <div style={{ height, background: '#334155', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        background: color,
        borderRadius: 3,
        transition: animated ? 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
      }} />
    </div>
  );
}
