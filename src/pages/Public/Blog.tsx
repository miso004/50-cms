import React from 'react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  // 목업 블로그 포스트 데이터
  const blogPosts = [
    {
      id: 1,
      title: 'CMS 시스템 소개',
      excerpt: '현대적인 콘텐츠 관리 시스템의 특징과 장점에 대해 알아보세요.',
      author: '관리자',
      date: '2025-01-15',
      category: '기술',
      readTime: '5분',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: '웹사이트 관리 팁',
      excerpt: '효과적인 웹사이트 관리를 위한 유용한 팁들을 공유합니다.',
      author: '관리자',
      date: '2025-01-10',
      category: '가이드',
      readTime: '8분',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: '반응형 디자인의 중요성',
      excerpt: '모바일 시대에 필수적인 반응형 디자인에 대해 알아보세요.',
      author: '관리자',
      date: '2025-01-05',
      category: '디자인',
      readTime: '6분',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'SEO 최적화 가이드',
      excerpt: '검색 엔진 최적화를 통해 웹사이트를 더 잘 노출시키는 방법을 알아보세요.',
      author: '관리자',
      date: '2024-12-28',
      category: '마케팅',
      readTime: '10분',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 메인 콘텐츠 */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">블로그</h1>
          <p className="text-xl text-gray-600">최신 소식과 유용한 정보를 확인하세요</p>
        </div>

        {/* 블로그 포스트 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">{post.author}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
              이전
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">2</button>
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">3</button>
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
              다음
            </button>
          </nav>
        </div>

        {/* 카테고리 필터 */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
              전체
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              기술
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              가이드
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              디자인
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              마케팅
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
