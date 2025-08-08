import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faSearch, 
  faFilter, 
  faSort, 
  faEdit, 
  faTrash, 
  faBan, 
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
  faUserPlus,
  faUserMinus,
  faHome,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { User } from '../../types';

// Mock 사용자 데이터
const mockUsers: User[] = [
  {
    id: '1',
    username: '관리자',
    email: 'admin@example.com',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    role: 'admin'
  },
  {
    id: '2',
    username: '김개발',
    email: 'dev@example.com',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    role: 'user'
  },
  {
    id: '3',
    username: '이디자인',
    email: 'design@example.com',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    role: 'user'
  }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<{
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  }>({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
      } catch (error) {
        console.error('사용자 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email || !newUser.password) return;

    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: newUser.role
    };

    setUsers(prev => [...prev, user]);
    setNewUser({
      username: '',
      email: '',
      password: '',
      role: 'user'
    });
    setShowAddModal(false);
  };

  const handleEditUser = async (user: User) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role || 'user'
    });
    setShowAddModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('이 사용자를 삭제하시겠습니까?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    
    if (confirm(`선택된 ${selectedUsers.length}명의 사용자를 삭제하시겠습니까?`)) {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <p className="text-gray-600">사용자 목록을 불러오는 중...</p>
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
              <FontAwesomeIcon icon={faUsers} className="mr-3 text-blue-600" />
              사용자 관리
            </h1>
            <p className="text-gray-600">사이트 사용자 계정을 관리합니다.</p>
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
            <span className="text-gray-900 font-medium">사용자 관리</span>
          </nav>
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            새 사용자 추가
          </button>
          {selectedUsers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
              선택 삭제 ({selectedUsers.length})
            </button>
          )}
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
                placeholder="사용자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>총 {filteredUsers.length}명의 사용자</span>
          </div>
        </div>

        {/* 사용자 목록 */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{user.username}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' ? '관리자' : '사용자'}
                      </span>
                    </div>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>가입일: {formatDate(user.createdAt)}</span>
                      <span>수정일: {formatDate(user.updatedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="편집"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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

      {/* 새 사용자 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingUser ? '사용자 편집' : '새 사용자 추가'}
            </h2>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">사용자명</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="사용자명을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="비밀번호를 입력하세요"
                  required={!editingUser}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">역할</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as 'user' | 'admin' }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="user">사용자</option>
                  <option value="admin">관리자</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingUser ? '수정' : '추가'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingUser(null);
                    setNewUser({
                      username: '',
                      email: '',
                      password: '',
                      role: 'user'
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

export default UserManagement; 