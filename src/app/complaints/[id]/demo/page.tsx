'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'

// 데모 민원 상세 데이터
const DEMO_COMPLAINT_DETAIL = {
  id: '1',
  title: '도로 포장 요청',
  complainantName: '홍길동',
  complainantPhone: '010-1234-5678',
  complainantEmail: 'hong@example.com',
  status: 'IN_PROGRESS',
  priority: 'HIGH',
  category: '도로/교통',
  department: '건설국',
  content: `인계동 주민센터 앞 도로가 심하게 파손되어 있습니다. 
  
차량 통행 시 위험하며, 특히 우천 시에는 물이 고여 보행자들도 불편을 겪고 있습니다.

조속한 조치 부탁드립니다.`,
  aiSummary: '도로 파손으로 인한 차량 및 보행자 안전 위험',
  aiKeywords: ['도로파손', '안전위험', '인계동', '우천시'],
  aiSentiment: 'negative',
  createdAt: new Date().toISOString(),
  processNote: '현장 확인 예정 (2024-01-26)',
  histories: [
    {
      id: '1',
      action: '민원 접수',
      description: '시스템에 민원이 등록되었습니다.',
      createdAt: new Date().toISOString(),
      fromStatus: null,
      toStatus: 'RECEIVED',
    },
    {
      id: '2',
      action: '담당자 배정',
      description: '건설국 도로관리팀으로 배정되었습니다.',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      fromStatus: 'RECEIVED',
      toStatus: 'IN_PROGRESS',
    },
  ],
}

export default function ComplaintDetailPage({ params }: { params: { id: string } }) {
  const [complaint] = useState(DEMO_COMPLAINT_DETAIL)
  const [status, setStatus] = useState(complaint.status)
  const [processNote, setProcessNote] = useState(complaint.processNote)
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

  const handleStatusUpdate = () => {
    alert('데모 모드에서는 실제로 저장되지 않습니다.')
  }

  if (!user) {
    return <div>로딩중...</div>
  }

  const statusColors = {
    RECEIVED: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    PENDING: 'bg-gray-100 text-gray-800',
    COMPLETED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  }

  const statusLabels = {
    RECEIVED: '접수',
    IN_PROGRESS: '진행중',
    PENDING: '보류',
    COMPLETED: '완료',
    REJECTED: '반려',
  }

  const priorityLabels = {
    LOW: '낮음',
    MEDIUM: '보통',
    HIGH: '높음',
    URGENT: '긴급',
  }

  const priorityColors = {
    LOW: 'text-gray-600',
    MEDIUM: 'text-yellow-600',
    HIGH: 'text-orange-600',
    URGENT: 'text-red-600',
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">민원 상세</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* 민원 기본 정보 */}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {complaint.title}
            </h3>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
                {statusLabels[status as keyof typeof statusLabels]}
              </span>
              <span className={`inline-flex items-center text-sm ${priorityColors[complaint.priority as keyof typeof priorityColors]}`}>
                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                우선순위: {priorityLabels[complaint.priority as keyof typeof priorityLabels]}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              {/* 민원인 정보 */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">민원인</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div>{complaint.complainantName}</div>
                  <div className="text-gray-600">{complaint.complainantPhone}</div>
                  {complaint.complainantEmail && (
                    <div className="text-gray-600">{complaint.complainantEmail}</div>
                  )}
                </dd>
              </div>
              
              {/* 분류 및 부서 */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">분류</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {complaint.category} / {complaint.department}
                </dd>
              </div>
              
              {/* 접수일시 */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">접수일시</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(complaint.createdAt).toLocaleString('ko-KR')}
                </dd>
              </div>
              
              {/* 민원 내용 */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">민원 내용</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
                  {complaint.content}
                </dd>
              </div>

              {/* AI 분석 결과 */}
              {complaint.aiSummary && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">AI 분석</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <p className="mb-2">{complaint.aiSummary}</p>
                    <div className="flex flex-wrap gap-2">
                      {complaint.aiKeywords.map((keyword, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* 처리 정보 */}
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              처리 정보
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  처리 상태
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gyeonggi-blue focus:border-gyeonggi-blue sm:text-sm rounded-md"
                >
                  <option value="RECEIVED">접수</option>
                  <option value="IN_PROGRESS">진행중</option>
                  <option value="PENDING">보류</option>
                  <option value="COMPLETED">완료</option>
                  <option value="REJECTED">반려</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="processNote" className="block text-sm font-medium text-gray-700">
                  처리 내용
                </label>
                <textarea
                  id="processNote"
                  rows={3}
                  value={processNote}
                  onChange={(e) => setProcessNote(e.target.value)}
                  className="mt-1 block w-full shadow-sm focus:ring-gyeonggi-blue focus:border-gyeonggi-blue sm:text-sm border-gray-300 rounded-md"
                  placeholder="처리 내용을 입력하세요..."
                />
              </div>
              
              <div>
                <button
                  onClick={handleStatusUpdate}
                  className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue"
                >
                  상태 업데이트
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 처리 이력 */}
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              처리 이력
            </h3>
            
            <div className="flow-root">
              <ul className="-mb-8">
                {complaint.histories.map((history, historyIdx) => (
                  <li key={history.id}>
                    <div className="relative pb-8">
                      {historyIdx !== complaint.histories.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gyeonggi-blue flex items-center justify-center ring-8 ring-white">
                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">
                              {history.action}
                              {history.fromStatus && history.toStatus && (
                                <span className="font-medium">
                                  {' '}
                                  ({statusLabels[history.fromStatus as keyof typeof statusLabels]} → {statusLabels[history.toStatus as keyof typeof statusLabels]})
                                </span>
                              )}
                            </p>
                            {history.description && (
                              <p className="mt-0.5 text-sm text-gray-600">{history.description}</p>
                            )}
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {new Date(history.createdAt).toLocaleString('ko-KR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}