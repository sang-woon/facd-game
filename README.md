# 🏛️ 경기도의원 민원관리 시스템

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
</div>

<br />

<div align="center">
  <h3>🚀 AI 기반 스마트 민원 관리 플랫폼</h3>
  <p>경기도의원을 위한 효율적인 민원 처리 및 일정 관리 시스템</p>
  <br />
  <a href="https://facd-game.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🔗_Live_Demo-Visit_Now-brightgreen?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/sang-woon/facd-game" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</div>

---

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 및 실행](#-설치-및-실행)
- [스크린샷](#-스크린샷)
- [API 문서](#-api-문서)
- [배포](#-배포)

---

## ✨ 주요 기능

### 🤖 AI 기반 민원 분석
- **자동 내용 분석**: OpenAI GPT-4를 활용한 민원 내용 자동 요약
- **담당 부서 추천**: AI가 민원 내용을 분석하여 적절한 담당 부서 자동 매칭
- **우선순위 판단**: 민원의 긴급도와 중요도를 AI가 자동으로 분석
- **감정 분석**: 민원인의 감정 상태를 파악하여 적절한 대응 전략 제시

### 📅 통합 일정 관리
- **캘린더 뷰**: 월간/주간/일간 일정을 한눈에 확인
- **민원 연계**: 민원과 관련된 일정을 자동으로 연결
- **알림 기능**: 중요 일정에 대한 실시간 알림
- **Google Calendar 연동**: 기존 일정과의 완벽한 동기화

### 📊 실시간 대시보드
- **민원 현황**: 처리 상태별 민원 통계를 실시간으로 확인
- **처리율 분석**: 일별/주별/월별 민원 처리 성과 분석
- **부서별 통계**: 각 부서의 민원 처리 현황 비교
- **트렌드 분석**: 민원 발생 패턴과 추세 시각화

### 📁 민원 관리
- **상태 추적**: 접수 → 진행중 → 보류 → 완료의 체계적인 상태 관리
- **파일 첨부**: 관련 문서와 이미지 업로드 지원 (최대 10MB)
- **처리 이력**: 모든 처리 과정의 상세한 기록 보관
- **검색 기능**: 키워드, 날짜, 상태별 고급 검색

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom components with Tailwind
- **Calendar**: React Calendar

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **ORM**: Prisma
- **API**: Next.js API Routes

### AI & Integration
- **AI**: OpenAI GPT-4 API
- **Calendar**: Google Calendar API
- **Monitoring**: Sentry (optional)

---

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API Routes
│   ├── auth/              # 인증 관련 페이지
│   │   ├── login/         # 로그인
│   │   └── demo/          # 데모 모드
│   ├── complaints/        # 민원 관리
│   │   ├── new/           # 민원 등록
│   │   └── [id]/          # 민원 상세
│   ├── dashboard/         # 대시보드
│   └── schedules/         # 일정 관리
├── components/            # React 컴포넌트
│   ├── complaints/        # 민원 관련 컴포넌트
│   ├── dashboard/         # 대시보드 컴포넌트
│   └── schedules/         # 일정 관련 컴포넌트
├── lib/                   # 유틸리티 함수
│   ├── auth/             # 인증 관련
│   ├── openai/           # AI 통합
│   ├── storage/          # 파일 업로드
│   └── supabase/         # DB 클라이언트
└── types/                # TypeScript 타입 정의
```

---

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상
- Supabase 계정 (선택사항)
- OpenAI API 키 (선택사항)

### 1. 저장소 클론
```bash
git clone https://github.com/sang-woon/facd-game.git
cd facd-game
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
# .env.local 파일 생성
cp .env.example .env.local

# 필요한 환경 변수 입력 (선택사항)
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

---

## 📸 스크린샷

### 🏠 홈페이지
깔끔한 랜딩 페이지로 시스템의 주요 기능을 한눈에 확인할 수 있습니다.

### 📊 대시보드
실시간 민원 처리 현황과 통계를 시각적으로 확인할 수 있습니다.

### 📝 민원 등록
AI가 민원 내용을 분석하여 담당 부서를 자동으로 추천합니다.

### 📅 일정 관리
캘린더 뷰로 민원 관련 일정을 효율적으로 관리할 수 있습니다.

---

## 📚 API 문서

### 민원 API

#### 민원 목록 조회
```http
GET /api/complaints
```

#### 민원 등록
```http
POST /api/complaints
Content-Type: application/json

{
  "title": "민원 제목",
  "content": "민원 내용",
  "complainantName": "민원인 이름",
  "complainantPhone": "010-1234-5678"
}
```

#### AI 민원 분석
```http
POST /api/ai/analyze
Content-Type: application/json

{
  "content": "분석할 민원 내용"
}
```

---

## 🌐 배포

### 🎯 라이브 데모
- **Live Demo**: https://facd-game.vercel.app/
- **GitHub 저장소**: https://github.com/sang-woon/facd-game

### Vercel 배포 완료 ✅
1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "Import Project" → GitHub 저장소 선택
3. 환경 변수 설정 (선택사항)
4. Deploy 클릭

### 환경 변수 (선택사항)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_secret_key
```

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 경기도의회 전용 시스템입니다.

---

## 📞 문의

프로젝트 관련 문의사항은 Issues 탭을 이용해주세요.

---

<div align="center">
  <p>Made with ❤️ for 경기도의회</p>
</div>