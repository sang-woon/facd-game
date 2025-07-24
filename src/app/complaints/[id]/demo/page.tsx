'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'

// Demo data
const demoComplaints: Record<string, any> = {
  '1': {
    id: 1,
    title: '불법 주차 문제 해결 요청',
    content: '우리 동네 주택가에 불법 주차가 심각합니다. 특히 소방도로에 주차된 차량들 때문에 긴급 상황 시 대응이 어려울 것 같아 걱정됩니다. 단속을 강화해주시거나 주차 공간을 확충해주시면 좋겠습니다.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    category: '교통/주차',
    complainantName: '김민수',
    complainantPhone: '010-1234-5678',
    createdAt: new Date().toISOString(),
    department: { name: '교통과' },
    aiSummary: '주택가 불법 주차로 인한 소방도로 차단 문제 제기 및 단속 강화 요청',
    aiKeywords: ['불법주차', '소방도로', '주차단속', '주차공간'],
    aiSentiment: 'NEGATIVE',
    aiAnalysis: true,
  },
  '2': {
    id: 2,
    title: '공원 시설 개선 건의',
    content: '어린이 놀이터 시설이 너무 낡아서 아이들이 다칠 위험이 있습니다. 그네와 미끄럼틀의 안전 점검과 교체가 필요합니다.',
    status: 'RECEIVED',
    priority: 'MEDIUM',
    category: '공원/환경',
    complainantName: '이영희',
    complainantPhone: '010-2345-6789',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    department: { name: '공원녹지과' },
    aiSummary: '어린이 놀이터 노후 시설 안전 문제 및 교체 요청',
    aiKeywords: ['놀이터', '안전', '시설교체', '어린이'],
    aiSentiment: 'NEGATIVE',
    aiAnalysis: true,
  },
}

interface PageProps {
  params: { id: string }
}

export default function ComplaintDetailDemoPage({ params }: PageProps) {
  const complaint = demoComplaints[params.id]

  if (!complaint) {
    return notFound()
  }

  const statusColors: Record<string, string> = {
    RECEIVED: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    PENDING: 'bg-gray-100 text-gray-800',
    COMPLETED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  }

  const statusLabels: Record<string, string> = {
    RECEIVED: '접수',
    IN_PROGRESS: '진행중',
    PENDING: '보류',
    COMPLETED: '완료',
    REJECTED: '반려',
  }

  const priorityColors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  }

  const priorityLabels: Record<string, string> = {
    LOW: '낮음',
    MEDIUM: '보통',
    HIGH: '높음',
    URGENT: '긴급',
  }

  const sentimentColors: Record<string, string> = {
    POSITIVE: 'text-green-600',
    NEUTRAL: 'text-gray-600',
    NEGATIVE: 'text-red-600',
  }

  const sentimentLabels: Record<string, string> = {
    POSITIVE: '긍정적',
    NEUTRAL: '중립적',
    NEGATIVE: '부정적',
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">민원 상세 (데모)</h1>
            <Link
              href="/complaints/demo"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              목록으로
            </Link>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{complaint.title}</h3>
              <div className="mt-2 flex items-center space-x-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[complaint.status]}`}>
                  {statusLabels[complaint.status]}
                </span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[complaint.priority]}`}>
                  우선순위: {priorityLabels[complaint.priority]}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">민원인</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {complaint.complainantName} ({complaint.complainantPhone})
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">카테고리</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{complaint.category}</dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">담당 부서</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {complaint.department?.name || '미지정'}
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">접수일</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(complaint.createdAt).toLocaleString('ko-KR')}
                  </dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">민원 내용</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
                    {complaint.content}
                  </dd>
                </div>
                
                {complaint.aiAnalysis && (
                  <>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">AI 요약</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {complaint.aiSummary}
                      </dd>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">키워드</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div className="flex flex-wrap gap-2">
                          {complaint.aiKeywords?.map((keyword: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gyeonggi-blue text-white"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </dd>
                    </div>
                    
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">감정 분석</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                        <span className={`font-medium ${sentimentColors[complaint.aiSentiment]}`}>
                          {sentimentLabels[complaint.aiSentiment]}
                        </span>
                      </dd>
                    </div>
                  </>
                )}
                
                {complaint.attachments && complaint.attachments.length > 0 && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">첨부 파일</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {complaint.attachments.map((attachment: any, index: number) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                
                {complaint.resolution && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">처리 결과</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
                      {complaint.resolution}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>데모 모드:</strong> 이것은 데모 데이터입니다. 실제 시스템에서는 데이터베이스에서 민원 정보를 불러옵니다.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}