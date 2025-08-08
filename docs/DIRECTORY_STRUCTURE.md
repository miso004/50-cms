# CMS 디렉토리 구조 (Directory Structure)

## 📁 루트 디렉토리

```
50-cms/
├── 📁 docs/                    # 문서 폴더
├── 📁 .git/                    # Git 저장소
├── 📁 node_modules/            # Node.js 의존성
├── 📁 public/                  # 정적 파일
├── 📁 dist/                    # 빌드 결과물
├── 📁 src/                     # 소스 코드
├── 📁 tests/                   # 테스트 파일
├── 📄 package-lock.json        # 의존성 잠금 파일
├── 📄 package.json             # 프로젝트 설정
├── 📄 stagewise.json           # 스테이지 설정
├── 📄 index.html               # HTML 진입점
├── 📄 tailwind.config.js       # Tailwind CSS 설정
├── 📄 postcss.config.js        # PostCSS 설정
├── 📄 tsconfig.node.json       # TypeScript Node 설정
├── 📄 vite.config.ts           # Vite 설정
├── 📄 tsconfig.app.json        # TypeScript 앱 설정
├── 📄 tsconfig.json            # TypeScript 설정
├── 📄 eslint.config.js         # ESLint 설정
├── 📄 .gitignore               # Git 무시 파일
├── 📄 .env.example             # 환경 변수 예시
└── 📄 README.md                # 프로젝트 설명
```

## 📁 public/ - 정적 파일

```
public/
├── 📁 images/
│   ├── 📄 mountain-background.jpg  # 배경 이미지
│   └── 📄 logo.svg                 # 로고
├── 📁 icons/
│   └── 📄 favicon.ico              # 파비콘
└── 📄 vite.svg                     # Vite 로고
```

## 📁 src/ - 소스 코드

```
src/
├── 📄 App.tsx                     # 메인 앱 컴포넌트
├── 📄 index.css                   # 전역 스타일
├── 📄 main.tsx                    # 앱 진입점
├── 📄 vite-env.d.ts              # Vite 타입 정의
├── 📁 assets/                     # 에셋 파일
├── 📁 components/                 # 컴포넌트
├── 📁 contexts/                   # React Context
├── 📁 hooks/                      # 커스텀 훅
├── 📁 pages/                      # 페이지 컴포넌트
├── 📁 services/                   # API 서비스
├── 📁 stores/                     # 상태 관리
├── 📁 styles/                     # 스타일 파일
├── 📁 types/                      # TypeScript 타입
└── 📁 utils/                      # 유틸리티 함수
```

### 📁 src/assets/ - 에셋 파일

```
src/assets/
└── 📄 react.svg                   # React 로고
```

### 📁 src/components/ - 컴포넌트

```
src/components/
├── 📁 common/                     # 공통 컴포넌트
├── 📁 forms/                      # 폼 컴포넌트
├── 📁 layout/                     # 레이아웃 컴포넌트
└── 📁 features/                   # 기능별 컴포넌트
```

#### 📁 src/components/common/ - 공통 컴포넌트

```
src/components/common/
├── 📄 Button/                     # 버튼 컴포넌트
│   ├── 📄 Button.tsx
│   ├── 📄 Button.test.tsx
│   └── 📄 index.ts
├── 📄 Input/                      # 입력 컴포넌트
│   ├── 📄 Input.tsx
│   ├── 📄 Input.test.tsx
│   └── 📄 index.ts
├── 📄 Modal/                      # 모달 컴포넌트
│   ├── 📄 Modal.tsx
│   ├── 📄 Modal.test.tsx
│   └── 📄 index.ts
├── 📄 Table/                      # 테이블 컴포넌트
│   ├── 📄 Table.tsx
│   ├── 📄 Table.test.tsx
│   └── 📄 index.ts
├── 📄 Card/                       # 카드 컴포넌트
│   ├── 📄 Card.tsx
│   ├── 📄 Card.test.tsx
│   └── 📄 index.ts
├── 📄 LoadingSpinner.tsx          # 로딩 스피너
├── 📄 ErrorBoundary.tsx           # 에러 경계
├── 📄 ErrorMessage.tsx            # 에러 메시지
├── 📄 Toast.tsx                   # 토스트 알림
├── 📄 ToastContainer.tsx          # 토스트 컨테이너
└── 📄 Skeleton.tsx                # 스켈레톤 UI
```

