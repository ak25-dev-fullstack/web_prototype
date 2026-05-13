interface DWKLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { dwk: 17, bar: 13, fin: 8.5,  gap: 5,  barGap: 4 },
  md: { dwk: 22, bar: 17, fin: 10.5, gap: 6,  barGap: 5 },
  lg: { dwk: 34, bar: 26, fin: 14,   gap: 9,  barGap: 7 },
};

export default function DWKLogo({ size = 'md' }: DWKLogoProps) {
  const s = sizes[size];
  const purple = '#9585D5';
  const glow = `0 0 10px rgba(149,133,213,0.55), 0 0 24px rgba(149,133,213,0.20)`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap, lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: s.dwk,
        fontWeight: 800,
        color: purple,
        letterSpacing: '-0.01em',
        textShadow: glow,
        userSelect: 'none',
      }}>DWK</span>

      <span style={{
        fontSize: s.bar,
        fontWeight: 200,
        color: purple,
        opacity: 0.45,
        margin: `0 ${s.barGap - s.gap}px`,
        userSelect: 'none',
      }}>|</span>

      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: s.fin,
        fontWeight: 500,
        color: purple,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textShadow: glow,
        userSelect: 'none',
      }}>FINANCE</span>
    </div>
  );
}
