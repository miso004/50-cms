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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-2xl font-black text-gray-900 hover:text-purple-600 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <span>WIDSoft</span>
              </Link>
            </div>
            
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-1">
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
            <nav className="md:hidden flex items-center space-x-1">
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
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-2xl px-4 py-2">
                    <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{user.username}</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-sm text-gray-500 hover:text-red-600 transition-colors ml-2"
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
                    className="text-gray-600 hover:text-purple-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-purple-50/50 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>로그인</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-600 hover:text-purple-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-purple-50/50 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>회원가입</span>
                  </Link>
                </div>
              )}
              
              {/* 관리자 아이콘 - 회원가입 오른쪽에 위치 */}
              <Link
                to="/admin"
                className={`p-2 w-10 h-10 rounded-xl text-lg transition-all duration-200 flex items-center justify-center ${
                  location.pathname.startsWith('/admin') 
                    ? 'text-purple-600 bg-purple-50 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
                title="관리자 페이지"
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
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