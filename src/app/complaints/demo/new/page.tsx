'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'

export default function NewComplaintDemoPage() {
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    complainantName: '',
    complainantPhone: '',
    complainantEmail: '',
    title: '',
    content: '',
    category: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      router.push('/complaints/demo')
    }, 2000)
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
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center">
              <Link
                href="/complaints/demo"
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">새 민원 등록</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        {/* 성공 메시지 */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  민원이 성공적으로 등록되었습니다! 잠시 후 목록으로 이동합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 민원인 정보 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">민원인 정보</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="complainantName" className="block text-sm font-medium text-gray-700">
                      성명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="complainantName"
                      id="complainantName"
                      required
                      value={formData.complainantName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="complainantPhone" className="block text-sm font-medium text-gray-700">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="complainantPhone"
                      id="complainantPhone"
                      required
                      value={formData.complainantPhone}
                      onChange={handleInputChange}
                      placeholder="010-0000-0000"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="complainantEmail" className="block text-sm font-medium text-gray-700">
                      이메일
                    </label>
                    <input
                      type="email"
                      name="complainantEmail"
                      id="complainantEmail"
                      value={formData.complainantEmail}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 민원 내용 */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">민원 내용</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      분류 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      id="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                    >
                      <option value="">선택하세요</option>
                      <option value="도로/교통">도로/교통</option>
                      <option value="환경/위생">환경/위생</option>
                      <option value="복지/보건">복지/보건</option>
                      <option value="교육/문화">교육/문화</option>
                      <option value="경제/일자리">경제/일자리</option>
                      <option value="안전/재난">안전/재난</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      rows={5}
                      required
                      value={formData.content}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                      placeholder="민원 내용을 상세히 작성해주세요..."
                    />
                  </div>
                </div>
              </div>

              {/* AI 분석 안내 */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">🤖 AI 자동 분석</h4>
                <p className="text-sm text-blue-700">
                  민원 등록 시 AI가 내용을 분석하여 담당 부서를 자동으로 추천하고, 
                  키워드를 추출하여 빠른 처리를 도와드립니다.
                </p>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-3">
                <Link
                  href="/complaints/demo"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gyeonggi-blue border border-transparent rounded-md hover:bg-gyeonggi-lightblue"
                >
                  민원 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}