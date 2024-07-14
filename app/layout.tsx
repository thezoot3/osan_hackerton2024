import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from './navigation/Header'
import React from 'react'

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
        <meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;" />
      </head>
      <body className={pretendard.className}>
        <nav>
          <Header />
        </nav>
        <div className="h-dvh w-full">{children}</div>
      </body>
    </html>
  )
}
