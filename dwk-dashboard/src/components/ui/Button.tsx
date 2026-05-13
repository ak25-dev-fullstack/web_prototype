import type { ReactNode, CSSProperties } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'dark';

interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  style?: CSSProperties;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: { background: '#1E86C3', color: '#FFFFFF' },
  ghost:   { background: 'rgba(30,134,195,0.12)', color: '#1E86C3', border: '1.5px solid rgba(30,134,195,0.3)' },
  danger:  { background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1.5px solid rgba(239,68,68,0.3)' },
  dark:    { background: '#263446', color: '#F8FAFC', border: '1px solid #334155' },
};

const hoverBg: Record<ButtonVariant, string> = {
  primary: '#1a78b0',
  ghost:   'rgba(30,134,195,0.2)',
  danger:  'rgba(239,68,68,0.2)',
  dark:    '#2e3d52',
};

export default function Button({ variant = 'primary', children, onClick, icon, style, fullWidth, size = 'md' }: ButtonProps) {
  const vStyle = variantStyles[variant];
  const padding = size === 'sm' ? '6px 12px' : '8px 16px';
  const fontSize = size === 'sm' ? 13 : 14;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 10,
        padding,
        fontFamily: "'Inter', sans-serif",
        fontSize,
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        transition: 'background 120ms ease',
        width: fullWidth ? '100%' : undefined,
        justifyContent: fullWidth ? 'center' : undefined,
        ...vStyle,
        ...style,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = hoverBg[variant]; }}
      onMouseLeave={e => { e.currentTarget.style.background = vStyle.background as string; }}
    >
      {icon}
      {children}
    </button>
  );
}
