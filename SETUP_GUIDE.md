# 환경 설정 가이드 - 경기도의원 민원관리 시스템

이 가이드는 `.env.local` 파일 설정 방법을 자세히 설명합니다.

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성
1. [https://supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인

### 1.2 새 프로젝트 생성
1. "New project" 클릭
2. 프로젝트 정보 입력:
   - **Project name**: `gyeonggi-complaints`
   - **Database Password**: 강력한 비밀번호 생성 (저장해두세요!)
   - **Region**: `Northeast Asia (Seoul)` 선택
3. "Create new project" 클릭

### 1.3 API 키 확인
프로젝트 생성 후 대시보드에서:
1. 왼쪽 메뉴에서 "Settings" → "API" 클릭
2. 다음 정보를 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGci...` (긴 문자열)
   - **service_role**: `eyJhbGci...` (긴 문자열)

## 2. 환경 변수 설정

### 2.1 `.env.local` 파일 생성
```bash
cp .env.example .env.local
```

### 2.2 Supabase 설정
`.env.local` 파일을 열고 다음과 같이 수정:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"  # Project URL 입력
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."          # anon public 키 입력
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci..."              # service_role 키 입력

# Database URLs
DATABASE_URL="복사한 Connection string (Transaction)"
DIRECT_URL="복사한 Connection string (Session)"
```

### 2.3 Database URL 확인
1. Supabase 대시보드에서 "Settings" → "Database" 클릭
2. "Connection string" 섹션에서:
   - **Transaction (Mode: Transaction)** 복사 → `DATABASE_URL`에 입력
   - **Session (Mode: Session)** 복사 → `DIRECT_URL`에 입력

예시:
```env
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:password@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
```

## 3. OpenAI API 키 설정 (선택사항)

### 3.1 OpenAI 계정 생성
1. [https://platform.openai.com](https://platform.openai.com) 접속
2. 계정 생성 또는 로그인

### 3.2 API 키 생성
1. 우측 상단 프로필 → "View API keys" 클릭
2. "Create new secret key" 클릭
3. 키 이름 입력 (예: "gyeonggi-complaints")
4. 생성된 키 복사 (한 번만 표시됨!)

### 3.3 환경 변수 설정
```env
# OpenAI
OPENAI_API_KEY="sk-..."  # 생성한 API 키 입력
OPENAI_ORG_ID="org-..."  # Organization ID (선택사항)
```

## 4. 데이터베이스 초기화

### 4.1 Supabase SQL Editor 접속
1. Supabase 대시보드에서 "SQL Editor" 클릭
2. "New query" 클릭

### 4.2 테이블 생성
Prisma 스키마를 기반으로 테이블을 생성:

```bash
# 로컬에서 실행
npm run db:push
```

### 4.3 초기 데이터 입력
SQL Editor에서 다음 파일들의 내용을 실행:
1. `src/lib/storage/setup.sql` - Storage 버킷 설정
2. `src/lib/data/departments.sql` - 부서 데이터

## 5. Supabase Auth 설정

### 5.1 인증 설정
1. Supabase 대시보드에서 "Authentication" → "Providers" 클릭
2. "Email" 활성화 확인

### 5.2 사용자 생성
1. "Authentication" → "Users" 클릭
2. "Invite user" 클릭
3. 테스트용 이메일 입력

## 6. Storage 설정

### 6.1 버킷 생성
SQL Editor에서 `src/lib/storage/setup.sql` 실행 또는:
1. "Storage" 메뉴 클릭
2. "New bucket" 클릭
3. 이름: `complaints` 입력
4. "Public bucket" 체크 (선택사항)

## 7. 최종 확인

### 7.1 환경 변수 검증
`.env.local` 파일이 다음과 같이 설정되었는지 확인:

```env
# Supabase (필수)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci..."

# Database (필수)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth (그대로 유지)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-here"

# OpenAI (선택사항)
OPENAI_API_KEY="sk-..."
```

### 7.2 프로젝트 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 7.3 접속 테스트
1. http://localhost:3000 접속
2. 로그인 페이지로 리다이렉트 확인
3. Supabase에서 생성한 사용자로 로그인

## 문제 해결

### 1. "Missing Supabase environment variables" 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수 이름이 정확한지 확인
- 개발 서버 재시작: `npm run dev`

### 2. 데이터베이스 연결 실패
- DATABASE_URL의 비밀번호가 정확한지 확인
- Supabase 대시보드에서 데이터베이스가 활성화되어 있는지 확인

### 3. 로그인 실패
- Supabase Authentication에서 사용자가 생성되었는지 확인
- 이메일/비밀번호가 정확한지 확인

### 4. OpenAI API 오류
- API 키가 유효한지 확인
- OpenAI 계정에 크레딧이 있는지 확인
- API 키를 설정하지 않았다면 AI 기능은 비활성화됨 (정상)

## 보안 주의사항

1. **절대로** `.env.local` 파일을 Git에 커밋하지 마세요
2. API 키는 안전하게 보관하세요
3. 프로덕션 환경에서는 환경 변수를 서버에서 관리하세요
4. `SUPABASE_SERVICE_ROLE_KEY`는 서버 사이드에서만 사용하세요