#### 📁 src/components/forms/ - 폼 컴포넌트

```
src/components/forms/
├── 📄 LoginForm/                  # 로그인 폼
│   ├── 📄 LoginForm.tsx
│   ├── 📄 LoginForm.test.tsx
│   └── 📄 index.ts
├── 📄 PostForm/                   # 포스트 폼
│   ├── 📄 PostForm.tsx
│   ├── 📄 PostForm.test.tsx
│   └── 📄 index.ts
├── 📄 UserForm/                   # 사용자 폼
│   ├── 📄 UserForm.tsx
│   ├── 📄 UserForm.test.tsx
│   └── 📄 index.ts
└── 📄 SettingsForm/               # 설정 폼
    ├── 📄 SettingsForm.tsx
    ├── 📄 SettingsForm.test.tsx
    └── 📄 index.ts
```

#### 📁 src/components/layout/ - 레이아웃 컴포넌트

```
src/components/layout/
├── 📄 AdminLayout/                # 관리자 레이아웃
│   ├── 📄 AdminLayout.tsx
│   ├── 📄 AdminLayout.test.tsx
│   └── 📄 index.ts
├── 📄 DashboardLayout/            # 대시보드 레이아웃
│   ├── 📄 DashboardLayout.tsx
│   ├── 📄 DashboardLayout.test.tsx
│   └── 📄 index.ts
├── 📄 PublicLayout/               # 공개 레이아웃
│   ├── 📄 PublicLayout.tsx
│   ├── 📄 PublicLayout.test.tsx
│   └── 📄 index.ts
├── 📄 Sidebar/                    # 사이드바
│   ├── 📄 Sidebar.tsx
│   ├── 📄 Sidebar.test.tsx
│   └── 📄 index.ts
├── 📄 Header/                     # 헤더
│   ├── 📄 Header.tsx
│   ├── 📄 Header.test.tsx
│   └── 📄 index.ts
├── 📄 Footer.tsx                  # 푸터
└── 📄 Layout.tsx                  # 기본 레이아웃
```

#### 📁 src/components/features/ - 기능별 컴포넌트

```
src/components/features/
├── 📁 Content/                    # 콘텐츠 관리
│   ├── 📄 ContentEditor/
│   ├── 📄 MediaLibrary/
│   ├── 📄 CategoryManager/
│   └── 📄 TagManager/
├── 📁 Users/                      # 사용자 관리
│   ├── 📄 UserList/
│   ├── 📄 UserProfile/
│   ├── 📄 RoleManager/
│   └── 📄 PermissionManager/
├── 📁 Analytics/                  # 분석 및 통계
│   ├── 📄 Dashboard/
│   ├── 📄 Charts/
│   ├── 📄 Reports/
│   └── 📄 Metrics/
└── 📁 Settings/                   # 설정 관리
    ├── 📄 SiteSettings/
    ├── 📄 ThemeManager/
    ├── 📄 BackupManager/
    └── 📄 SecuritySettings/
```

### 📁 src/contexts/ - React Context

```
src/contexts/
├── 📄 AuthContext.tsx             # 인증 컨텍스트
├── 📄 ToastContext.tsx            # 토스트 컨텍스트
├── 📄 ThemeContext.tsx            # 테마 컨텍스트
└── 📄 SettingsContext.tsx         # 설정 컨텍스트
```

### 📁 src/hooks/ - 커스텀 훅

```
src/hooks/
├── 📄 useAuth.ts                  # 인증 훅
├── 📄 useContent.ts               # 콘텐츠 훅
├── 📄 useAnalytics.ts             # 분석 훅
├── 📄 useSettings.ts              # 설정 훅
├── 📄 useMedia.ts                 # 미디어 훅
├── 📄 useUsers.ts                 # 사용자 훅
└── 📄 usePermissions.ts           # 권한 훅
```

### 📁 src/pages/ - 페이지 컴포넌트

