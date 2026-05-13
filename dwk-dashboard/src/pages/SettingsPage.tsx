import { useState, useMemo } from 'react';
import { User, ClipboardList, ChevronDown } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { auditLog } from '../data/faMock';
import { tmAuditLog } from '../data/tmMock';

const ACTION_TYPES = ['All', 'View', 'Export', 'Edit', 'Reassign', 'Login'];
const TABS = ['Profile', 'Audit Log'] as const;
type Tab = typeof TABS[number];

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('Profile');
  const [actionFilter, setActionFilter] = useState('All');

  const log = user?.role === 'team-manager' ? tmAuditLog : auditLog;

  const filtered = useMemo(() => {
    if (actionFilter === 'All') return log;
    return log.filter(r => r.action === actionFilter);
  }, [log, actionFilter]);

  const inputStyle = {
    width: '100%', height: 40, borderRadius: 8,
    border: '1px solid var(--border)', padding: '0 12px',
    fontFamily: "'Inter', sans-serif", fontSize: 14,
    color: 'var(--text-primary)', background: 'var(--neutral-50)',
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Manage your profile and review system activity.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--divider)', marginBottom: 24 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab === 'Profile' ? <User size={15} /> : <ClipboardList size={15} />}
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Profile' && (
        <div style={{ maxWidth: 560 }}>
          <Card>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Profile Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input defaultValue={user?.name ?? ''} readOnly style={inputStyle} />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Role</label>
                <input defaultValue={user?.title ?? ''} readOnly style={inputStyle} />
              </div>
              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email</label>
                <input defaultValue={user?.email ?? ''} readOnly style={inputStyle} />
              </div>
              <div style={{ paddingTop: 8, borderTop: '1px solid var(--divider)' }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Password changes must be requested through IT support.</div>
                <Button variant="ghost" style={{ color: 'var(--text-tertiary)' }} onClick={() => {}}>Contact IT to change password</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Audit Log' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
              Showing {filtered.length} of {log.length} events
            </div>
            <div style={{ position: 'relative' }}>
              <select
                value={actionFilter}
                onChange={e => setActionFilter(e.target.value)}
                style={{ height: 36, borderRadius: 8, border: '1px solid var(--border)', padding: '0 32px 0 12px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)', background: '#1E293B', cursor: 'pointer', appearance: 'none' }}
              >
                {ACTION_TYPES.map(a => <option key={a} value={a}>{a === 'All' ? 'All Actions' : a}</option>)}
              </select>
              <ChevronDown size={13} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
            </div>
          </div>

          <Card padding={0}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>No audit events match the selected filter.</div>
            ) : (
              <div className="table-wrap" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                      {['TIMESTAMP', 'USER', 'ACTION', 'TARGET', 'IP ADDRESS'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, i) => {
                      const actionColors: Record<string, string> = {
                        View: '#1E86C3', Export: '#22C55E', Edit: '#F59E0B', Reassign: '#7C3AED', Login: '#6B7280',
                      };
                      const ac = actionColors[row.action] ?? 'var(--text-secondary)';
                      return (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#1E293B' : '#263446', borderBottom: '1px solid var(--divider)' }}>
                          <td style={{ padding: '11px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{row.timestamp}</td>
                          <td style={{ padding: '11px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>{row.user}</td>
                          <td style={{ padding: '11px 16px' }}>
                            <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, background: ac + '18', color: ac }}>{row.action}</span>
                          </td>
                          <td style={{ padding: '11px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{row.target}</td>
                          <td style={{ padding: '11px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{row.ip}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
