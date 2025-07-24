'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 임시 하드코딩 계정 정보
const DEMO_ACCOUNTS = [
  {
    email: 'kim@test.com',
    password: 'demo1234',
    name: '김의원',
    district: '수원시 제1선거구',
    role: 'COUNCILOR'
  },
  {
    email: 'lee@test.com', 
    password: 'demo1234',
    name: '이의원',
    district: '성남시 제2선거구',
    role: 'COUNCILOR'
  },
  {
    email: 'park@test.com',
    password: 'demo1234',
    name: '박의원',
    district: '고양시 제3선거구',
    role: 'COUNCILOR'
  }
]

export default function DemoLoginPage() {
  const [selectedAccount, setSelectedAccount] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDemoLogin = async () => {
    setLoading(true)
    
    // 임시로 localStorage에 사용자 정보 저장
    const demoUser = DEMO_ACCOUNTS[selectedAccount]
    localStorage.setItem('demoUser', JSON.stringify({
      id: `demo-${selectedAccount + 1}`,
      email: demoUser.email,
      name: demoUser.name,
      district: demoUser.district,
      role: demoUser.role
    }))
    
    // 대시보드로 이동
    setTimeout(() => {
      router.push('/dashboard/demo')
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            경기도의원 민원관리 시스템
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            데모 계정으로 체험하기
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ 이것은 데모 버전입니다. 실제 데이터는 저장되지 않습니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">테스트 계정 선택</h3>
            
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((account, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAccount === index
                      ? 'border-gyeonggi-blue bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="demo-account"
                    value={index}
                    checked={selectedAccount === index}
                    onChange={() => setSelectedAccount(index)}
                    className="h-4 w-4 text-gyeonggi-blue focus:ring-gyeonggi-blue"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {account.name} ({account.district})
                    </p>
                    <p className="text-sm text-gray-500">
                      {account.email} / 비밀번호: {account.password}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gyeonggi-blue hover:bg-gyeonggi-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gyeonggi-blue disabled:opacity-50"
            >
              {loading ? '로그인 중...' : '데모 계정으로 로그인'}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/auth/login"
              className="text-sm text-gyeonggi-blue hover:text-gyeonggi-lightblue"
            >
              실제 계정으로 로그인 →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}