import { ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function PIIBadge() {
  const [showTip, setShowTip] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 20, cursor: 'default',
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
          transition: 'background 120ms ease',
        }}
      >
        <ShieldAlert size={13} color="#F59E0B" />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: '#F59E0B', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
          Contains Client Data
        </span>
      </div>

      {showTip && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
          background: '#1E293B', border: '1px solid #334155', borderRadius: 10,
          padding: '10px 14px', zIndex: 500, width: 260,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          animation: 'card-in 100ms ease both',
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#F59E0B', marginBottom: 5 }}>Identifiable client data</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            This page contains personal data. All access and exports are logged in the audit trail under your credentials.
          </p>
        </div>
      )}
    </div>
  );
}
