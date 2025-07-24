# Google Calendar Integration Setup Guide

이 문서는 경기도의원 민원관리 시스템에 Google Calendar를 연동하는 방법을 설명합니다.

## 1. Google Cloud Console 설정

### 1.1 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택

### 1.2 Google Calendar API 활성화
1. "API 및 서비스" > "라이브러리" 메뉴로 이동
2. "Google Calendar API" 검색
3. "사용 설정" 클릭

### 1.3 OAuth 2.0 클라이언트 생성
1. "API 및 서비스" > "사용자 인증 정보" 메뉴로 이동
2. "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID" 선택
3. 애플리케이션 유형: "웹 애플리케이션" 선택
4. 승인된 리디렉션 URI 추가:
   - 개발: `http://localhost:3000/api/auth/google/callback`
   - 프로덕션: `https://your-domain.com/api/auth/google/callback`
5. 클라이언트 ID와 클라이언트 시크릿 저장

## 2. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가하세요:

```env
# Google Calendar API
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

## 3. 데이터베이스 스키마 업데이트

사용자의 Google Calendar 토큰을 저장하기 위해 데이터베이스 스키마를 업데이트해야 합니다:

```sql
-- Google Calendar 토큰 저장을 위한 테이블
CREATE TABLE IF NOT EXISTS UserGoogleToken (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL REFERENCES User(id) ON DELETE CASCADE,
  accessToken TEXT NOT NULL,
  refreshToken TEXT,
  expiresAt TIMESTAMP WITH TIME ZONE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Schedule 테이블에 Google Calendar 이벤트 ID 추가
ALTER TABLE Schedule 
ADD COLUMN googleEventId TEXT;
```

## 4. 사용 방법

### 4.1 사용자가 Google Calendar 연동하기
1. 일정 관리 페이지에서 "구글 캘린더 연동하기" 버튼 클릭
2. Google 계정으로 로그인 및 권한 승인
3. 자동으로 시스템으로 돌아옴

### 4.2 일정 동기화
- 새 일정 생성 시: 자동으로 Google Calendar에 이벤트 생성
- 일정 수정 시: Google Calendar 이벤트도 함께 업데이트
- 일정 삭제 시: Google Calendar 이벤트도 함께 삭제

## 5. 보안 고려사항

1. **토큰 암호화**: 프로덕션 환경에서는 access token과 refresh token을 암호화하여 저장
2. **HTTPS 필수**: OAuth 2.0 리디렉션 URI는 프로덕션에서 반드시 HTTPS 사용
3. **토큰 갱신**: Access token 만료 시 refresh token으로 자동 갱신 구현 필요
4. **스코프 최소화**: 필요한 최소한의 권한만 요청

## 6. 추가 구현 필요 사항

현재 기본 구조만 준비되어 있으며, 다음 기능들의 구현이 필요합니다:

1. [ ] 토큰 저장 및 관리 로직
2. [ ] Google Calendar API 실제 호출 구현
3. [ ] 토큰 자동 갱신 로직
4. [ ] 오류 처리 및 재시도 로직
5. [ ] 일정 동기화 상태 표시 UI
6. [ ] 배치 동기화 기능 (기존 일정 일괄 동기화)

## 7. 테스트

1. Google Calendar API 연동 테스트
2. OAuth 2.0 인증 플로우 테스트
3. 일정 CRUD 작업과 Google Calendar 동기화 테스트
4. 토큰 만료 및 갱신 테스트
5. 오류 상황 처리 테스트