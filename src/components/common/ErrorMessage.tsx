import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle,
  faRefresh,
  faHome,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  showBack?: boolean;
  onRetry?: () => void;
  onHome?: () => void;
  onBack?: () => void;
  className?: string;
  fullScreen?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = '오류가 발생했습니다',
  message = '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  showRetry = true,
  showHome = false,
  showBack = false,
  onRetry,
  onHome,
  onBack,
  className = '',
  fullScreen = false
}) => {
  const containerClasses = fullScreen
    ? 'min-h-screen bg-gray-50 flex items-center justify-center px-4'
    : 'flex items-center justify-center py-12';

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = '/';
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center max-w-md mx-auto">
        {/* 아이콘 */}
        <div className="mb-6">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-6xl text-red-500 mb-4"
          />
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* 메시지 */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          {showRetry && (
            <Button
              onClick={handleRetry}
              className="w-full flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faRefresh} className="mr-2" />
              다시 시도
            </Button>
          )}

          <div className="flex space-x-3">
            {showBack && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                이전 페이지
              </Button>
            )}

            {showHome && (
              <Button
                onClick={handleHome}
                variant="outline"
                className="flex-1 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                홈으로
              </Button>
            )}
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            문제가 계속 발생하면{' '}
            <a
              href="mailto:support@widsoft.com"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              고객지원팀
            </a>
            에 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;