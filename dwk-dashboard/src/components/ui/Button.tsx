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
  primary: { background: '#0D9488', color: '#FFFFFF' },
  ghost:   { background: 'transparent', color: '#0F2421', border: '1px solid #DDE4E2' },
  danger:  { background: '#DC2626', color: '#FFFFFF' },
  dark:    { background: '#0D2B27', color: '#FFFFFF' },
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
        borderRadius: 8,
        padding,
        fontFamily: "'DM Sans', sans-serif",
        fontSize,
        fontWeight: 500,
        cursor: 'pointer',
        border: 'none',
        transition: 'background 120ms ease, box-shadow 120ms ease',
        width: fullWidth ? '100%' : undefined,
        justifyContent: fullWidth ? 'center' : undefined,
        ...vStyle,
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        if (variant === 'primary') el.style.background = '#0F766E';
        if (variant === 'ghost') el.style.background = '#F4F6F5';
        if (variant === 'danger') el.style.background = '#B91C1C';
        if (variant === 'dark') el.style.background = '#0a2220';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.background = vStyle.background as string;
      }}
    >
      {icon}
      {children}
    </button>
  );
}
