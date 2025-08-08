import type { User } from '../types';

// 토큰 관리
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// 사용자 정보 관리
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt)
    };
  } catch {
    return null;
  }
};

export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('user');
};

// 인증 상태 확인
export const isAuthenticated = (): boolean => {
  return getToken() !== null && getUser() !== null;
};

// 로그인 처리 (User와 token을 별도로 받음)
export const login = (user: User, token: string): void => {
  setToken(token);
  setUser(user);
};

// 로그아웃 처리
export const logout = (): void => {
  removeToken();
  removeUser();
};

// 이메일 유효성 검사
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: '비밀번호는 최소 6자 이상이어야 합니다.' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: '비밀번호는 최소 하나의 소문자를 포함해야 합니다.' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.' };
  }
  
  return { isValid: true, message: '' };
};

// 사용자명 유효성 검사
export const validateUsername = (username: string): { isValid: boolean; message: string } => {
  if (username.length < 2) {
    return { isValid: false, message: '사용자명은 최소 2자 이상이어야 합니다.' };
  }
  
  if (username.length > 20) {
    return { isValid: false, message: '사용자명은 최대 20자까지 가능합니다.' };
  }
  
  if (!/^[a-zA-Z0-9가-힣_]+$/.test(username)) {
    return { isValid: false, message: '사용자명은 영문, 숫자, 한글, 언더스코어만 사용 가능합니다.' };
  }
  
  return { isValid: true, message: '' };
}; 