import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      title: '현대적인 CMS',
      subtitle: '플랫폼',
      description: '최신 기술과 전문성을 바탕으로 구축된 콘텐츠 관리 시스템으로 디지털 혁신을 선도합니다.',
      accentColor: 'text-blue-400'
    },
    {
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      title: '클라우드 기반',
      subtitle: '솔루션',
      description: '안정적이고 확장 가능한 클라우드 인프라로 언제 어디서나 접근 가능한 서비스를 제공합니다.',
      accentColor: 'text-green-400'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      title: '개발자 친화적',
      subtitle: 'API',
      description: 'RESTful API와 현대적인 개발 도구를 통해 빠르고 효율적인 개발 환경을 제공합니다.',
      accentColor: 'text-purple-400'
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 콘텐츠 */}
      <main>
        {/* 히어로 섹션 - 슬라이더 */}
        <section 
          className="relative h-[600px] overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${slides[currentSlide].image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* 좌우 화살표 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-[1400px] mx-auto relative h-full">
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm pointer-events-auto"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm pointer-events-auto"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
              </button>
            </div>
          </div>

          {/* 슬라이드 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
            <div className="flex items-center w-full">
              {/* 텍스트 영역 */}
              <div 
                className={`transition-all duration-800 ease-in-out ${
                  slideDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
                }`}
                key={currentSlide}
              >
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  {slides[currentSlide].title}
                  <br />
                  <span className={slides[currentSlide].accentColor}>{slides[currentSlide].subtitle}</span>
                </h2>
                <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/blog" 
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-center"
                  >
                    솔루션 보기
                  </Link>
                  <Link 
                    to="/about" 
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors duration-200 font-semibold text-center border border-white/30"
                  >
                    회사 소개
                  </Link>
                </div>
              </div>
              

            </div>
          </div>
        </section>

        {/* 솔루션 섹션 */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">주요 솔루션</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                다양한 비즈니스 요구사항에 맞춘 전문적인 솔루션을 제공합니다
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 솔루션 카드들 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">빠른 성능</h4>
                <p className="text-gray-600 text-sm">
                  최적화된 성능으로 빠른 웹사이트 경험을 제공합니다.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">보안 강화</h4>
                <p className="text-gray-600 text-sm">
                  최신 보안 기술로 데이터를 안전하게 보호합니다.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">유연한 레이아웃</h4>
                <p className="text-gray-600 text-sm">
                  다양한 디바이스에 최적화된 반응형 디자인을 제공합니다.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 지원</h4>
                <p className="text-gray-600 text-sm">
                  전문적인 기술 지원팀이 언제든 도움을 드립니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 비즈니스 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">비즈니스 영역</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                다양한 산업 분야에서 검증된 솔루션을 제공합니다
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">기업 솔루션</h4>
                </div>
                <p className="text-gray-600 mb-6">
                  대기업 및 중소기업을 위한 맞춤형 CMS 솔루션을 제공합니다.
                  안정성과 확장성을 고려한 전문적인 서비스를 경험하세요.
                </p>
                <Link 
                  to="/about" 
                  className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                >
                  자세히 보기
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">교육 프로그램</h4>
                </div>
                <p className="text-gray-600 mb-6">
                  CMS 전문가 양성을 위한 체계적인 교육 프로그램을 제공합니다.
                  실무 중심의 커리큘럼으로 전문성을 키워보세요.
                </p>
                <Link 
                  to="/about" 
                  className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center"
                >
                  자세히 보기
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 최근 소식 섹션 */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">최근 소식</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                최신 업데이트와 유용한 정보를 확인하세요
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-500 font-medium">최신</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  CMS 시스템 업데이트
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  최신 보안 패치와 성능 개선사항이 적용된 새로운 버전을 출시했습니다.
                </p>
                <Link 
                  to="/blog/1" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  자세히 보기 →
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-500 font-medium">팁</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  성능 최적화 가이드
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  웹사이트 로딩 속도를 개선하는 실용적인 팁들을 공유합니다.
                </p>
                <Link 
                  to="/blog/2" 
                  className="text-green-600 hover:text-green-800 text-sm font-semibold"
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
