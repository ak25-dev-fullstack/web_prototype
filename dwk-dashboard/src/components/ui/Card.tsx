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
        background: '#FFFFFF',
        border: '1px solid #DDE4E2',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(15,36,33,0.06), 0 1px 2px rgba(15,36,33,0.04)',
        padding,
        transition: 'box-shadow 200ms ease',
        ...style,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(15,36,33,0.10), 0 2px 4px rgba(15,36,33,0.06)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(15,36,33,0.06), 0 1px 2px rgba(15,36,33,0.04)'; }}
    >
      {children}
    </div>
  );
}
