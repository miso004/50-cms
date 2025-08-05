import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className={`${sizeClasses[size]} text-purple-600 animate-spin mb-4`}
        />
        {text && (
          <p className="text-gray-600 font-medium">{text}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;