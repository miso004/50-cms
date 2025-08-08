import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faList, 
  faPenToSquare, 
  faCog, 
  faSignOutAlt, 
  faSignInAlt,
  faUserPlus 
} from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className={`${isHomePage ? 'h-screen' : 'min-h-screen'} bg-gray-50 relative`}>
      {/* Sub-page Header Image */}
      {!isHomePage && (
        <div 
          className="w-full h-[250px] bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
          }}
        />
      )}
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center ${isHomePage ? 'h-20' : 'h-[70px]'}`}>
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black text-white hover:text-purple-200 transition-colors">
                <span>WIDSoft</span>
              </Link>
            </div>
            
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isActive('/') 
                    ? 'text-purple-600 bg-purple-50 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
              >
                <FontAwesomeIcon icon={faHome} />
                <span>홈</span>
              </Link>
              
              <Link
                to="/posts"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isActive('/posts') 
                    ? 'text-purple-600 bg-purple-50 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
              >
                <FontAwesomeIcon icon={faList} />
                <span>글목록</span>
              </Link>
              
              <Link
                to="/write"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isActive('/write') 
                    ? 'text-purple-600 bg-purple-50 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>글쓰기</span>
              </Link>
            </nav>
            
            {/* 모바일 네비게이션 */}
            <nav className="hidden">
              <Link
                to="/"
                className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
              >
                <FontAwesomeIcon icon={faHome} />
              </Link>
              
              <Link
                to="/posts"
                className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/posts') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </Link>
              
              <Link
                to="/write"
                className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/write') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
              

            </nav>
            
            {/* 사용자 메뉴 */}
            <div className="flex items-center space-x-3">
              {user ? (
                                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-3 bg-white/20 rounded-2xl px-4 py-2">
                      <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{user.username}</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="text-sm text-white hover:text-red-300 transition-colors ml-2"
                        title="로그아웃"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </button>
                    </div>
                  </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-white hover:text-purple-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-purple-50/50 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>로그인</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="text-white hover:text-purple-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-purple-50/50 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>회원가입</span>
                  </Link>
                </div>
              )}
              
              {/* 관리자 아이콘 - 새 창으로 열기 */}
              <button
                                  onClick={() => {
                    try {
                      const adminWindow = window.open('/admin', '_blank', 'width=1400,height=800,scrollbars=yes,resizable=yes,menubar=yes,toolbar=yes,location=yes,status=yes');
                      if (!adminWindow) {
                        alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
                      }
                    } catch (error) {
                      console.error('관리자 페이지 열기 오류:', error);
                      alert('관리자 페이지를 열 수 없습니다. 다시 시도해주세요.');
                    }
                  }}
                className="p-2 w-10 h-10 rounded-xl text-lg transition-all duration-200 flex items-center justify-center text-white hover:text-purple-200 hover:bg-purple-50/50"
                title="관리자 페이지 (새 창)"
              >
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${isHomePage ? 'h-full w-full' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white z-40">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">글쓰기 플랫폼</h3>
              <p className="text-gray-300 text-sm">
                당신의 생각을 자유롭게 표현할 수 있는 공간입니다.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/write" className="hover:text-white transition-colors">글쓰기</Link></li>
                <li><Link to="/posts" className="hover:text-white transition-colors">글 목록</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">회원가입</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">도움말</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">연결</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이메일</a></li>
                <li><a href="#" className="hover:text-white transition-colors">블로그</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>© 2024 글쓰기 플랫폼. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 