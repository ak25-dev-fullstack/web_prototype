import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface LayoutCtx {
  isMobile: boolean;
  isTablet: boolean;
  collapsed: boolean;
  sidebarOpen: boolean;
  toggleCollapsed: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const Ctx = createContext<LayoutCtx | null>(null);

function getBreakpoint() {
  const w = window.innerWidth;
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024 };
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [bp, setBp] = useState(getBreakpoint);
  const [collapsed, setCollapsed] = useState(() => getBreakpoint().isTablet);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      const next = getBreakpoint();
      setBp(next);
      if (next.isMobile) {
        setCollapsed(false);
      } else if (next.isTablet) {
        setCollapsed(true);
        setSidebarOpen(false);
      } else {
        setSidebarOpen(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleCollapsed = useCallback(() => setCollapsed(c => !c), []);
  const toggleSidebar   = useCallback(() => setSidebarOpen(o => !o), []);
  const closeSidebar    = useCallback(() => setSidebarOpen(false), []);

  return (
    <Ctx.Provider value={{ ...bp, collapsed, sidebarOpen, toggleCollapsed, toggleSidebar, closeSidebar }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLayout must be used within LayoutProvider');
  return ctx;
}
