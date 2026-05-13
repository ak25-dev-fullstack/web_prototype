import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileText, FileSpreadsheet } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ExportButtonProps {
  csvData?: Record<string, unknown>[];
  csvFilename?: string;
}

function exportCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportButton({ csvData = [], csvFilename = 'export.csv' }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handlePDF() {
    setOpen(false);
    window.print();
    showToast('Preparing PDF — use your browser print dialog.');
  }

  function handleCSV() {
    setOpen(false);
    if (csvData.length) {
      exportCSV(csvData, csvFilename);
      showToast('CSV downloaded successfully.');
    } else {
      showToast('No data available to export.', 'error');
    }
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          borderRadius: 10, padding: '8px 14px',
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
          background: 'rgba(30,134,195,0.12)', color: '#1E86C3',
          border: '1.5px solid rgba(30,134,195,0.3)', cursor: 'pointer',
          transition: 'background 120ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,134,195,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(30,134,195,0.12)'; }}
      >
        <Download size={14} />
        Export
        <ChevronDown size={13} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 4,
          background: '#1E293B', border: '1px solid #334155', borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          zIndex: 200, minWidth: 160,
          animation: 'card-in 120ms ease both',
        }}>
          <button
            onClick={handlePDF}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 16px', background: 'none', border: 'none',
              fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)',
              cursor: 'pointer', borderRadius: '12px 12px 0 0', transition: 'background 100ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; }}
          >
            <FileText size={14} color="#EF4444" />
            Export as PDF
          </button>
          <div style={{ height: 1, background: '#334155', margin: '0 12px' }} />
          <button
            onClick={handleCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 16px', background: 'none', border: 'none',
              fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-primary)',
              cursor: 'pointer', borderRadius: '0 0 12px 12px', transition: 'background 100ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#263446'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; }}
          >
            <FileSpreadsheet size={14} color="#22C55E" />
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
}
