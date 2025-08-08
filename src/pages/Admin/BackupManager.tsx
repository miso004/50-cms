import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload,
  faUpload,
  faHistory,
  faTrash,
  faCheck,
  faTimes,
  faClock,
  faFileAlt,
  faDatabase,
  faCog,
  faHome,
  faChevronRight,
  faPlay,
  faPause,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface BackupItem {
  id: string;
  name: string;
  type: 'manual' | 'auto';
  size: string;
  createdAt: string;
  status: 'completed' | 'in_progress' | 'failed';
  description: string;
  dataTypes: string[];
}

interface BackupSettings {
  autoBackup: boolean;
  backupInterval: 'daily' | 'weekly' | 'monthly';
  backupTime: string;
  retentionDays: number;
  includePosts: boolean;
  includeUsers: boolean;
  includeComments: boolean;
  includeSettings: boolean;
  includeTheme: boolean;
  compression: boolean;
  encryption: boolean;
}

const defaultBackupSettings: BackupSettings = {
  autoBackup: true,
  backupInterval: 'weekly',
  backupTime: '02:00',
  retentionDays: 30,
  includePosts: true,
  includeUsers: true,
  includeComments: true,
  includeSettings: true,
  includeTheme: true,
  compression: true,
  encryption: false
};

const mockBackups: BackupItem[] = [
  {
    id: '1',
    name: '전체 백업 - 2024-01-15',
    type: 'manual',
    size: '2.4 MB',
    createdAt: '2024-01-15 14:30:00',
    status: 'completed',
    description: '사용자가 생성한 전체 백업',
    dataTypes: ['posts', 'users', 'comments', 'settings', 'theme']
  },
  {
    id: '2',
    name: '자동 백업 - 2024-01-14',
    type: 'auto',
    size: '2.1 MB',
    createdAt: '2024-01-14 02:00:00',
    status: 'completed',
    description: '정기 자동 백업',
    dataTypes: ['posts', 'users', 'comments', 'settings']
  },
  {
    id: '3',
    name: '전체 백업 - 2024-01-10',
    type: 'manual',
    size: '1.9 MB',
    createdAt: '2024-01-10 09:15:00',
    status: 'completed',
    description: '사용자가 생성한 전체 백업',
    dataTypes: ['posts', 'users', 'comments', 'settings', 'theme']
  },
  {
    id: '4',
    name: '자동 백업 - 2024-01-07',
    type: 'auto',
    size: '1.8 MB',
    createdAt: '2024-01-07 02:00:00',
    status: 'completed',
    description: '정기 자동 백업',
    dataTypes: ['posts', 'users', 'comments', 'settings']
  }
];

