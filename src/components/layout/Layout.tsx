import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faList, 
  faPenToSquare, 
  faCog, 
  faSignOutAlt, 
  faSignInAlt,
  faUserPlus,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { visibleMenuItems } = useMenu();
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isHomePage = location.pathname === '/';

  // 메뉴 아이콘 매핑
  const getMenuIcon = (url: string) => {
    switch (url) {
      case '/':
        return faHome;
      case '/posts':
        return faList;
      case '/write':
        return faPenToSquare;
      default:
        return faHome;
    }
  };

  return (
    <div className={`${isHomePage ? 'h-screen' : 'min-h-screen'} bg-gray-50 relative`}>
      {/* Header */}
      <header className="relative w-full z-50 bg-transparent">
        {/* 첫 번째 단 - 로그인/회원가입 아이콘 */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-6 pt-1">
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/profile" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-bold">{user.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{user.username}</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-xs text-gray-600 hover:text-red-300 transition-colors"
                      title="로그아웃"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-purple-200 text-xs font-medium transition-colors duration-200 flex items-center space-x-1"
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="text-xs" />
                      <span>로그인</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="text-gray-600 hover:text-purple-200 text-xs font-medium transition-colors duration-200 flex items-center space-x-1"
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
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
                  className="p-1 w-6 h-6 rounded text-xs transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-purple-200 hover:bg-purple-50/50"
                  title="관리자 페이지 (새 창)"
                >
                  <FontAwesomeIcon icon={faCog} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 두 번째 단 - 로고와 메뉴 */}
        <div className="bg-white/10 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center h-14">
              <div className="flex items-center w-[250px]">
                <Link to="/" className="text-3xl font-black text-gray-600 hover:text-primary transition-colors cursor-pointer">
                  <span>WIDSoft</span>
                </Link>
              </div>
              
              {/* 데스크톱 네비게이션 - 동적 메뉴 with 드롭다운 */}
              <nav className="hidden md:flex items-center justify-between flex-1">
                {visibleMenuItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div 
                      className="relative flex-1"
                      onMouseEnter={() => setHoveredMenu(item.id)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <Link
                        to={item.url}
                        className={`flex items-center justify-center px-4 py-2 rounded-xl text-xl text-gray-950 font-semibold transition-all duration-200 cursor-pointer ${
                          isActive(item.url) 
                            ? 'text-purple-600 bg-purple-50 shadow-sm' 
                            : 'text-gray-600 hover:text-purple-200 hover:bg-white/20'
                        }`}
                      >
                        <span>{item.name}</span>
                        {(item.children && item.children.length > 0) && (
                          <FontAwesomeIcon 
                            icon={faChevronDown} 
                            className="ml-2 text-sm transition-transform duration-200"
                            style={{ 
                              transform: hoveredMenu === item.id ? 'rotate(180deg)' : 'rotate(0deg)' 
                            }}
                          />
                        )}
                      </Link>
                    </div>
                    {index < visibleMenuItems.length - 1 && (
                      <div className="w-px h-6 bg-gray-300 mx-2"></div>
                    )}
                  </React.Fragment>
                ))}
              </nav>
              
              {/* 전체 화면 드롭다운 메뉴 - 모든 서브메뉴 한번에 표시 */}
              {hoveredMenu && (hoveredMenu === '2' || hoveredMenu === '3') && (
                <div 
                  className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg py-6 z-50 animate-fade-in-down"
                  onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${visibleMenuItems.length}, 1fr)` }}>
                      {visibleMenuItems.map((menuItem, index) => (
                        <div key={menuItem.id}>
                          {menuItem.children && menuItem.children.length > 0 ? (
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4 text-lg">{menuItem.name}</h4>
                              <div className="space-y-3">
                                {menuItem.children
                                  .filter(child => child.isVisible && child.isActive)
                                  .sort((a, b) => a.order - b.order)
                                  .map((child) => (
                                    <Link
                                      key={child.id}
                                      to={child.url}
                                      className={`block px-4 py-3 text-base transition-colors duration-200 rounded-lg ${
                                        isActive(child.url)
                                          ? 'text-purple-600 bg-purple-50 font-semibold'
                                          : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                                      }`}
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          ) : (
                            <div></div> // 서브메뉴가 없는 메뉴는 빈 공간
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              

              
              {/* 모바일 네비게이션 - 동적 메뉴 */}
              <nav className="md:hidden flex items-center space-x-2">
                {visibleMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.url}
                    className={`p-2 rounded-lg text-base transition-all duration-200 cursor-pointer ${
                      isActive(item.url) 
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-gray-600 hover:text-purple-200 hover:bg-white/20'
                    }`}
                    title={item.name}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-page Header Image */}
      {!isHomePage && (
        <div 
          className="w-full h-[250px] bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
          }}
        />
      )}

      {/* Main Content */}
      <main className={`${isHomePage ? 'h-full w-full' : 'pt-0'}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white z-40">
        <div className="max-w-[1200px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
                {visibleMenuItems.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <Link to={item.url} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
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