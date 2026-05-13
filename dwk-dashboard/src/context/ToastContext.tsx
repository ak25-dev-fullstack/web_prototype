import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastCtx {
  showToast: (message: string, type?: ToastType) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

let nextId = 0;

const typeAccent: Record<ToastType, string> = {
  success: '#22C55E',
  error: '#EF4444',
  info: '#1E86C3',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++;
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  return (
    <Ctx.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999, pointerEvents: 'none' }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="card-anim"
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.5,
              boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
              borderLeft: `4px solid ${typeAccent[toast.type]}`,
              maxWidth: 360,
              pointerEvents: 'auto',
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
