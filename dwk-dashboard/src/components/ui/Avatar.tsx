interface AvatarProps {
  initials: string;
  size?: number;
  bg?: string;
  color?: string;
  fontSize?: number;
}

export default function Avatar({ initials, size = 36, bg = '#0D9488', color = '#fff', fontSize }: AvatarProps) {
  const fs = fontSize ?? Math.floor(size * 0.36);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      fontSize: fs,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}
