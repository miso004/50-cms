import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog,
  faSave,
  faGlobe,
  faImage,
  faEnvelope,
  faCode,
  faShield,
  faDatabase,
  faChartLine,
  faUser,
  faKey,
  faToggleOn,
  faToggleOff,
  faExclamationTriangle,
  faCheck,
  faUndo
} from '@fortawesome/free-solid-svg-icons';

interface SiteSettings {
  // 기본 사이트 정보
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  siteLogo?: string;
  favicon?: string;
  
  // 연락처 정보
  adminEmail: string;
  supportEmail: string;
  
  // 기능 설정
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  allowComments: boolean;
  moderateComments: boolean;
  allowGuestComments: boolean;
  
  // SEO 설정
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  googleAnalyticsId?: string;
  
  // 보안 설정
  maxLoginAttempts: number;
  sessionTimeout: number; // 분 단위
  requireStrongPasswords: boolean;
  
  // 콘텐츠 설정
  maxPostLength: number;
  maxCommentLength: number;
  allowedImageFormats: string[];
  maxImageSize: number; // MB
  
  // 기타 설정
  maintenanceMode: boolean;
  maintenanceMessage: string;
  timezone: string;
  dateFormat: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'WIDSoft',
  siteDescription: '글쓰기와 소통을 위한 플랫폼',
  siteUrl: 'http://localhost:5173',
  adminEmail: 'admin@widsoft.com',
  supportEmail: 'support@widsoft.com',
  allowRegistration: true,
  requireEmailVerification: false,
  allowComments: true,
  moderateComments: false,
  allowGuestComments: false,
  seoTitle: 'WIDSoft - 글쓰기 플랫폼',
  seoDescription: '혁신적인 글쓰기 플랫폼에서 당신만의 목소리를 발견하세요',
  seoKeywords: '글쓰기, 블로그, 플랫폼, 소통',
  maxLoginAttempts: 5,
  sessionTimeout: 60,
  requireStrongPasswords: true,
  maxPostLength: 50000,
  maxCommentLength: 1000,
  allowedImageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  maxImageSize: 5,
  maintenanceMode: false,
  maintenanceMessage: '시스템 점검 중입니다. 잠시 후 다시 시도해주세요.',
  timezone: 'Asia/Seoul',
  dateFormat: 'YYYY-MM-DD'
};

