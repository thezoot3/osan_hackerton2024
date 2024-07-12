import { Recycling } from '@mui/icons-material'
import './styles.css'
import { useEffect, useState } from 'react'
import { ApiOrigin, GarbageResponse } from '@/app/api'
export default function InspectDetails({ garbageType }: { garbageType: string }) {
  const [details, setDetails] = useState<GarbageResponse>()
  useEffect(() => {
    fetch(ApiOrigin + '/inspect/item/' + garbageType, { method: 'GET' }).then((res) =>
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
        <span className={'text-sm font-normal text-gray-500'}>{details?.items.join(', ')}</span>
        <ul>
          {Object.keys(details?.instruct || {}).map((i) => {
            return (
              <li className={'text-lg font-medium'} key={i}>
                {i}
                <ul className="break-keep pl-5 text-sm font-normal">
                  {details?.instruct[i].map((r, index) => {
                    return <li key={i + index}>{r}</li>
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
