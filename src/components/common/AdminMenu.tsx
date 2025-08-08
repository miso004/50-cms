import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, 
  faUsers, 
  faBars, 
  faWindowMaximize, 
  faChartBar,
  faList
} from '@fortawesome/free-solid-svg-icons';

interface AdminMenuProps {
  className?: string;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ className = '' }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: '대시보드',
      path: '/admin',
      icon: faCog,
      description: '관리자 대시보드'
    },
    {
      name: '사이트관리',
      path: '/admin/settings',
      icon: faCog,
      description: '사이트 설정 관리'
    },
    {
      name: '회원관리',
      path: '/admin/users',
      icon: faUsers,
      description: '사용자 계정 관리'
    },
    {
      name: '글관리',
      path: '/admin/posts',
      icon: faBars,
      description: '게시글 관리'
    },
    {
      name: '댓글관리',
      path: '/admin/comments',
      icon: faWindowMaximize,
      description: '댓글 관리'
    },
    {
      name: '메뉴관리',
      path: '/admin/menus',
      icon: faList,
      description: '사이트 메뉴 관리'
    },
    {
      name: '통계관리',
      path: '/admin/analytics',
      icon: faChartBar,
      description: '사이트 통계 분석'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`bg-black border-b border-gray-800 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-8 overflow-x-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center py-4 px-4 border-b-2 transition-all duration-300 hover:bg-gray-900 group
                ${isActive(item.path) 
                  ? 'border-blue-500 text-white bg-gray-900' 
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-600'
                }
              `}
            >
              <FontAwesomeIcon 
                icon={item.icon} 
                className={`text-lg mr-3 transition-colors duration-300 ${isActive(item.path) ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'}`}
              />
              <span className="text-sm font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue-400">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu; 