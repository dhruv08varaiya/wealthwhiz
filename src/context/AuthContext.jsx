import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user data for frontend demo (no backend yet)
const MOCK_USER = {
  id: 'u1',
  name: 'Dhruv Varaiya',
  email: 'dhruv.varaiya@gmail.com',
  role: 'platform_admin',
  avatar: null,
  currency: 'INR',
  createdAt: '2026-01-15',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state
    const saved = localStorage.getItem('ww_auth');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    const userData = { ...MOCK_USER, email };
    setUser(userData);
    localStorage.setItem('ww_auth', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 800));
    const userData = { ...MOCK_USER, name, email };
    setUser(userData);
    localStorage.setItem('ww_auth', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ww_auth');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'platform_admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
