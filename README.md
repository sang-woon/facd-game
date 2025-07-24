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

## 배포

### Vercel 배포 (권장)

이 프로젝트는 Vercel에 배포하도록 최적화되어 있습니다.

#### 배포 방법
1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "Import Project" → GitHub 저장소 선택
3. 환경 변수 설정 (아래 참조)
4. Deploy 클릭

#### 필수 환경 변수
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
DIRECT_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
JWT_SECRET
OPENAI_API_KEY (선택사항)
```

#### 배포 URL
`https://facd-game.vercel.app` (또는 자동 생성된 URL)

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