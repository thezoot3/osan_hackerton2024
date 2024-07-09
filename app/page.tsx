import Image from 'next/image'
import bgImage from '../public/images/background_image.png'
import { ServiceNavigationPath } from '@/app/navigation'
import Link from 'next/link'
export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-8 pt-24">
      <Image
        src={bgImage}
        alt={'asd'}
        width={500}
        height={500}
        className="absolute bottom-0 left-0 w-full"
      ></Image>
      <div className={'flex flex-col gap-5'}>
        <div className={'flex flex-col gap-5 text-6xl font-bold'}>
          <span>문구1,</span>
          <span>문구2,</span>
          <span>문구3</span>
        </div>
        <div className={'flex flex-col gap-1 text-xl font-semibold'}>
          <span>동해물과 백두산이 마르고 닳도록</span>
          <span>무궁화 삼천리 화려강산</span>
        </div>
        <div className={'flex flex-col gap-3'}>
          <Link href={ServiceNavigationPath.SERVICE_INSPECT}>
            <div
              className={
                'flex h-10 w-24 items-center justify-center rounded-xl bg-blue-500'
              }
            >
              <span className={'text-base font-medium text-white'}>
                시작하기
              </span>
            </div>
          </Link>
          <span className={'text-base font-medium text-blue-500'}>
            로그인하고 시작하기
          </span>
        </div>
      </div>
    </div>
  )
}
