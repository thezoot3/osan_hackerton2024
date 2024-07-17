'use client'
import { useRouter } from 'next/navigation'
import Errors from '../errors'
import { useCallback } from 'react'
export default function Page({ params }: { params: { errorID: string } }) {
  const router = useRouter()
  const errorPage = Errors[params.errorID] || Errors.anyError
  const moveTo = useCallback(() => {
    router.push(errorPage.backSrc)
  }, [errorPage, router])
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      {errorPage.icon ? <errorPage.icon fontSize={'inherit'} className={'text-6xl'} /> : null}
      <span className={'text-xl font-semibold'}>{errorPage.title}</span>
      {errorPage.subtitle?.map((item, index) => {
        return (
          <span className={'text-base font-medium text-gray-600'} key={'errorSubtitle' + index}>
            {item}
          </span>
        )
      })}
      <div
        className={'flex items-center justify-center rounded-lg bg-blue-500 px-6 py-2 text-base text-white'}
        onClick={moveTo}
      >
        뒤로 가기
      </div>
    </div>
  )
}
