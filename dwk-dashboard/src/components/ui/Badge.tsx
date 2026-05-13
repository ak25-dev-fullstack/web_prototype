import type { ReactNode } from 'react';

type BadgeVariant = 'critical-complaint' | 'capacity-overload' | 'fin-ai-handover' | 'high-match' | 'on-track' | 'review-required' | 'top-performer';

const styles: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
  'critical-complaint': { bg: 'rgba(239,68,68,0.12)',   color: '#EF4444', border: 'rgba(239,68,68,0.3)' },
  'capacity-overload':  { bg: 'rgba(245,158,11,0.12)',  color: '#F59E0B', border: 'rgba(245,158,11,0.3)' },
  'fin-ai-handover':    { bg: 'rgba(30,134,195,0.15)',  color: '#1E86C3', border: 'rgba(30,134,195,0.3)' },
  'high-match':         { bg: 'rgba(34,197,94,0.12)',   color: '#22C55E', border: 'rgba(34,197,94,0.3)' },
  'on-track':           { bg: 'rgba(34,197,94,0.12)',   color: '#22C55E' },
  'review-required':    { bg: 'rgba(239,68,68,0.12)',   color: '#EF4444' },
  'top-performer':      { bg: '#1E86C3',                color: '#FFFFFF' },
};

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Badge({ variant, children, icon }: BadgeProps) {
  const s = styles[variant];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: s.bg,
      color: s.color,
      border: s.border ? `1px solid ${s.border}` : undefined,
      borderRadius: 10,
      padding: '3px 10px',
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {icon}
      {children}
    </span>
  );
}
