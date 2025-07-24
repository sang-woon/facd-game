# Vercel 배포 설정 가이드

## 1. 프로젝트 Import 설정

### Framework Preset
- **Framework**: Next.js (자동 감지됨)
- **Root Directory**: ./ (그대로 유지)
- **Build Command**: npm run build (기본값)
- **Output Directory**: .next (기본값)
- **Install Command**: npm install (기본값)

## 2. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 추가하세요:

### Supabase 설정
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database 설정
```
DATABASE_URL=postgresql://postgres.[your-project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[your-project]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### NextAuth 설정
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

### JWT 설정
```
JWT_SECRET=your-jwt-secret-here
```

### OpenAI 설정 (선택사항)
```
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...
```

### 기타 설정 (선택사항)
```
REDIS_URL=redis://localhost:6379
SENTRY_DSN=https://...
KAKAO_REST_API_KEY=your-kakao-key
NAVER_CLIENT_ID=your-naver-id
NAVER_CLIENT_SECRET=your-naver-secret
```

## 3. 배포 설정

1. 모든 환경 변수 입력 완료 후 **"Deploy"** 버튼 클릭
2. 첫 배포는 3-5분 정도 소요됩니다
3. 배포 완료 후 할당된 URL로 접속 가능

## 4. 자동 배포 설정

GitHub에 push하면 자동으로 배포됩니다:
- `main` 브랜치: Production 환경
- Pull Request: Preview 환경

## 5. 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 → Settings → Domains
2. 도메인 추가 후 DNS 설정
3. SSL 인증서는 자동으로 발급됩니다

## 문제 해결

### 빌드 실패 시
1. 환경 변수가 모두 설정되었는지 확인
2. Build Logs에서 구체적인 오류 확인
3. 로컬에서 `npm run build` 테스트

### 환경 변수 관련
- Production, Preview, Development 환경별로 다른 값 설정 가능
- 민감한 정보는 절대 코드에 하드코딩하지 마세요