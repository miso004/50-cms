import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import AdvancedSearch from '../../components/common/AdvancedSearch';
import type { SearchFilters } from '../../components/common/AdvancedSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye,
  faHeart,
  faComment,
  faCalendarAlt,
  faUser,
  faImage,
  faTags,
  faFolder,
  faPlus,
  faSpinner,
  faTh,
  faList
} from '@fortawesome/free-solid-svg-icons';
import type { Post } from '../../types';
import { defaultCategories, defaultTags, getCategoryById, getTagsByIds } from '../../utils/categoryUtils';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { isPostLiked, togglePostLike } from '../../utils/socialUtils';

// Mock 데이터
const mockPosts: Post[] = [
  {
    id: '1',
    title: '리액트 18의 새로운 기능들과 실무 적용 가이드',
    content: `리액트 18에서 도입된 Concurrent Features, Suspense, 그리고 새로운 Hooks들을 실무에서 어떻게 활용할 수 있는지 상세히 알아보겠습니다.

## 주요 새로운 기능들

### 1. Concurrent Features
Concurrent Rendering은 리액트가 작업을 중단하고 재개할 수 있게 해주는 새로운 렌더링 메커니즘입니다.

### 2. 새로운 Suspense 기능
Suspense는 이제 서버 사이드 렌더링에서도 사용할 수 있습니다.

### 3. useDeferredValue Hook
이 Hook을 사용하면 급하지 않은 상태 업데이트를 지연시킬 수 있습니다.`,
    author: {
      id: 'u1',
      username: '김개발',
      email: 'dev@example.com',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    category: defaultCategories[0], // 개발
    tags: [defaultTags[0], defaultTags[1]], // React, TypeScript
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    viewCount: 1250,
    likeCount: 89,
    status: 'published'
  },
  {
    id: '2',
    title: 'Figma에서 디자인 시스템 구축하기: 완벽 가이드',
    content: `디자인 시스템은 일관된 사용자 경험을 만들기 위한 핵심 요소입니다. Figma를 활용해 효율적인 디자인 시스템을 구축하는 방법을 알아보겠습니다.

## 디자인 시스템의 중요성
- 일관성 있는 UI/UX
- 개발 효율성 향상  
- 브랜드 정체성 강화

## Figma 컴포넌트 시스템
컴포넌트, 변형, 속성을 활용한 체계적인 설계 방법을 다룹니다.`,
    author: {
      id: 'u2',
      username: '박디자이너',
      email: 'designer@example.com',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    category: defaultCategories[1], // 디자인
    tags: [defaultTags[10], defaultTags[11]], // Figma, Photoshop
    images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EZXNpZ24gU3lzdGVtPC90ZXh0Pjwvc3ZnPg=='],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
    viewCount: 890,
    likeCount: 67,
    status: 'published'
  },
  {
    id: '3',
    title: '개발자를 위한 생산성 도구 추천',
    content: `개발 효율성을 크게 높여주는 다양한 도구들을 소개합니다. VSCode 확장프로그램부터 터미널 도구까지 실무에서 검증된 도구들만 엄선했습니다.

## 코드 에디터 & IDE
- Visual Studio Code + 필수 확장프로그램
- JetBrains 도구들
- Vim/Neovim 설정

## 터미널 & CLI 도구
- Oh My Zsh
- 유용한 CLI 도구들`,
    author: {
      id: 'u3',
      username: '이개발자',
      email: 'dev2@example.com',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    },
    category: defaultCategories[4], // 튜토리얼
    tags: [defaultTags[2], defaultTags[5]], // JavaScript, Node.js
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    viewCount: 654,
    likeCount: 43,
    status: 'published'
  }
];

const PostList: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    tagIds: [],
    dateRange: {},
    sortBy: 'latest'
  });

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = viewType === 'grid' ? 6 : 10;

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        // 실제 작성된 글들 로드
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        
        // Mock 데이터와 실제 데이터 합치기 (Mock 데이터는 실제 데이터보다 우선순위가 낮음)
        const allPosts = [...savedPosts, ...mockPosts.filter(mockPost => 
          !savedPosts.some((savedPost: any) => savedPost.id === mockPost.id)
        )];
        
        setPosts(allPosts);
      } catch (error) {
        console.error('글 목록 로드 오류:', error);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 필터링 및 정렬된 포스트들
  const filteredAndSortedPosts = useMemo(() => {
    try {
      let filtered = posts.filter(post => {
        // 검색어 필터
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          const matchesSearch =
            (post?.title || '').toLowerCase().includes(searchLower) ||
            (post?.content || '').toLowerCase().includes(searchLower) ||
            (post?.author?.username || '').toLowerCase().includes(searchLower);

          if (!matchesSearch) return false;
        }

        // 카테고리 필터
        if (filters.categoryId) {
          if (!post?.category?.id || post.category.id !== filters.categoryId) {
            return false;
          }
        }

        // 태그 필터
        if (filters.tagIds.length > 0) {
          const postTagIds = post?.tags?.map(tag => tag?.id).filter(Boolean) || [];
          const hasMatchingTag = filters.tagIds.some(filteredTagId =>
            postTagIds.includes(filteredTagId)
          );
          if (!hasMatchingTag) return false;
        }

        // 작성자 필터
        if (filters.authorName) {
          const authorNameLower = filters.authorName.toLowerCase();
          if (!(post?.author?.username || '').toLowerCase().includes(authorNameLower)) {
            return false;
          }
        }

        // 날짜 범위 필터
        if (filters.dateRange.start || filters.dateRange.end) {
          const postDate = new Date(post?.createdAt || 0);
          if (filters.dateRange.start && postDate < filters.dateRange.start) {
            return false;
          }
          if (filters.dateRange.end && postDate > filters.dateRange.end) {
            return false;
          }
        }

        // 통계 필터
        if (filters.minViews && (post?.viewCount || 0) < filters.minViews) {
          return false;
        }
        if (filters.minLikes && (post?.likeCount || 0) < filters.minLikes) {
          return false;
        }

        // 이미지 필터
        if (filters.hasImages && (!post?.images || post.images.length === 0)) {
          return false;
        }

        return true;
      });

      // 정렬
      filtered.sort((a, b) => {
        try {
          switch (filters.sortBy) {
            case 'oldest':
              const oldestDateA = new Date(a?.createdAt || 0);
              const oldestDateB = new Date(b?.createdAt || 0);
              return oldestDateA.getTime() - oldestDateB.getTime();
            case 'popular':
              return (b?.likeCount || 0) - (a?.likeCount || 0);
            case 'mostViewed':
              return (b?.viewCount || 0) - (a?.viewCount || 0);
            case 'mostCommented':
              // 댓글 수는 실제로는 로컬스토리지에서 계산해야 함
              return 0; // 임시
            case 'latest':
            default:
              const latestDateA = new Date(a?.createdAt || 0);
              const latestDateB = new Date(b?.createdAt || 0);
              return latestDateB.getTime() - latestDateA.getTime();
          }
        } catch (error) {
          console.error('정렬 오류:', error);
          return 0;
        }
      });

      return filtered;
    } catch (error) {
      console.error('필터링/정렬 오류:', error);
      return posts;
    }
  }, [posts, filters]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, startIndex + postsPerPage);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 좋아요 처리
  const handleLike = (postId: string) => {
    if (!user) {
      showToast('로그인이 필요합니다.', 'error');
      return;
    }

    try {
      const newLikedState = togglePostLike(user.id, postId);
      
      // 현재 포스트 목록에서 좋아요 수 업데이트
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                likeCount: post.likeCount + (newLikedState ? 1 : -1) 
              }
            : post
        )
      );

      showToast(
        newLikedState ? '좋아요를 눌렀습니다!' : '좋아요를 취소했습니다!', 
        'success'
      );
    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      showToast('오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
  };

  // 날짜 포맷
  const formatDate = (date?: Date | string) => {
    try {
      if (!date) return '-';
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '-';
      
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(dateObj);
    } catch {
      return '-';
    }
  };

  // 숫자 포맷
  const formatNumber = (num?: number) => {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">글 목록</h1>
                <p className="text-gray-600">
                  총 {filteredAndSortedPosts.length}개의 글이 있습니다.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* 뷰 전환 버튼 */}
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewType === 'grid'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="그리드 보기"
                  >
                    <FontAwesomeIcon icon={faTh} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewType === 'list'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title="리스트 보기"
                  >
                    <FontAwesomeIcon icon={faList} className="w-4 h-4" />
                  </button>
                </div>
                <Link
                  to="/write"
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  새 글 작성
                </Link>
              </div>
            </div>
          </div>

          {/* 고급 검색 */}
          <div className="mb-8">
            <AdvancedSearch
              onFiltersChange={setFilters}
              initialFilters={filters}
            />
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center py-16">
              <FontAwesomeIcon icon={faSpinner} className="text-3xl text-purple-600 animate-spin mb-4" />
              <p className="text-gray-600">글 목록을 불러오는 중...</p>
            </div>
          )}

          {/* 글 목록 */}
          {!loading && (
            <>
              {currentPosts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-6xl mb-6">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    검색 조건에 맞는 글이 없습니다
                  </h3>
                  <p className="text-gray-600 mb-6">
                    다른 검색 조건을 시도해보거나 새로운 글을 작성해보세요.
                  </p>
                  <div className="space-x-4">
                    <button
                      onClick={() => setFilters({
                        searchTerm: '',
                        tagIds: [],
                        dateRange: {},
                        sortBy: 'latest'
                      })}
                      className="px-6 py-3 text-purple-600 border border-purple-300 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      검색 조건 초기화
                    </button>
                    <Link
                      to="/write"
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      새 글 작성하기
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* 글 카드 목록 */}
                  {viewType === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                      {currentPosts.map((post) => (
                        <article
                          key={post?.id || Math.random()}
                          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                        >
                          {/* 이미지 */}
                          {post?.images && post.images.length > 0 && (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={post.images[0]}
                                alt={post?.title || '이미지'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs font-medium">
                                <FontAwesomeIcon icon={faImage} className="mr-1" />
                                {post.images.length}
                              </div>
                            </div>
                          )}

                          <div className="p-6">
                            {/* 카테고리 */}
                            {post?.category && (
                              <div className="mb-3">
                                <span 
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white"
                                  style={{ backgroundColor: post.category.color }}
                                >
                                  <FontAwesomeIcon icon={faFolder} className="mr-1" />
                                  {post.category.name}
                                </span>
                              </div>
                            )}

                            {/* 제목 */}
                            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                              <Link to={`/posts/${post?.id}`}>
                                {post?.title || '제목 없음'}
                              </Link>
                            </h2>

                            {/* 내용 미리보기 */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {post?.content?.replace(/[#*`]/g, '').substring(0, 150) || '내용 없음'}
                            </p>

                            {/* 태그 */}
                            {post?.tags && post.tags.length > 0 && (
                              <div className="hidden">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag?.id}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                                    style={{ backgroundColor: tag?.color || '#8B5CF6' }}
                                  >
                                    <FontAwesomeIcon icon={faTags} className="mr-1" />
                                    {tag?.name}
                                  </span>
                                ))}
                                {post.tags.length > 3 && (
                                  <span className="text-xs text-gray-500 px-2 py-0.5">
                                    +{post.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* 작성자 및 날짜 */}
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                                  <span className="text-white text-xs font-bold">
                                    {(post?.author?.username || 'U').charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {post?.author?.username || '알 수 없음'}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                    {formatDate(post?.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 통계 */}
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center text-gray-500">
                                  <FontAwesomeIcon icon={faEye} className="mr-1" />
                                  {formatNumber(post?.viewCount || 0)}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    post?.id && handleLike(post.id);
                                  }}
                                  className={`flex items-center transition-colors ${
                                    user && post?.id && isPostLiked(user.id, post.id)
                                      ? 'text-red-500 hover:text-red-600'
                                      : 'text-gray-500 hover:text-red-500'
                                  }`}
                                  disabled={!user || !post?.id}
                                  title={user ? '좋아요' : '로그인이 필요합니다'}
                                >
                                  <FontAwesomeIcon icon={faHeart} className="mr-1" />
                                  {post?.likeCount || 0}
                                </button>
                              </div>
                              <Link
                                to={`/posts/${post?.id}`}
                                className="text-purple-600 hover:text-purple-700 font-medium"
                              >
                                자세히 보기
                              </Link>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {viewType === 'list' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-12">
                      {currentPosts.map((post, index) => {
                        const postDate = new Date(post?.createdAt || new Date());
                        const month = postDate.toLocaleDateString('ko-KR', { month: 'short' });
                        const day = postDate.getDate();
                        const year = postDate.getFullYear();
                        
                        return (
                          <article
                            key={post?.id || Math.random()}
                            className={`group ${index !== currentPosts.length - 1 ? 'border-b border-gray-100' : ''}`}
                          >
                            <Link
                              to={`/posts/${post?.id}`}
                              className="flex items-center px-8 py-6 hover:bg-gray-50 transition-colors"
                            >
                              {/* 날짜 영역 */}
                              <div className="flex-shrink-0 text-center mr-8 min-w-[80px]">
                                <div className="text-sm text-gray-500 font-medium">{month}</div>
                                <div className="text-3xl font-bold text-gray-900 leading-none">{day}</div>
                                <div className="text-sm text-gray-500 mt-1">{year}</div>
                              </div>
                              
                              {/* 내용 영역 */}
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center space-x-3 mb-1">
                                  {post?.category && (
                                    <span 
                                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-white flex-shrink-0"
                                      style={{ backgroundColor: post.category.color }}
                                    >
                                      {post.category.name}
                                    </span>
                                  )}
                                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                                    {post?.title || '제목 없음'}
                                  </h2>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <FontAwesomeIcon icon={faUser} className="mr-1.5 w-3 h-3" />
                                    {post?.author?.username || '알 수 없음'}
                                  </span>
                                  <span className="flex items-center">
                                    <FontAwesomeIcon icon={faEye} className="mr-1.5 w-3 h-3" />
                                    {formatNumber(post?.viewCount || 0)}
                                  </span>
                                  <span className="flex items-center">
                                    <FontAwesomeIcon icon={faHeart} className="mr-1.5 w-3 h-3" />
                                    {formatNumber(post?.likeCount || 0)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* 액션 버튼 영역 */}
                              <div className="flex-shrink-0 ml-6">
                                <div className="flex items-center text-sm text-gray-400 group-hover:text-purple-600 transition-colors">
                                  <span>자세히 보기</span>
                                </div>
                              </div>
                            </Link>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  {/* 페이지네이션 */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        이전
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            currentPage === page
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        다음
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostList;
