import React, { useState, useEffect } from 'react';
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
  const [backups, setBackups] = useState<BackupItem[]>([]);
  const [settings, setSettings] = useState<BackupSettings>(defaultBackupSettings);
  const [activeTab, setActiveTab] = useState<'backups' | 'settings' | 'restore'>('backups');
  const [loading, setLoading] = useState(true);
  const [creatingBackup, setCreatingBackup] = useState(false);

  useEffect(() => {
    const fetchBackups = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBackups(mockBackups);
      } catch (error) {
        console.error('백업 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    setCreatingBackup(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newBackup: BackupItem = {
        id: Date.now().toString(),
        name: `전체 백업 - ${new Date().toLocaleDateString()}`,
        type: 'manual',
        size: '2.5 MB',
        createdAt: new Date().toLocaleString(),
        status: 'completed',
        description: '사용자가 생성한 전체 백업',
        dataTypes: ['posts', 'users', 'comments', 'settings', 'theme']
      };
      setBackups(prev => [newBackup, ...prev]);
    } catch (error) {
      console.error('백업 생성 실패:', error);
    } finally {
      setCreatingBackup(false);
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    if (confirm('이 백업을 삭제하시겠습니까?')) {
      setBackups(prev => prev.filter(backup => backup.id !== backupId));
    }
  };

  const handleDownloadBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      // 실제로는 파일 다운로드 로직 구현
      console.log(`백업 다운로드: ${backup.name}`);
      alert(`${backup.name} 다운로드를 시작합니다.`);
    }
  };

  const handleRestoreBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (backup && confirm('이 백업으로 복원하시겠습니까? 현재 데이터가 덮어써집니다.')) {
      console.log(`백업 복원: ${backup.name}`);
      alert(`${backup.name} 복원을 시작합니다.`);
    }
  };

  const handleSettingsChange = (field: keyof BackupSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return faCheck;
      case 'in_progress':
        return faSync;
      case 'failed':
        return faTimes;
      default:
        return faClock;
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center">
                <FontAwesomeIcon icon={faDatabase} className="mr-3 text-blue-600" />
                백업 관리
              </h1>
              <p className="text-gray-600">데이터 백업 및 복원을 관리합니다.</p>
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
              <span className="text-gray-900 font-medium">백업 관리</span>
            </nav>
          </div>

          <div className="flex items-center space-x-3 mt-6">
            <button
              onClick={handleCreateBackup}
              disabled={creatingBackup}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              <FontAwesomeIcon 
                icon={creatingBackup ? faSync : faDownload} 
                className={`mr-2 ${creatingBackup ? 'animate-spin' : ''}`} 
              />
              {creatingBackup ? '백업 생성 중...' : '새 백업 생성'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {/* 탭 네비게이션 */}
          <div className="flex space-x-1 mb-8">
            <button
              onClick={() => setActiveTab('backups')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'backups' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              백업 목록
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              백업 설정
            </button>
            <button
              onClick={() => setActiveTab('restore')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'restore' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              복원
            </button>
          </div>

          <div className="space-y-6">
            {/* 백업 목록 */}
            {activeTab === 'backups' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">백업 목록</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">백업 목록을 불러오는 중...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {backups.map((backup) => (
                      <div key={backup.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <FontAwesomeIcon 
                                icon={backup.type === 'manual' ? faDownload : faSync} 
                                className="text-blue-600"
                              />
                              <h3 className="text-lg font-semibold text-gray-900">{backup.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                backup.status === 'completed' ? 'bg-green-100 text-green-800' :
                                backup.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {getStatusText(backup.status)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{backup.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{backup.size}</span>
                              <span>{backup.createdAt}</span>
                              <span>포함: {backup.dataTypes.join(', ')}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDownloadBackup(backup.id)}
                              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              title="다운로드"
                            >
                              <FontAwesomeIcon icon={faDownload} />
                            </button>
                            <button
                              onClick={() => handleRestoreBackup(backup.id)}
                              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                              title="복원"
                            >
                              <FontAwesomeIcon icon={faUpload} />
                            </button>
                            <button
                              onClick={() => handleDeleteBackup(backup.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                              title="삭제"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 백업 설정 */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">백업 설정</h2>
                
                <div className="space-y-6">
                  {/* 자동 백업 설정 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">자동 백업 설정</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">자동 백업</h4>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">백업 주기</label>
                          <select
                            value={settings.backupInterval}
                            onChange={(e) => handleSettingsChange('backupInterval', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          >
                            <option value="daily">매일</option>
                            <option value="weekly">매주</option>
                            <option value="monthly">매월</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">백업 시간</label>
                          <input
                            type="time"
                            value={settings.backupTime}
                            onChange={(e) => handleSettingsChange('backupTime', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 백업 내용 설정 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">백업 내용 설정</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'includePosts', label: '게시글', description: '모든 게시글과 댓글을 포함합니다' },
                        { key: 'includeUsers', label: '사용자', description: '사용자 계정 정보를 포함합니다' },
                        { key: 'includeComments', label: '댓글', description: '모든 댓글을 포함합니다' },
                        { key: 'includeSettings', label: '설정', description: '사이트 설정을 포함합니다' },
                        { key: 'includeTheme', label: '테마', description: '테마 및 스타일을 포함합니다' }
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
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">백업 복원</h2>
                
                <div className="space-y-6">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupManager; 