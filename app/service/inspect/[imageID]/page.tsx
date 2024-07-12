'use client'
import InspectDetails from '@/app/service/inspect/[imageID]/InspectDetails'
import { useEffect, useState } from 'react'
import { ApiOrigin } from '@/app/api'

export default function InspectResult({ params }: { params: { imageID: string } }) {
  const [garbageList, setList] = useState<Array<string>>([])
  useEffect(() => {
    fetch(ApiOrigin + '/inspect/prompt/' + params.imageID, { method: 'GET' }).then((res) =>
      res.json().then((r) => {
        const arr = new Set<string>(r.result)
        setList(Array.from(arr))
      }),
    )
  }, [params.imageID])
  return (
    <div className={'flex h-dvh w-full flex-col overflow-y-scroll px-8 py-24'}>
      <span className={'text-2xl font-semibold text-black'}>검사 결과</span>
      <span className={'text-sm font-light text-gray-500'}>다음과 같은 쓰레기를 찾았어요.</span>
      {garbageList.length > 0 ? (
        garbageList.map((i) => {
          return <InspectDetails garbageType={i} key={i} />
        })
      ) : (
        <div className={'mt-3 h-96 w-full animate-pulse rounded-lg bg-gray-300'}></div>
      )}
    </div>
  )
}
