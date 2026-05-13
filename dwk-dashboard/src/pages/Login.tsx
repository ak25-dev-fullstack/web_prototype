import {
  useState, useRef, type ChangeEvent, type KeyboardEvent,
  type FormEvent, type ClipboardEvent,
} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DWKLogo from '../components/ui/DWKLogo';

type DemoRole = 'manager' | 'adviser';

const DEMO = {
  manager: { email: 'manager@dwk.com', password: 'password123', label: 'Team Manager' },
  adviser: { email: 'adviser@dwk.com', password: 'password123', label: 'Financial Adviser' },
};

const inputBase: React.CSSProperties = {
  width: '100%', height: 44, borderRadius: 10,
  border: '1.5px solid #DDE4E2', background: '#FAFBFA',
  paddingLeft: 14, paddingRight: 14,
  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
  color: '#0F2421', outline: 'none',
  transition: 'border-color 150ms ease',
};

export default function Login() {
  const { user, pendingUser, login, verify2FA } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'creds' | '2fa'>('creds');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [credError, setCredError] = useState('');

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [tfaError, setTfaError] = useState('');

  if (user) {
    return <Navigate to={user.role === 'financial-adviser' ? '/adviser/dashboard' : '/overview'} replace />;
  }

  function fillDemo(role: DemoRole) {
    setEmail(DEMO[role].email);
    setPassword(DEMO[role].password);
    setCredError('');
  }

  function handleCredSubmit(e: FormEvent) {
    e.preventDefault();
    setCredError('');
    if (!email.trim() || !password) {
      setCredError('Please enter your email and password.');
      return;
    }
    const res = login(email, password);
    if (!res.success) {
      setCredError(res.error!);
      return;
    }
    setStep('2fa');
  }

  function handleDigitChange(i: number, e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setTfaError('');
    if (val && i < 5) refs.current[i + 1]?.focus();
    if (next.every(d => d) && val) submitCode(next.join(''));
  }

  function handleDigitKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = ['', '', '', '', '', ''];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setDigits(next);
    setTfaError('');
    if (pasted.length === 6) submitCode(pasted);
    else refs.current[pasted.length]?.focus();
  }

  function submitCode(code: string) {
    const res = verify2FA(code);
    if (!res.success) {
      setTfaError(res.error!);
      setDigits(['', '', '', '', '', '']);
      refs.current[0]?.focus();
      return;
    }
    navigate(res.role === 'financial-adviser' ? '/adviser/dashboard' : '/overview');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left panel */}
      <div style={{
        width: 460, flexShrink: 0, background: '#0D2B27',
        display: 'flex', flexDirection: 'column', padding: '48px 44px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ marginBottom: 60 }}>
          <DWKLogo size="md" />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 80 }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 30, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: 16 }}>
            Manage your team<br />with confidence
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#A8C4BF', lineHeight: 1.7, marginBottom: 36 }}>
            A unified platform for team managers and financial advisers to track performance, manage clients, and stay compliant.
          </div>
          {['Real-time team performance', 'Client portfolio management', 'Compliance tracking'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2DD4BF', flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#A8C4BF' }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 320, height: 320, borderRadius: '50%', border: '1.5px solid rgba(45,212,191,0.10)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -160, right: -160, width: 500, height: 500, borderRadius: '50%', border: '1.5px solid rgba(45,212,191,0.05)', pointerEvents: 'none' }} />
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, background: '#F4F6F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 40px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>

          {step === 'creds' ? (
            <>
              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: '#0F2421', marginBottom: 8 }}>
                  Welcome back
                </h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#4B6B66' }}>
                  Sign in to your DWK Finance account
                </p>
              </div>

              {/* Demo fill */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#879E9A', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Quick demo access
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['manager', 'adviser'] as DemoRole[]).map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => fillDemo(role)}
                      style={{
                        flex: 1, height: 38, borderRadius: 8,
                        border: '1.5px solid #DDE4E2', background: '#FFFFFF', cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                        color: '#0D9488', transition: 'border-color 150ms ease, background 150ms ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#0D9488'; e.currentTarget.style.background = '#F0FDFB'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDE4E2'; e.currentTarget.style.background = '#FFFFFF'; }}
                    >
                      {DEMO[role].label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 1, background: '#DDE4E2' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#879E9A', whiteSpace: 'nowrap' }}>or enter credentials</span>
                <div style={{ flex: 1, height: 1, background: '#DDE4E2' }} />
              </div>

              <form onSubmit={handleCredSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: '#0F2421', marginBottom: 6 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setCredError(''); }}
                    placeholder="you@dwkbanking.com"
                    style={inputBase}
                    onFocus={e => { e.currentTarget.style.borderColor = '#0D9488'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.10)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#DDE4E2'; e.currentTarget.style.boxShadow = 'none'; }}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: '#0F2421', marginBottom: 6 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setCredError(''); }}
                      placeholder="••••••••"
                      style={{ ...inputBase, paddingRight: 44 }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#0D9488'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.10)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#DDE4E2'; e.currentTarget.style.boxShadow = 'none'; }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(p => !p)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#879E9A', padding: 2 }}
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {credError && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#DC2626' }}>
                    {credError}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%', height: 44, borderRadius: 10, background: '#0D9488',
                    color: '#FFFFFF', fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600,
                    border: 'none', cursor: 'pointer', marginTop: 4,
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0F766E'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0D9488'; }}
                >
                  Continue
                </button>
              </form>
            </>
          ) : (
            /* 2FA step */
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={24} color="#0D9488" />
                </div>
                <div>
                  <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#0F2421', marginBottom: 4 }}>
                    Two-factor authentication
                  </h1>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#4B6B66' }}>
                    Code sent to {pendingUser?.email}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: '#0F2421', marginBottom: 12 }}>
                  Enter 6-digit code
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={el => { refs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={e => handleDigitChange(i, e)}
                      onKeyDown={e => handleDigitKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      style={{
                        width: 48, height: 56, borderRadius: 10,
                        border: `1.5px solid ${d ? '#0D9488' : '#DDE4E2'}`,
                        background: d ? '#F0FDFB' : '#FAFBFA',
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 600,
                        color: '#0F2421', textAlign: 'center', outline: 'none',
                        transition: 'border-color 150ms ease, background 150ms ease',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#0D9488'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.12)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = d ? '#0D9488' : '#DDE4E2'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  ))}
                </div>
                <div style={{ marginTop: 10, padding: '8px 12px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#92400E' }}>
                  Demo code: <strong style={{ fontFamily: "'IBM Plex Mono', monospace" }}>123456</strong>
                </div>
              </div>

              {tfaError && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
                  {tfaError}
                </div>
              )}

              <button
                type="button"
                onClick={() => { setStep('creds'); setDigits(['', '', '', '', '', '']); setTfaError(''); }}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#4B6B66', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                ← Back to sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
