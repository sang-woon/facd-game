import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface TodayScheduleProps {
  userId?: string
}

export default async function TodaySchedule({ userId }: TodayScheduleProps) {
  if (!userId) return <p className="text-gray-500">일정을 불러올 수 없습니다.</p>
  
  const supabase = await createClient()
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { data: schedules } = await supabase
    .from('Schedule')
    .select(`
      *,
      complaint:Complaint(title, complainantName)
    `)
    .eq('userId', userId)
    .gte('scheduledAt', today.toISOString())
    .lt('scheduledAt', tomorrow.toISOString())
    .order('scheduledAt', { ascending: true })

  if (!schedules || schedules.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">오늘 예정된 일정이 없습니다.</p>
        <Link
          href="/schedules/new"
          className="text-gyeonggi-blue hover:text-gyeonggi-lightblue font-medium"
        >
          일정 추가하기
        </Link>
      </div>
    )
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {schedules.map((schedule, scheduleIdx) => (
          <li key={schedule.id}>
            <div className="relative pb-8">
              {scheduleIdx !== schedules.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
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
                    <p className="text-sm font-medium text-gray-900">
                      {schedule.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(schedule.scheduledAt).toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                      {schedule.location && ` · ${schedule.location}`}
                    </p>
                  </div>
                  {schedule.complaint && (
                    <div className="mt-1 text-sm text-gray-600">
                      민원: {schedule.complaint.title} ({schedule.complaint.complainantName})
                    </div>
                  )}
                  {schedule.description && (
                    <div className="mt-1 text-sm text-gray-600">
                      {schedule.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}