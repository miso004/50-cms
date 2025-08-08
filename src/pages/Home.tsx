import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Full-screen Hero Section */}
      <div className="relative h-screen w-full flex items-center justify-center">
                {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/mountain-background.jpg')`,
          }}
        ></div>
        
        {/* Fallback Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-300 to-orange-300"></div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-fade-in-up">
              우리의 생각을 자유롭게 표현합시다.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md animate-fade-in-up animation-delay-300">
              간단하고 직관적인 글쓰기 플랫폼에서 여러분의 아이디어를 세상과 공유해보세요.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-up animation-delay-600">
            <Link
              to="/write"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              글쓰기 시작
            </Link>
            <Link
              to="/posts"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              둘러보기
            </Link>
          </div>

          {/* Stats or Features (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in-up animation-delay-900">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">간편함</div>
              <p className="text-white/80 drop-shadow-md">직관적인 에디터로 쉽고 빠른 글쓰기</p>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-1200">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">안전함</div>
              <p className="text-white/80 drop-shadow-md">개인정보 보호와 데이터 안전성</p>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-1500">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">실시간</div>
              <p className="text-white/80 drop-shadow-md">글의 조회수와 반응을 즉시 확인</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home; 