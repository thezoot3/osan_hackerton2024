import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/app/navigation/Header'
import Script from 'next/script'
import React from 'react'
import { enableMapSet } from 'immer'

const pretendard = localFont({ src: '../public/font/PretendardVariable.woff2' })
export const metadata: Metadata = {
  title: '대충 서비스 이름',
  description: '대충 서비스 설명',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOMAPS_APIKEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={pretendard.className}>
        <nav>
          <Header />
        </nav>
        <div className="min-h-screen w-full">{children}</div>
      </body>
    </html>
  )
}
