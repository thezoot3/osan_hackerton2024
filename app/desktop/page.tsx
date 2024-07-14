'use client'
import { BlockOutlined } from '@mui/icons-material'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    const isMobile = new RegExp(/Mobile|Android|iPhone/).test(navigator.userAgent)
    if (isMobile) {
      router.push('/')
    }
  }, [])
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <BlockOutlined fontSize={'inherit'} className={'text-6xl'} />
      <span className={'text-2xl font-semibold'}>모바일 전용 서비스입니다</span>
      <span className={'text-lg font-medium text-gray-600'}>안드로이드, iOS 스마트폰에서 접속해주세요!</span>
    </div>
  )
}