const BackupManager: React.FC = () => {
  const [backups, setBackups] = useState<BackupItem[]>(mockBackups);
  const [settings, setSettings] = useState<BackupSettings>(defaultBackupSettings);
  const [loading, setLoading] = useState(false);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [activeTab, setActiveTab] = useState<'backups' | 'settings' | 'restore'>('backups');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateBackup = async () => {
    setCreatingBackup(true);
    try {
      // 실제로는 백업 API 호출
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBackup: BackupItem = {
        id: Date.now().toString(),
        name: `전체 백업 - ${new Date().toISOString().split('T')[0]}`,
        type: 'manual',
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'completed',
        description: '사용자가 생성한 전체 백업',
        dataTypes: ['posts', 'users', 'comments', 'settings', 'theme']
      };
      
      setBackups(prev => [newBackup, ...prev]);
      setSuccessMessage('백업이 성공적으로 생성되었습니다!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('백업 생성 실패:', error);
      alert('백업 생성에 실패했습니다.');
    } finally {
      setCreatingBackup(false);
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    if (confirm('이 백업을 삭제하시겠습니까?')) {
      setBackups(prev => prev.filter(backup => backup.id !== backupId));
      setSuccessMessage('백업이 삭제되었습니다.');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDownloadBackup = (backupId: string) => {
    // 실제로는 백업 파일 다운로드
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      const link = document.createElement('a');
      link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backup))}`;
      link.download = `${backup.name}.json`;
      link.click();
      setSuccessMessage('백업 파일이 다운로드되었습니다.');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleRestoreBackup = (backupId: string) => {
    if (confirm('이 백업으로 복원하시겠습니까? 현재 데이터가 덮어써집니다.')) {
      setLoading(true);
      // 실제로는 복원 API 호출
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('백업이 성공적으로 복원되었습니다!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }, 2000);
    }
  };

  const handleSettingsChange = (field: keyof BackupSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheck} className="text-green-500" />;
      case 'in_progress':
        return <FontAwesomeIcon icon={faSync} className="text-blue-500 animate-spin" />;
      case 'failed':
        return <FontAwesomeIcon icon={faTimes} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'in_progress':
        return '진행 중';
      case 'failed':
        return '실패';
      default:
        return '알 수 없음';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faDatabase} className="mr-3 text-gray-600" />
                  백업 관리
                </h1>
                <p className="text-gray-600">사이트 데이터 백업 및 복원을 관리합니다.</p>
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
                <span className="text-gray-900 font-medium">백업 관리</span>
              </nav>
            </div>

            {/* 성공 메시지 */}
            {showSuccess && (
              <div className="mt-4 flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                <span className="text-green-700 text-sm">{successMessage}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 탭 네비게이션 */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">백업 관리</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('backups')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeTab === 'backups'
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={faHistory} className="mr-3" />
                      백업 목록
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeTab === 'settings'
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={faCog} className="mr-3" />
                      백업 설정
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('restore')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeTab === 'restore'
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={faUpload} className="mr-3" />
                      복원
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* 콘텐츠 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {/* 백업 목록 */}
                {activeTab === 'backups' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">백업 목록</h2>
                      <button
                        onClick={handleCreateBackup}
                        disabled={creatingBackup}
                        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        <FontAwesomeIcon 
                          icon={creatingBackup ? faSync : faDownload} 
                          className={`mr-2 ${creatingBackup ? 'animate-spin' : ''}`} 
                        />
                        {creatingBackup ? '백업 생성 중...' : '새 백업 생성'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {backups.map((backup) => (
                        <div key={backup.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <FontAwesomeIcon 
                                icon={backup.type === 'manual' ? faFileAlt : faClock} 
                                className="text-gray-500" 
                              />
                              <div>
                                <h3 className="font-medium text-gray-900">{backup.name}</h3>
                                <p className="text-sm text-gray-500">{backup.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(backup.status)}
                              <span className="text-sm text-gray-600">{getStatusText(backup.status)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <span>크기: {backup.size}</span>
                            <span>생성일: {backup.createdAt}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {backup.dataTypes.map((type) => (
                                <span 
                                  key={type} 
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleDownloadBackup(backup.id)}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                              >
                                <FontAwesomeIcon icon={faDownload} className="mr-1" />
                                다운로드
                              </button>
                              <button
                                onClick={() => handleRestoreBackup(backup.id)}
                                className="px-3 py-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                              >
                                <FontAwesomeIcon icon={faUpload} className="mr-1" />
                                복원
                              </button>
                              <button
                                onClick={() => handleDeleteBackup(backup.id)}
                                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              >
                                <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 백업 설정 */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">백업 설정</h2>
                    
                    <div className="space-y-6">
                      {/* 자동 백업 설정 */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">자동 백업</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">자동 백업 활성화</h4>
                              <p className="text-sm text-gray-600">정기적으로 자동 백업을 수행합니다</p>
                            </div>
                            <button
                              onClick={() => handleSettingsChange('autoBackup', !settings.autoBackup)}
                              className={`p-1 rounded-full transition-colors ${
                                settings.autoBackup ? 'text-green-600' : 'text-gray-400'
                              }`}
                            >
                              <FontAwesomeIcon 
                                icon={settings.autoBackup ? faCheck : faTimes} 
                                className="text-2xl"
                              />
                            </button>
                          </div>

                          {settings.autoBackup && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  백업 주기
                                </label>
                                <select
                                  value={settings.backupInterval}
                                  onChange={(e) => handleSettingsChange('backupInterval', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                >
                                  <option value="daily">매일</option>
                                  <option value="weekly">매주</option>
                                  <option value="monthly">매월</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  백업 시간
                                </label>
                                <input
                                  type="time"
                                  value={settings.backupTime}
                                  onChange={(e) => handleSettingsChange('backupTime', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  보관 기간 (일)
                                </label>
                                <input
                                  type="number"
                                  value={settings.retentionDays}
                                  onChange={(e) => handleSettingsChange('retentionDays', parseInt(e.target.value))}
                                  min="1"
                                  max="365"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 백업 내용 설정 */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">백업 내용</h3>
                        <div className="space-y-3">
                          {[
                            { key: 'includePosts', label: '게시글', description: '모든 게시글과 댓글' },
                            { key: 'includeUsers', label: '사용자', description: '사용자 계정 정보' },
                            { key: 'includeComments', label: '댓글', description: '모든 댓글 데이터' },
                            { key: 'includeSettings', label: '설정', description: '사이트 설정 정보' },
                            { key: 'includeTheme', label: '테마', description: '테마 및 디자인 설정' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900">{item.label}</h4>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <button
                                onClick={() => handleSettingsChange(item.key as keyof BackupSettings, !settings[item.key as keyof BackupSettings])}
                                className={`p-1 rounded-full transition-colors ${
                                  settings[item.key as keyof BackupSettings] ? 'text-green-600' : 'text-gray-400'
                                }`}
                              >
                                <FontAwesomeIcon 
                                  icon={settings[item.key as keyof BackupSettings] ? faCheck : faTimes} 
                                  className="text-2xl"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 고급 설정 */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">고급 설정</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">압축</h4>
                              <p className="text-sm text-gray-600">백업 파일을 압축하여 저장 공간을 절약합니다</p>
                            </div>
                            <button
                              onClick={() => handleSettingsChange('compression', !settings.compression)}
                              className={`p-1 rounded-full transition-colors ${
                                settings.compression ? 'text-green-600' : 'text-gray-400'
                              }`}
                            >
                              <FontAwesomeIcon 
                                icon={settings.compression ? faCheck : faTimes} 
                                className="text-2xl"
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">암호화</h4>
                              <p className="text-sm text-gray-600">백업 파일을 암호화하여 보안을 강화합니다</p>
                            </div>
                            <button
                              onClick={() => handleSettingsChange('encryption', !settings.encryption)}
                              className={`p-1 rounded-full transition-colors ${
                                settings.encryption ? 'text-green-600' : 'text-gray-400'
                              }`}
                            >
                              <FontAwesomeIcon 
                                icon={settings.encryption ? faCheck : faTimes} 
                                className="text-2xl"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 복원 */}
                {activeTab === 'restore' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">백업 복원</h2>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FontAwesomeIcon icon={faUpload} className="text-gray-400 text-4xl mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">백업 파일 업로드</h3>
                      <p className="text-gray-600 mb-4">
                        복원할 백업 파일을 선택하거나 여기로 드래그하세요
                      </p>
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        파일 선택
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        지원 형식: JSON, ZIP (최대 100MB)
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <FontAwesomeIcon icon={faTimes} className="text-yellow-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-yellow-800">주의사항</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            백업 복원 시 현재 데이터가 덮어써집니다. 복원 전에 현재 데이터를 백업하시기 바랍니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BackupManager; 