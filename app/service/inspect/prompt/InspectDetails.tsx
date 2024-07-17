import { Recycling } from '@mui/icons-material'
import './styles.css'
import { useEffect, useState } from 'react'
import { ApiOrigin, GarbageResponse } from '@/app/api'

const colorMap = {
  종이팩: '#29AB4A',
  유리병: '#F47921',
  금속캔: '#808285',
  '스프레이 캔': '#808285',
  플라스틱: '#015B9D',
  비닐: '#734B9E',
  종이: '#231F20',
  신문지: '#231F20',
  상자류: '#231F20',
  종이컵: '#231F20',
  책자: '#231F20',
}
type GarbageType =
  | '종이팩'
  | '유리병'
  | '금속캔'
  | '스프레이 캔'
  | '플라스틱'
  | '비닐'
  | '종이'
  | '신문지'
  | '상자류'
  | '종이컵'
  | '책자'
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
        <Recycling className={`text-xl`} style={{ color: colorMap[garbageType as GarbageType] }} fontSize={'inherit'} />
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
