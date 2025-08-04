import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

// AuthResponse 타입을 여기서 직접 정의
interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithResponse: (authResponse: AuthResponse) => void;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 대체
      // 임시 로그인 로직
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else if (email === 'user@example.com' && password === 'user123') {
        const normalUser: User = {
          id: '2',
          username: 'user',
          email: 'user@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'user'
        };
        setUser(normalUser);
        localStorage.setItem('user', JSON.stringify(normalUser));
      } else {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithResponse = (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    localStorage.setItem('auth_token', authResponse.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 대체
      // 임시 회원가입 로직
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'user'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    loginWithResponse,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 