import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
              <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              페이지를 찾을 수 없습니다
            </h2>
            
            <p className="text-gray-600 mb-6">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>

            <div className="space-y-3">
              <Link
                href="/dashboard/demo"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue"
              >
                대시보드로 이동
              </Link>
              
              <Link
                href="/auth/demo"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue"
              >
                로그인 페이지로 이동
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            도움이 필요하신가요?{' '}
            <a href="mailto:support@gyeonggi.go.kr" className="font-medium text-gyeonggi-blue hover:text-gyeonggi-lightblue">
              지원팀에 문의하기
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}