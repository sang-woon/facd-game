import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProvider from '@/components/providers/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '경기도의원 민원관리 시스템',
  description: '경기도의원을 위한 스마트 민원 관리 플랫폼',
  keywords: '경기도, 민원관리, 도의원, 행정',
  authors: [{ name: '경기도의회' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#003E7E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}