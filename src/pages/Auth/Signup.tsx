import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import SocialAuthButtons from '../../components/common/SocialAuthButtons';
import { useAuth } from '../../contexts/AuthContext';
import type { SignupFormData, User } from '../../types';
import { validateEmail, validatePassword, validateUsername } from '../../utils/auth';

// AuthResponse 타입을 여기서 직접 정의
interface AuthResponse {
  user: User;
  token: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithResponse } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};
    if (!formData.username.trim()) {
      newErrors.username = '사용자명을 입력해주세요.';
    } else {
      const usernameValidation = validateUsername(formData.username);
      if (!usernameValidation.isValid) {
        newErrors.username = usernameValidation.message;
      }
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }
    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      // TODO: 실제 API 호출로 대체
      console.log('회원가입 시도:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAuthResponse: AuthResponse = {
        user: {
          id: '1',
          username: formData.username,
          email: formData.email,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock_token_' + Date.now()
      };
      loginWithResponse(mockAuthResponse);
      alert('회원가입에 성공했습니다!');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 소셜 회원가입 핸들러
  const handleGoogleSignup = () => {
    alert('구글 회원가입은 추후 지원될 예정입니다.');
  };
  const handleKakaoSignup = () => {
    alert('카카오톡 회원가입은 추후 지원될 예정입니다.');
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              회원가입
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                로그인
              </Link>
            </p>
          </div>

          {/* 소셜 회원가입 버튼 */}
          <SocialAuthButtons
            onGoogle={handleGoogleSignup}
            onKakao={handleKakaoSignup}
            type="signup"
          />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">또는 이메일로 회원가입</span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="사용자명"
                type="text"
                placeholder="사용자명을 입력하세요"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                error={errors.username}
                required
              />
              <Input
                label="이메일"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                required
              />
              <Input
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">비밀번호 요구사항</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 최소 6자 이상</li>
                <li>• 최소 하나의 소문자</li>
                <li>• 최소 하나의 대문자</li>
                <li>• 최소 하나의 숫자</li>
              </ul>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? '회원가입 중...' : '회원가입'}
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                회원가입 시{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  이용약관
                </a>
                과{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  개인정보처리방침
                </a>
                에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup; 