'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import {
  AuthContext,
  type AuthContextType,
} from '@/features/auth/contexts/auth-context';
import type { User } from '@/features/auth/interfaces';
import { authService } from '@/features/auth';

interface AuthProviderProps {
  children: ReactNode;
}

function getStoredValue<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

function setStoredValue(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /** noop */
  }
}

function removeStoredValue(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    /** noop */
  }
}

function getInitialUser(): User | null {
  return getStoredValue<User>('auth_user');
}

export default function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  const login = useCallback((newUser: User) => {
    setUser(newUser);
    setStoredValue('auth_user', newUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // proceed even if server logout fails
    }
    setUser(null);
    removeStoredValue('auth_user');
    window.location.href = '/auth/login';
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
