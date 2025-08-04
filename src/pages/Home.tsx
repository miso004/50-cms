import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            당신의 생각을 자유롭게 표현하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            간단하고 직관적인 글쓰기 플랫폼에서 여러분의 아이디어를 세상과 공유해보세요.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/write"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              글쓰기 시작
            </Link>
            <Link
              to="/posts"
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
            >
              둘러보기
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">간편한 글쓰기</h3>
            <p className="text-gray-600">직관적인 에디터로 쉽고 빠르게 글을 작성할 수 있습니다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">안전한 보안</h3>
            <p className="text-gray-600">개인정보 보호와 데이터 안전성을 최우선으로 합니다.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">실시간 통계</h3>
            <p className="text-gray-600">글의 조회수와 반응을 실시간으로 확인할 수 있습니다.</p>
          </div>
        </div>

        {/* Recent Posts Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">최근 글</h3>
            <Link
              to="/posts"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              더 보기 →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-medium text-gray-900 mb-1">첫 번째 글 제목</h4>
              <p className="text-gray-600 text-sm mb-2">글의 간단한 내용 미리보기입니다...</p>
              <div className="flex items-center text-xs text-gray-500">
                <span>작성자</span>
                <span className="mx-2">•</span>
                <span>2024.08.01</span>
              </div>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h4 className="font-medium text-gray-900 mb-1">두 번째 글 제목</h4>
              <p className="text-gray-600 text-sm mb-2">또 다른 글의 내용 미리보기입니다...</p>
              <div className="flex items-center text-xs text-gray-500">
                <span>작성자</span>
                <span className="mx-2">•</span>
                <span>2024.08.01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home; 