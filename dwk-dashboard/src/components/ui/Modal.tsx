import type { ReactNode, CSSProperties } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;
  footer?: ReactNode;
}

export default function Modal({ open, onClose, title, children, width = 480, footer }: ModalProps) {
  if (!open) return null;

  const overlayStyle: CSSProperties = {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
    animation: 'card-in 150ms ease both',
  };

  return (
    <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: '#1E293B',
        border: '1px solid #334155',
        borderRadius: 16,
        width,
        maxWidth: 'calc(100vw - 48px)',
        maxHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #334155', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
          <button
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, color: 'var(--text-secondary)', transition: 'background 120ms ease, color 120ms ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {footer && (
          <div style={{ padding: '14px 24px', borderTop: '1px solid #334155', display: 'flex', gap: 10, justifyContent: 'flex-end', flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
