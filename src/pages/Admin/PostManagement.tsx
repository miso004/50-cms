import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  faExclamationTriangle,
  faHome,
  faChevronRight
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
          default: // latest
            const latestA = new Date(a?.createdAt || 0);
            const latestB = new Date(b?.createdAt || 0);
            return latestB.getTime() - latestA.getTime();
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
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    
    if (confirm(`선택된 ${selectedPosts.length}개의 글을 삭제하시겠습니까?`)) {
      setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
      setSelectedPosts([]);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('이 글을 삭제하시겠습니까?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const getPostCommentCount = (postId: string) => {
    try {
      return comments.filter(comment => comment.postId === postId).length;
    } catch {
      return 0;
    }
  };

  const formatDate = (date?: Date | string) => {
    try {
      if (!date) return '알 수 없음';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('ko-KR');
    } catch {
      return '알 수 없음';
    }
  };

  const formatNumber = (num?: number) => {
    try {
      if (num === undefined || num === null) return '0';
      return num.toLocaleString();
    } catch {
      return '0';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center mb-4 justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900">글 관리</h1>
              <p className="text-gray-600 mt-1">사이트의 모든 글을 관리하세요</p>
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
              <span className="text-gray-900 font-medium">글 관리</span>
            </nav>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  placeholder="제목, 내용, 작성자로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">모든 상태</option>
                <option value="published">발행됨</option>
                <option value="draft">임시저장</option>
                <option value="archived">보관됨</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="mostViewed">조회수순</option>
                <option value="mostLiked">좋아요순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 글 목록 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <FontAwesomeIcon icon={faEdit} className="mr-2 text-blue-600" />
                글 목록 ({filteredPosts.length}개)
              </h2>
              {selectedPosts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  선택 삭제 ({selectedPosts.length})
                </button>
              )}
            </div>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faEdit} className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">글이 없습니다</h3>
              <p className="text-gray-600">검색 조건에 맞는 글이 없습니다.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'published' ? 'bg-green-100 text-green-800' :
                            post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status === 'published' ? '발행됨' :
                             post.status === 'draft' ? '임시저장' : '보관됨'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-1" />
                            {post.author?.username || '알 수 없음'}
                          </span>
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                            {formatNumber(post.viewCount)} 조회
                          </span>
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faHeart} className="mr-1" />
                            {formatNumber(post.likeCount)} 좋아요
                          </span>
                          <span className="flex items-center">
                            <FontAwesomeIcon icon={faComment} className="mr-1" />
                            {getPostCommentCount(post.id)} 댓글
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostManagement;