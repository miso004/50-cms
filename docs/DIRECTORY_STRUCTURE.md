# 디렉토리 구조 (Directory Structure)

## 📁 루트 디렉토리

```
49-crud/
├── 📁 docs/                    # 문서 폴더
├── 📁 .git/                    # Git 저장소
├── 📁 node_modules/            # Node.js 의존성
├── 📁 public/                  # 정적 파일
├── 📁 dist/                    # 빌드 결과물
├── 📁 src/                     # 소스 코드
├── 📄 package-lock.json        # 의존성 잠금 파일 (182KB)
├── 📄 package.json             # 프로젝트 설정 (1.0KB)
├── 📄 stagewise.json           # 스테이지 설정 (77B)
├── 📄 index.html               # HTML 진입점 (366B)
├── 📄 tailwind.config.js       # Tailwind CSS 설정 (170B)
├── 📄 postcss.config.js        # PostCSS 설정 (80B)
├── 📄 tsconfig.node.json       # TypeScript Node 설정 (630B)
├── 📄 vite.config.ts           # Vite 설정 (161B)
├── 📄 tsconfig.app.json        # TypeScript 앱 설정 (702B)
├── 📄 tsconfig.json            # TypeScript 설정 (119B)
├── 📄 eslint.config.js         # ESLint 설정 (610B)
├── 📄 .gitignore               # Git 무시 파일 (253B)
└── 📄 README.md                # 프로젝트 설명 (2.2KB)
```

## 📁 public/ - 정적 파일

```
public/
├── 📁 images/
│   └── 📄 mountain-background.jpg  # 배경 이미지 (5.3MB)
└── 📄 vite.svg                     # Vite 로고 (1.5KB)
```

## 📁 src/ - 소스 코드

```
src/
├── 📄 App.tsx                     # 메인 앱 컴포넌트 (2.4KB)
├── 📄 index.css                   # 전역 스타일 (991B)
├── 📄 main.tsx                    # 앱 진입점 (387B)
├── 📄 vite-env.d.ts              # Vite 타입 정의 (38B)
├── 📁 assets/                     # 에셋 파일
├── 📁 components/                 # 컴포넌트
├── 📁 contexts/                   # React Context
├── 📁 hooks/                      # 커스텀 훅
├── 📁 pages/                      # 페이지 컴포넌트
├── 📁 services/                   # API 서비스
├── 📁 styles/                     # 스타일 파일
├── 📁 types/                      # TypeScript 타입
└── 📁 utils/                      # 유틸리티 함수
```

### 📁 src/assets/ - 에셋 파일

```
src/assets/
└── 📄 react.svg                   # React 로고 (4.0KB)
```

### 📁 src/components/ - 컴포넌트

```
src/components/
├── 📁 common/                     # 공통 컴포넌트
├── 📁 forms/                      # 폼 컴포넌트 (비어있음)
└── 📁 layout/                     # 레이아웃 컴포넌트
```

#### 📁 src/components/common/ - 공통 컴포넌트

```
src/components/common/
├── 📄 AdvancedSearch.tsx          # 고급 검색 (13KB, 382 lines)
├── 📄 Button.tsx                  # 버튼 컴포넌트 (1.8KB, 53 lines)
├── 📄 CategorySelector.tsx        # 카테고리 선택기 (4.5KB, 126 lines)
├── 📄 CommentSection.tsx          # 댓글 섹션 (16KB, 474 lines)
├── 📄 ErrorBoundary.tsx           # 에러 경계 (4.1KB, 127 lines)
├── 📄 ErrorMessage.tsx            # 에러 메시지 (3.5KB, 140 lines)
├── 📄 ImageUpload.tsx             # 이미지 업로드 (13KB, 381 lines)
├── 📄 Input.tsx                   # 입력 필드 (1.7KB, 65 lines)
├── 📄 LoadingSpinner.tsx          # 로딩 스피너 (1.1KB, 44 lines)
├── 📄 Skeleton.tsx                # 스켈레톤 UI (578B, 27 lines)
├── 📄 SocialAuthButtons.tsx       # 소셜 인증 버튼 (1.3KB, 32 lines)
├── 📄 TagSelector.tsx             # 태그 선택기 (8.7KB, 249 lines)
├── 📄 Textarea.tsx                # 텍스트 영역 (1.8KB, 67 lines)
├── 📄 Toast.tsx                   # 토스트 알림 (4.2KB, 154 lines)
└── 📄 ToastContainer.tsx          # 토스트 컨테이너 (602B, 26 lines)
```

#### 📁 src/components/layout/ - 레이아웃 컴포넌트

```
src/components/layout/
├── 📄 Footer.tsx                  # 푸터 컴포넌트 (1.9KB, 59 lines)
└── 📄 Layout.tsx                  # 레이아웃 컴포넌트 (9.7KB, 233 lines)
```

### 📁 src/contexts/ - React Context

```
src/contexts/
├── 📄 AuthContext.tsx             # 인증 컨텍스트 (3.7KB, 137 lines)
└── 📄 ToastContext.tsx            # 토스트 컨텍스트 (2.6KB, 98 lines)
```

