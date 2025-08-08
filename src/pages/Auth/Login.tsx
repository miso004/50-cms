import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SocialAuthButtons from '../../components/common/SocialAuthButtons';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 소셜 로그인 핸들러
  const handleGoogleLogin = () => {
    alert('구글 로그인은 추후 지원될 예정입니다.');
  };

  const handleKakaoLogin = () => {
    alert('카카오톡 로그인은 추후 지원될 예정입니다.');
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* M3 Card Container with Elevation */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/10 border border-white/20 overflow-hidden">
            {/* M3 Surface Container */}
            <div className="p-8 space-y-6">
              {/* Header Section */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  로그인
                </h1>
                <p className="text-sm text-gray-600">
                  계정이 없으신가요?{' '}
                  <Link 
                    to="/signup" 
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    회원가입
                  </Link>
                </p>
              </div>

              {/* Social Login Section */}
              <div className="space-y-3">
                <SocialAuthButtons
                  onGoogle={handleGoogleLogin}
                  onKakao={handleKakaoLogin}
                  type="login"
                />
              </div>

              {/* Divider with M3 Style */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500 font-medium">
                    또는 이메일로 로그인
                  </span>
                </div>
              </div>
              
              {/* Form Section */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      이메일
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 text-center">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button with M3 Style */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>로그인 중...</span>
                    </div>
                  ) : (
                    '로그인'
                  )}
                </button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>

                {/* Test Account Info with M3 Surface */}
                <div className="mt-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                  <p className="text-xs font-medium text-gray-700 mb-2 text-center">
                    테스트 계정
                  </p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="text-center">
                      <span className="font-medium">관리자:</span> admin@example.com / admin123
                    </p>
                    <p className="text-center">
                      <span className="font-medium">일반 사용자:</span> user@example.com / user123
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login; 