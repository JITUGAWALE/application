import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '../types';

type StoredAccount = User & { password: string };

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const ACCOUNTS_KEY = 'zomato_clone_accounts';
const SESSION_KEY = 'zomato_clone_session';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function readAccounts(): Promise<StoredAccount[]> {
  const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
  return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY)
      .then((raw) => setUser(raw ? (JSON.parse(raw) as User) : null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { ok: false, error: 'Enter your email and password.' };
    }
    const accounts = await readAccounts();
    const account = accounts.find((a) => a.email === normalizedEmail);
    if (!account || account.password !== password) {
      return { ok: false, error: 'Invalid email or password.' };
    }
    const loggedInUser: User = { name: account.name, email: account.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { ok: true };
  };

  const signup = async (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !normalizedEmail || password.length < 4) {
      return { ok: false, error: 'Fill all fields; password needs 4+ characters.' };
    }
    const accounts = await readAccounts();
    if (accounts.some((a) => a.email === normalizedEmail)) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const newAccount: StoredAccount = { name: name.trim(), email: normalizedEmail, password };
    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, newAccount]));
    const loggedInUser: User = { name: newAccount.name, email: newAccount.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { ok: true };
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isLoading, login, signup, logout }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
