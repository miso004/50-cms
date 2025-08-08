import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">회사 소개</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              저희는 현대적인 웹 기술을 활용하여 사용자 친화적인 웹사이트를 구축하는 전문 팀입니다.
              CMS(Content Management System)를 통해 효율적이고 안전한 웹사이트 관리 솔루션을 제공합니다.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">우리의 미션</h2>
            <p className="text-gray-600 mb-6">
              누구나 쉽게 웹사이트를 관리할 수 있도록 하는 것입니다. 
              복잡한 기술적 지식 없이도 아름답고 기능적인 웹사이트를 만들고 관리할 수 있도록 
              직관적이고 강력한 도구를 제공합니다.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">핵심 가치</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">혁신</h3>
                <p className="text-gray-600">최신 기술을 활용한 혁신적인 솔루션</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">안전성</h3>
                <p className="text-gray-600">데이터 보안과 시스템 안정성 보장</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">사용자 중심</h3>
                <p className="text-gray-600">사용자 경험을 최우선으로 하는 설계</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">기술 스택</h2>
            <p className="text-gray-600 mb-4">
              저희는 다음과 같은 최신 기술을 활용하여 안정적이고 확장 가능한 웹사이트를 구축합니다:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>React & TypeScript - 현대적인 프론트엔드 개발</li>
              <li>Node.js & Express - 강력한 백엔드 시스템</li>
              <li>PostgreSQL - 안정적인 데이터베이스</li>
              <li>Tailwind CSS - 아름다운 UI/UX 디자인</li>
              <li>AWS/Vercel - 클라우드 기반 호스팅</li>
            </ul>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">문의하기</h3>
              <p className="text-gray-600 mb-4">
                더 자세한 정보나 문의사항이 있으시면 언제든 연락주세요.
              </p>
              <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                연락처로 이동
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
