import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
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
  faUndo,
  faHome,
  faChevronRight,
  faDownload,
  faUpload,
  faPalette,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
  
  // 테마 설정
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  
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
  primaryColor: '#4f46e5', // 기본 파란색
  secondaryColor: '#10b981', // 기본 초록색
  backgroundColor: '#f9fafb', // 기본 배경색
  textColor: '#1f2937', // 기본 텍스트 색상
  accentColor: '#ef4444', // 기본 강조색
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
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">설정을 불러오는 중...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }



  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCog} className="mr-3 text-purple-600" />
                  사이트 설정
                </h1>
                <p className="text-gray-600">사이트의 전반적인 설정을 관리합니다.</p>
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

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="space-y-8">
              {/* 일반 설정 */}
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

              {/* 기능 설정 */}
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


            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SiteSettings;