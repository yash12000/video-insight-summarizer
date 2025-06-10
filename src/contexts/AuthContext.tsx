import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';

const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }

    const userData: User = {
      id: Date.now().toString(),
      email: email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      role: email.includes('admin') ? 'admin' : 'user',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150'
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }

    if (name.trim().length < 2) {
      return false;
    }

    const userData: User = {
      id: Date.now().toString(),
      email,
      name: name.trim(),
      role: email.includes('admin') ? 'admin' : 'user',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150'
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('videoSummaries');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};