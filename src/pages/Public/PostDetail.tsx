import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 목업 포스트 데이터
  const post = {
    id: parseInt(id || '1'),
    title: 'CMS 시스템 소개',
    content: `
      <p>현대적인 콘텐츠 관리 시스템(CMS)은 웹사이트를 효율적으로 관리할 수 있게 해주는 강력한 도구입니다.</p>
      
      <h2>CMS의 주요 특징</h2>
      <p>CMS는 다음과 같은 특징을 가지고 있습니다:</p>
      <ul>
        <li><strong>사용자 친화적 인터페이스:</strong> 기술적 지식 없이도 콘텐츠를 쉽게 관리할 수 있습니다.</li>
        <li><strong>역할 기반 권한 관리:</strong> 관리자, 편집자, 작성자 등 다양한 역할을 설정할 수 있습니다.</li>
        <li><strong>반응형 디자인:</strong> 모든 디바이스에서 최적화된 경험을 제공합니다.</li>
        <li><strong>SEO 최적화:</strong> 검색 엔진 최적화를 위한 다양한 도구를 제공합니다.</li>
      </ul>

      <h2>CMS의 장점</h2>
      <p>CMS를 사용하면 다음과 같은 장점이 있습니다:</p>
      <ol>
        <li><strong>시간 절약:</strong> 콘텐츠 업데이트가 빠르고 간편합니다.</li>
        <li><strong>비용 효율성:</strong> 개발자 없이도 웹사이트를 관리할 수 있습니다.</li>
        <li><strong>일관성:</strong> 디자인과 구조의 일관성을 유지할 수 있습니다.</li>
        <li><strong>확장성:</strong> 필요에 따라 기능을 추가하거나 확장할 수 있습니다.</li>
      </ol>

      <h2>결론</h2>
      <p>CMS는 현대적인 웹사이트 관리에 필수적인 도구입니다. 적절한 CMS를 선택하고 활용하면 효율적이고 성공적인 웹사이트를 운영할 수 있습니다.</p>
    `,
    author: '관리자',
    date: '2025-01-15',
    category: '기술',
    readTime: '5분',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: ['CMS', '웹사이트', '관리', '기술']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 포스트 헤더 */}
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm opacity-90">{post.readTime}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* 포스트 내용 */}
          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* 태그 */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">태그</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 공유 버튼 */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">공유하기</h3>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span>트위터</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>페이스북</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>링크드인</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* 관련 포스트 */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 포스트</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">웹사이트 관리 팁</h3>
              <p className="text-gray-600 mb-4">효과적인 웹사이트 관리를 위한 유용한 팁들을 공유합니다.</p>
              <Link to="/blog/2" className="text-blue-600 hover:text-blue-800">자세히 보기 →</Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">반응형 디자인의 중요성</h3>
              <p className="text-gray-600 mb-4">모바일 시대에 필수적인 반응형 디자인에 대해 알아보세요.</p>
              <Link to="/blog/3" className="text-blue-600 hover:text-blue-800">자세히 보기 →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
