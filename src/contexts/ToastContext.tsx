import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ToastContainer from '../components/common/ToastContainer';
import type { ToastMessage, ToastType } from '../components/common/Toast';

interface ToastContextType {
  showToast: (
    type: ToastType,
    title: string,
    message?: string,
    options?: {
      duration?: number;
      autoClose?: boolean;
    }
  ) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((
    type: ToastType,
    title: string,
    message?: string,
    options: {
      duration?: number;
      autoClose?: boolean;
    } = {}
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newToast: ToastMessage = {
      id,
      type,
      title,
      message,
      duration: options.duration || 5000,
      autoClose: options.autoClose !== false
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider 
      value={{
        showToast,
        removeToast,
        clearAllToasts
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// 편의 함수들
export const useToastHelpers = () => {
  const { showToast } = useToast();

  return {
    showSuccess: (title: string, message?: string, options?: { duration?: number; autoClose?: boolean }) =>
      showToast('success', title, message, options),
    
    showError: (title: string, message?: string, options?: { duration?: number; autoClose?: boolean }) =>
      showToast('error', title, message, options),
    
    showWarning: (title: string, message?: string, options?: { duration?: number; autoClose?: boolean }) =>
      showToast('warning', title, message, options),
    
    showInfo: (title: string, message?: string, options?: { duration?: number; autoClose?: boolean }) =>
      showToast('info', title, message, options),
  };
};