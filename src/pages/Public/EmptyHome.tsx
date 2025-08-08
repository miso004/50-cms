import React from 'react';
import { Link } from 'react-router-dom';

const EmptyHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">내 웹사이트</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                홈
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">
                소개
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                연락처
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                관리자
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 - 빈 상태 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* 빈 상태 아이콘 */}
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-8">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            첫 페이지를 만들어보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            아직 콘텐츠가 없습니다. 관리자 페이지에서 첫 페이지를 만들어보세요.
          </p>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/admin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              첫 페이지 만들기
            </Link>
            <Link
              to="/admin/settings"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              사이트 설정
            </Link>
          </div>

          {/* 가이드 카드들 */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                페이지 만들기
              </h3>
              <p className="text-gray-600">
                홈페이지, 소개 페이지, 블로그 등 다양한 페이지를 만들어보세요.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                이미지 추가
              </h3>
              <p className="text-gray-600">
                미디어 라이브러리에서 이미지를 업로드하고 페이지에 추가하세요.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                디자인 커스터마이징
              </h3>
              <p className="text-gray-600">
                색상, 폰트, 레이아웃을 원하는 대로 조정하세요.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">내 웹사이트</h4>
              <p className="text-gray-300">CMS로 만든 웹사이트입니다.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">링크</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    홈
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    소개
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white">
                    연락처
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">관리</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/admin" className="text-gray-300 hover:text-white">
                    관리자
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">연락처</h4>
              <p className="text-gray-300">이메일: info@example.com</p>
              <p className="text-gray-300">전화: 02-1234-5678</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2025 내 웹사이트. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmptyHome;
