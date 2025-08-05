import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 에러 정보를 상태에 저장
    this.setState({
      error,
      errorInfo
    });

    // 에러 로깅 (실제 서비스에서는 외부 서비스로 전송)
    this.logError(error, errorInfo);
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    // 에러 로그를 localStorage에 저장 (개발용)
    try {
      const errorLog = {
        timestamp: new Date().toISOString(),
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        },
        errorInfo: {
          componentStack: errorInfo.componentStack
        },
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      const updatedLogs = [errorLog, ...existingLogs.slice(0, 9)]; // 최대 10개까지 저장
      localStorage.setItem('errorLogs', JSON.stringify(updatedLogs));
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // 커스텀 fallback이 제공되면 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 에러 메시지 UI
      return (
        <div className="min-h-screen bg-gray-50">
          <ErrorMessage
            title="앱 오류가 발생했습니다"
            message="예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
            showRetry={true}
            showHome={true}
            onRetry={this.handleRetry}
            fullScreen={true}
          />
          
          {/* 개발 환경에서만 에러 세부사항 표시 */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto">
              <details className="bg-red-50 border border-red-200 rounded-lg p-4">
                <summary className="cursor-pointer text-red-700 font-semibold mb-2">
                  🐛 개발자 정보: 에러 세부사항
                </summary>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-800">오류:</h4>
                    <pre className="text-xs bg-red-100 p-2 rounded overflow-auto">
                      {this.state.error.name}: {this.state.error.message}
                    </pre>
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <h4 className="font-semibold text-red-800">스택 트레이스:</h4>
                      <pre className="text-xs bg-red-100 p-2 rounded overflow-auto max-h-32">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <h4 className="font-semibold text-red-800">컴포넌트 스택:</h4>
                      <pre className="text-xs bg-red-100 p-2 rounded overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;