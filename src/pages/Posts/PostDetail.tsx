import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faCalendarAlt,
  faEye,
  faHeart,
  faShare,
  faBookmark,
  faEdit,
  faTrash,
  faTags,
  faComment,
  faFolder
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import type { Post, Comment } from '../../types';
import { defaultCategories, defaultTags } from '../../utils/categoryUtils';
import { 
  isPostLiked, 
  isPostBookmarked, 
  togglePostLike, 
  togglePostBookmark,
  incrementViewCount
} from '../../utils/socialUtils';
import CommentSection from '../../components/common/CommentSection';

// Mock 데이터 (PostList.tsx와 동일한 데이터 사용)
const mockPosts: Post[] = [
  {
    id: '1',
    title: '리액트 18의 새로운 기능들과 실무 적용 가이드',
    content: `# 리액트 18의 새로운 기능들과 실무 적용 가이드

리액트 18은 React 생태계에 혁신적인 변화를 가져왔습니다. 이 글에서는 리액트 18에서 도입된 Concurrent Features, Suspense, 그리고 새로운 Hooks들을 실무에서 어떻게 활용할 수 있는지 상세히 알아보겠습니다.

## 🚀 주요 새로운 기능들

### 1. Concurrent Features
Concurrent Rendering은 리액트가 작업을 중단하고 재개할 수 있게 해주는 새로운 렌더링 메커니즘입니다.

\`\`\`jsx
import { startTransition } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleClick = () => {
    setCount(c => c + 1);
    startTransition(() => {
      setText('업데이트됨'); // 낮은 우선순위
    });
  };

  return (
    <div>
      <button onClick={handleClick}>
        카운트: {count}
      </button>
      <p>{text}</p>
    </div>
  );
}
\`\`\`

### 2. 새로운 Suspense 기능
Suspense는 이제 서버 사이드 렌더링에서도 사용할 수 있습니다.

\`\`\`jsx
import { Suspense } from 'react';

function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}
\`\`\`

### 3. useDeferredValue Hook
이 Hook을 사용하면 급하지 않은 상태 업데이트를 지연시킬 수 있습니다.

\`\`\`jsx
import { useDeferredValue, useState } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  // deferredQuery는 query보다 늦게 업데이트됩니다
  return <div>검색 결과: {deferredQuery}</div>;
}
\`\`\`

## 💡 실무 적용 팁

### 성능 최적화
- **startTransition**을 사용하여 느린 상태 업데이트를 감싸세요
- **useDeferredValue**로 검색 결과 같은 비급한 업데이트를 지연시키세요
- **Suspense**를 적절히 활용하여 로딩 경험을 개선하세요

### 마이그레이션 전략
1. **점진적 업그레이드**: createRoot를 먼저 적용
2. **Strict Mode 활성화**: 미래의 변경사항에 대비
3. **테스트 강화**: 새로운 동작들에 대한 테스트 추가

## 🔧 실제 프로젝트 적용 사례

저희 팀에서는 리액트 18을 도입한 후 다음과 같은 성과를 얻었습니다:

- **30% 빨라진** 초기 로딩 시간
- **50% 감소한** 메인 스레드 블로킹
- **더 부드러운** 사용자 인터랙션

## 마무리

리액트 18의 새로운 기능들은 단순히 새로운 API를 제공하는 것을 넘어서, 웹 애플리케이션의 성능과 사용자 경험을 근본적으로 개선할 수 있는 도구들입니다. 

점진적으로 도입하면서 여러분의 프로젝트에 맞는 최적의 활용 방법을 찾아보시기 바랍니다. 궁금한 점이 있으시면 언제든 댓글로 남겨주세요!`,
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
  // 나머지 포스트들도 동일하게 추가...
];

// Mock 댓글 데이터
const mockComments: Comment[] = [
  {
    id: 'c1',
    content: '정말 유용한 글이네요! startTransition은 처음 알았는데 바로 프로젝트에 적용해봐야겠어요.',
    author: {
      id: 'u2',
      username: '이개발자',
      email: 'dev2@example.com',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    postId: '1',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02')
  },
  {
    id: 'c2',
    content: 'Concurrent Features 부분이 특히 인상깊었어요. 실제 성능 개선 수치도 공유해주셔서 감사합니다!',
    author: {
      id: 'u3',
      username: '박프론트',
      email: 'frontend@example.com',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08')
    },
    postId: '1',
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03')
  }
];

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // 로컬 스토리지에서 사용자가 작성한 글 가져오기
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      
      // Mock 데이터와 실제 작성된 글 합치기
      const allPosts = [...savedPosts, ...mockPosts];
      
      const foundPost = allPosts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        
        // 조회수 증가
        incrementViewCount(foundPost.id);
        
        // 사용자의 좋아요/북마크 상태 확인
        if (user) {
          setLiked(isPostLiked(user.id, foundPost.id));
          setBookmarked(isPostBookmarked(user.id, foundPost.id));
        }
        
        // 댓글 수 계산
        const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        const postComments = [
          ...savedComments.filter((c: Comment) => c.postId === id),
          ...mockComments.filter(c => c.postId === id)
        ];
        
        setCommentCount(postComments.length);
      }
      setLoading(false);
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleLike = () => {
    if (!user || !post) {
      alert('로그인이 필요합니다.');
      return;
    }

    const newLikedState = togglePostLike(user.id, post.id);
    setLiked(newLikedState);
    
    // 글 상태 업데이트
    setPost(prev => prev ? {
      ...prev,
      likeCount: prev.likeCount + (newLikedState ? 1 : -1)
    } : null);
  };

  const handleBookmark = () => {
    if (!user || !post) {
      alert('로그인이 필요합니다.');
      return;
    }

    const newBookmarkedState = togglePostBookmark(user.id, post.id);
    setBookmarked(newBookmarkedState);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };



  const handleDelete = async () => {
    if (!confirm('정말로 이 글을 삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.')) {
      return;
    }

    try {
      // 로컬 스토리지에서 글 삭제
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const updatedPosts = existingPosts.filter((p: Post) => p.id !== post!.id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      alert('글이 삭제되었습니다.');
      navigate('/posts');
    } catch (error) {
      console.error('글 삭제 실패:', error);
      alert('글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-3 mb-8">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">글을 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-6">요청하신 글이 존재하지 않거나 삭제되었습니다.</p>
            <Link
              to="/posts"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              글 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* 상단 네비게이션 */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/posts')}
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                글 목록
              </button>
              
              {user && user.id === post.author.id && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    수정
                  </Link>
                  <button 
                    onClick={handleDelete}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 헤더 */}
          <header className="mb-12">
            <div className="mb-2">
              {/* 카테고리 표시 */}
              {post.category && (
                <span 
                  className="inline-flex h-10 items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                  style={{ backgroundColor: post.category.color }}
                >
                  <FontAwesomeIcon icon={faFolder} className="mr-1" />
                  {post.category.name}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 mt-7">
                {post.title}
              </h1>

              {/* 태그 표시 */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white"
                      style={{ backgroundColor: tag.color || '#8B5CF6' }}
                    >
                      <FontAwesomeIcon icon={faTags} className="mr-1" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 작가 정보 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {post.author.username.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.username}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>

              {/* 통계 */}
              <div className="flex items-center space-x-6 text-gray-500">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  {formatNumber(post.viewCount)}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  {post.likeCount}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  {commentCount}
                </span>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center space-x-4 pb-8 border-b border-gray-200">
              <button
                onClick={handleLike}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  liked
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                {liked ? '좋아요 취소' : '좋아요'}
              </button>
              
              <button
                onClick={handleBookmark}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  bookmarked
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
                }`}
              >
                <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                {bookmarked ? '북마크됨' : '북마크'}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <FontAwesomeIcon icon={faShare} className="mr-2" />
                공유
              </button>
            </div>
          </header>

          {/* 이미지 갤러리 */}
          {post.images && post.images.length > 0 && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faEye} className="mr-2 text-purple-600" />
                  첨부 이미지 ({post.images.length}개)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {post.images.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={image}
                        alt={`첨부 이미지 ${index + 1}`}
                        className="w-full h-64 object-cover rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                        onClick={() => {
                          // 클릭 시 이미지 확대
                          const newWindow = window.open();
                          if (newWindow) {
                            newWindow.document.write(`
                              <html>
                                <head>
                                  <title>이미지 보기 - ${post.title}</title>
                                  <style>
                                    body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                                    img { max-width: 100%; max-height: 100vh; object-fit: contain; }
                                  </style>
                                </head>
                                <body>
                                  <img src="${image}" alt="첨부 이미지 ${index + 1}" />
                                </body>
                              </html>
                            `);
                          }
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded-full">
                          클릭하여 확대
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 글 내용 */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                {post.content}
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <CommentSection postId={id!} />
        </article>
      </div>
    </Layout>
  );
};

export default PostDetail; 