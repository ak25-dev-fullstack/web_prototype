interface DWKLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { dwk: 17, barH: 14, fin: 8.5,  gap: 7,  barW: 1.5 },
  md: { dwk: 22, barH: 18, fin: 10.5, gap: 8,  barW: 1.5 },
  lg: { dwk: 34, barH: 27, fin: 14,   gap: 10, barW: 1.5 },
};

export default function DWKLogo({ size = 'md' }: DWKLogoProps) {
  const s = sizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap, lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: s.dwk,
        fontWeight: 800,
        color: '#9580C8',
        letterSpacing: '-0.01em',
        userSelect: 'none',
      }}>DWK</span>

      <div style={{
        width: s.barW,
        height: s.barH,
        background: '#A893D4',
        opacity: 0.7,
        borderRadius: 1,
        flexShrink: 0,
      }} />

      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: s.fin,
        fontWeight: 300,
        color: '#A893D4',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}>FINANCE</span>
    </div>
  );
}
