'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // 데모 로그인 페이지로 리다이렉트
    router.push('/auth/demo')
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gyeonggi-blue">
          경기도의원 민원관리 시스템
        </h1>
        <p className="text-center text-gray-600 mb-12">
          스마트한 민원 관리로 도민과 더 가까이
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">민원 등록</h2>
            <p className="text-gray-600">
              도민의 민원을 체계적으로 등록하고 관리하세요
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">일정 관리</h2>
            <p className="text-gray-600">
              민원 처리 일정을 효율적으로 관리하세요
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">AI 분석</h2>
            <p className="text-gray-600">
              AI가 민원을 분석하고 담당 부서를 추천합니다
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}