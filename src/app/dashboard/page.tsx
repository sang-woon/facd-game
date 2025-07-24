import { requireAuth } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/server'
import ComplaintStats from '@/components/dashboard/ComplaintStats'
import RecentComplaints from '@/components/dashboard/RecentComplaints'
import TodaySchedule from '@/components/dashboard/TodaySchedule'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default async function DashboardPage() {
  const user = await requireAuth()
  const supabase = await createClient()

  // Get user details from database
  const { data: userData } = await supabase
    .from('User')
    .select('*')
    .eq('email', user.email)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName={userData?.name || user.email} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <ComplaintStats userId={userData?.id} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Recent Complaints */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                최근 민원
              </h3>
              <RecentComplaints userId={userData?.id} />
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                오늘의 일정
              </h3>
              <TodaySchedule userId={userData?.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}