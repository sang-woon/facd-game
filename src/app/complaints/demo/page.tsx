'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'

// 데모 민원 데이터
const DEMO_COMPLAINTS_FULL = [
  {
    id: '1',
    title: '도로 포장 요청',
    complainantName: '홍길동',
    complainantPhone: '010-1234-5678',
    status: 'RECEIVED',
    priority: 'HIGH',
    category: '도로/교통',
    content: '인계동 주민센터 앞 도로가 심하게 파손되어 있습니다. 차량 통행 시 위험합니다.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '가로등 고장 신고',
    complainantName: '김민수',
    complainantPhone: '010-2345-6789',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    category: '안전/재난',
    content: '영통구 청명로 일대 가로등 3개가 작동하지 않아 야간에 매우 위험합니다.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: '공원 시설 개선 요청',
    complainantName: '이영희',
    complainantPhone: '010-3456-7890',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    category: '환경/위생',
    content: '중앙공원 어린이 놀이터 시설이 낡아서 교체가 필요합니다.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    title: '불법 주차 단속 요청',
    complainantName: '박철수',
    complainantPhone: '010-4567-8901',
    status: 'RECEIVED',
    priority: 'MEDIUM',
    category: '도로/교통',
    content: '아파트 앞 소방도로에 매일 불법주차 차량이 있어 위험합니다.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
]

export default function DemoComplaintsPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
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

  // 필터링 로직
  const filteredComplaints = DEMO_COMPLAINTS_FULL.filter((complaint) => {
    const matchesSearch = complaint.title.includes(searchTerm) || 
                         complaint.complainantName.includes(searchTerm) ||
                         complaint.content.includes(searchTerm)
    const matchesStatus = !filterStatus || complaint.status === filterStatus
    return matchesSearch && matchesStatus
  })

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

  const priorityColors = {
    LOW: 'text-gray-600',
    MEDIUM: 'text-yellow-600',
    HIGH: 'text-orange-600',
    URGENT: 'text-red-600',
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <MobileNav userName={user.name} onLogout={handleLogout} />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                href="/dashboard/demo"
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">민원 관리 (데모)</h1>
            </div>
            <Link
              href="/complaints/demo/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              새 민원 등록
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        <div className="px-4 py-6 sm:px-0">
          {/* 필터 */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="search"
                  placeholder="민원 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gyeonggi-blue focus:border-gyeonggi-blue sm:text-sm"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gyeonggi-blue focus:border-gyeonggi-blue sm:text-sm rounded-md"
                >
                  <option value="">전체 상태</option>
                  <option value="RECEIVED">접수</option>
                  <option value="IN_PROGRESS">진행중</option>
                  <option value="PENDING">보류</option>
                  <option value="COMPLETED">완료</option>
                  <option value="REJECTED">반려</option>
                </select>
              </div>
            </div>
          </div>

          {/* 민원 목록 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <li key={complaint.id}>
                  <Link href={`/complaints/${complaint.id}/demo`}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gyeonggi-blue truncate">
                          {complaint.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[complaint.status as keyof typeof statusColors]}`}>
                            {statusLabels[complaint.status as keyof typeof statusLabels]}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <svg className={`h-5 w-5 ${priorityColors[complaint.priority as keyof typeof priorityColors]}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {complaint.complainantName}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z" clipRule="evenodd" />
                          </svg>
                          {new Date(complaint.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>{complaint.category}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 line-clamp-2">{complaint.content}</p>
                    </div>
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}