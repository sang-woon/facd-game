'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'

// 데모 데이터
const DEMO_COMPLAINTS = [
  {
    id: '1',
    title: '도로 포장 요청',
    complainantName: '홍길동',
    status: 'RECEIVED',
    category: '도로/교통',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '가로등 고장 신고',
    complainantName: '김민수',
    status: 'IN_PROGRESS',
    category: '안전/재난',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: '공원 시설 개선 요청',
    complainantName: '이영희',
    status: 'COMPLETED',
    category: '환경/위생',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
]

const DEMO_SCHEDULES = [
  {
    id: '1',
    title: '도로 포장 현장 확인',
    scheduledAt: new Date(Date.now() + 3600000).toISOString(),
    location: '수원시 팔달구 인계동',
  },
  {
    id: '2',
    title: '주민 간담회',
    scheduledAt: new Date(Date.now() + 7200000).toISOString(),
    location: '경기도청 북부청사',
  },
]

export default function DemoDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // localStorage에서 데모 사용자 정보 가져오기
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

  const stats = {
    total: DEMO_COMPLAINTS.length,
    received: DEMO_COMPLAINTS.filter(c => c.status === 'RECEIVED').length,
    inProgress: DEMO_COMPLAINTS.filter(c => c.status === 'IN_PROGRESS').length,
    completed: DEMO_COMPLAINTS.filter(c => c.status === 'COMPLETED').length,
  }

  const statusColors = {
    RECEIVED: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
  }

  const statusLabels = {
    RECEIVED: '접수',
    IN_PROGRESS: '진행중',
    COMPLETED: '완료',
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Mobile Navigation */}
      <MobileNav userName={user.name} onLogout={handleLogout} />
      
      {/* Desktop Header */}
      <header className="hidden md:block bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <h1 className="text-2xl font-bold text-gyeonggi-blue">
                경기도의원 민원관리 시스템 (데모)
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <Link
                href="/dashboard/demo"
                className="text-base font-medium text-gray-900"
              >
                대시보드
              </Link>
              <Link
                href="/complaints/demo"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                민원관리
              </Link>
              <Link
                href="/schedules/demo"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                일정관리
              </Link>
            </nav>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <span className="text-base font-medium text-gray-500 mr-4">
                {user.name}님 ({user.district})
              </span>
              <button
                onClick={handleLogout}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        {/* 데모 안내 */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            📌 데모 모드로 실행 중입니다. 표시되는 데이터는 샘플 데이터이며 실제로 저장되지 않습니다.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">전체 민원</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">접수 대기</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.received}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">처리중</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.inProgress}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">완료</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.completed}</dd>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-4 lg:gap-5 lg:grid-cols-2">
          {/* Recent Complaints */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">최근 민원</h3>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {DEMO_COMPLAINTS.map((complaint) => (
                    <li key={complaint.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {complaint.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {complaint.complainantName} · {new Date(complaint.createdAt).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[complaint.status as keyof typeof statusColors]}`}>
                            {statusLabels[complaint.status as keyof typeof statusLabels]}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">오늘의 일정</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {DEMO_SCHEDULES.map((schedule, idx) => (
                    <li key={schedule.id}>
                      <div className="relative pb-8">
                        {idx !== DEMO_SCHEDULES.length - 1 && (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gyeonggi-blue flex items-center justify-center ring-8 ring-white">
                              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{schedule.title}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(schedule.scheduledAt).toLocaleTimeString('ko-KR', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })} · {schedule.location}
                              </p>
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
        </div>
      </main>
    </div>
  )
}