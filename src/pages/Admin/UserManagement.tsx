import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faSearch, 
  faUserShield, 
  faUser, 
  faTrash, 
  faCalendarAlt,
  faFilter,
  faUserPlus,
  faEdit,
  faCrown,
  faHome,
  faChevronRight,
  faTimes,
  faEnvelope,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { UserRole } from '../../types';
import type { User, UserRoleType } from '../../types';
import { Link } from 'react-router-dom';

// 임시 데이터
const mockUsers: User[] = [
  {
    id: '1',
    username: '관리자',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    username: '일반사용자1',
    email: 'user1@example.com',
    role: UserRole.USER,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '3',
    username: '일반사용자2',
    email: 'user2@example.com',
    role: UserRole.USER,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '4',
    username: '일반사용자3',
    email: 'user3@example.com',
    role: UserRole.USER,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState<{
    username: string;
    email: string;
    password: string;
    role: UserRoleType;
  }>({
    username: '',
    email: '',
    password: '',
    role: UserRole.USER
  });
  const [addUserLoading, setAddUserLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // TODO: 실제 API 호출로 대체
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(mockUsers);
      } catch (error) {
        console.error('사용자 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRoleType) => {
    try {
      // TODO: 실제 API 호출로 대체
      console.log('권한 변경:', userId, newRole);
      
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      alert('권한이 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('권한 변경 실패:', error);
      alert('권한 변경에 실패했습니다.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        // TODO: 실제 API 호출로 대체
        console.log('사용자 삭제:', userId);
        
        setUsers(prev => prev.filter(user => user.id !== userId));
        alert('사용자가 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('사용자 삭제 실패:', error);
        alert('사용자 삭제에 실패했습니다.');
      }
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 비밀번호 길이 검증
    if (newUser.password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setAddUserLoading(true);

    try {
      // 새 사용자 생성
      const newUserData: User = {
        id: Date.now().toString(),
        username: newUser.username.trim(),
        email: newUser.email.trim(),
        role: newUser.role,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // 사용자 목록에 추가
      setUsers(prev => [newUserData, ...prev]);

      // 폼 초기화
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: UserRole.USER
      });

      // 모달 닫기
      setShowAddUserModal(false);
      
      alert('새 사용자가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('사용자 추가 실패:', error);
      alert('사용자 추가에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setAddUserLoading(false);
    }
  };

  const closeAddUserModal = () => {
    setShowAddUserModal(false);
    setNewUser({
      username: '',
      email: '',
      password: '',
      role: UserRole.USER
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getRoleLabel = (role?: UserRoleType) => {
    switch (role) {
      case UserRole.ADMIN:
        return '관리자';
      case UserRole.USER:
        return '일반사용자';
      default:
        return '미정';
    }
  };

  const getRoleBadgeColor = (role?: UserRoleType) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.USER:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">사용자 목록을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        

        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center mb-4 justify-between">
            
            <div>
              <h1 className="text-4xl font-black text-gray-900">사용자 관리</h1>
              <p className="text-gray-600 mt-1">사용자 목록 및 권한을 관리하세요</p>
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
          
          {/* 통계 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">전체 사용자</p>
                  <p className="text-xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCrown} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">관리자</p>
                  <p className="text-xl font-bold text-gray-900">
                    {users.filter(u => u.role === UserRole.ADMIN).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faUser} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">일반 사용자</p>
                  <p className="text-xl font-bold text-gray-900">
                    {users.filter(u => u.role === UserRole.USER).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">이번주 신규</p>
                  <p className="text-xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faFilter} className="text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">검색 및 필터</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  placeholder="사용자명 또는 이메일로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faUserShield} className="mr-1" />
                권한 필터
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">모든 권한</option>
                <option value={UserRole.ADMIN}>관리자</option>
                <option value={UserRole.USER}>일반사용자</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={() => setShowAddUserModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 rounded-xl py-3"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                새 사용자
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>총 {filteredUsers.length}명의 사용자가 검색되었습니다</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                검색 조건 초기화
              </button>
            )}
          </div>
        </div>

        {/* 사용자 목록 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <FontAwesomeIcon icon={faUsers} className="mr-2 text-blue-600" />
                사용자 목록 ({filteredUsers.length}명)
              </h2>
              <div className="text-sm text-gray-500">
                마지막 업데이트: {new Date().toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>
          
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">사용자가 없습니다</h3>
              <p className="text-gray-600 mb-6">검색 조건에 맞는 사용자가 없습니다.</p>
              <Button 
                onClick={() => setShowAddUserModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                첫 번째 사용자 추가하기
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      사용자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      권한
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-lg">
                              {(user?.username || 'U').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 flex items-center">
                              {user?.username || '작성자 정보 없음'}
                              {user.role === UserRole.ADMIN && (
                                <FontAwesomeIcon 
                                  icon={faCrown} 
                                  className="ml-2 text-yellow-500" 
                                  title="관리자"
                                />
                              )}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                              {user?.email || '이메일 없음'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${getRoleBadgeColor(user.role)}`}>
                          <FontAwesomeIcon 
                            icon={user.role === UserRole.ADMIN ? faUserShield : faUser} 
                            className="mr-1" 
                          />
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                          {formatDate(user?.createdAt || new Date())}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <select
                            value={user.role || UserRole.USER}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as UserRoleType)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            <option value={UserRole.USER}>일반사용자</option>
                            <option value={UserRole.ADMIN}>관리자</option>
                          </select>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="hover:shadow-lg transition-all"
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 새 사용자 추가 모달 */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2 text-blue-600" />
                  새 사용자 추가
                </h3>
                <button
                  onClick={closeAddUserModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faUser} className="mr-1" />
                      사용자명
                    </label>
                    <input
                      type="text"
                      value={newUser.username}
                      onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="사용자명을 입력하세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                      이메일
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="이메일을 입력하세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faLock} className="mr-1" />
                      비밀번호
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faUserShield} className="mr-1" />
                      권한
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as UserRoleType }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value={UserRole.USER}>일반사용자</option>
                      <option value={UserRole.ADMIN}>관리자</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeAddUserModal}
                    className="flex-1"
                    disabled={addUserLoading}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
                    disabled={addUserLoading}
                  >
                    {addUserLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        추가 중...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                        사용자 추가
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement; 