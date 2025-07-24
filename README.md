# 경기도의원 민원관리 시스템

경기도의원을 위한 스마트 민원 관리 플랫폼입니다. AI 기반 민원 분석 및 일정 관리 기능을 제공합니다.

## 주요 기능

### 1. 민원 관리
- 민원 접수 및 상태 추적
- AI 기반 민원 내용 분석
- 자동 부서 매칭
- 파일 첨부 지원

### 2. 일정 관리
- 캘린더 기반 일정 관리
- 민원 연계 일정 등록
- 일정 알림 기능

### 3. AI 기능 (OpenAI 통합)
- 민원 내용 자동 요약
- 키워드 추출 및 분류
- 감정 분석 및 우선순위 판단
- 담당 부서 자동 추천

### 4. 대시보드
- 민원 처리 현황 통계
- 최근 민원 목록
- 오늘의 일정 확인

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **AI**: OpenAI GPT-4

## 설치 및 실행

### 1. 환경 설정

```bash
# 환경 변수 파일 생성
cp .env.example .env.local
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 API 키를 `.env.local`에 입력
3. SQL Editor에서 다음 파일 실행:
   - `src/lib/storage/setup.sql` - Storage 버킷 설정
   - `src/lib/data/departments.sql` - 부서 데이터 초기화

### 3. 의존성 설치

```bash
npm install
```

### 4. 데이터베이스 마이그레이션

```bash
npm run db:push
```

### 5. 개발 서버 실행

```bash
npm run dev
```

### 6. 프로덕션 빌드

```bash
npm run build:prod
npm start
```

## GitHub Pages 배포

이 프로젝트는 GitHub Pages에 자동으로 배포되도록 설정되어 있습니다.

### 자동 배포 (GitHub Actions)

1. 코드를 `main` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다.
2. GitHub 저장소 설정에서 Pages를 활성화해야 합니다:
   - Settings → Pages → Source: "GitHub Actions" 선택

### 수동 배포

```bash
# 빌드 및 배포
npm run deploy
```

### 배포 전 준비사항

1. **환경 변수 설정**
   - GitHub 저장소의 Settings → Secrets and variables → Actions에서 필요한 환경 변수를 설정하세요.
   - 주요 환경 변수는 `.env.example` 파일을 참고하세요.

2. **저장소 이름 확인**
   - `next.config.js`의 `basePath`와 `assetPrefix`가 저장소 이름과 일치하는지 확인하세요.
   - 현재 설정: `/facd-game`

3. **API 제한사항**
   - GitHub Pages는 정적 사이트 호스팅만 지원합니다.
   - 서버 사이드 기능(API Routes, 동적 라우팅 등)은 작동하지 않습니다.
   - Supabase 등 외부 API를 사용하여 백엔드 기능을 구현하세요.

### 배포 URL
배포가 완료되면 다음 URL에서 확인할 수 있습니다:
`https://[your-github-username].github.io/facd-game/`

## 프로젝트 구조

```
src/
├── app/                    # Next.js 앱 라우터
│   ├── auth/              # 인증 관련 페이지
│   ├── complaints/        # 민원 관리 페이지
│   ├── dashboard/         # 대시보드
│   └── schedules/         # 일정 관리 페이지
├── components/            # React 컴포넌트
│   ├── complaints/        # 민원 관련 컴포넌트
│   ├── dashboard/         # 대시보드 컴포넌트
│   └── schedules/         # 일정 관련 컴포넌트
├── lib/                   # 유틸리티 함수
│   ├── auth/             # 인증 관련 함수
│   ├── openai/           # OpenAI API 통합
│   ├── storage/          # 파일 업로드 관리
│   └── supabase/         # Supabase 클라이언트
└── types/                # TypeScript 타입 정의
```

## 사용 방법

### 1. 로그인
- `/auth/login` 페이지에서 이메일과 비밀번호로 로그인

### 2. 민원 등록
- 대시보드에서 "새 민원 등록" 클릭
- 민원인 정보와 민원 내용 입력
- AI가 자동으로 내용을 분석하여 담당 부서 추천

### 3. 일정 관리
- 일정 관리 페이지에서 캘린더 확인
- "새 일정 추가"로 민원 관련 일정 등록
- 일정 알림 설정 가능

### 4. 민원 처리
- 민원 목록에서 상태별 필터링
- 민원 상세 페이지에서 처리 내역 기록
- 처리 완료 시 상태 업데이트

## 보안 및 권한

- 도의원별 독립된 데이터 저장
- JWT 기반 인증
- 민감 정보 암호화
- Rate limiting 적용

## 라이선스

이 프로젝트는 경기도의회 전용 시스템입니다.