```
src/pages/
├── 📁 Auth/                       # 인증 페이지
├── 📁 Dashboard/                  # 대시보드 페이지
├── 📁 Content/                    # 콘텐츠 페이지
├── 📁 Users/                      # 사용자 페이지
├── 📁 Analytics/                  # 분석 페이지
├── 📁 Settings/                   # 설정 페이지
└── 📁 Public/                     # 공개 페이지
```

#### 📁 src/pages/Auth/ - 인증 페이지

```
src/pages/Auth/
├── 📄 Login.tsx                   # 로그인 페이지
├── 📄 Signup.tsx                  # 회원가입 페이지
├── 📄 ForgotPassword.tsx          # 비밀번호 찾기
└── 📄 ResetPassword.tsx           # 비밀번호 재설정
```

#### 📁 src/pages/Dashboard/ - 대시보드 페이지

```
src/pages/Dashboard/
├── 📄 Dashboard.tsx               # 메인 대시보드
├── 📄 Overview.tsx                # 개요 페이지
├── 📄 Activity.tsx                # 활동 페이지
└── 📄 Notifications.tsx           # 알림 페이지
```

#### 📁 src/pages/Content/ - 콘텐츠 페이지

```
src/pages/Content/
├── 📄 Pages/                      # 페이지 관리
│   ├── 📄 PageList.tsx
│   ├── 📄 PageEdit.tsx
│   └── 📄 PageCreate.tsx
├── 📄 Posts/                      # 포스트 관리
│   ├── 📄 PostList.tsx
│   ├── 📄 PostEdit.tsx
│   └── 📄 PostCreate.tsx
├── 📄 Media/                      # 미디어 관리
│   ├── 📄 MediaLibrary.tsx
│   ├── 📄 MediaUpload.tsx
│   └── 📄 MediaEdit.tsx
└── 📄 Categories/                 # 카테고리 관리
    ├── 📄 CategoryList.tsx
    ├── 📄 CategoryEdit.tsx
    └── 📄 CategoryCreate.tsx
```

#### 📁 src/pages/Users/ - 사용자 페이지

```
src/pages/Users/
├── 📄 UserList.tsx                # 사용자 목록
├── 📄 UserEdit.tsx                # 사용자 편집
├── 📄 UserCreate.tsx              # 사용자 생성
├── 📄 UserProfile.tsx             # 사용자 프로필
├── 📄 Roles/                      # 역할 관리
│   ├── 📄 RoleList.tsx
│   ├── 📄 RoleEdit.tsx
│   └── 📄 RoleCreate.tsx
└── 📄 Permissions/                # 권한 관리
    ├── 📄 PermissionList.tsx
    ├── 📄 PermissionEdit.tsx
    └── 📄 PermissionCreate.tsx
```

#### 📁 src/pages/Analytics/ - 분석 페이지

```
src/pages/Analytics/
├── 📄 Overview.tsx                # 분석 개요
├── 📄 Traffic.tsx                 # 트래픽 분석
├── 📄 Content.tsx                 # 콘텐츠 분석
├── 📄 Users.tsx                   # 사용자 분석
├── 📄 Performance.tsx             # 성능 분석
└── 📄 Reports.tsx                 # 리포트
```

#### 📁 src/pages/Settings/ - 설정 페이지

```
src/pages/Settings/
├── 📄 General.tsx                 # 일반 설정
├── 📄 Appearance.tsx              # 외관 설정
├── 📄 SEO.tsx                     # SEO 설정
├── 📄 Security.tsx                # 보안 설정
├── 📄 Email.tsx                   # 이메일 설정
├── 📄 Backup.tsx                  # 백업 설정
└── 📄 Advanced.tsx                # 고급 설정
```

#### 📁 src/pages/Public/ - 공개 페이지

```
src/pages/Public/
├── 📄 Home.tsx                    # 홈페이지
├── 📄 About.tsx                   # 소개 페이지
├── 📄 Contact.tsx                 # 연락처 페이지
├── 📄 Blog.tsx                    # 블로그 페이지
└── 📄 NotFound.tsx                # 404 페이지
```

### 📁 src/services/ - API 서비스

