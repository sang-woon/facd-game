'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface ScheduleFormProps {
  userId: string
  complaints: any[]
}

export default function ScheduleForm({ userId, complaints }: ScheduleFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledAt: '',
    scheduledTime: '',
    location: '',
    complaintId: '',
    reminder: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Combine date and time
      const scheduledDateTime = new Date(`${formData.scheduledAt}T${formData.scheduledTime}`)
      
      const { error } = await supabase
        .from('Schedule')
        .insert({
          userId,
          title: formData.title,
          description: formData.description || null,
          scheduledAt: scheduledDateTime.toISOString(),
          location: formData.location || null,
          complaintId: formData.complaintId || null,
          reminder: formData.reminder,
        })

      if (error) throw error

      router.push('/schedules')
      router.refresh()
    } catch (error) {
      console.error('일정 등록 실패:', error)
      alert('일정 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          일정 제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
          placeholder="예: 김○○님 민원 현장 방문"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
            날짜 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="scheduledAt"
            id="scheduledAt"
            required
            value={formData.scheduledAt}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700">
            시간 <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="scheduledTime"
            id="scheduledTime"
            required
            value={formData.scheduledTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          장소
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
          placeholder="예: 경기도청 본관 3층 회의실"
        />
      </div>

      <div>
        <label htmlFor="complaintId" className="block text-sm font-medium text-gray-700">
          관련 민원
        </label>
        <select
          name="complaintId"
          id="complaintId"
          value={formData.complaintId}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
        >
          <option value="">선택하세요</option>
          {complaints.map((complaint) => (
            <option key={complaint.id} value={complaint.id}>
              {complaint.title} - {complaint.complainantName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          메모
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
          placeholder="일정에 대한 추가 정보를 입력하세요"
        />
      </div>

      <div className="flex items-center">
        <input
          id="reminder"
          name="reminder"
          type="checkbox"
          checked={formData.reminder}
          onChange={handleInputChange}
          className="h-4 w-4 text-gyeonggi-blue focus:ring-gyeonggi-blue border-gray-300 rounded"
        />
        <label htmlFor="reminder" className="ml-2 block text-sm text-gray-900">
          일정 알림 받기
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-gyeonggi-blue border border-transparent rounded-md hover:bg-gyeonggi-lightblue disabled:opacity-50"
        >
          {loading ? '등록중...' : '일정 등록'}
        </button>
      </div>
    </form>
  )
}