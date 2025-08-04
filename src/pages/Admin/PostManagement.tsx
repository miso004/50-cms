import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import type { Post, PostStatusType } from '../../types';
import { PostStatus } from '../../types';

// 임시 데이터
const mockPosts: Post[] = [
  {
    id: '1',
    title: '첫 번째 글입니다',
    content: '안녕하세요! 이것은 첫 번째 글입니다.',
    author: {
      id: '1',
      username: '작성자1',
      email: 'author1@example.com',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    viewCount: 150,
    likeCount: 25,
    status: PostStatus.PUBLISHED
  },
  {
    id: '2',
    title: '두 번째 글입니다',
    content: '이것은 두 번째 글입니다.',
    author: {
      id: '2',
      username: '작성자2',
      email: 'author2@example.com',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    viewCount: 89,
    likeCount: 12,
    status: PostStatus.DRAFT
  },
  {
    id: '3',
    title: '세 번째 글입니다',
    content: '세 번째 글입니다.',
    author: {
      id: '3',
      username: '작성자3',
      email: 'author3@example.com',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    viewCount: 67,
    likeCount: 8,
    status: PostStatus.ARCHIVED
  }
];

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(mockPosts);
      } catch (error) {
        console.error('글 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleStatusChange = async (postId: string, newStatus: PostStatusType) => {
    try {
      console.log('글 상태 변경:', postId, newStatus);
      
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, status: newStatus } : post
      ));
      
      alert('글 상태가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('글 상태 변경 실패:', error);
      alert('글 상태 변경에 실패했습니다.');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
        console.log('글 삭제:', postId);
        
        setPosts(prev => prev.filter(post => post.id !== postId));
        alert('글이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('글 삭제 실패:', error);
        alert('글 삭제에 실패했습니다.');
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getStatusLabel = (status?: PostStatusType) => {
    switch (status) {
      case PostStatus.PUBLISHED:
        return '발행됨';
      case PostStatus.DRAFT:
        return '임시저장';
      case PostStatus.ARCHIVED:
        return '보관됨';
      default:
        return '미정';
    }
  };

  const getStatusBadgeColor = (status?: PostStatusType) => {
    switch (status) {
      case PostStatus.PUBLISHED:
        return 'bg-green-100 text-green-800';
      case PostStatus.DRAFT:
        return 'bg-yellow-100 text-yellow-800';
      case PostStatus.ARCHIVED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">글 목록을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">글 관리</h1>
          <p className="text-gray-600">사이트의 모든 글을 관리하세요.</p>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                label="검색"
                type="text"
                placeholder="제목, 내용, 작성자로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상태 필터
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">모든 상태</option>
                <option value={PostStatus.PUBLISHED}>발행됨</option>
                <option value={PostStatus.DRAFT}>임시저장</option>
                <option value={PostStatus.ARCHIVED}>보관됨</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                필터 적용
              </Button>
            </div>
          </div>
        </div>

        {/* 글 목록 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              글 목록 ({filteredPosts.length}개)
            </h2>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">글이 없습니다</h3>
              <p className="text-gray-600">검색 조건에 맞는 글이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      글 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
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
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {post.content.substring(0, 50)}...
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{post.author.username}</div>
                        <div className="text-sm text-gray-500">{post.author.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(post.status)}`}>
                          {getStatusLabel(post.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>조회 {post.viewCount}</div>
                        <div>좋아요 {post.likeCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            value={post.status || PostStatus.DRAFT}
                            onChange={(e) => handleStatusChange(post.id, e.target.value as PostStatusType)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value={PostStatus.DRAFT}>임시저장</option>
                            <option value={PostStatus.PUBLISHED}>발행</option>
                            <option value={PostStatus.ARCHIVED}>보관</option>
                          </select>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostManagement; 