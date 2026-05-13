import { useState, useMemo } from 'react';
import { FileText, Upload, Eye, Download, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ExportButton from '../../components/ui/ExportButton';
import { useToast } from '../../context/ToastContext';
import { useSearch } from '../../context/SearchContext';
import { faDocuments, faClients } from '../../data/faMock';

const DOC_TYPES = ['All Types', 'PDF Report', 'Compliance', 'Advisory', 'Report'];
const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  'PDF Report': { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  'Compliance': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  'Advisory':   { bg: 'rgba(30,134,195,0.12)', color: '#1E86C3' },
  'Report':     { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' },
};

export default function DocumentsPage() {
  const { query } = useSearch();
  const { showToast } = useToast();
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [localSearch, setLocalSearch] = useState('');
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadClient, setUploadClient] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [uploadFile, setUploadFile] = useState('');

  const clientNames = ['All Clients', ...Array.from(new Set(faDocuments.map(d => d.client))).sort()];
  const searchTerm = query || localSearch;

  const filtered = useMemo(() => {
    return faDocuments.filter(d => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || d.name.toLowerCase().includes(q) || d.client.toLowerCase().includes(q);
      const matchClient = clientFilter === 'All Clients' || d.client === clientFilter;
      const matchType = typeFilter === 'All Types' || d.type === typeFilter;
      return matchSearch && matchClient && matchType;
    });
  }, [searchTerm, clientFilter, typeFilter]);

  const csvData = filtered.map(d => ({ Name: d.name, Client: d.client, Type: d.type, Date: d.date }));

  const selectStyle = {
    height: 36, borderRadius: 8, border: '1px solid var(--border)',
    padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: '#1E293B', cursor: 'pointer',
  };

  function handleDownload(name: string) {
    const blob = new Blob(['DWK Finance — Document Placeholder\n\n' + name], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name.replace(/ /g, '_') + '.pdf';
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloading ${name}...`);
  }

  function handleUpload() {
    if (!uploadClient || !uploadType || !uploadFile) return;
    setUploadOpen(false);
    showToast(`Document "${uploadFile}" uploaded successfully.`);
    setUploadClient('');
    setUploadType('');
    setUploadFile('');
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Documents</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>View, download, and manage client documents.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <ExportButton csvData={csvData} csvFilename="documents.csv" />
          <Button variant="primary" size="sm" icon={<Upload size={14} />} onClick={() => setUploadOpen(true)}>Upload Document</Button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 180, maxWidth: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setLocalSearch(''); }}
            placeholder="Search documents..."
            style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)', paddingLeft: 34, paddingRight: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', background: '#1E293B' }}
          />
        </div>
        <select value={clientFilter} onChange={e => setClientFilter(e.target.value)} style={selectStyle}>
          {clientNames.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={selectStyle}>
          {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <Card padding={0}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <FileText size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>No documents found</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Try adjusting your search or filters.</div>
          </div>
        ) : (
          <div className="table-wrap"><table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                {['DOCUMENT NAME', 'CLIENT', 'TYPE', 'DATE', 'ACTIONS'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => {
                const tc = TYPE_COLORS[doc.type] ?? { bg: 'var(--neutral-50)', color: 'var(--text-secondary)' };
                return (
                  <tr key={doc.id} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FileText size={16} color="var(--text-tertiary)" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{doc.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{doc.client}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, background: tc.bg, color: tc.color }}>{doc.type}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{doc.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Button variant="ghost" size="sm" icon={<Eye size={13} />} onClick={() => setPreviewDoc(doc.name)}>View</Button>
                        <Button variant="ghost" size="sm" icon={<Download size={13} />} onClick={() => handleDownload(doc.name)}>Download</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        )}
      </Card>

      {/* Preview modal */}
      <Modal open={!!previewDoc} onClose={() => setPreviewDoc(null)} title="Document Preview" footer={<Button variant="ghost" onClick={() => setPreviewDoc(null)}>Close</Button>}>
        <div style={{ textAlign: 'center', padding: 24 }}>
          <FileText size={48} color="var(--text-tertiary)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Document Preview</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>{previewDoc}</div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--neutral-50)', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-tertiary)' }}>
            Preview rendering is not available in this prototype environment.
          </div>
        </div>
      </Modal>

      {/* Upload modal */}
      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload Document"
        footer={
          <>
            <Button variant="ghost" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpload}>Upload</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Client <span style={{ color: '#EF4444' }}>*</span></label>
            <select value={uploadClient} onChange={e => setUploadClient(e.target.value)} style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)', padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', background: '#1E293B', appearance: 'none' }}>
              <option value="">Select client...</option>
              {faClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Document Type <span style={{ color: '#EF4444' }}>*</span></label>
            <select value={uploadType} onChange={e => setUploadType(e.target.value)} style={{ width: '100%', height: 36, borderRadius: 8, border: '1px solid var(--border)', padding: '0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', background: '#1E293B', appearance: 'none' }}>
              <option value="">Select type...</option>
              {['PDF Report', 'Compliance', 'Advisory', 'Report', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>File <span style={{ color: '#EF4444' }}>*</span></label>
            <div
              style={{ border: '2px dashed var(--border)', borderRadius: 8, padding: '20px', textAlign: 'center', cursor: 'pointer', background: 'var(--neutral-50)' }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.onchange = (e) => {
                  const f = (e.target as HTMLInputElement).files?.[0];
                  if (f) setUploadFile(f.name);
                };
                input.click();
              }}
            >
              {uploadFile ? (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--primary)', fontWeight: 500 }}>{uploadFile}</div>
              ) : (
                <>
                  <Upload size={24} color="var(--text-tertiary)" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Click to select a file</div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
