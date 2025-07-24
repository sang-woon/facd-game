'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'

export default function ReportsDemoPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const demoUser = localStorage.getItem('demoUser')
    if (!demoUser) {
      router.push('/auth/demo')
      return
    }
    setUser(JSON.parse(demoUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('demoUser')
    router.push('/auth/demo')
  }

  if (!user) {
    return <div>로딩중...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <MobileNav userName={user.name} onLogout={handleLogout} />
      
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center">
              <Link
                href="/dashboard/demo"
                className="mr-4 text-gray-500 hover:text-gray-700 md:hidden"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">보고서</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        {/* 준비중 안내 */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-6">
            <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            보고서 기능을 준비하고 있습니다
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            민원 처리 현황, 월별 통계, AI 분석 리포트 등 다양한 보고서 기능이 곧 제공될 예정입니다.
          </p>

          {/* 예정된 기능 안내 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-medium text-gray-900 mb-1">통계 보고서</h3>
              <p className="text-sm text-gray-600">월별, 분기별 민원 처리 통계</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-medium text-gray-900 mb-1">AI 분석 리포트</h3>
              <p className="text-sm text-gray-600">민원 트렌드 및 예측 분석</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-medium text-gray-900 mb-1">성과 보고서</h3>
              <p className="text-sm text-gray-600">민원 처리 성과 및 개선 지표</p>
            </div>
          </div>

          <Link
            href="/dashboard/demo"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue"
          >
            대시보드로 돌아가기
          </Link>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                알림
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  보고서 기능이 준비되면 알림을 받으실 수 있습니다. 
                  설정에서 알림을 활성화해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}