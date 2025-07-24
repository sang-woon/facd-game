'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// 데모 일정 데이터
const DEMO_SCHEDULES = [
  {
    id: '1',
    title: '도로 포장 현장 확인',
    description: '인계동 주민센터 앞 도로 파손 현황 확인',
    scheduledAt: new Date(2024, 0, 26, 14, 0).toISOString(),
    location: '수원시 팔달구 인계동',
    complaintTitle: '도로 포장 요청',
    reminder: true,
  },
  {
    id: '2',
    title: '주민 간담회',
    description: '지역 현안 논의 및 민원 청취',
    scheduledAt: new Date(2024, 0, 26, 16, 0).toISOString(),
    location: '경기도청 북부청사',
    complaintTitle: null,
    reminder: true,
  },
  {
    id: '3',
    title: '가로등 점검',
    description: '영통구 청명로 가로등 고장 확인',
    scheduledAt: new Date(2024, 0, 27, 10, 0).toISOString(),
    location: '수원시 영통구 청명로',
    complaintTitle: '가로등 고장 신고',
    reminder: true,
  },
  {
    id: '4',
    title: '복지관 방문',
    description: '노인복지 프로그램 현황 점검',
    scheduledAt: new Date(2024, 0, 28, 14, 0).toISOString(),
    location: '수원시 노인복지관',
    complaintTitle: null,
    reminder: false,
  },
]

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function SchedulesDemoPage() {
  const [user, setUser] = useState<any>(null)
  const [date, setDate] = useState<Value>(new Date(2024, 0, 26))
  const [selectedDateSchedules, setSelectedDateSchedules] = useState<typeof DEMO_SCHEDULES>([])
  const [showNewScheduleForm, setShowNewScheduleForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const demoUser = localStorage.getItem('demoUser')
    if (!demoUser) {
      router.push('/auth/demo')
      return
    }
    setUser(JSON.parse(demoUser))
  }, [router])

  useEffect(() => {
    if (date instanceof Date) {
      const daySchedules = DEMO_SCHEDULES.filter(schedule => {
        const scheduleDate = new Date(schedule.scheduledAt)
        return scheduleDate.toDateString() === date.toDateString()
      })
      setSelectedDateSchedules(daySchedules)
    }
  }, [date])

  const handleLogout = () => {
    localStorage.removeItem('demoUser')
    router.push('/auth/demo')
  }

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const daySchedules = DEMO_SCHEDULES.filter(schedule => {
        const scheduleDate = new Date(schedule.scheduledAt)
        return scheduleDate.toDateString() === date.toDateString()
      })
      
      if (daySchedules.length > 0) {
        return (
          <div className="flex justify-center items-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gyeonggi-blue rounded-full"></div>
          </div>
        )
      }
    }
    return null
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">일정 관리 (데모)</h1>
            </div>
            <button
              onClick={() => setShowNewScheduleForm(true)}
              className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue"
            >
              <svg className="-ml-1 mr-2 h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">새 일정 추가</span>
              <span className="sm:hidden">추가</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* 캘린더 */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-4 md:p-6">
              <style jsx global>{`
                .react-calendar {
                  width: 100%;
                  border: none;
                  font-family: inherit;
                }
                .react-calendar__tile {
                  height: 60px;
                }
                .react-calendar__tile--active {
                  background: #003E7E;
                }
                .react-calendar__tile--active:enabled:hover,
                .react-calendar__tile--active:enabled:focus {
                  background: #0066CC;
                }
                .react-calendar__tile--now {
                  background: #f3f4f6;
                }
                @media (max-width: 640px) {
                  .react-calendar__tile {
                    height: 45px;
                    font-size: 0.875rem;
                  }
                  .react-calendar__navigation button {
                    font-size: 1rem;
                  }
                }
              `}</style>
              <Calendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                locale="ko-KR"
              />
            </div>
          </div>

          {/* 선택된 날짜의 일정 */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-4 md:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {date instanceof Date && date.toLocaleDateString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} 일정
              </h3>
              
              {selectedDateSchedules.length === 0 ? (
                <p className="text-gray-500 text-sm">이 날짜에 일정이 없습니다.</p>
              ) : (
                <ul className="space-y-3">
                  {selectedDateSchedules.map((schedule) => (
                    <li key={schedule.id} className="border-l-4 border-gyeonggi-blue pl-3">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(schedule.scheduledAt).toLocaleTimeString('ko-KR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} - {schedule.title}
                      </div>
                      {schedule.location && (
                        <div className="text-sm text-gray-500">📍 {schedule.location}</div>
                      )}
                      {schedule.complaintTitle && (
                        <div className="text-sm text-gray-500">
                          민원: {schedule.complaintTitle}
                        </div>
                      )}
                      {schedule.description && (
                        <div className="text-sm text-gray-600 mt-1">{schedule.description}</div>
                      )}
                      {schedule.reminder && (
                        <div className="text-xs text-blue-600 mt-1">🔔 알림 설정됨</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 구글 캘린더 연동 안내 */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                📅 구글 캘린더 연동 (예정)
              </h4>
              <p className="text-sm text-blue-700">
                향후 구글 캘린더와 연동하여 일정을 자동으로 동기화할 수 있습니다.
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                연동 설정하기 →
              </button>
            </div>
          </div>
        </div>

        {/* 새 일정 추가 모달 */}
        {showNewScheduleForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowNewScheduleForm(false)} />
              
              <div className="relative bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">새 일정 추가</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">제목</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                      placeholder="일정 제목"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">날짜</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">시간</label>
                      <input
                        type="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">장소</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                      placeholder="일정 장소"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">메모</label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
                      placeholder="메모 사항"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-gyeonggi-blue focus:ring-gyeonggi-blue border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      알림 설정
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewScheduleForm(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert('데모 모드에서는 실제로 저장되지 않습니다.')
                        setShowNewScheduleForm(false)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-gyeonggi-blue border border-transparent rounded-md hover:bg-gyeonggi-lightblue"
                    >
                      저장
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}