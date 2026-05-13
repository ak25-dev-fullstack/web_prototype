import { createContext, useContext, useState, type ReactNode } from 'react';

export type Role = 'team-manager' | 'financial-adviser';

export interface AuthUser {
  name: string;
  role: Role;
  initials: string;
  email: string;
  title: string;
}

interface AuthCtx {
  user: AuthUser | null;
  pendingUser: AuthUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  verify2FA: (code: string) => { success: boolean; error?: string; role?: Role };
  logout: () => void;
}

const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  'manager@dwk.com': {
    password: 'password123',
    user: {
      name: 'Jonathan Sterling',
      role: 'team-manager',
      initials: 'JS',
      email: 'manager@dwk.com',
      title: 'Regional Team Manager',
    },
  },
  'adviser@dwk.com': {
    password: 'password123',
    user: {
      name: 'Sarah Mitchell',
      role: 'financial-adviser',
      initials: 'SM',
      email: 'adviser@dwk.com',
      title: 'Senior Financial Adviser',
    },
  },
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  function login(email: string, password: string) {
    const entry = DEMO_USERS[email.toLowerCase().trim()];
    if (!entry || entry.password !== password) {
      return { success: false, error: 'Invalid email or password.' };
    }
    setPendingUser(entry.user);
    return { success: true };
  }

  function verify2FA(code: string) {
    if (code !== '123456') {
      return { success: false, error: 'Incorrect code. Use 123456 for this demo.' };
    }
    const role = pendingUser!.role;
    setUser(pendingUser);
    setPendingUser(null);
    return { success: true, role };
  }

  function logout() {
    setUser(null);
    setPendingUser(null);
  }

  return (
    <Ctx.Provider value={{ user, pendingUser, login, verify2FA, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
