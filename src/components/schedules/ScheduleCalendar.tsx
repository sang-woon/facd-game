'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

interface ScheduleCalendarProps {
  userId?: string
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function ScheduleCalendar({ userId }: ScheduleCalendarProps) {
  const [date, setDate] = useState<Value>(new Date())
  const [schedules, setSchedules] = useState<any[]>([])
  const [selectedDateSchedules, setSelectedDateSchedules] = useState<any[]>([])
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      fetchSchedules()
    }
  }, [userId])

  useEffect(() => {
    if (date instanceof Date) {
      const daySchedules = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.scheduledAt)
        return scheduleDate.toDateString() === date.toDateString()
      })
      setSelectedDateSchedules(daySchedules)
    }
  }, [date, schedules])

  const fetchSchedules = async () => {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const endOfMonth = new Date()
    endOfMonth.setMonth(endOfMonth.getMonth() + 1)
    endOfMonth.setDate(0)
    endOfMonth.setHours(23, 59, 59, 999)

    const { data } = await supabase
      .from('Schedule')
      .select(`
        *,
        complaint:Complaint(title, complainantName)
      `)
      .eq('userId', userId)
      .gte('scheduledAt', startOfMonth.toISOString())
      .lte('scheduledAt', endOfMonth.toISOString())
      .order('scheduledAt')

    if (data) {
      setSchedules(data)
    }
  }

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const daySchedules = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.scheduledAt)
        return scheduleDate.toDateString() === date.toDateString()
      })
      
      if (daySchedules.length > 0) {
        return (
          <div className="flex justify-center items-center">
            <div className="w-2 h-2 bg-gyeonggi-blue rounded-full"></div>
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white shadow rounded-lg p-6">
          <style jsx global>{`
            .react-calendar {
              width: 100%;
              border: none;
              font-family: inherit;
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
          `}</style>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            locale="ko-KR"
          />
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white shadow rounded-lg p-6">
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
                <li 
                  key={schedule.id} 
                  className="border-l-4 border-gyeonggi-blue pl-3 cursor-pointer hover:bg-gray-50 py-2 -my-2 rounded"
                  onClick={() => router.push(`/schedules/${schedule.id}/edit`)}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(schedule.scheduledAt).toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} - {schedule.title}
                  </div>
                  {schedule.location && (
                    <div className="text-sm text-gray-500">📍 {schedule.location}</div>
                  )}
                  {schedule.complaint && (
                    <div className="text-sm text-gray-500">
                      민원: {schedule.complaint.title}
                    </div>
                  )}
                  {schedule.description && (
                    <div className="text-sm text-gray-600 mt-1">{schedule.description}</div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">클릭하여 수정</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}