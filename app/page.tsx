'use client'
import Image from 'next/image'
import bgImage from '../public/images/background_image.png'
import { ServiceNavigationPath } from '@/app/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const isMobile = new RegExp(/Mobile|Android|iPhone/).test(navigator.userAgent)
    if (!isMobile) {
      router.push('/desktop') // 데스크탑 버전 경로
    }
  }, [])

  return (
    <div className="relative flex min-h-screen w-full flex-col px-8 pt-24">
      <div className={'z-10 flex flex-col gap-5'}>
        <div className={'flex flex-col gap-5 text-5xl font-bold'}>
          <span>찍고,</span>
          <span>확인하고,</span>
          <span>버리고</span>
        </div>
        <div className={'flex flex-col gap-1 text-lg font-semibold'}>
          <span>새로운 쓰래기 배출의 삼박자.</span>
          <span>내가 몰랐던 쓰래기의 모든 것</span>
        </div>
        <div className={'flex flex-col gap-3'}>
          <Link href={ServiceNavigationPath.SERVICE_INSPECT}>
            <div className={'flex h-8 w-20 items-center justify-center rounded-xl bg-blue-500'}>
              <span className={'text-sm font-medium text-white'}>시작하기</span>
            </div>
          </Link>
        </div>
      </div>
      <Image src={bgImage} alt={'asd'} width={500} height={500} className="absolute bottom-0 left-0 z-0 w-full"></Image>
    </div>
  )
}
