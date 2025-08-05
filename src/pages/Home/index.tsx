import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, 
  faList, 
  faRocket, 
  faHeart,
  faStar 
} from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white/90 mb-6">
              ✨ 새로운 글쓰기 경험을 만나보세요
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
            당신의 이야기가<br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">세상을 바꿉니다</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            혁신적인 글쓰기 플랫폼에서 당신만의 독특한 목소리를 발견하고<br />
            전 세계 독자들과 깊이 있는 소통을 시작하세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/write">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl shadow-purple-500/25 border-0 text-lg px-8 py-4"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                글쓰기 시작하기
              </Button>
            </Link>
            <Link to="/posts">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4"
              >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                작품 둘러보기
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 flex justify-center items-center space-x-8 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>1,250+ 활성 작가</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>3,420+ 발행된 작품</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>15,680+ 소통</span>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 rounded-full px-4 py-2 text-sm font-medium mb-6">
              💎 핵심 기능
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              창작을 위한<br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">완벽한 도구들</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              프로 작가부터 취미 블로거까지, 모든 창작자를 위한 강력한 기능들을 만나보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 글쓰기 */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI 글쓰기 도우미</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  혁신적인 AI 기술로 창작 과정을 도와드립니다. 
                  실시간 문법 검사와 스타일 제안으로 완벽한 글을 완성하세요.
                </p>
                <div className="flex items-center space-x-3 text-sm text-purple-600 font-medium">
                  <span>✨ 실시간 AI 도우미</span>
                  <span>💾 자동 저장</span>
                </div>
              </div>
            </div>

            {/* 커뮤니티 */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">글로벌 커뮤니티</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  전 세계 창작자들과 연결되세요. 
                  작품에 대한 피드백을 받고, 영감을 나누며 함께 성장하는 공간입니다.
                </p>
                <div className="flex items-center space-x-3 text-sm text-green-600 font-medium">
                  <span>🌍 글로벌 네트워크</span>
                  <span>💬 실시간 소통</span>
                </div>
              </div>
            </div>

            {/* 관리 */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">스마트 애널리틱스</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  작품의 성과를 한눈에 파악하세요. 
                  독자 반응 분석과 성장 인사이트로 더 나은 콘텐츠를 만들어보세요.
                </p>
                <div className="flex items-center space-x-3 text-sm text-orange-600 font-medium">
                  <span>📊 상세 분석</span>
                  <span>🎯 성장 인사이트</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm font-medium text-white/90 mb-8">
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              지금 시작하세요
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
            당신의 첫 작품을<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">세상에 선보이세요</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            수백만 명의 독자가 기다리고 있습니다. 
            <br className="hidden md:block" />
            지금 가입하고 <span className="text-yellow-400 font-semibold">무료로</span> 창작 여정을 시작하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold shadow-xl shadow-yellow-500/25 border-0 text-lg px-10 py-5"
              >
                <FontAwesomeIcon icon={faStar} className="mr-2" />
                무료로 시작하기
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-10 py-5"
              >
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                이미 회원이신가요?
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>✅ 100% 무료 시작</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>📝 무제한 글쓰기</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>🌟 AI 도우미 포함</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 