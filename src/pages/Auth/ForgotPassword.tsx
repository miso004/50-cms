import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 비밀번호 재설정 로직 추가
    console.log('비밀번호 재설정 요청:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            비밀번호 찾기
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                비밀번호 재설정 링크 보내기
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
                    이메일이 전송되었습니다
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    {email}로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인해주세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                로그인으로 돌아가기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
