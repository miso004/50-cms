import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine,
  faUsers,
  faEye,
  faClock,
  faArrowUp,
  faHome,
  faChevronRight,
  faDownload,
  faFilter,
  faCalendarDay,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface AnalyticsData {
  // 방문자 통계
  totalVisitors: number;
  todayVisitors: number;
  yesterdayVisitors: number;
  pageViews: number;
  avgSessionDuration: number;
  
  // 콘텐츠 통계
  totalPosts: number;
  totalComments: number;
  popularPosts: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
  }>;
  
  // 사용자 활동
  activeUsers: number;
  newUsers: number;
  userGrowth: number;
  
  // 시간별 데이터
  hourlyData: Array<{
    hour: number;
    visitors: number;
  }>;
  
  // 일별 데이터
  dailyData: Array<{
    date: string;
    visitors: number;
    posts: number;
  }>;
}

const mockAnalyticsData: AnalyticsData = {
  totalVisitors: 15420,
  todayVisitors: 324,
  yesterdayVisitors: 298,
  pageViews: 45680,
  avgSessionDuration: 4.2,
  totalPosts: 2847,
  totalComments: 12560,
  popularPosts: [
    { id: '1', title: 'React 개발 팁 10가지', views: 1240, likes: 89 },
    { id: '2', title: 'TypeScript 완벽 가이드', views: 1156, likes: 76 },
    { id: '3', title: '웹 성능 최적화 방법', views: 987, likes: 65 },
    { id: '4', title: 'CSS Grid 레이아웃', views: 856, likes: 54 },
    { id: '5', title: 'JavaScript ES6+ 문법', views: 743, likes: 43 }
  ],
  activeUsers: 2847,
  newUsers: 324,
  userGrowth: 12.5,
  hourlyData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    visitors: Math.floor(Math.random() * 100) + 20
  })),
  dailyData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    visitors: Math.floor(Math.random() * 500) + 100,
    posts: Math.floor(Math.random() * 20) + 5
  }))
};

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [exporting, setExporting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'visitors' | 'posts'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 정렬된 일별 데이터
  const sortedDailyData = React.useMemo(() => {
    if (!data) return [];
    
    return [...data.dailyData].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      switch (sortBy) {
        case 'date':
          aValue = a.date;
          bValue = b.date;
          break;
        case 'visitors':
          aValue = a.visitors;
          bValue = b.visitors;
          break;
        case 'posts':
          aValue = a.posts;
          bValue = b.posts;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, sortBy, sortOrder]);

  // 정렬 함수
  const handleSort = (column: 'date' | 'visitors' | 'posts') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // 시간 범위에 따른 데이터 생성 함수
  const generateDataForTimeRange = (range: '7d' | '30d' | '90d'): AnalyticsData => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const multiplier = range === '7d' ? 0.3 : range === '30d' ? 1 : 2.5;
    
    return {
      totalVisitors: Math.floor(15420 * multiplier),
      todayVisitors: Math.floor(324 * multiplier),
      yesterdayVisitors: Math.floor(298 * multiplier),
      pageViews: Math.floor(45680 * multiplier),
      avgSessionDuration: 4.2,
      totalPosts: 2847,
      totalComments: 12560,
      popularPosts: [
        { id: '1', title: 'React 개발 팁 10가지', views: Math.floor(1240 * multiplier), likes: 89 },
        { id: '2', title: 'TypeScript 완벽 가이드', views: Math.floor(1156 * multiplier), likes: 76 },
        { id: '3', title: '웹 성능 최적화 방법', views: Math.floor(987 * multiplier), likes: 65 },
        { id: '4', title: 'CSS Grid 레이아웃', views: Math.floor(856 * multiplier), likes: 54 },
        { id: '5', title: 'JavaScript ES6+ 문법', views: Math.floor(743 * multiplier), likes: 43 }
      ],
      activeUsers: Math.floor(2847 * multiplier),
      newUsers: Math.floor(324 * multiplier),
      userGrowth: 12.5,
      hourlyData: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        visitors: Math.floor((Math.random() * 100 + 20) * multiplier)
      })),
      dailyData: Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        visitors: Math.floor((Math.random() * 500 + 100) * multiplier),
        posts: Math.floor((Math.random() * 20 + 5) * (multiplier * 0.5))
      }))
    };
  };

  // 데이터 내보내기 함수
  const exportData = async () => {
    if (!data) return;
    
    setExporting(true);
    try {
      // CSV 데이터 생성
      const csvData = [
        ['날짜', '방문자', '페이지뷰', '게시글'],
        ...data.dailyData.map(item => [
          item.date,
          item.visitors.toString(),
          Math.floor(item.visitors * 3.2).toString(), // 페이지뷰 추정
          item.posts.toString()
        ])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `analytics_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 성공 메시지 표시
      alert('데이터가 성공적으로 내보내졌습니다!');
    } catch (error) {
      console.error('데이터 내보내기 실패:', error);
      alert('데이터 내보내기에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setExporting(false);
    }
  };

  // 실시간 데이터 새로고침 함수
  const refreshData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newData = generateDataForTimeRange(timeRange);
      setData(newData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('데이터 새로고침 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 자동 새로고침 설정
  useEffect(() => {
    let interval: number;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        refreshData();
      }, 30000); // 30초마다 새로고침
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh, timeRange]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newData = generateDataForTimeRange(timeRange);
        setData(newData);
      } catch (error) {
        console.error('분석 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900">사이트 분석</h1>
                <p className="text-gray-600 mt-1">사이트 성과 및 사용자 활동을 확인하세요</p>
              </div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link 
                  to="/admin" 
                  className="flex items-center hover:text-gray-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  관리자
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                <span className="text-gray-900 font-medium">사이트 분석</span>
              </nav>
            </div>
          </div>
          
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">분석 데이터를 불러오는 중...</h3>
              <p className="text-gray-600">잠시만 기다려주세요</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">분석 데이터를 불러올 수 없습니다</h1>
            <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900">사이트 분석</h1>
              <p className="text-gray-600 mt-1">사이트 성과 및 사용자 활동을 확인하세요</p>
            </div>
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link 
                to="/admin" 
                className="flex items-center hover:text-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faHome} className="mr-1" />
                관리자
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
              <span className="text-gray-900 font-medium">사이트 분석</span>
            </nav>
          </div>

          {/* 필터 및 액션 */}
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="7d">최근 7일</option>
                  <option value="30d">최근 30일</option>
                  <option value="90d">최근 90일</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* 데이터 내보내기 버튼 */}
              <button 
                onClick={exportData}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                disabled={exporting}
              >
                {exporting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                )}
                데이터 내보내기
              </button>
            </div>
          </div>
        </div>

        {/* 방문자 통계 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 콘텐츠 요약 */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">콘텐츠 통계</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{data.totalPosts.toLocaleString()}</div>
                <div className="text-sm text-gray-600">총 게시글</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{data.totalComments.toLocaleString()}</div>
                <div className="text-sm text-gray-600">총 댓글</div>
              </div>
            </div>
          </div>

          {/* 방문자 통계 */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">방문자 통계</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">총 방문자수</span>
                <span className="font-bold text-gray-900">{data.totalVisitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">오늘 방문자수</span>
                <span className="font-bold text-blue-600">{data.todayVisitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">어제 방문자수</span>
                <span className="font-bold text-gray-900">{data.yesterdayVisitors.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 인기 게시글 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">인기 게시글</h3>
          <div className="space-y-3">
            {data.popularPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  // 실제로는 해당 게시글로 이동
                  alert(`"${post.title}" 게시글을 확인합니다.\n조회수: ${post.views.toLocaleString()}\n좋아요: ${post.likes}`);
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-gray-500 w-6">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      조회수 {post.views.toLocaleString()} • 좋아요 {post.likes}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faArrowUp} className="text-green-500 text-sm" />
                  <span className="text-xs text-gray-400">클릭하여 보기</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 시간별 방문자 차트 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">시간별 방문자</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {data.hourlyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div 
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative"
                  style={{ height: `${(item.visitors / 120) * 200}px` }}
                  title={`${item.hour}시: ${item.visitors.toLocaleString()}명`}
                >
                  {/* 호버 시 툴팁 */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.visitors.toLocaleString()}명
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.hour}시</span>
              </div>
            ))}
          </div>
        </div>

        {/* 일별 트렌드 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">일별 트렌드</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th 
                    className="text-left py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>날짜</span>
                      {sortBy === 'date' && (
                        <span className="text-xs text-gray-500">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-right py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSort('visitors')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>방문자</span>
                      {sortBy === 'visitors' && (
                        <span className="text-xs text-gray-500">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-right py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSort('posts')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <span>게시글</span>
                      {sortBy === 'posts' && (
                        <span className="text-xs text-gray-500">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDailyData.slice(-7).map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2">{item.date}</td>
                    <td className="text-right py-2">{item.visitors.toLocaleString()}</td>
                    <td className="text-right py-2">{item.posts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics; 