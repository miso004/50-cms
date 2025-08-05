import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faExclamationTriangle, 
  faInfoCircle, 
  faTimes,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  autoClose?: boolean;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 입장 애니메이션
    const timer = setTimeout(() => setIsVisible(true), 10);
    
    // 자동 닫기
    let autoCloseTimer: NodeJS.Timeout;
    if (toast.autoClose !== false) {
      autoCloseTimer = setTimeout(() => {
        handleClose();
      }, toast.duration || 5000);
    }

    return () => {
      clearTimeout(timer);
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
    };
  }, [toast.duration, toast.autoClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "relative overflow-hidden rounded-xl shadow-lg border";
    
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheck} className="text-green-600" />;
      case 'error':
        return <FontAwesomeIcon icon={faTimes} className="text-red-600" />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600" />;
      case 'info':
      default:
        return <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600" />;
    }
  };

  const getProgressBarColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div 
      className={`
        transform transition-all duration-300 ease-in-out mb-4
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div className={getToastStyles()}>
        <div className="flex items-start p-4">
          {/* 아이콘 */}
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {getIcon()}
          </div>

          {/* 콘텐츠 */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-sm opacity-90 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-3 p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
        </div>

        {/* 진행 바 (자동 닫기 시) */}
        {toast.autoClose !== false && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10">
            <div 
              className={`h-full ${getProgressBarColor()} animate-[progress_${toast.duration || 5000}ms_linear_forwards]`}
              style={{
                animation: `progress ${toast.duration || 5000}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;