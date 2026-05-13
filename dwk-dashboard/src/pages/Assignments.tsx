import { useState, useEffect } from 'react';
import { DollarSign, AlertTriangle, CheckCircle, Cpu, SlidersHorizontal, X, Plus, ChevronRight } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { pendingClients, finAiMatches, adviserPanelList } from '../data/mock';

const capacityColor = (pct: number) => pct > 80 ? '#EF4444' : pct > 50 ? '#F59E0B' : '#1E86C3';

function ExpertiseBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-primary)' }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: '#EDF0EF', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: '#1E86C3', borderRadius: 9999,
          width: `${width}%`,
          transition: 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </div>
    </div>
  );
}

export default function Assignments() {
  const [selectedClient, setSelectedClient] = useState('c1');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 600 }}>Assignments</h1>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Left — Pending Clients */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600 }}>Pending Clients</span>
            <span style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 9999, padding: '2px 8px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.04em' }}>
              4 FLAGGED
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pendingClients.map(client => {
              const active = client.id === selectedClient;
              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client.id)}
                  style={{
                    border: active ? '2px solid #1E86C3' : '1px solid var(--border)',
                    borderRadius: 10, background: active ? '#FFFFFF' : 'var(--neutral-50)',
                    padding: 12, cursor: 'pointer', transition: 'all 150ms ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{client.name}</span>
                    {active && <CheckCircle size={16} color="#1E86C3" />}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{client.industry}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: client.flags.length ? 6 : 0 }}>
                    <DollarSign size={13} color="var(--text-secondary)" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{client.liquidity}</span>
                  </div>
                  {client.flags.map(flag => (
                    <div key={flag} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                      <AlertTriangle size={13} color="#EF4444" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#EF4444' }}>{flag}</span>
                    </div>
                  ))}
                  {client.needs.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {client.needs.map(need => (
                        <span key={need} style={{
                          border: '1px solid #1E86C3', borderRadius: 9999, padding: '2px 8px',
                          fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#1E86C3',
                        }}>{need}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Centre — Fin AI Matching */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ background: '#0A1A2F', borderRadius: '12px 12px 0 0', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E86C3', display: 'inline-block', boxShadow: '0 0 0 3px rgba(45,212,191,0.3)', animation: 'pulse 2s infinite' }} />
                <Cpu size={16} color="#1E86C3" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Fin AI Intelligent Matching</span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#94A3B8' }}>Analysing 124 advisers for Harrington Tech Grp</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>STATUS</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#1E86C3' }}>Optimising Portfolio</div>
            </div>
          </div>

          {/* Filter row */}
          <div style={{ background: '#1E293B', border: '1px solid var(--border)', borderTop: 'none', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Manual Override</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 9999, padding: '2px 10px', fontFamily: "'Inter', sans-serif", fontSize: 12 }}>
              Tax Advisory <X size={11} style={{ cursor: 'pointer' }} />
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px dashed var(--border)', borderRadius: 9999, padding: '2px 10px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', cursor: 'pointer' }}>
              Capacity <Plus size={11} />
            </span>
          </div>

          {/* Match cards */}
          <div style={{ border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
            {finAiMatches.map((match, i) => (
              <div key={match.rank} style={{
                background: i === 0 ? '#FFFFFF' : 'var(--neutral-50)',
                border: i === 0 ? '2px solid #1E86C3' : '1px solid var(--border)',
                margin: 12,
                borderRadius: 10,
                padding: 16,
                marginBottom: i < finAiMatches.length - 1 ? 0 : 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-tertiary)' }}>#{match.rank}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500 }}>{match.adviser}</span>
                    {match.match && <Badge variant="high-match">{match.match}</Badge>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: i === 0 ? 28 : 18, fontWeight: 500, color: '#1E86C3', lineHeight: 1 }}>{match.compatibility}%</div>
                    {i === 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)' }}>Compatibility</div>}
                  </div>
                </div>

                {i === 0 ? (
                  <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Rationale</div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{match.rationale}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Expertise Overlap</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {match.expertise.map((exp, ei) => (
                          <ExpertiseBar key={exp.label} label={exp.label} pct={exp.pct} delay={300 + ei * 100} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{match.rationale}</p>
                )}

                {i === 0 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
                    <Button variant="primary">Confirm Assignment →</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Adviser list */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>Manual Override</span>
            <SlidersHorizontal size={15} color="var(--text-tertiary)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {adviserPanelList.map(adv => (
              <div key={adv.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#1E293B', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer' }}>
                <Avatar initials={adv.avatar} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adv.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adv.role}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: capacityColor(adv.capacity) }}>{adv.capacity}%</span>
                  <ChevronRight size={13} color="var(--text-tertiary)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(45,212,191,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(45,212,191,0.1); }
        }
      `}</style>
    </div>
  );
}
