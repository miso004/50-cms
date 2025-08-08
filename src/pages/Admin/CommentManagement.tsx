import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faSearch, 
  faFilter, 
  faSort, 
  faEdit, 
  faTrash, 
  faBan, 
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
  faUser,
  faCalendarAlt,
  faReply,
  faHome,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import type { Comment } from '../../types';

// Mock 댓글 데이터
const mockComments: Comment[] = [
  {
    id: '1',
    content: '정말 유용한 정보네요! 감사합니다.',
    author: {
      id: 'u1',
      username: '김개발',
      email: 'dev@example.com',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    postId: '1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    status: 'approved'
  },
  {
    id: '2',
    content: '이 부분에 대해 더 자세히 설명해주실 수 있나요?',
    author: {
      id: 'u2',
      username: '이디자인',
      email: 'design@example.com',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    },
    postId: '1',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
    status: 'pending'
  }
];

type StatusFilter = 'all' | 'approved' | 'pending' | 'rejected';
type SortOption = 'latest' | 'oldest' | 'author';

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setComments(mockComments);
      } catch (error) {
        console.error('댓글 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleApproveComment = async (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId ? { ...comment, status: 'approved' } : comment
    ));
  };

  const handleRejectComment = async (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId ? { ...comment, status: 'rejected' } : comment
    ));
  };

  const handleDeleteComment = async (commentId: string) => {
    if (confirm('이 댓글을 삭제하시겠습니까?')) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }
  };

  const handleSelectComment = (commentId: string) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedComments.length === 0) return;
    
    if (confirm(`선택된 ${selectedComments.length}개의 댓글을 삭제하시겠습니까?`)) {
      setComments(prev => prev.filter(comment => !selectedComments.includes(comment.id)));
      setSelectedComments([]);
    }
  };

  const filteredComments = comments
    .filter(comment => {
      const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comment.author.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'author':
          return a.author.username.localeCompare(b.author.username);
        default: // latest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '승인됨';
      case 'pending':
        return '대기중';
      case 'rejected':
        return '거부됨';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">댓글 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center">
              <FontAwesomeIcon icon={faComments} className="mr-3 text-blue-600" />
              댓글 관리
            </h1>
            <p className="text-gray-600">사이트의 모든 댓글을 관리합니다.</p>
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

        <div className="flex items-center space-x-3 mt-6">
          {selectedComments.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              선택 삭제 ({selectedComments.length})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {/* 검색 및 필터 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="댓글 내용, 작성자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">모든 상태</option>
              <option value="approved">승인됨</option>
              <option value="pending">대기중</option>
              <option value="rejected">거부됨</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="author">작성자순</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>총 {filteredComments.length}개의 댓글</span>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedComments.includes(comment.id)}
                    onChange={() => handleSelectComment(comment.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-600 text-sm" />
                      </div>
                      <span className="font-medium text-gray-900">{comment.author.username}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                        {getStatusText(comment.status)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                        {formatDate(comment.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faReply} className="mr-1" />
                        글 ID: {comment.postId}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {comment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveComment(comment.id)}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        title="승인"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        onClick={() => handleRejectComment(comment.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="거부"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
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
      </div>
    </div>
  );
};

export default CommentManagement;