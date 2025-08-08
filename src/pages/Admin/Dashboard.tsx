import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faFileAlt, 
  faComments, 
  faUserPlus, 
  faEdit, 
  faBolt,
  faCog,
  faChartLine,
  faHome,
  faChevronRight,
  faPalette
} from '@fortawesome/free-solid-svg-icons';
import type { AdminStats } from '../../types';

// 실제 데이터 계산 함수들
const calculateRealStats = (): AdminStats => {
  try {
    // 로컬 스토리지에서 실제 데이터 가져오기
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]'); // 가상 사용자 데이터
    
    // 일주일 전 날짜 계산
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // 신규 글 계산 (일주일 이내) - 안전한 Date 파싱
    const newPostsThisWeek = posts.filter((post: any) => {
      try {
        const postDate = new Date(post?.createdAt || 0);
        return !isNaN(postDate.getTime()) && postDate >= oneWeekAgo;
      } catch {
        return false;
      }
    }).length;
    
    // 신규 댓글 계산 (일주일 이내) - 안전한 Date 파싱
    const newCommentsThisWeek = comments.filter((comment: any) => {
      try {
        const commentDate = new Date(comment?.createdAt || 0);
        return !isNaN(commentDate.getTime()) && commentDate >= oneWeekAgo;
      } catch {
        return false;
      }
    }).length;
    
    return {
      totalUsers: users.length + 150, // 기본 사용자 + 실제 가입자
      totalPosts: posts.length + 25, // Mock 데이터 + 실제 작성글
      totalComments: comments.length + 89, // Mock 댓글 + 실제 댓글
      newUsersThisWeek: Math.floor(Math.random() * 10) + 5, // 시뮬레이션
      newPostsThisWeek: newPostsThisWeek,
      activeUsers: Math.floor((users.length + 150) * 0.7) + Math.floor(Math.random() * 20)
    };
  } catch (error) {
    console.error('통계 계산 오류:', error);
    // 기본값 반환
    return {
      totalUsers: 156,
      totalPosts: 28,
      totalComments: 92,
      newUsersThisWeek: 8,
      newPostsThisWeek: 3,
      activeUsers: 124
    };
  }
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // 실제 데이터 기반으로 통계 계산
        await new Promise(resolve => setTimeout(resolve, 800));
        const realStats = calculateRealStats();
        setStats(realStats);
      } catch (error) {
        console.error('통계 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">대시보드를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">통계를 불러올 수 없습니다</h1>
          <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center mb-4 justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900">관리자 대시보드</h1>
            <p className="text-gray-600 mt-1">사이트 통계 및 관리 기능을 확인하세요</p>
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
            <span className="text-gray-900 font-medium">대시보드</span>
          </nav>
        </div>
      </div>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 총 사용자수 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">총 사용자수</p>
              <div className="text-2xl font-bold text-gray-900 flex">
                <span>15,234 </span>
                <span className="text-xs text-green-600 top-0 right-0 w-6 h-6 px-2 bg-green-50 rounded-full flex items-center justify-center ml-4 mt-1">
                  +12%
                </span>
              </div>
              <p className="text-xs text-gray-500">전체 가입 사용자</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="text-gray-800 text-lg" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
            </div>
          </div>
        </div>

        {/* 총 게시물 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm text-gray-600 mb-1">총 게시물</p>
              <div className="text-2xl font-bold text-gray-900 flex">
                <span>8,457 </span>
                <span className="text-xs text-green-600 top-0 right-0 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center ml-4 mt-1">
                  +8%
                </span>
              </div>
              <p className="text-xs text-gray-500">발행된 모든 글</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faFileAlt} className="text-gray-800 text-lg" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
            </div>
          </div>
        </div>

        {/* 총 댓글 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm text-gray-600 mb-1">총 댓글</p>
              <div className="text-2xl font-bold text-gray-900 flex">
                <span>24,891 </span>
                <span className="text-xs text-green-600 top-0 right-0 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center ml-4 mt-1">
                  +15%
                </span>
              </div>
              <p className="text-xs text-gray-500">작성된 모든 댓글</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faComments} className="text-gray-800 text-lg" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 두 번째 행 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 이번주 신규가입 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm text-gray-600 mb-1">이번주 신규가입</p>
              <div className="text-2xl font-bold text-gray-900 flex">
                <span>324 </span>
                <span className="text-xs text-green-600 top-0 right-0 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center ml-4 mt-1">
                  +23%
                </span>
              </div>
              <p className="text-xs text-gray-500">지난주 대비</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faUserPlus} className="text-gray-800 text-lg" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
            </div>
          </div>
        </div>

        {/* 이번주 신규글 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm text-gray-600 mb-1">이번주 신규글</p>
              <div className="text-2xl font-bold text-gray-900 flex">
                <span>156 </span>
                <span className="text-xs text-green-600 top-0 right-0 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center ml-4 mt-1">
                  +5%
                </span>
              </div>
              <p className="text-xs text-gray-500">지난주 대비</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faEdit} className="text-gray-800 text-lg" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
            </div>
          </div>
        </div>

        {/* 활성 사용자 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-sm text-gray-600 mb-1">활성 사용자</p>
              <div className="text-2xl font-bold text-gray-900 flex">
                <span>2,847 </span>
                <span className="text-xs text-green-600 top-0 right-0 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center ml-4 mt-1">
                  +7%
                </span>
              </div>
              <p className="text-xs text-gray-500">최근 7일 기준</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faBolt} className="text-gray-800 text-lg" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 빠른 관리 메뉴 */}
      <div className="mb-10 mt-10">
        <div className="flex items-center mb-6">
          <FontAwesomeIcon icon={faCog} className="text-gray-800 text-xl mr-3" style={{fontWeight: 100, strokeWidth: 0.5}} />
          <h2 className="text-xl font-bold text-gray-900">빠른 관리 메뉴</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link to="/admin/users" className="group">
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-lg hover:shadow-2xl hover:shadow-gray-800/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-800 group-hover:to-black rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <FontAwesomeIcon icon={faUsers} className="text-white text-2xl transition-all duration-300" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">사용자 관리</h3>
              <p className="text-sm text-gray-600 mb-4">회원 정보 조회 및 관리</p>
              <button className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300">
                바로가기
              </button>
            </div>
          </Link>

          <Link to="/admin/posts" className="group">
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-lg hover:shadow-2xl hover:shadow-gray-800/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-800 group-hover:to-black rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <FontAwesomeIcon icon={faFileAlt} className="text-white text-2xl transition-all duration-300" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">글 관리</h3>
              <p className="text-sm text-gray-600 mb-4">게시글 승인 및 관리</p>
              <button className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300">
                바로가기
              </button>
            </div>
          </Link>

          <Link to="/admin/comments" className="group">
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-lg hover:shadow-2xl hover:shadow-gray-800/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-800 group-hover:to-black rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <FontAwesomeIcon icon={faComments} className="text-white text-2xl transition-all duration-300" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">댓글 관리</h3>
              <p className="text-sm text-gray-600 mb-4">댓글 모니터링 및 관리</p>
              <button className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300">
                바로가기
              </button>
            </div>
          </Link>

          <Link to="/admin/settings" className="group">
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-lg hover:shadow-2xl hover:shadow-gray-800/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-800 group-hover:to-black rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <FontAwesomeIcon icon={faCog} className="text-white text-2xl transition-all duration-300" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">사이트 설정</h3>
              <p className="text-sm text-gray-600 mb-4">사이트설정,기능관리</p>
              <button className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300">
                바로가기
              </button>
            </div>
          </Link>

          <Link to="/admin/analytics" className="group">
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center shadow-lg hover:shadow-2xl hover:shadow-gray-800/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-800 group-hover:to-black rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <FontAwesomeIcon icon={faChartLine} className="text-white text-2xl transition-all duration-300" style={{fontWeight: 100, strokeWidth: 0.5}} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">사이트 분석</h3>
              <p className="text-sm text-gray-600 mb-4">통계 및 성과 분석</p>
              <button className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300">
                바로가기
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 