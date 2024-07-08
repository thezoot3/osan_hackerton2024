import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/app/navigation/Header'

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
            <body className={pretendard.className}>
                <nav>
                    <Header />
                </nav>
                {children}
            </body>
        </html>
    )
}
