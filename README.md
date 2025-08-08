# 50-CMS: React + TypeScript + Vite 기반 CMS

현대적인 콘텐츠 관리 시스템(CMS)을 React, TypeScript, Vite로 구현한 프로젝트입니다.

## 🚀 주요 기능

### 📝 콘텐츠 관리
- 글 작성, 편집, 삭제
- 카테고리 및 태그 관리
- 이미지 업로드 및 관리
- 댓글 시스템

### 👥 사용자 관리
- 사용자 등록 및 인증
- 역할 기반 권한 관리 (관리자/사용자)
- 사용자 프로필 관리

### 🎨 관리자 대시보드
- 실시간 통계 및 분석
- 백업 및 복원 기능
- 사이트 설정 관리
- 메뉴 관리

### 📱 반응형 디자인
- 모든 디바이스에서 최적화된 UI
- Tailwind CSS 기반 스타일링
- FontAwesome 아이콘

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome
- **Charts**: Tremor
- **Routing**: React Router DOM

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── contexts/           # React Context
├── pages/              # 페이지 컴포넌트
│   ├── Admin/          # 관리자 페이지
│   ├── Auth/           # 인증 페이지
│   ├── Posts/          # 글 관련 페이지
│   ├── Profile/        # 프로필 페이지
│   └── Public/         # 공개 페이지
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── App.tsx            # 메인 앱 컴포넌트
```

## 🔧 개발 환경 설정

### ESLint 설정

프로덕션 애플리케이션 개발 시 타입 인식 린트 규칙을 활성화하는 것을 권장합니다:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 기타 설정...
      
      // tseslint.configs.recommended를 제거하고 이것으로 교체
      ...tseslint.configs.recommendedTypeChecked,
      // 또는 더 엄격한 규칙을 위해 이것을 사용
      ...tseslint.configs.strictTypeChecked,
      // 선택적으로 스타일 규칙을 위해 이것을 추가
      ...tseslint.configs.stylisticTypeChecked,
      
      // 기타 설정...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 기타 옵션...
    },
  },
])
```

React 전용 린트 규칙을 위해 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)와 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)을 설치할 수도 있습니다:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 기타 설정...
      // React 린트 규칙 활성화
      reactX.configs['recommended-typescript'],
      // React DOM 린트 규칙 활성화
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 기타 옵션...
    },
  },
])
```

## 📄 라이선스

MIT License
