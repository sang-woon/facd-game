'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { uploadFile } from '@/lib/storage/upload'
import { analyzeComplaintWithAI } from '@/lib/openai/analyze'

interface ComplaintFormProps {
  userId: string
  departments: any[]
}

export default function ComplaintForm({ userId, departments }: ComplaintFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [aiAnalyzing, setAiAnalyzing] = useState(false)
  const [formData, setFormData] = useState({
    complainantName: '',
    complainantPhone: '',
    complainantEmail: '',
    title: '',
    content: '',
    category: '',
    department: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [aiSuggestion, setAiSuggestion] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const analyzeContent = async () => {
    if (!formData.content) return
    
    setAiAnalyzing(true)
    try {
      const analysis = await analyzeComplaintWithAI(formData.content, departments)
      setAiSuggestion(analysis)
      
      // Auto-fill department if suggested
      if (analysis.suggestedDepartment) {
        setFormData(prev => ({ ...prev, department: analysis.suggestedDepartment || '' }))
      }
    } catch (error) {
      console.error('AI 분석 실패:', error)
    } finally {
      setAiAnalyzing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create complaint
      const { data: complaint, error } = await supabase
        .from('Complaint')
        .insert({
          userId,
          ...formData,
          aiSummary: aiSuggestion?.summary,
          aiKeywords: aiSuggestion?.keywords || [],
          aiSentiment: aiSuggestion?.sentiment,
          aiDepartment: aiSuggestion?.suggestedDepartment,
        })
        .select()
        .single()

      if (error) throw error

      // Upload files if any
      if (files.length > 0 && complaint) {
        for (const file of files) {
          const uploadResult = await uploadFile(file, userId, complaint.id)
          if (!uploadResult.error) {
            await supabase.from('Attachment').insert({
              complaintId: complaint.id,
              fileName: file.name,
              fileUrl: uploadResult.url,
              fileSize: file.size,
              mimeType: file.type,
            })
          }
        }
      }

      router.push('/complaints')
      router.refresh()
    } catch (error) {
      console.error('민원 등록 실패:', error)
      alert('민원 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 민원인 정보 */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">민원인 정보</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="complainantName" className="block text-sm font-medium text-gray-700">
              성명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="complainantName"
              id="complainantName"
              required
              value={formData.complainantName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="complainantPhone" className="block text-sm font-medium text-gray-700">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="complainantPhone"
              id="complainantPhone"
              required
              value={formData.complainantPhone}
              onChange={handleInputChange}
              placeholder="010-0000-0000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="complainantEmail" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              name="complainantEmail"
              id="complainantEmail"
              value={formData.complainantEmail}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* 민원 내용 */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">민원 내용</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              분류 <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              id="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            >
              <option value="">선택하세요</option>
              <option value="도로/교통">도로/교통</option>
              <option value="환경/위생">환경/위생</option>
              <option value="복지/보건">복지/보건</option>
              <option value="교육/문화">교육/문화</option>
              <option value="경제/일자리">경제/일자리</option>
              <option value="안전/재난">안전/재난</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              id="content"
              rows={5}
              required
              value={formData.content}
              onChange={handleInputChange}
              onBlur={analyzeContent}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            />
            {aiAnalyzing && (
              <p className="mt-2 text-sm text-gray-500">AI가 민원 내용을 분석중입니다...</p>
            )}
          </div>

          {aiSuggestion && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">AI 분석 결과</h4>
              <p className="text-sm text-blue-700 mb-2">{aiSuggestion.summary}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {aiSuggestion.keywords.map((keyword: string, index: number) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {keyword}
                  </span>
                ))}
              </div>
              {aiSuggestion.sentiment && (
                <p className="text-sm text-blue-700">
                  감정 상태: {aiSuggestion.sentiment === 'positive' ? '긍정적' : aiSuggestion.sentiment === 'negative' ? '부정적' : '중립적'}
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              담당 부서
            </label>
            <select
              name="department"
              id="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gyeonggi-blue focus:ring-gyeonggi-blue sm:text-sm"
            >
              <option value="">선택하세요</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 첨부 파일 */}
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">
          첨부 파일
        </label>
        <input
          type="file"
          name="files"
          id="files"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gyeonggi-blue file:text-white hover:file:bg-gyeonggi-lightblue"
        />
        <p className="mt-1 text-sm text-gray-500">최대 10MB까지 업로드 가능합니다.</p>
      </div>

      {/* 제출 버튼 */}
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
          {loading ? '등록중...' : '민원 등록'}
        </button>
      </div>
    </form>
  )
}