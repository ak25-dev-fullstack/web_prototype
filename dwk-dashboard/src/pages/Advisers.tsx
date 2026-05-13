import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { advisers } from '../data/mock';

const capacityColor = (pct: number) => pct > 90 ? '#DC2626' : pct > 80 ? '#D97706' : '#0D9488';

export default function Advisers() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = advisers.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 600 }}>Advisers</h1>
        <div style={{ position: 'relative', width: 240 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search advisers"
            style={{
              width: '100%', height: 36, borderRadius: 9999,
              background: '#FFFFFF', border: '1px solid var(--border)',
              paddingLeft: 32, paddingRight: 12,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map((adv, i) => (
          <div
            key={adv.id}
            className="card-anim"
            onClick={() => navigate(`/advisers/${adv.id}`)}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 20,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
              transition: 'box-shadow 200ms ease',
              animationDelay: `${i * 60}ms`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar initials={adv.avatar} size={48} />
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600 }}>{adv.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{adv.role}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={13} fill="#0D9488" color="#0D9488" />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>{adv.satisfaction}</span>
              </span>
              <Badge variant={adv.status === 'on-track' ? 'on-track' : 'review-required'}>
                {adv.status === 'on-track' ? 'On Track' : 'Review Required'}
              </Badge>
            </div>

            <div style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>Capacity</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: capacityColor(adv.capacityPct) }}>{adv.capacityPct}%</span>
              </div>
              <ProgressBar pct={adv.capacityPct} height={6} color={capacityColor(adv.capacityPct)} animated={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
