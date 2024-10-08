'use client'
import { HistoryOutlined, ImageSearchOutlined, MapOutlined, SettingsOutlined } from '@mui/icons-material'
import { ServiceNavigationDisplay, ServiceNavigationPath } from '@/app/navigation'
import React, { Fragment, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import './styles.css'
import Link from 'next/link'
export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    const isMobile = new RegExp(/Mobile|Android|iPhone|iPad/).test(navigator.userAgent)
    if (!isMobile) {
      router.push('/desktop') // 데스크탑 버전 경로
    }
  }, [router])
  return (
    <Fragment>
      <div className={'relative flex h-full w-full flex-col'}>
        {children}
        <div className="absolute bottom-0 z-50 flex w-full">
          <div id="shadow_top" className="flex w-full justify-between bg-white">
            {Object.keys(ServiceNavigationPath).map((item) => {
              //@ts-ignore
              return pathname === ServiceNavigationPath[item] ? (
                <Link
                  //@ts-ignore
                  href={ServiceNavigationPath[item]}
                  key={item}
                  className={'w-full'}
                >
                  <div
                    className="flex w-full flex-col items-center justify-center gap-1 bg-indigo-600 py-3 shadow-inner"
                    key={item}
                  >
                    <div className={'text-lg text-white'}>
                      {item === 'SERVICE_INSPECT' ? (
                        <ImageSearchOutlined />
                      ) : item === 'SERVICE_MAP' ? (
                        <MapOutlined />
                      ) : item === 'SERVICE_HISTORY' ? (
                        <HistoryOutlined />
                      ) : item === 'SERVICE_SETTING' ? (
                        <SettingsOutlined />
                      ) : null}
                    </div>

                    <span className="text-xs font-normal text-white">
                      {
                        ServiceNavigationDisplay[
                          //@ts-ignore
                          ServiceNavigationPath[item]
                        ]
                      }
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  //@ts-ignore
                  href={ServiceNavigationPath[item]}
                  key={item}
                  className={'w-full'}
                >
                  <div className="flex w-full flex-col items-center justify-center gap-1 py-3" key={item}>
                    {item === 'SERVICE_INSPECT' ? (
                      <ImageSearchOutlined />
                    ) : item === 'SERVICE_MAP' ? (
                      <MapOutlined />
                    ) : item === 'SERVICE_HISTORY' ? (
                      <HistoryOutlined />
                    ) : item === 'SERVICE_SETTING' ? (
                      <SettingsOutlined />
                    ) : null}
                    <span className="text-xs font-normal">
                      {
                        ServiceNavigationDisplay[
                          //@ts-ignore
                          ServiceNavigationPath[item]
                        ]
                      }
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
