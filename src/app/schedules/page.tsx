import { requireAuth } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ScheduleCalendar from '@/components/schedules/ScheduleCalendar'

export default async function SchedulesPage() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: userData } = await supabase
    .from('User')
    .select('*')
    .eq('email', user.email)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">일정 관리</h1>
            <Link
              href="/schedules/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              새 일정 추가
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <ScheduleCalendar userId={userData?.id} />
        </div>
      </main>
    </div>
  )
}