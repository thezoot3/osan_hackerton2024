import { Recycling, Star } from '@mui/icons-material'
import './styles.css'
import { useEffect, useState } from 'react'
import { ApiOrigin, GarbageResponse } from '@/app/api'
export default function InspectDetails({ garbageType }: { garbageType: string }) {
  const [details, setDetails] = useState<GarbageResponse>()
  useEffect(() => {
    fetch(ApiOrigin + '/inspect/items/' + garbageType, { method: 'GET' }).then((res) =>
      res.json().then((r: GarbageResponse) => {
        setDetails(r)
      }),
    )
  }, [garbageType])
  return (
    <div className={'flex w-full flex-col py-4'}>
      <div className={'flex items-center gap-2'}>
        <Recycling className={'text-xl text-lime-500'} fontSize={'inherit'} />
        <span className={'text-xl font-medium text-black'}>{garbageType}</span>
      </div>
      <div className={'flex flex-col gap-2'}>
        <span className={'text-sm font-normal text-gray-500'}>PET, PVC, PE, PP, PS, PSP 재질 등의 용기/트레이 류</span>
        <ul>
          {Object.keys(details?.instruct || {}).map((i) => {
            return (
              <li className={'text-lg font-medium'} key={i}>
                {details?.instruct[i]}
                <ul className="break-keep pl-5 text-sm font-normal">
                  {details?.instruct[i].map((r) => {
                    return <li key={i + r}>r</li>
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
        <div className="flex w-full items-center gap-3 rounded-sm bg-gray-200 p-3">
          <div className={'flex h-full items-start'}>
            <span className={'text-lg'}>⭐</span>
          </div>
          <span className={'text-sm font-normal text-black'}>가나다라마바나산ㅇㄹㅇ나라</span>
        </div>
      </div>
    </div>
  )
}