```
src/services/
├── 📁 api/                        # API 클라이언트
│   ├── 📄 client.ts               # API 클라이언트 설정
│   ├── 📄 auth.ts                 # 인증 API
│   ├── 📄 content.ts              # 콘텐츠 API
│   ├── 📄 users.ts                # 사용자 API
│   ├── 📄 analytics.ts            # 분석 API
│   └── 📄 settings.ts             # 설정 API
├── 📄 auth.ts                     # 인증 서비스
├── 📄 content.ts                  # 콘텐츠 서비스
├── 📄 users.ts                    # 사용자 서비스
├── 📄 analytics.ts                # 분석 서비스
└── 📄 settings.ts                 # 설정 서비스
```

### 📁 src/stores/ - 상태 관리

```
src/stores/
├── 📄 authStore.ts                # 인증 상태
├── 📄 contentStore.ts             # 콘텐츠 상태
├── 📄 userStore.ts                # 사용자 상태
├── 📄 analyticsStore.ts           # 분석 상태
├── 📄 settingsStore.ts            # 설정 상태
└── 📄 themeStore.ts               # 테마 상태
```

### 📁 src/types/ - TypeScript 타입

```
src/types/
├── 📄 auth.ts                     # 인증 타입
├── 📄 content.ts                  # 콘텐츠 타입
├── 📄 user.ts                     # 사용자 타입
├── 📄 analytics.ts                # 분석 타입
├── 📄 settings.ts                 # 설정 타입
├── 📄 api.ts                      # API 타입
└── 📄 common.ts                   # 공통 타입
```

### 📁 src/utils/ - 유틸리티 함수

```
src/utils/
├── 📄 validation.ts               # 검증 유틸리티
├── 📄 formatting.ts               # 포맷팅 유틸리티
├── 📄 constants.ts                # 상수 정의
├── 📄 helpers.ts                  # 헬퍼 함수
├── 📄 dateUtils.ts                # 날짜 유틸리티
├── 📄 fileUtils.ts                # 파일 유틸리티
└── 📄 security.ts                 # 보안 유틸리티
```

### 📁 src/styles/ - 스타일 파일

```
src/styles/
├── 📄 globals.css                 # 전역 스타일
├── 📄 components.css              # 컴포넌트 스타일
├── 📄 themes/                     # 테마 스타일
│   ├── 📄 light.css
│   ├── 📄 dark.css
│   └── 📄 custom.css
└── 📄 variables.css               # CSS 변수
```

## 📁 tests/ - 테스트 파일

```
tests/
├── 📁 unit/                       # 단위 테스트
├── 📁 integration/                # 통합 테스트
├── 📁 e2e/                        # E2E 테스트
└── 📁 fixtures/                   # 테스트 데이터
```

## 📁 docs/ - 문서

```
docs/
├── 📄 PROJECT_PLAN.md             # 프로젝트 계획
├── 📄 DIRECTORY_STRUCTURE.md      # 디렉토리 구조
├── 📄 DEVELOPMENT_LOG.md          # 개발 로그
├── 📄 API.md                      # API 문서
├── 📄 DEPLOYMENT.md               # 배포 가이드
└── 📄 USER_GUIDE.md              # 사용자 가이드
```

## 📊 CMS 특화 구조

### 🔐 보안 중심 구조
- **인증 및 권한**: JWT 기반 인증, 역할 기반 접근 제어
- **보안 미들웨어**: CSRF 보호, XSS 방지, SQL 인젝션 방지
- **감사 로그**: 모든 사용자 활동 추적

### 📊 분석 및 모니터링
- **실시간 통계**: 방문자, 페이지뷰, 사용자 행동
- **성능 모니터링**: 페이지 로딩 속도, 서버 응답 시간
- **SEO 분석**: 메타 태그, 사이트맵, 검색 엔진 최적화

### 🎨 테마 및 커스터마이징
- **다중 테마 지원**: 라이트/다크 모드, 커스텀 테마
- **레이아웃 빌더**: 드래그 앤 드롭 레이아웃 편집
- **위젯 시스템**: 재사용 가능한 위젯 컴포넌트

### 🔧 개발자 도구
- **API 문서**: 자동 생성된 API 문서
- **개발자 콘솔**: 디버깅 및 로그 확인
- **플러그인 시스템**: 확장 가능한 아키텍처

---
*마지막 업데이트: 2025년 1월 (CMS 전환)* 