import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            경기도의원 민원관리 시스템
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                이메일 주소
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gyeonggi-blue focus:border-gyeonggi-blue focus:z-10 sm:text-sm"
                placeholder="이메일 주소"
                disabled
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gyeonggi-blue focus:border-gyeonggi-blue focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                disabled
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800">
              현재 데모 모드로 운영 중입니다. 실제 로그인은 환경 변수 설정 후 가능합니다.
            </p>
          </div>

          <div>
            <Link
              href="/auth/demo"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gyeonggi-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue"
            >
              데모 모드로 계속하기
            </Link>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gyeonggi-blue hover:text-blue-700">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}