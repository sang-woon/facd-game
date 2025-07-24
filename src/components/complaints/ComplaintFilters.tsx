'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ComplaintFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')

  const updateFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    
    const queryString = params.toString()
    router.push(`/complaints${queryString ? `?${queryString}` : ''}`)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters()
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gyeonggi-blue focus:border-gyeonggi-blue sm:text-sm"
              placeholder="민원 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="sm:w-48">
          <label htmlFor="status" className="sr-only">
            상태 필터
          </label>
          <select
            id="status"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gyeonggi-blue focus:border-gyeonggi-blue sm:text-sm rounded-md"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              updateFilters()
            }}
          >
            <option value="">전체 상태</option>
            <option value="RECEIVED">접수</option>
            <option value="IN_PROGRESS">진행중</option>
            <option value="PENDING">보류</option>
            <option value="COMPLETED">완료</option>
            <option value="REJECTED">반려</option>
          </select>
        </div>
      </div>
    </div>
  )
}