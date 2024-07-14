'use client'
import { RecyclingOutlined } from '@mui/icons-material'
import { usePathname } from 'next/navigation'
import { HomeNavigationPath, ServiceNavigationPath } from '@/app/navigation/index'
import Link from 'next/link'

export default function Header() {
  const pathname = usePathname()
  return (
    <div className="absolute top-0 z-50 flex w-full items-center justify-between px-6 py-6">
      <div className={`flex items-center ${pathname === ServiceNavigationPath.SERVICE_INSPECT ? 'text-white' : ''}`}>
        <Link href={HomeNavigationPath.HOME_ROOT}>
          <div className={'flex items-center gap-4 py-1'}>
            <RecyclingOutlined className="text-2xl" />
            <span className={'text-lg font-semibold'}>오산 스마트 쓰레기</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
