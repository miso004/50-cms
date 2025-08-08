import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faUsers, 
  faEdit, 
  faComment,
  faEye,
  faHeart,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faHome,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import type { AdminStats } from '../../types';

// Mock 통계 데이터
const mockStats: AdminStats = {
  totalUsers: 1250,
  totalPosts: 342,
  totalComments: 1890,
  newUsersThisWeek: 45,
  newPostsThisWeek: 12,
  activeUsers: 89
};

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('통계 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const getGrowthIcon = (rate: number) => {
    return rate >= 0 ? faArrowUp : faArrowDown;
  };

  const getGrowthColor = (rate: number) => {
    return rate >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">통계 데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">통계 데이터를 불러올 수 없습니다.</p>
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
              <FontAwesomeIcon icon={faChartLine} className="mr-3 text-blue-600" />
              분석 대시보드
            </h1>
            <p className="text-gray-600">사이트 활동 및 성과를 분석합니다.</p>
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
            <span className="text-gray-900 font-medium">분석 대시보드</span>
          </nav>
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
            <option value="year">올해</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* 총 사용자 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 사용자</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalUsers)}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon 
                  icon={getGrowthIcon(12)} 
                  className={`mr-1 text-sm ${getGrowthColor(12)}`} 
                />
                <span className={`text-sm ${getGrowthColor(12)}`}>+12%</span>
                <span className="text-sm text-gray-500 ml-1">지난 주 대비</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* 총 글 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 글</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalPosts)}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon 
                  icon={getGrowthIcon(8)} 
                  className={`mr-1 text-sm ${getGrowthColor(8)}`} 
                />
                <span className={`text-sm ${getGrowthColor(8)}`}>+8%</span>
                <span className="text-sm text-gray-500 ml-1">지난 주 대비</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faEdit} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* 총 댓글 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 댓글</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalComments)}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon 
                  icon={getGrowthIcon(15)} 
                  className={`mr-1 text-sm ${getGrowthColor(15)}`} 
                />
                <span className={`text-sm ${getGrowthColor(15)}`}>+15%</span>
                <span className="text-sm text-gray-500 ml-1">지난 주 대비</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faComment} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* 활성 사용자 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">활성 사용자</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.activeUsers)}</p>
              <div className="flex items-center mt-2">
                <FontAwesomeIcon 
                  icon={getGrowthIcon(-3)} 
                  className={`mr-1 text-sm ${getGrowthColor(-3)}`} 
                />
                <span className={`text-sm ${getGrowthColor(-3)}`}>-3%</span>
                <span className="text-sm text-gray-500 ml-1">지난 주 대비</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 상세 통계 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 이번 주 활동 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">이번 주 활동</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">새 사용자</p>
                  <p className="text-sm text-gray-600">이번 주에 가입한 사용자</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stats.newUsersThisWeek}</p>
                <p className="text-sm text-green-600">+{getGrowthRate(stats.newUsersThisWeek, 38)}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faEdit} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">새 글</p>
                  <p className="text-sm text-gray-600">이번 주에 작성된 글</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stats.newPostsThisWeek}</p>
                <p className="text-sm text-green-600">+{getGrowthRate(stats.newPostsThisWeek, 10)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 인기 지표 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">인기 지표</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faEye} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">평균 조회수</p>
                  <p className="text-sm text-gray-600">글당 평균 조회수</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-green-600">+5%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">평균 좋아요</p>
                  <p className="text-sm text-gray-600">글당 평균 좋아요</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-green-600">+12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 