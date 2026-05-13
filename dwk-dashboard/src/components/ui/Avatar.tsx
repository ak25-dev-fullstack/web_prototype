interface AvatarProps {
  initials: string;
  size?: number;
  bg?: string;
  color?: string;
  fontSize?: number;
}

export default function Avatar({ initials, size = 36, bg = 'rgba(30,134,195,0.2)', color = '#1E86C3', fontSize }: AvatarProps) {
  const fs = fontSize ?? Math.floor(size * 0.36);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      color,
      border: '1px solid rgba(30,134,195,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: fs,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}
