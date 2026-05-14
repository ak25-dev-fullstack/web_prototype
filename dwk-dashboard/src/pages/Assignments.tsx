import { useState } from 'react';
import { DollarSign, AlertTriangle, CheckCircle, SlidersHorizontal, ChevronRight, Star, Users } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import { pendingClients, advisers } from '../data/mock';

const capacityColor = (pct: number) => pct > 80 ? '#EF4444' : pct > 60 ? '#F59E0B' : '#22C55E';

function score(adv: typeof advisers[0]) {
  return Math.round((adv.satisfaction * 12) + (100 - adv.capacityPct) * 0.5 - adv.complaints * 5);
}

export default function Assignments() {
  const { showToast } = useToast();
  const [selectedClient, setSelectedClient] = useState('c1');
  const [assignedAdviser, setAssignedAdviser] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'capacity' | 'satisfaction'>('recommended');

  const client = pendingClients.find(c => c.id === selectedClient);

  const sorted = [...advisers].sort((a, b) => {
    if (sortBy === 'capacity') return a.capacityPct - b.capacityPct;
    if (sortBy === 'satisfaction') return b.satisfaction - a.satisfaction;
    return score(b) - score(a);
  });

  const recommended = sorted[0];

  function handleAssign(adviserId: string) {
    const adv = advisers.find(a => a.id === adviserId);
    setAssignedAdviser(adviserId);
    showToast(`${client?.name ?? 'Client'} assigned to ${adv?.name ?? 'adviser'}.`);
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700 }}>Assignments</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
          Review pending clients and assign them to an adviser.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

        {/* Left — Pending Clients */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600 }}>Pending Clients</span>
            <span style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 9999, padding: '2px 8px', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500 }}>
              {pendingClients.filter(c => c.flagged).length} FLAGGED
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pendingClients.map(client => {
              const active = client.id === selectedClient;
              return (
                <div
                  key={client.id}
                  onClick={() => { setSelectedClient(client.id); setAssignedAdviser(null); }}
                  style={{
                    border: active ? '2px solid #1E86C3' : '1px solid var(--border)',
                    borderRadius: 10, background: active ? 'rgba(30,134,195,0.06)' : '#1E293B',
                    padding: 12, cursor: 'pointer', transition: 'all 150ms ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{client.name}</span>
                    {active && <CheckCircle size={15} color="#1E86C3" />}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{client.industry}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: client.flags.length ? 6 : 0 }}>
                    <DollarSign size={12} color="var(--text-secondary)" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{client.liquidity}</span>
                  </div>
                  {client.flags.map(flag => (
                    <div key={flag} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                      <AlertTriangle size={12} color="#EF4444" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#EF4444' }}>{flag}</span>
                    </div>
                  ))}
                  {client.needs.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                      {client.needs.map(need => (
                        <span key={need} style={{ border: '1px solid #1E86C3', borderRadius: 9999, padding: '1px 8px', fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#1E86C3' }}>{need}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Centre — Adviser selection */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {assignedAdviser ? (
            <Card>
              <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--success-bg)', border: '1px solid var(--success-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle size={24} color="#22C55E" />
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Client Assigned</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  {client?.name} has been assigned to <strong style={{ color: 'var(--text-primary)' }}>{advisers.find(a => a.id === assignedAdviser)?.name}</strong>.
                </div>
                <Button variant="ghost" onClick={() => setAssignedAdviser(null)}>Reassign</Button>
              </div>
            </Card>
          ) : (
            <>
              {/* Sort bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <SlidersHorizontal size={14} /> Sort by:
                </span>
                {(['recommended', 'capacity', 'satisfaction'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    style={{
                      padding: '4px 12px', borderRadius: 20, cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", fontSize: 13,
                      background: sortBy === s ? 'rgba(30,134,195,0.15)' : '#263446',
                      color: sortBy === s ? '#1E86C3' : 'var(--text-secondary)',
                      border: sortBy === s ? '1px solid rgba(30,134,195,0.3)' : '1px solid transparent',
                      transition: 'all 120ms ease',
                    }}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sorted.map((adv, i) => {
                  const isTop = i === 0 && sortBy === 'recommended';
                  return (
                    <div
                      key={adv.id}
                      style={{
                        border: isTop ? '2px solid rgba(30,134,195,0.4)' : '1px solid var(--border)',
                        borderRadius: 12,
                        background: isTop ? 'rgba(30,134,195,0.05)' : '#1E293B',
                        padding: '16px 18px',
                        transition: 'border-color 150ms ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        <Avatar initials={adv.avatar} size={40} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600 }}>{adv.name}</span>
                            {isTop && (
                              <span style={{ padding: '2px 8px', borderRadius: 20, background: 'rgba(30,134,195,0.15)', color: '#1E86C3', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, border: '1px solid rgba(30,134,195,0.3)' }}>
                                Recommended
                              </span>
                            )}
                            <Badge variant={adv.status === 'on-track' ? 'on-track' : 'review-required'}>
                              {adv.status === 'on-track' ? 'On Track' : 'Review Required'}
                            </Badge>
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{adv.role}</div>

                          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Users size={13} color="var(--text-tertiary)" />
                              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{adv.clients} clients</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                              <Star size={13} fill="#1E86C3" color="#1E86C3" />
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{adv.satisfaction}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>Capacity:</span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: capacityColor(adv.capacityPct) }}>{adv.capacityPct}%</span>
                            </div>
                            {adv.complaints > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <AlertTriangle size={13} color={adv.complaints > 3 ? '#EF4444' : '#F59E0B'} />
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: adv.complaints > 3 ? '#EF4444' : '#F59E0B' }}>{adv.complaints} complaint{adv.complaints !== 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>

                          <div style={{ marginBottom: 12 }}>
                            <ProgressBar pct={adv.capacityPct} height={5} color={capacityColor(adv.capacityPct)} animated={false} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 600, color: '#1E86C3', lineHeight: 1 }}>{score(adv)}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'var(--text-tertiary)' }}>score</div>
                          </div>
                          <Button variant={isTop ? 'primary' : 'ghost'} size="sm" onClick={() => handleAssign(adv.id)}>
                            Assign →
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
