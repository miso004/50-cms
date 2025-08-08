import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faList,
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faEyeSlash,
  faSort,
  faSearch,
  faHome,
  faChevronRight,
  faBars,
  faLink,
  faCog
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  id: string;
  name: string;
  url: string;
  order: number;
  isActive: boolean;
  isVisible: boolean;
  parentId?: string;
  children?: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '홈',
    url: '/',
    order: 1,
    isActive: true,
    isVisible: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: '글목록',
    url: '/posts',
    order: 2,
    isActive: true,
    isVisible: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: '글쓰기',
    url: '/write',
    order: 3,
    isActive: true,
    isVisible: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: '관리자',
    url: '/admin',
    order: 4,
    isActive: true,
    isVisible: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newMenuItem, setNewMenuItem] = useState<{
    name: string;
    url: string;
    order: number;
    isActive: boolean;
    isVisible: boolean;
  }>({
    name: '',
    url: '',
    order: 1,
    isActive: true,
    isVisible: true
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setMenuItems(mockMenuItems);
      } catch (error) {
        console.error('메뉴 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...newMenuItem,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setMenuItems(prev => [...prev, newItem]);
      setShowAddModal(false);
      setNewMenuItem({
        name: '',
        url: '',
        order: 1,
        isActive: true,
        isVisible: true
      });
    } catch (error) {
      console.error('메뉴 추가 실패:', error);
    }
  };

  const handleEditMenu = async (item: MenuItem) => {
    try {
      setMenuItems(prev => 
        prev.map(menu => 
          menu.id === item.id 
            ? { ...item, updatedAt: new Date() }
            : menu
        )
      );
      setEditingItem(null);
    } catch (error) {
      console.error('메뉴 수정 실패:', error);
    }
  };

  const handleDeleteMenu = async (itemId: string) => {
    if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
      try {
        setMenuItems(prev => prev.filter(item => item.id !== itemId));
      } catch (error) {
        console.error('메뉴 삭제 실패:', error);
      }
    }
  };

  const handleToggleVisibility = async (itemId: string) => {
    try {
      setMenuItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, isVisible: !item.isVisible, updatedAt: new Date() }
            : item
        )
      );
    } catch (error) {
      console.error('메뉴 가시성 변경 실패:', error);
    }
  };

  const handleToggleActive = async (itemId: string) => {
    try {
      setMenuItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? { ...item, isActive: !item.isActive, updatedAt: new Date() }
            : item
        )
      );
    } catch (error) {
      console.error('메뉴 활성화 변경 실패:', error);
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">메뉴 목록을 불러오는 중...</p>
            </div>
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
          <div className="flex items-center mb-4 justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900">메뉴 관리</h1>
              <p className="text-gray-600 mt-1">사이트 메뉴 구조를 관리하세요</p>
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
              <span className="text-gray-900 font-medium">메뉴 관리</span>
            </nav>
          </div>
          
          {/* 통계 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faList} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">전체 메뉴</p>
                  <p className="text-xl font-bold text-gray-900">{menuItems.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faEye} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">활성 메뉴</p>
                  <p className="text-xl font-bold text-gray-900">
                    {menuItems.filter(item => item.isActive).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faEye} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">표시 메뉴</p>
                  <p className="text-xl font-bold text-gray-900">
                    {menuItems.filter(item => item.isVisible).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faSort} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">최대 순서</p>
                  <p className="text-xl font-bold text-gray-900">
                    {Math.max(...menuItems.map(item => item.order), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  placeholder="메뉴명, URL로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              메뉴 추가
            </button>
          </div>
        </div>

        {/* 메뉴 목록 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    메뉴명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    순서
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    수정일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMenuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faBars} className="text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faLink} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{item.url}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.order}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isActive ? '활성' : '비활성'}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.isVisible 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isVisible ? '표시' : '숨김'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(item.updatedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleVisibility(item.id)}
                          className={`p-1 rounded transition-colors ${
                            item.isVisible 
                              ? 'text-blue-600 hover:text-blue-700' 
                              : 'text-gray-600 hover:text-gray-700'
                          }`}
                          title={item.isVisible ? '숨기기' : '표시하기'}
                        >
                          <FontAwesomeIcon icon={item.isVisible ? faEye : faEyeSlash} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(item.id)}
                          className={`p-1 rounded transition-colors ${
                            item.isActive 
                              ? 'text-green-600 hover:text-green-700' 
                              : 'text-red-600 hover:text-red-700'
                          }`}
                          title={item.isActive ? '비활성화' : '활성화'}
                        >
                          <FontAwesomeIcon icon={faCog} />
                        </button>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="수정"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="삭제"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 결과 개수 */}
        <div className="mt-6 text-center text-sm text-gray-600">
          총 {filteredMenuItems.length}개의 메뉴가 있습니다.
        </div>
      </div>
    </AdminLayout>
  );
};

export default MenuManagement; 