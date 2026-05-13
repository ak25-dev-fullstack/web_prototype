import type { ReactNode } from 'react';

type BadgeVariant = 'critical-complaint' | 'capacity-overload' | 'fin-ai-handover' | 'high-match' | 'on-track' | 'review-required' | 'top-performer';

const styles: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
  'critical-complaint': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  'capacity-overload':  { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  'fin-ai-handover':    { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  'high-match':         { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
  'on-track':           { bg: '#ECFDF5', color: '#059669' },
  'review-required':    { bg: '#FEF2F2', color: '#DC2626' },
  'top-performer':      { bg: '#0D9488', color: '#FFFFFF' },
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
      borderRadius: 4,
      padding: '2px 8px',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {icon}
      {children}
    </span>
  );
}
