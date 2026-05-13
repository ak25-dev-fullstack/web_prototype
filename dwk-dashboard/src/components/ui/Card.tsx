import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  padding?: number | string;
}

export default function Card({ children, style, className, padding = 20 }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: '#1E293B',
        border: '1px solid #334155',
        borderRadius: 16,
        padding,
        transition: 'border-color 200ms ease',
        ...style,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1E86C3'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#334155'; }}
    >
      {children}
    </div>
  );
}