const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [originalSettings, setOriginalSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'features' | 'seo' | 'security' | 'content' | 'advanced'>('general');
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 설정 로드
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings({ ...defaultSettings, ...parsed });
          setOriginalSettings({ ...defaultSettings, ...parsed });
        }
      } catch (error) {
        console.error('설정 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    // 변경사항 감지
    const hasChangesNow = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(hasChangesNow);
  }, [settings, originalSettings]);

  const handleInputChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 로컬 스토리지에 설정 저장
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      setOriginalSettings(settings);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('설정 저장 오류:', error);
      alert('설정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('모든 설정을 기본값으로 되돌리시겠습니까?')) {
      setSettings(defaultSettings);
    }
  };

  const handleCancel = () => {
    setSettings(originalSettings);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">설정을 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'general', name: '일반', icon: faGlobe },
    { id: 'features', name: '기능', icon: faCog },
    { id: 'seo', name: 'SEO', icon: faChartLine },
    { id: 'security', name: '보안', icon: faShield },
    { id: 'content', name: '콘텐츠', icon: faImage },
    { id: 'advanced', name: '고급', icon: faCode }
  ] as const;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCog} className="mr-3 text-purple-600" />
                  사이트 설정
                </h1>
                <p className="text-gray-600">사이트의 전반적인 설정을 관리합니다.</p>
              </div>
              
              <div className="flex items-center space-x-3">
                {hasChanges && (
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FontAwesomeIcon icon={faUndo} className="mr-2" />
                    취소
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faUndo} className="mr-2" />
                  기본값으로 복원
                </button>
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || saving}
                  className="flex items-center"
                >
                  <FontAwesomeIcon 
                    icon={saving ? faCode : faSave} 
                    className={`mr-2 ${saving ? 'animate-spin' : ''}`} 
                  />
                  {saving ? '저장 중...' : '설정 저장'}
                </Button>
              </div>
            </div>

            {/* 성공 메시지 */}
            {showSuccess && (
              <div className="mt-4 flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                <span className="text-green-700 text-sm">설정이 성공적으로 저장되었습니다!</span>
              </div>
            )}

            {/* 변경사항 알림 */}
            {hasChanges && (
              <div className="mt-4 flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 mr-2" />
                <span className="text-yellow-700 text-sm">저장되지 않은 변경사항이 있습니다.</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 탭 네비게이션 */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">설정 카테고리</h3>
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                          activeTab === tab.id
                            ? 'bg-purple-50 text-purple-600 border border-purple-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <FontAwesomeIcon icon={tab.icon} className="mr-3" />
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* 설정 콘텐츠 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {/* 일반 설정 */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">일반 설정</h2>
                    
                    <Input
                      label="사이트 이름"
                      value={settings.siteName}
                      onChange={(e) => handleInputChange('siteName', e.target.value)}
                      placeholder="사이트 이름을 입력하세요"
                    />

                    <Textarea
                      label="사이트 설명"
                      value={settings.siteDescription}
                      onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                      placeholder="사이트에 대한 간단한 설명을 입력하세요"
                      rows={3}
                    />

                    <Input
                      label="사이트 URL"
                      value={settings.siteUrl}
                      onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                      placeholder="https://example.com"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="관리자 이메일"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                        placeholder="admin@example.com"
                      />

                      <Input
                        label="고객지원 이메일"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                        placeholder="support@example.com"
                      />
                    </div>
                  </div>
                )}

                {/* 기능 설정 */}
                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">기능 설정</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">회원가입 허용</h4>
                          <p className="text-sm text-gray-600">새로운 사용자의 회원가입을 허용합니다</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('allowRegistration', !settings.allowRegistration)}
                          className={`p-1 rounded-full transition-colors ${
                            settings.allowRegistration ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={settings.allowRegistration ? faToggleOn : faToggleOff} 
                            className="text-2xl"
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">이메일 인증 필수</h4>
                          <p className="text-sm text-gray-600">회원가입 시 이메일 인증을 필수로 합니다</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('requireEmailVerification', !settings.requireEmailVerification)}
                          className={`p-1 rounded-full transition-colors ${
                            settings.requireEmailVerification ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={settings.requireEmailVerification ? faToggleOn : faToggleOff} 
                            className="text-2xl"
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">댓글 기능</h4>
                          <p className="text-sm text-gray-600">게시글에 댓글 작성을 허용합니다</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('allowComments', !settings.allowComments)}
                          className={`p-1 rounded-full transition-colors ${
                            settings.allowComments ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={settings.allowComments ? faToggleOn : faToggleOff} 
                            className="text-2xl"
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">댓글 검토</h4>
                          <p className="text-sm text-gray-600">댓글을 관리자가 검토 후 게시합니다</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('moderateComments', !settings.moderateComments)}
                          className={`p-1 rounded-full transition-colors ${
                            settings.moderateComments ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={settings.moderateComments ? faToggleOn : faToggleOff} 
                            className="text-2xl"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SEO 설정 */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">SEO 설정</h2>
                    
                    <Input
                      label="SEO 제목"
                      value={settings.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      placeholder="검색 엔진에 표시될 제목"
                    />

                    <Textarea
                      label="SEO 설명"
                      value={settings.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      placeholder="검색 엔진에 표시될 설명"
                      rows={3}
                    />

                    <Input
                      label="SEO 키워드"
                      value={settings.seoKeywords}
                      onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                      placeholder="키워드1, 키워드2, 키워드3"
                    />

                    <Input
                      label="Google Analytics ID"
                      value={settings.googleAnalyticsId || ''}
                      onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                )}

                {/* 보안 설정 */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">보안 설정</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="최대 로그인 시도 횟수"
                        type="number"
                        value={settings.maxLoginAttempts.toString()}
                        onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value) || 5)}
                        min="1"
                        max="10"
                      />

                      <Input
                        label="세션 타임아웃 (분)"
                        type="number"
                        value={settings.sessionTimeout.toString()}
                        onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value) || 60)}
                        min="10"
                        max="1440"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">강한 비밀번호 필수</h4>
                        <p className="text-sm text-gray-600">비밀번호에 대문자, 소문자, 숫자, 특수문자 포함을 필수로 합니다</p>
                      </div>
                      <button
                        onClick={() => handleInputChange('requireStrongPasswords', !settings.requireStrongPasswords)}
                        className={`p-1 rounded-full transition-colors ${
                          settings.requireStrongPasswords ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        <FontAwesomeIcon 
                          icon={settings.requireStrongPasswords ? faToggleOn : faToggleOff} 
                          className="text-2xl"
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* 콘텐츠 설정 */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">콘텐츠 설정</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="최대 글 길이 (글자)"
                        type="number"
                        value={settings.maxPostLength.toString()}
                        onChange={(e) => handleInputChange('maxPostLength', parseInt(e.target.value) || 50000)}
                        min="100"
                        max="100000"
                      />

                      <Input
                        label="최대 댓글 길이 (글자)"
                        type="number"
                        value={settings.maxCommentLength.toString()}
                        onChange={(e) => handleInputChange('maxCommentLength', parseInt(e.target.value) || 1000)}
                        min="10"
                        max="5000"
                      />
                    </div>

                    <Input
                      label="허용된 이미지 형식"
                      value={settings.allowedImageFormats.join(', ')}
                      onChange={(e) => handleInputChange('allowedImageFormats', e.target.value.split(',').map(s => s.trim()))}
                      placeholder="jpg, png, gif, webp"
                    />

                    <Input
                      label="최대 이미지 크기 (MB)"
                      type="number"
                      value={settings.maxImageSize.toString()}
                      onChange={(e) => handleInputChange('maxImageSize', parseInt(e.target.value) || 5)}
                      min="1"
                      max="50"
                    />
                  </div>
                )}

                {/* 고급 설정 */}
                {activeTab === 'advanced' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">고급 설정</h2>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">유지보수 모드</h4>
                        <p className="text-sm text-gray-600">사이트를 유지보수 모드로 설정합니다</p>
                      </div>
                      <button
                        onClick={() => handleInputChange('maintenanceMode', !settings.maintenanceMode)}
                        className={`p-1 rounded-full transition-colors ${
                          settings.maintenanceMode ? 'text-red-600' : 'text-gray-400'
                        }`}
                      >
                        <FontAwesomeIcon 
                          icon={settings.maintenanceMode ? faToggleOn : faToggleOff} 
                          className="text-2xl"
                        />
                      </button>
                    </div>

                    {settings.maintenanceMode && (
                      <Textarea
                        label="유지보수 메시지"
                        value={settings.maintenanceMessage}
                        onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
                        placeholder="사용자에게 표시할 유지보수 메시지"
                        rows={3}
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="시간대"
                        value={settings.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        placeholder="Asia/Seoul"
                      />

                      <Input
                        label="날짜 형식"
                        value={settings.dateFormat}
                        onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SiteSettings;