### 📁 src/hooks/ - 커스텀 훅

```
src/hooks/
└── (비어있음)
```

### 📁 src/pages/ - 페이지 컴포넌트

```
src/pages/
├── 📄 Home.tsx                    # 메인 홈페이지 (4.2KB, 76 lines)
├── 📄 NotFound.tsx                # 404 에러 페이지 (1.7KB, 45 lines)
├── 📁 Admin/                      # 관리자 페이지
├── 📁 Auth/                       # 인증 페이지
├── 📁 Home/                       # 홈 디렉토리
├── 📁 Posts/                      # 게시물 페이지
└── 📁 Profile/                    # 프로필 페이지
```

#### 📁 src/pages/Admin/ - 관리자 페이지

```
src/pages/Admin/
├── 📄 Analytics.tsx               # 분석 페이지 (20KB, 526 lines)
├── 📄 BackupManager.tsx           # 백업 관리 (25KB, 575 lines)
├── 📄 CommentManagement.tsx       # 댓글 관리 (22KB, 589 lines)
├── 📄 Dashboard.tsx               # 대시보드 (17KB, 367 lines)
├── 📄 Dashboard_backup.tsx        # 대시보드 백업 (16KB, 351 lines)
├── 📄 PostManagement.tsx          # 게시물 관리 (21KB, 502 lines)
├── 📄 SiteSettings.tsx            # 사이트 설정 (15KB, 404 lines)
└── 📄 UserManagement.tsx          # 사용자 관리 (25KB, 634 lines)
```

#### 📁 src/pages/Auth/ - 인증 페이지

```
src/pages/Auth/
├── 📄 Login.tsx                   # 로그인 페이지 (4.1KB, 131 lines)
└── 📄 Signup.tsx                  # 회원가입 페이지 (7.8KB, 222 lines)
```

#### 📁 src/pages/Home/ - 홈 디렉토리

```
src/pages/Home/
└── 📄 index.tsx                   # 홈 인덱스 페이지 (13KB, 234 lines)
```

#### 📁 src/pages/Posts/ - 게시물 페이지

```
src/pages/Posts/
├── 📄 EditPost.tsx                # 게시물 수정 (21KB, 558 lines)
├── 📄 PostDetail.tsx              # 게시물 상세 (23KB, 642 lines)
├── 📄 PostList.tsx                # 게시물 목록 (28KB, 668 lines)
└── 📄 WritePost.tsx               # 게시물 작성 (12KB, 303 lines)
```

#### 📁 src/pages/Profile/ - 프로필 페이지

```
src/pages/Profile/
└── 📄 UserProfile.tsx             # 사용자 프로필 (16KB, 420 lines)
```

### 📁 src/services/ - API 서비스

```
src/services/
└── (비어있음)
```

### 📁 src/styles/ - 스타일 파일

```
src/styles/
└── (비어있음)
```

### 📁 src/types/ - TypeScript 타입

```
src/types/
└── 📄 index.ts                    # 타입 정의 (2.5KB, 143 lines)
```

### 📁 src/utils/ - 유틸리티 함수

```
src/utils/
├── 📄 auth.ts                     # 인증 유틸리티 (2.6KB, 96 lines)
├── 📄 categoryUtils.ts            # 카테고리 유틸리티 (5.9KB, 163 lines)
├── 📄 dateUtils.ts                # 날짜 유틸리티 (1.0KB, 31 lines)
├── 📄 socialUtils.ts              # 소셜 유틸리티 (5.4KB, 157 lines)
└── 📄 validation.ts               # 검증 유틸리티 (1.7KB, 45 lines)
```

## 📁 docs/ - 문서

```
docs/
├── 📄 DEVELOPMENT_LOG.md          # 개발 로그 (21KB, 573 lines)
├── 📄 PAGE_STRUCTURE.md           # 페이지 구조 (2.4KB, 67 lines)
└── 📄 PROJECT_PLAN.md             # 프로젝트 계획 (6.7KB, 241 lines)
```

## 📊 파일 통계

### 📁 디렉토리별 파일 수
- **src/pages/Admin/** - 8개 파일
- **src/components/common/** - 15개 파일
- **src/pages/Posts/** - 4개 파일
- **src/utils/** - 5개 파일
- **src/pages/Auth/** - 2개 파일
- **src/pages/Profile/** - 1개 파일
- **src/pages/Home/** - 1개 파일
- **src/components/layout/** - 2개 파일
- **src/contexts/** - 2개 파일
- **src/types/** - 1개 파일
- **src/assets/** - 1개 파일
- **src/hooks/** - 0개 파일
- **src/services/** - 0개 파일
- **src/styles/** - 0개 파일
- **src/components/forms/** - 0개 파일

### 📄 가장 큰 파일 (Top 5)
1. **PostList.tsx** - 28KB (668 lines)
2. **UserManagement.tsx** - 25KB (634 lines)
3. **BackupManager.tsx** - 25KB (575 lines)
4. **PostDetail.tsx** - 23KB (642 lines)
5. **CommentManagement.tsx** - 22KB (589 lines)

---
*마지막 업데이트: 2025년 1월* 