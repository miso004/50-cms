import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faComment,
  faUser,
  faCalendarAlt,
  faTrash,
  faEdit,
  faEye,
  faFilter,
  faSortAmountDown,
  faCheckCircle,
  faExclamationTriangle,
  faBan,
  faHome,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import type { Comment, Post } from '../../types';

// Mock 글 데이터 (다른 페이지와 동일)
const mockPosts: Post[] = [
  {
    id: '1',
    title: '리액트 18의 새로운 기능들과 실무 적용 가이드',
    content: '리액트 18에서 도입된 Concurrent Features, Suspense, 그리고 새로운 Hooks들을 실무에서 어떻게 활용할 수 있는지 알아보겠습니다.',
    author: {
      id: 'u1',
      username: '관리자',
      email: 'admin@example.com',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      role: 'admin'
    },
    category: {
      id: 'c1',
      name: '개발',
      slug: 'development',
      description: '개발 관련 글들',
      color: '#3B82F6',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    tags: [
      {
        id: 't1',
        name: 'React',
        slug: 'react',
        color: '#61DAFB',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: 't2',
        name: 'Frontend',
        slug: 'frontend',
        color: '#FF6B6B',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ],
    images: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    viewCount: 1247,
    likeCount: 34,
    status: 'published'
  },
  {
    id: '2',
    title: 'TypeScript 5.0에서 달라진 점들',
    content: 'TypeScript 5.0의 새로운 기능들과 개선사항들을 살펴보고, 실제 프로젝트에 어떻게 적용할지 알아보겠습니다.',
    author: {
      id: 'u1',
      username: '관리자',
      email: 'admin@example.com',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      role: 'admin'
    },
    category: {
      id: 'c1',
      name: '개발',
      slug: 'development',
      description: '개발 관련 글들',
      color: '#3B82F6',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    tags: [
      {
        id: 't3',
        name: 'TypeScript',
        slug: 'typescript',
        color: '#3178C6',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ],
    images: [],
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
    viewCount: 892,
    likeCount: 28,
    status: 'published'
  }
];

// Mock 댓글 데이터 (PostDetail과 동일)
const mockComments: Comment[] = [
  {
    id: 'c1',
    content: '정말 유익한 글이네요! 리액트 18의 새로운 기능들이 이렇게 실무에 도움이 될 줄 몰랐습니다. 특히 Concurrent Features 부분이 인상 깊었어요.',
    author: {
      id: 'u2',
      username: '프론트개발자',
      email: 'frontend@example.com',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    postId: '1',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
    likeCount: 3,
    isLiked: false
  },
  {
    id: 'c2',
    content: 'useTransition 훅 사용 예제가 더 있으면 좋겠어요. 실제 프로젝트에서 어떻게 적용하는지 궁금합니다.',
    author: {
      id: 'u3',
      username: '신입개발자',
      email: 'junior@example.com',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    postId: '1',
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03'),
    likeCount: 1,
    isLiked: false
  }
];

type SortOption = 'latest' | 'oldest';
type FilterOption = 'all' | 'recent' | 'reported';

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));

        // 로컬 스토리지에서 댓글과 글 불러오기 - 안전한 파싱
        const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        
        // 불러온 댓글들에 누락된 속성 추가
        const normalizedSavedComments = Array.isArray(savedComments) 
          ? savedComments.map((comment: any) => ({
              ...comment,
              likeCount: comment.likeCount || 0,
              isLiked: comment.isLiked || false
            }))
          : [];
        
        const allComments = [...normalizedSavedComments, ...mockComments];
        setComments(allComments);
        
        // posts도 mock 데이터 포함
        const allPosts = [...(Array.isArray(savedPosts) ? savedPosts : []), ...mockPosts];
        setPosts(allPosts);
      } catch (error) {
        console.error('데이터 로딩 오류:', error);
        setComments(mockComments);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 검색 및 필터링 - 안전한 접근
  const filteredComments = comments
    .filter(comment => {
      try {
        const matchesSearch = (comment?.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (comment?.author?.username || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = (() => {
          switch (filterBy) {
            case 'recent':
              try {
                const threeDaysAgo = new Date();
                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                const commentDate = new Date(comment?.createdAt || 0);
                return !isNaN(commentDate.getTime()) && commentDate > threeDaysAgo;
              } catch {
                return false;
              }
            case 'reported':
              // 실제로는 신고된 댓글 필터링 로직이 들어가야 함
              return false;
            case 'all':
            default:
              return true;
          }
        })();
        
        return matchesSearch && matchesFilter;
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        switch (sortBy) {
          case 'oldest':
            const oldestDateA = new Date(a?.createdAt || 0);
            const oldestDateB = new Date(b?.createdAt || 0);
            return oldestDateA.getTime() - oldestDateB.getTime();
          case 'latest':
          default:
            const latestDateA = new Date(a?.createdAt || 0);
            const latestDateB = new Date(b?.createdAt || 0);
            return latestDateB.getTime() - latestDateA.getTime();
        }
      } catch {
        return 0;
      }
    });

  const handleSelectComment = (commentId: string) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedComments(
      selectedComments.length === filteredComments.length 
        ? [] 
        : filteredComments.map(comment => comment.id)
    );
  };

  const handleBulkDelete = async () => {
    if (selectedComments.length === 0) return;
    
    if (!confirm(`선택된 ${selectedComments.length}개의 댓글을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const existingComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const updatedComments = existingComments.filter((comment: Comment) => !selectedComments.includes(comment.id));
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      
      setComments(prev => prev.filter(comment => !selectedComments.includes(comment.id)));
      setSelectedComments([]);
      alert(`${selectedComments.length}개의 댓글이 삭제되었습니다.`);
    } catch (error) {
      console.error('일괄 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;

    try {
      const existingComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const updatedComments = existingComments.filter((comment: Comment) => comment.id !== commentId);
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const getPostTitle = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    return post ? post.title : '(삭제된 글)';
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return '알 수 없음';
      }
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    } catch (error) {
      return '알 수 없음';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center mb-4 justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900">댓글 관리</h1>
                <p className="text-gray-600 mt-1">모든 댓글을 관리하고 모니터링할 수 있습니다.</p>
              </div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 mt-4">
                <Link 
                  to="/admin" 
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  관리자
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                <span className="text-gray-900 font-medium">댓글 관리</span>
              </nav>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FontAwesomeIcon icon={faComment} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 댓글 수</p>
                  <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">오늘 댓글</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {comments.filter(c => {
                      try {
                        const today = new Date();
                        const commentDate = new Date(c.createdAt);
                        if (isNaN(commentDate.getTime())) {
                          return false;
                        }
                        return commentDate.toDateString() === today.toDateString();
                      } catch {
                        return false;
                      }
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">신고된 댓글</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">활성 사용자</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(comments.map(c => c?.author?.id).filter(Boolean)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 필터 및 검색 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <input
                    type="text"
                    placeholder="댓글 내용, 작성자명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">모든 댓글</option>
                  <option value="recent">최근 3일</option>
                  <option value="reported">신고된 댓글</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="latest">최신순</option>
                  <option value="oldest">오래된순</option>
                </select>

                {selectedComments.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    선택 삭제 ({selectedComments.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 댓글 목록 테이블 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">데이터를 불러오는 중...</p>
              </div>
            ) : filteredComments.length === 0 ? (
              <div className="p-8 text-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600">조건에 맞는 댓글이 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        댓글 내용
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작성자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        글 제목
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작성일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        액션
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComments.map((comment) => (
                      <tr key={comment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedComments.includes(comment.id)}
                            onChange={() => handleSelectComment(comment.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-900 line-clamp-3">
                              {comment?.content || '내용 없음'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">
                                {(comment?.author?.username || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">
                                {comment?.author?.username || '알 수 없음'}
                              </span>
                              <p className="text-xs text-gray-500">
                                {comment?.author?.email || '이메일 없음'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link 
                            to={`/posts/${comment?.postId || '#'}`}
                            className="text-sm text-purple-600 hover:text-purple-700 line-clamp-2"
                          >
                            {getPostTitle(comment?.postId || '')}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                          {formatDate(comment?.createdAt || new Date())}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/posts/${comment?.postId || '#'}`}
                              className="text-purple-600 hover:text-purple-700 p-1"
                              title="글 보기"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <button
                              onClick={() => handleDeleteComment(comment?.id || '')}
                              className="text-red-600 hover:text-red-700 p-1"
                              title="삭제"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 결과 개수 */}
          <div className="mt-6 text-center text-sm text-gray-600">
            총 {filteredComments.length}개의 댓글이 있습니다.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CommentManagement;