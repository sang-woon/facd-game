import { requireAuth } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/server'
import ScheduleForm from '@/components/schedules/ScheduleForm'
import Link from 'next/link'

export default async function NewSchedulePage() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: userData } = await supabase
    .from('User')
    .select('*')
    .eq('email', user.email)
    .single()

  const { data: complaints } = await supabase
    .from('Complaint')
    .select('id, title, complainantName')
    .eq('userId', userData?.id)
    .neq('status', 'COMPLETED')
    .order('createdAt', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link
                href="/schedules"
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">새 일정 추가</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ScheduleForm 
              userId={userData?.id!} 
              complaints={complaints || []}
            />
          </div>
        </div>
      </main>
    </div>
  )
}