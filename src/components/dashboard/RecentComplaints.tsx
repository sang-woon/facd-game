import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface RecentComplaintsProps {
  userId?: string
}

export default async function RecentComplaints({ userId }: RecentComplaintsProps) {
  if (!userId) return <p className="text-gray-500">민원 데이터를 불러올 수 없습니다.</p>
  
  const supabase = await createClient()
  
  const { data: complaints } = await supabase
    .from('Complaint')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })
    .limit(5)

  if (!complaints || complaints.length === 0) {
    return <p className="text-gray-500">등록된 민원이 없습니다.</p>
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

  return (
    <div className="flow-root">
      <ul className="-my-5 divide-y divide-gray-200">
        {complaints.map((complaint) => (
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
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[complaint.status]}`}>
                  {statusLabels[complaint.status]}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href="/complaints"
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          전체 보기
        </Link>
      </div>
    </div>
  )
}