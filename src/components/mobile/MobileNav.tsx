'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MobileNavProps {
  userName: string
  onLogout: () => void
}

export default function MobileNav({ userName, onLogout }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard/demo', label: '대시보드', icon: '🏠' },
    { href: '/complaints/demo', label: '민원관리', icon: '📋' },
    { href: '/schedules/demo', label: '일정관리', icon: '📅' },
    { href: '/reports/demo', label: '보고서', icon: '📊' },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      {/* 모바일 헤더 */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <h1 className="ml-3 text-lg font-bold text-gyeonggi-blue">민원관리</h1>
            </div>
            <span className="text-sm text-gray-600">{userName}</span>
          </div>
        </div>

        {/* 모바일 사이드바 */}
        <div className={`fixed inset-0 z-40 flex ${isOpen ? '' : 'pointer-events-none'}`}>
          <div
            className={`fixed inset-0 bg-black transition-opacity ${
              isOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition-transform transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="px-4">
                <nav className="mt-5 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center px-3 py-3 text-base font-medium rounded-md ${
                        isActive(item.href)
                          ? 'bg-gyeonggi-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={onLogout}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700">로그아웃</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 text-xs ${
                isActive(item.href)
                  ? 'text-gyeonggi-blue'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}