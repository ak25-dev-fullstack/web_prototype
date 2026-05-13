import { useEffect, useState } from 'react';

interface ProgressBarProps {
  pct: number;
  height?: number;
  color?: string;
  animated?: boolean;
}

export default function ProgressBar({ pct, height = 6, color = '#0D9488', animated = true }: ProgressBarProps) {
  const [width, setWidth] = useState(animated ? 0 : pct);

  useEffect(() => {
    if (!animated) return;
    const t = setTimeout(() => setWidth(pct), 50);
    return () => clearTimeout(t);
  }, [pct, animated]);

  return (
    <div style={{ height, background: '#EDF0EF', borderRadius: 9999, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        background: color,
        borderRadius: 9999,
        transition: animated ? 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
      }} />
    </div>
  );
}
