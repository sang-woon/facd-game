'use client'

import { useState, useEffect } from 'react'
import { isGoogleCalendarConfigured, getGoogleAuthUrl } from '@/lib/google/config'

interface GoogleCalendarSettingsProps {
  userId: string
}

export default function GoogleCalendarSettings({ userId }: GoogleCalendarSettingsProps) {
  const [isConfigured, setIsConfigured] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if Google Calendar is configured
    setIsConfigured(isGoogleCalendarConfigured())
    
    // Check if user has connected their Google account
    // TODO: Check from database if user has Google tokens
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('google_connected') === 'true') {
      setIsConnected(true)
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const handleGoogleConnect = () => {
    setLoading(true)
    // Redirect to Google OAuth
    window.location.href = getGoogleAuthUrl(userId)
  }

  const handleDisconnect = async () => {
    if (!confirm('정말로 구글 캘린더 연동을 해제하시겠습니까?')) {
      return
    }

    setLoading(true)
    try {
      // TODO: Implement disconnect logic
      // 1. Remove tokens from database
      // 2. Update UI state
      setIsConnected(false)
      alert('구글 캘린더 연동이 해제되었습니다.')
    } catch (error) {
      console.error('Failed to disconnect:', error)
      alert('연동 해제에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!isConfigured) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              구글 캘린더 설정 필요
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>구글 캘린더 연동을 사용하려면 먼저 관리자가 Google API 설정을 완료해야 합니다.</p>
              <p className="mt-1">필요한 환경 변수:</p>
              <ul className="list-disc list-inside mt-1">
                <li>GOOGLE_CLIENT_ID</li>
                <li>GOOGLE_CLIENT_SECRET</li>
                <li>GOOGLE_REDIRECT_URI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          구글 캘린더 연동
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>구글 캘린더와 연동하면 일정이 자동으로 동기화됩니다.</p>
        </div>
        <div className="mt-5">
          {isConnected ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-900">구글 캘린더가 연동되었습니다</span>
              </div>
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue disabled:opacity-50"
              >
                {loading ? '처리중...' : '연동 해제'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGoogleConnect}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue disabled:opacity-50"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? '연동중...' : '구글 캘린더 연동하기'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}