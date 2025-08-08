import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, 
  faSave, 
  faUndo, 
  faEye,
  faEyeSlash,
  faPalette,
  faGlobe,
  faEnvelope,
  faShieldAlt,
  faHome,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  postsPerPage: number;
  allowComments: boolean;
  requireApproval: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: '내 블로그',
  siteDescription: '개발과 기술에 대한 이야기를 나누는 공간입니다.',
  siteUrl: 'https://example.com',
  adminEmail: 'admin@example.com',
  postsPerPage: 10,
  allowComments: true,
  requireApproval: false,
  theme: 'light',
  language: 'ko',
  timezone: 'Asia/Seoul',
  maintenanceMode: false,
  allowRegistration: true,
  emailNotifications: true
};

const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // 실제로는 API에서 설정을 가져옴
        setSettings(defaultSettings);
      } catch (error) {
        console.error('설정 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (key: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 실제로는 API에 설정을 저장
      console.log('설정 저장:', settings);
      setHasChanges(false);
      alert('설정이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('설정 저장 실패:', error);
      alert('설정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('모든 설정을 기본값으로 되돌리시겠습니까?')) {
      setSettings(defaultSettings);
      setHasChanges(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">설정을 불러오는 중...</p>
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
              <FontAwesomeIcon icon={faCog} className="mr-3 text-blue-600" />
              사이트 설정
            </h1>
            <p className="text-gray-600">사이트의 기본 설정을 관리합니다.</p>
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
            <span className="text-gray-900 font-medium">사이트 설정</span>
          </nav>
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={saving ? faSave : faSave} className="mr-2" />
            {saving ? '저장 중...' : '설정 저장'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faUndo} className="mr-2" />
            기본값으로 복원
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 기본 설정 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="mr-3 text-blue-600" />
            기본 설정
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사이트 이름</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="사이트 이름을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사이트 설명</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="사이트에 대한 설명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사이트 URL</label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">관리자 이메일</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">페이지당 글 수</label>
              <input
                type="number"
                value={settings.postsPerPage}
                onChange={(e) => handleSettingChange('postsPerPage', parseInt(e.target.value))}
                min="1"
                max="50"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 콘텐츠 설정 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-green-600" />
            콘텐츠 설정
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">댓글 허용</h3>
                <p className="text-sm text-gray-600">사용자가 글에 댓글을 달 수 있도록 허용합니다</p>
              </div>
              <button
                onClick={() => handleSettingChange('allowComments', !settings.allowComments)}
                className={`p-1 rounded-full transition-colors ${
                  settings.allowComments ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <FontAwesomeIcon 
                  icon={settings.allowComments ? faEye : faEyeSlash} 
                  className="text-2xl"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">댓글 승인 필요</h3>
                <p className="text-sm text-gray-600">댓글이 게시되기 전에 관리자 승인이 필요합니다</p>
              </div>
              <button
                onClick={() => handleSettingChange('requireApproval', !settings.requireApproval)}
                className={`p-1 rounded-full transition-colors ${
                  settings.requireApproval ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <FontAwesomeIcon 
                  icon={settings.requireApproval ? faEye : faEyeSlash} 
                  className="text-2xl"
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">테마</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">밝은 테마</option>
                <option value="dark">어두운 테마</option>
                <option value="auto">시스템 설정 따름</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">언어</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시간대</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Asia/Seoul">Asia/Seoul (UTC+9)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 시스템 설정 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-3 text-red-600" />
            시스템 설정
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">유지보수 모드</h3>
                <p className="text-sm text-gray-600">사이트를 일시적으로 비활성화합니다</p>
              </div>
              <button
                onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
                className={`p-1 rounded-full transition-colors ${
                  settings.maintenanceMode ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                <FontAwesomeIcon 
                  icon={settings.maintenanceMode ? faEye : faEyeSlash} 
                  className="text-2xl"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">회원가입 허용</h3>
                <p className="text-sm text-gray-600">새 사용자의 회원가입을 허용합니다</p>
              </div>
              <button
                onClick={() => handleSettingChange('allowRegistration', !settings.allowRegistration)}
                className={`p-1 rounded-full transition-colors ${
                  settings.allowRegistration ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <FontAwesomeIcon 
                  icon={settings.allowRegistration ? faEye : faEyeSlash} 
                  className="text-2xl"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">이메일 알림</h3>
                <p className="text-sm text-gray-600">새 댓글이나 활동에 대한 이메일 알림을 받습니다</p>
              </div>
              <button
                onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                className={`p-1 rounded-full transition-colors ${
                  settings.emailNotifications ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <FontAwesomeIcon 
                  icon={settings.emailNotifications ? faEye : faEyeSlash} 
                  className="text-2xl"
                />
              </button>
            </div>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FontAwesomeIcon icon={faPalette} className="mr-3 text-purple-600" />
            설정 미리보기
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{settings.siteName}</h3>
              <p className="text-sm text-gray-600 mt-1">{settings.siteDescription}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                <span>테마: {settings.theme}</span>
                <span>언어: {settings.language}</span>
                <span>시간대: {settings.timezone}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>• 댓글 허용: {settings.allowComments ? '예' : '아니오'}</p>
              <p>• 댓글 승인: {settings.requireApproval ? '예' : '아니오'}</p>
              <p>• 유지보수 모드: {settings.maintenanceMode ? '예' : '아니오'}</p>
              <p>• 회원가입 허용: {settings.allowRegistration ? '예' : '아니오'}</p>
              <p>• 이메일 알림: {settings.emailNotifications ? '예' : '아니오'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;