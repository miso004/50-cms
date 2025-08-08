import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { useMenu } from '../../contexts/MenuContext';
import type { MenuItem } from '../../contexts/MenuContext';

const MenuManagement: React.FC = () => {
  const { 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    toggleMenuItemVisibility, 
    toggleMenuItemActive,
    loading 
  } = useMenu();
  
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

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuItem.name || !newMenuItem.url) return;

    if (editingItem) {
      // 기존 메뉴 수정
      updateMenuItem(editingItem.id, {
        name: newMenuItem.name,
        url: newMenuItem.url,
        order: newMenuItem.order,
        isActive: newMenuItem.isActive,
        isVisible: newMenuItem.isVisible
      });
    } else {
      // 새 메뉴 추가
      addMenuItem({
        name: newMenuItem.name,
        url: newMenuItem.url,
        order: newMenuItem.order,
        isActive: newMenuItem.isActive,
        isVisible: newMenuItem.isVisible
      });
    }

    setNewMenuItem({
      name: '',
      url: '',
      order: 1,
      isActive: true,
      isVisible: true
    });
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleEditMenu = async (item: MenuItem) => {
    setEditingItem(item);
    setNewMenuItem({
      name: item.name,
      url: item.url,
      order: item.order,
      isActive: item.isActive,
      isVisible: item.isVisible
    });
    setShowAddModal(true);
  };

  const handleDeleteMenu = async (itemId: string) => {
    if (confirm('이 메뉴 항목을 삭제하시겠습니까?')) {
      deleteMenuItem(itemId);
    }
  };

  const handleToggleVisibility = async (itemId: string) => {
    toggleMenuItemVisibility(itemId);
  };

  const handleToggleActive = async (itemId: string) => {
    toggleMenuItemActive(itemId);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">메뉴 목록을 불러오는 중...</p>
          </div>
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
              <FontAwesomeIcon icon={faBars} className="mr-3 text-purple-600" />
              메뉴 관리
            </h1>
            <p className="text-gray-600">사이트 메뉴 구조를 관리합니다.</p>
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

        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            새 메뉴 추가
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {/* 검색 및 필터 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="메뉴 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>총 {filteredMenuItems.length}개 메뉴</span>
          </div>
        </div>

        {/* 메뉴 목록 */}
        <div className="space-y-4">
          {filteredMenuItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FontAwesomeIcon icon={faLink} className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-sm text-gray-500">{item.url}</span>
                    <span className="text-xs text-gray-400">순서: {item.order}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>생성일: {formatDate(item.createdAt)}</span>
                    <span>수정일: {formatDate(item.updatedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleVisibility(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.isVisible 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={item.isVisible ? '숨기기' : '보이기'}
                  >
                    <FontAwesomeIcon icon={item.isVisible ? faEye : faEyeSlash} />
                  </button>
                  <button
                    onClick={() => handleToggleActive(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.isActive 
                        ? 'text-blue-600 hover:bg-blue-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={item.isActive ? '비활성화' : '활성화'}
                  >
                    <FontAwesomeIcon icon={faCog} />
                  </button>
                  <button
                    onClick={() => handleEditMenu(item)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="편집"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteMenu(item.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="삭제"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 새 메뉴 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? '메뉴 편집' : '새 메뉴 추가'}
            </h2>
            
            <form onSubmit={handleAddMenu} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">메뉴 이름</label>
                <input
                  type="text"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="메뉴 이름을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="text"
                  value={newMenuItem.url}
                  onChange={(e) => setNewMenuItem(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/example"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">순서</label>
                <input
                  type="number"
                  value={newMenuItem.order}
                  onChange={(e) => setNewMenuItem(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newMenuItem.isActive}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">활성화</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newMenuItem.isVisible}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, isVisible: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">보이기</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? '수정' : '추가'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                    setNewMenuItem({
                      name: '',
                      url: '',
                      order: 1,
                      isActive: true,
                      isVisible: true
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement; 