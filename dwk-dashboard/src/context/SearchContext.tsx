import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchCtx {
  query: string;
  setQuery: (q: string) => void;
}

const Ctx = createContext<SearchCtx | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  return <Ctx.Provider value={{ query, setQuery }}>{children}</Ctx.Provider>;
}

export function useSearch() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
