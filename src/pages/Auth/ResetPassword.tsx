import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 비밀번호 재설정 로직 추가
    console.log('비밀번호 재설정:', formData);
    setIsSubmitted(true);
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;
  const isPasswordValid = formData.password.length >= 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            새 비밀번호 설정
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            새로운 비밀번호를 입력해주세요.
          </p>
        </div>

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                새 비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="새 비밀번호를 입력하세요"
              />
              {formData.password && !isPasswordValid && (
                <p className="mt-1 text-sm text-red-600">
                  비밀번호는 최소 8자 이상이어야 합니다.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                새 비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              {formData.confirmPassword && !isPasswordMatch && (
                <p className="mt-1 text-sm text-red-600">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={!isPasswordValid || !isPasswordMatch}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                비밀번호 변경
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                로그인으로 돌아가기
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    비밀번호가 성공적으로 변경되었습니다
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    새로운 비밀번호로 로그인할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                로그인하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
