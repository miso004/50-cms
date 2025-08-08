import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">글쓰기플랫폼</h3>
            <p className="text-gray-300 text-sm">
              여러분의 생각을 자유롭게 표현할 수 있는 공간입니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  홈
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-300 hover:text-white transition-colors">
                  글목록
                </a>
              </li>
              <li>
                <a href="/write" className="text-gray-300 hover:text-white transition-colors">
                  글쓰기
                </a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>이메일: contact@writingplatform.com</li>
              <li>전화: 02-1234-5678</li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 글쓰기플랫폼. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 