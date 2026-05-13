import { useState } from 'react';
import { BookOpen, Clock, Tag, ChevronRight, Send, CheckCircle, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  readMins: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  new?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: 'islamic-finance',
    title: 'Islamic Finance — What to Suggest for Muslim Clients',
    summary: 'An overview of Sharia-compliant financial products, ethical investment structures, and how to have sensitive, informed conversations with Muslim clients about halal alternatives to conventional banking.',
    category: 'Client Suitability',
    readMins: 12,
    level: 'Intermediate',
    new: true,
  },
  {
    id: 'managing-debt',
    title: 'Managing Debt — Strategies and Client Conversations',
    summary: 'Practical frameworks for assessing client debt profiles, prioritising repayment strategies, and guiding clients through debt consolidation, balance transfers, and long-term financial recovery plans.',
    category: 'Debt & Credit',
    readMins: 9,
    level: 'Foundational',
  },
  {
    id: 'retirement-self-employed',
    title: 'Retirement Planning for Self-Employed Clients',
    summary: 'Covers SIPPs, SEISs, and pension contribution strategies tailored to irregular income streams. Includes guidance on National Insurance gaps and how to present projections for clients without workplace pensions.',
    category: 'Retirement',
    readMins: 15,
    level: 'Intermediate',
  },
  {
    id: 'esg-investing',
    title: 'ESG Investing — Aligning Portfolios with Client Values',
    summary: 'A practical guide to Environmental, Social and Governance investing. Covers how to screen funds, discuss trade-offs with clients, and document suitability assessments for ESG-aligned portfolios.',
    category: 'Investments',
    readMins: 11,
    level: 'Intermediate',
    new: true,
  },
  {
    id: 'tax-efficient',
    title: 'Tax-Efficient Investing in the UK',
    summary: 'ISA allowances, VCTs, EIS, and capital gains planning. Learn how to structure client portfolios to minimise tax drag across different life stages and income bands.',
    category: 'Tax & Compliance',
    readMins: 14,
    level: 'Advanced',
  },
  {
    id: 'estate-planning',
    title: 'Estate Planning Fundamentals for Advisers',
    summary: 'Covers wills, trusts, inheritance tax thresholds, and how to introduce estate planning conversations without overstepping into legal advice. Includes case study examples.',
    category: 'Estate & Inheritance',
    readMins: 10,
    level: 'Foundational',
  },
  {
    id: 'risk-profiling',
    title: 'Risk Profiling — A Practical Guide',
    summary: 'How to conduct thorough risk assessments, interpret psychometric questionnaires, and document suitability decisions in line with FCA expectations. Includes common client objections and how to handle them.',
    category: 'Compliance',
    readMins: 8,
    level: 'Foundational',
  },
  {
    id: 'vulnerable-clients',
    title: 'Supporting Vulnerable Clients — FCA Guidance in Practice',
    summary: 'Practical interpretation of the FCA Consumer Duty requirements around vulnerable customers. Identifies triggers, communication adaptations, and documentation standards advisers must meet.',
    category: 'Compliance',
    readMins: 13,
    level: 'Advanced',
  },
];

const CATEGORIES = ['All', 'Client Suitability', 'Debt & Credit', 'Retirement', 'Investments', 'Tax & Compliance', 'Estate & Inheritance', 'Compliance'];

const levelColor: Record<Article['level'], { bg: string; color: string }> = {
  Foundational: { bg: 'rgba(34,197,94,0.12)',   color: '#22C55E' },
  Intermediate:  { bg: 'rgba(30,134,195,0.15)',  color: '#1E86C3' },
  Advanced:      { bg: 'rgba(245,158,11,0.12)',  color: '#F59E0B' },
};

export default function EducationPage() {
  const { showToast } = useToast();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ARTICLES.filter(a => {
    const matchCat = category === 'All' || a.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  function handleSuggest() {
    if (!topic.trim()) return;
    setSubmitted(true);
    setTopic('');
    showToast('Topic suggestion submitted — thank you!');
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(30,134,195,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={18} color="#1E86C3" />
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
            Education Hub
          </h1>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
          Training materials and guides tailored for DWK Financial Advisers.
        </p>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setSearch(''); }}
            placeholder="Search articles..."
            style={{
              width: '100%', height: 36, borderRadius: 8, border: '1.5px solid #334155',
              paddingLeft: 34, paddingRight: 12, background: '#1E293B',
              fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: category === c ? 600 : 400,
                background: category === c ? '#1E86C3' : '#1E293B',
                color: category === c ? '#fff' : 'var(--text-secondary)',
                border: `1.5px solid ${category === c ? '#1E86C3' : '#334155'}`,
                transition: 'all 120ms ease',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Article count */}
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
        {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        {category !== 'All' ? ` in ${category}` : ''}
        {search ? ` matching "${search}"` : ''}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <Card>
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <BookOpen size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>No articles found</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Try a different category or search term.</div>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {filtered.map(a => {
            const lc = levelColor[a.level];
            const isOpen = expanded === a.id;
            return (
              <Card key={a.id} padding={0} style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : a.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'flex-start', gap: 16,
                    padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 120ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,134,195,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                >
                  {/* Icon */}
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(30,134,195,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <BookOpen size={18} color="#1E86C3" />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, flex: 1, minWidth: 200 }}>
                        {a.title}
                      </span>
                      {a.new && (
                        <span style={{ padding: '2px 8px', borderRadius: 20, background: 'rgba(30,134,195,0.15)', border: '1px solid rgba(30,134,195,0.3)', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: '#1E86C3', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>New</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
                        <Tag size={11} /> {a.category}
                      </span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#334155', flexShrink: 0 }} />
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
                        <Clock size={11} /> {a.readMins} min read
                      </span>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#334155', flexShrink: 0 }} />
                      <span style={{ padding: '2px 8px', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, background: lc.bg, color: lc.color }}>
                        {a.level}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    color="var(--text-muted)"
                    style={{ flexShrink: 0, marginTop: 12, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 160ms ease' }}
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 20px 20px 80px', animation: 'card-in 150ms ease both' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                      {a.summary}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#F59E0B' }}>
                        Full article content coming soon. This preview summarises the module scope.
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Suggest a topic */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={16} color="#22C55E" />
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Suggest a Topic</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>Have a training need? Let us know.</div>
          </div>
        </div>

        {submitted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderRadius: 10, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <CheckCircle size={18} color="#22C55E" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#22C55E', fontWeight: 500 }}>
              Thank you — your suggestion has been passed to the DWK Learning team.
            </span>
            <button
              onClick={() => setSubmitted(false)}
              style={{ marginLeft: 'auto', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Suggest another
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSuggest(); }}
              placeholder="e.g. Pension transfers, crypto assets, power of attorney..."
              style={{
                flex: 1, height: 40, borderRadius: 8, border: '1.5px solid #334155',
                padding: '0 14px', background: '#0F172A',
                fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-primary)',
                transition: 'border-color 150ms ease',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#1E86C3'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#334155'; }}
            />
            <Button variant="primary" onClick={handleSuggest} icon={<Send size={14} />}>
              Submit
            </Button>
          </div>
        )}
      </Card>

      {/* Footer attribution */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px 20px', borderRadius: 10,
        background: '#1E293B', border: '1px solid #334155',
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
          All education content produced and tailored by <span style={{ color: '#9580C8', fontWeight: 600 }}>DWK Finance</span> for the purposes of adviser training. Content is reviewed and updated periodically.
        </p>
      </div>
    </div>
  );
}
