import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faEye, 
  faHeart, 
  faComment,
  faCalendarAlt,
  faUser,
  faEdit,
  faTrash,
  faFilter,
  faSortAmountDown,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import type { Post, Comment } from '../../types';

// Mock 데이터 (다른 파일과 동일)
const mockPosts: Post[] = [
  {
    id: '1',
    title: '리액트 18의 새로운 기능들과 실무 적용 가이드',
    content: '리액트 18에서 도입된 Concurrent Features...',
    author: {
      id: 'u1',
      username: '김개발',
      email: 'dev@example.com',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    viewCount: 1250,
    likeCount: 89,
    status: 'published'
  }
];

type SortOption = 'latest' | 'oldest' | 'mostViewed' | 'mostLiked';
type StatusFilter = 'all' | 'published' | 'draft' | 'archived';

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));

        // 로컬 스토리지에서 글과 댓글 불러오기 - 안전한 파싱
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        
        const allPosts = [...(Array.isArray(savedPosts) ? savedPosts : []), ...mockPosts];
        setPosts(allPosts);
        setComments(Array.isArray(savedComments) ? savedComments : []);
      } catch (error) {
        console.error('데이터 로딩 오류:', error);
        setPosts(mockPosts);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 검색 및 필터링 - 안전한 접근
  const filteredPosts = posts
    .filter(post => {
      try {
        const matchesSearch = (post?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (post?.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (post?.author?.username || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || post?.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        switch (sortBy) {
          case 'oldest':
            const dateA = new Date(a?.createdAt || 0);
            const dateB = new Date(b?.createdAt || 0);
            return dateA.getTime() - dateB.getTime();
          case 'mostViewed':
            return (b?.viewCount || 0) - (a?.viewCount || 0);
          case 'mostLiked':
            return (b?.likeCount || 0) - (a?.likeCount || 0);
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

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === filteredPosts.length 
        ? [] 
        : filteredPosts.map(post => post.id)
    );
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    
    if (!confirm(`선택된 ${selectedPosts.length}개의 글을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const updatedPosts = existingPosts.filter((post: Post) => !selectedPosts.includes(post.id));
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
      setSelectedPosts([]);
      alert(`${selectedPosts.length}개의 글이 삭제되었습니다.`);
    } catch (error) {
      console.error('일괄 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('이 글을 삭제하시겠습니까?')) return;

    try {
      const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const updatedPosts = existingPosts.filter((post: Post) => post.id !== postId);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      setPosts(prev => prev.filter(post => post.id !== postId));
      alert('글이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const getPostCommentCount = (postId: string) => {
    if (!postId) return 0;
    try {
      return comments.filter(comment => comment?.postId === postId).length;
    } catch {
      return 0;
    }
  };

  const formatDate = (date?: Date | string) => {
    try {
      if (!date) return '-';
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '-';
      
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    } catch {
      return '-';
    }
  };

  const formatNumber = (num?: number) => {
    try {
      if (typeof num !== 'number' || isNaN(num)) return '0';
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    } catch {
      return '0';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">글 관리</h1>
            <p className="text-gray-600">모든 글을 관리하고 모니터링할 수 있습니다.</p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FontAwesomeIcon icon={faEdit} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 글 수</p>
                  <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">발행된 글</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {posts.filter(p => p.status === 'published').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FontAwesomeIcon icon={faEye} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(posts.reduce((sum, post) => sum + post.viewCount, 0))}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 좋아요</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {posts.reduce((sum, post) => sum + post.likeCount, 0)}
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
                    placeholder="글 제목, 내용, 작가명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">모든 상태</option>
                  <option value="published">발행됨</option>
                  <option value="draft">임시저장</option>
                  <option value="archived">보관됨</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="latest">최신순</option>
                  <option value="oldest">오래된순</option>
                  <option value="mostViewed">조회수순</option>
                  <option value="mostLiked">좋아요순</option>
                </select>

                {selectedPosts.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    선택 삭제 ({selectedPosts.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 글 목록 테이블 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">데이터를 불러오는 중...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="p-8 text-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600">조건에 맞는 글이 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        글 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작성자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        통계
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
                    {filteredPosts.map((post, index) => (
                      <tr key={post?.id || `post-${index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={post?.id ? selectedPosts.includes(post.id) : false}
                            onChange={() => post?.id && handleSelectPost(post.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            disabled={!post?.id}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="flex-1">
                              <Link 
                                to={`/posts/${post?.id || ''}`}
                                className="text-sm font-medium text-gray-900 hover:text-purple-600 line-clamp-2"
                              >
                                {post?.title || '제목 없음'}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {(post?.content || '').substring(0, 100)}...
                              </p>
                              <div className="flex items-center mt-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  post?.status === 'published' 
                                    ? 'bg-green-100 text-green-800'
                                    : post?.status === 'draft'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {post?.status === 'published' ? '발행됨' : 
                                   post?.status === 'draft' ? '임시저장' : '보관됨'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">
                                {(post?.author?.username || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {post?.author?.username || '알 수 없음'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 space-y-1">
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faEye} className="text-gray-400 mr-2 w-4" />
                              {formatNumber(post?.viewCount || 0)}
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faHeart} className="text-gray-400 mr-2 w-4" />
                              {post?.likeCount || 0}
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faComment} className="text-gray-400 mr-2 w-4" />
                              {getPostCommentCount(post?.id || '')}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(post?.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/posts/${post?.id || ''}`}
                              className="text-purple-600 hover:text-purple-700 p-1"
                              title="보기"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <Link
                              to={`/posts/${post?.id || ''}/edit`}
                              className="text-blue-600 hover:text-blue-700 p-1"
                              title="수정"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button
                              onClick={() => post?.id && handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                              title="삭제"
                              disabled={!post?.id}
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
            총 {filteredPosts.length}개의 글이 있습니다.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostManagement;