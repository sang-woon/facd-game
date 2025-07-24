'use client'

import { signOut } from '@/lib/auth/actions'
import Link from 'next/link'

interface DashboardHeaderProps {
  userName: string
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h1 className="text-2xl font-bold text-gyeonggi-blue">
              경기도의원 민원관리 시스템
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/dashboard"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              대시보드
            </Link>
            <Link
              href="/complaints"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              민원관리
            </Link>
            <Link
              href="/schedules"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              일정관리
            </Link>
            <Link
              href="/reports"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              보고서
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <span className="text-base font-medium text-gray-500 mr-4">
              {userName}님
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}