import { createClient } from '@/lib/supabase/server'

interface ComplaintStatsProps {
  userId?: string
}

export default async function ComplaintStats({ userId }: ComplaintStatsProps) {
  if (!userId) return null
  
  const supabase = await createClient()
  
  // Get complaint statistics
  const { data: complaints } = await supabase
    .from('Complaint')
    .select('status')
    .eq('userId', userId)

  const stats = {
    total: complaints?.length || 0,
    received: complaints?.filter(c => c.status === 'RECEIVED').length || 0,
    inProgress: complaints?.filter(c => c.status === 'IN_PROGRESS').length || 0,
    completed: complaints?.filter(c => c.status === 'COMPLETED').length || 0,
  }

  const statItems = [
    { name: '전체 민원', value: stats.total, color: 'bg-blue-500' },
    { name: '접수 대기', value: stats.received, color: 'bg-yellow-500' },
    { name: '처리중', value: stats.inProgress, color: 'bg-indigo-500' },
    { name: '완료', value: stats.completed, color: 'bg-green-500' },
  ]

  return (
    <>
      {statItems.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.value}
            </dd>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${stats.total > 0 ? (item.value / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}