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
    const isMobile = new RegExp(/Mobile|Android|iPhone|iPad/).test(navigator.userAgent)
    if (!isMobile) {
      router.push('/desktop') // 데스크탑 버전 경로
    }
  }, [router])
  return (
    <div className="relative flex min-h-screen w-full flex-col px-8 pt-24">
      <div className={'z-10 flex flex-col gap-5'}>
        <div className={'flex flex-col gap-5 text-5xl font-bold'}>
          <span>찍고,</span>
          <span>확인하고,</span>
          <span>버리고</span>
        </div>
        <div className={'flex flex-col gap-1 text-lg font-semibold'}>
          <span>새로운 쓰레기 배출의 삼박자.</span>
          <span>내가 몰랐던 쓰레기의 모든 것</span>
        </div>
        <div className={'flex flex-col gap-2'}>
          <Link href={ServiceNavigationPath.SERVICE_INSPECT}>
            <div className={'flex h-8 w-20 items-center justify-center rounded-xl bg-blue-500'}>
              <span className={'text-sm font-medium text-white'}>시작하기</span>
            </div>
          </Link>
          <span className={'text-xs font-light text-gray-700'}>이 프로젝트는 GPL 2.0 라이선스로 배포되었습니다</span>
          <div className={'flex gap-3'}>
            <a href={'https://github.com/thezoot3/osan_hackerton2024/blob/master/third-party-licenses.txt'}>
              <span className={'text-xs font-normal text-blue-700'}>오픈소스 라이센스 고지</span>
            </a>
            <a href={'https://github.com/thezoot3/osan_hackerton2024'}>
              <span className={'text-xs font-normal text-blue-700'}>소스코드 살펴보기</span>
            </a>
          </div>
        </div>
      </div>
      <Image src={bgImage} alt={'asd'} width={500} height={500} className="absolute bottom-0 left-0 z-0 w-full"></Image>
    </div>
  )
}
