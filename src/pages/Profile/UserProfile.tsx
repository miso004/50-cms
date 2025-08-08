import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faEdit,
  faEye,
  faHeart,
  faBookmark,
  faCalendarAlt,
  faTags,
  faFolder,
  faChartLine,
  faComments,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import type { Post } from '../../types';
import { 
  getUserInteractionStats, 
  getUserBookmarks, 
  getBookmarkedPosts,
  getUserLikes
} from '../../utils/socialUtils';

type TabType = 'posts' | 'bookmarks' | 'liked';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalBookmarks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      setLoading(true);
      
      try {
        // 사용자가 작성한 글들 - 안전한 처리
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const userWrittenPosts = Array.isArray(savedPosts) 
          ? savedPosts.filter((post: any) => post?.author?.id === user?.id) 
          : [];
        setUserPosts(userWrittenPosts);

        // 사용자가 북마크한 글들 - 안전한 처리
        try {
          const bookmarked = getBookmarkedPosts(user.id);
          setBookmarkedPosts(Array.isArray(bookmarked) ? bookmarked : []);
        } catch (error) {
          console.error('북마크 데이터 로딩 오류:', error);
          setBookmarkedPosts([]);
        }

        // 사용자가 좋아요한 글들 - 안전한 처리
        try {
          const likedPostIds = getUserLikes(user.id);
          const liked = Array.isArray(savedPosts) && Array.isArray(likedPostIds)
            ? savedPosts.filter((post: any) => likedPostIds.includes(post?.id)) 
            : [];
          setLikedPosts(liked);
        } catch (error) {
          console.error('좋아요 데이터 로딩 오류:', error);
          setLikedPosts([]);
        }

        // 통계 계산 - 안전한 처리
        try {
          const interactionStats = getUserInteractionStats(user.id);
          const totalViews = userWrittenPosts.reduce((sum: number, post: any) => {
            return sum + (post?.viewCount || 0);
          }, 0);
          const totalLikesReceived = userWrittenPosts.reduce((sum: number, post: any) => {
            return sum + (post?.likeCount || 0);
          }, 0);

          setStats({
            totalPosts: userWrittenPosts.length,
            totalViews,
            totalLikes: totalLikesReceived,
            totalBookmarks: interactionStats?.totalBookmarks || 0
          });
        } catch (error) {
          console.error('통계 계산 오류:', error);
          setStats({
            totalPosts: userWrittenPosts.length,
            totalViews: 0,
            totalLikes: 0,
            totalBookmarks: 0
          });
        }
      } catch (error) {
        console.error('사용자 데이터 로딩 오류:', error);
        // 오류 발생 시 기본값 설정
        setUserPosts([]);
        setBookmarkedPosts([]);
        setLikedPosts([]);
        setStats({
          totalPosts: 0,
          totalViews: 0,
          totalLikes: 0,
          totalBookmarks: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h1>
            <p className="text-gray-600 mb-6">프로필을 보려면 로그인해주세요.</p>
            <Link
              to="/login"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              로그인하기
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return '날짜 정보 없음';
      }
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    } catch (error) {
      return '날짜 정보 없음';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getCurrentPosts = () => {
    switch (activeTab) {
      case 'bookmarks':
        return bookmarkedPosts;
      case 'liked':
        return likedPosts;
      case 'posts':
      default:
        return userPosts;
    }
  };

  const renderPostCard = (post: any) => {
    if (!post || !post.id) {
      return null;
    }

    return (
      <article
        key={post.id}
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* 카테고리 */}
            {post.category && (
              <span 
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white mb-2"
                style={{ backgroundColor: post.category.color || '#8B5CF6' }}
              >
                <FontAwesomeIcon icon={faFolder} className="mr-1" />
                {post.category.name || '카테고리'}
              </span>
            )}

            {/* 제목 */}
            <Link to={`/posts/${post.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                {post.title || '제목 없음'}
              </h3>
            </Link>

            {/* 내용 미리보기 */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {post.content || '내용 없음'}
            </p>

            {/* 태그 */}
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 3).map((tag: any) => (
                  <span
                    key={tag?.id || Math.random()}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: tag?.color || '#8B5CF6' }}
                  >
                    <FontAwesomeIcon icon={faTags} className="mr-1" />
                    {tag?.name || '태그'}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-0.5">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 작성일 */}
          <div className="text-xs text-gray-500 ml-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {formatDate(post.createdAt || new Date())}
          </div>
        </div>

        {/* 통계 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faEye} className="mr-1" />
              {formatNumber(post.viewCount || 0)}
            </span>
            <span className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-1" />
              {post.likeCount || 0}
            </span>
          </div>
          
          {activeTab === 'posts' && (
            <Link
              to={`/posts/${post.id}/edit`}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-1" />
              수정
            </Link>
          )}
        </div>
      </article>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 프로필 헤더 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* 프로필 이미지 */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-6">
                  <span className="text-white text-2xl font-bold">
                    {(user?.username || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* 사용자 정보 */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.username || '사용자'}</h1>
                  <p className="text-gray-600 mb-2">{user?.email || '이메일 정보 없음'}</p>
                  <p className="text-sm text-gray-500">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                    가입일: {formatDate(user?.createdAt || new Date())}
                  </p>
                </div>
              </div>

              {/* 프로필 편집 버튼 */}
              <button className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                프로필 편집
              </button>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalPosts}</div>
                <div className="text-sm text-gray-500">작성한 글</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(stats.totalViews)}</div>
                <div className="text-sm text-gray-500">총 조회수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalLikes}</div>
                <div className="text-sm text-gray-500">받은 좋아요</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalBookmarks}</div>
                <div className="text-sm text-gray-500">북마크</div>
              </div>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'posts'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                  내가 쓴 글 ({userPosts.length})
                </button>
                <button
                  onClick={() => setActiveTab('bookmarks')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'bookmarks'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                  북마크 ({bookmarkedPosts.length})
                </button>
                <button
                  onClick={() => setActiveTab('liked')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'liked'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  좋아요한 글 ({likedPosts.length})
                </button>
              </nav>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">데이터를 불러오는 중...</p>
                </div>
              ) : getCurrentPosts().length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">
                    {activeTab === 'posts' && '📝'}
                    {activeTab === 'bookmarks' && '🔖'}
                    {activeTab === 'liked' && '💜'}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activeTab === 'posts' && '아직 작성한 글이 없습니다'}
                    {activeTab === 'bookmarks' && '북마크한 글이 없습니다'}
                    {activeTab === 'liked' && '좋아요한 글이 없습니다'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === 'posts' && '첫 번째 글을 작성해보세요!'}
                    {activeTab === 'bookmarks' && '관심있는 글을 북마크해보세요!'}
                    {activeTab === 'liked' && '마음에 드는 글에 좋아요를 눌러보세요!'}
                  </p>
                  {activeTab === 'posts' && (
                    <Link
                      to="/write"
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      글 작성하기
                    </Link>
                  )}
                  {(activeTab === 'bookmarks' || activeTab === 'liked') && (
                    <Link
                      to="/posts"
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      글 둘러보기
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.isArray(getCurrentPosts()) 
                    ? getCurrentPosts().filter(post => post && post.id).map(renderPostCard)
                    : <div className="text-center text-gray-500">데이터를 불러올 수 없습니다.</div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;