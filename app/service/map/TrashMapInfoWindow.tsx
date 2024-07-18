import { useEffect, useState } from 'react'
import { ApiOrigin } from '@/app/api'

interface SellerData {
  name: string
  oldAddress: string
  zipcode: number
  lat: number
  lng: number
  garbageBag: boolean
  garbageSticker: boolean
  address: string
}

export default function TrashMapInfoWindow({ name }: { name: string }) {
  const [info, setInfo] = useState<SellerData>()
  useEffect(() => {
    fetch(ApiOrigin + '/map/sellers/' + name).then((res) =>
      res.json().then((r: SellerData) => {
        setInfo(r)
      }),
    )
  }, [name])
  function onClick() {
    window.open('kakaomap://look?p=' + info?.lat + ',' + info?.lng, '_blank')
  }
  return (
    <div onClick={onClick} className={'flex w-full items-center justify-between px-3'}>
      <span className={'text-center text-sm'}>{info?.name}</span>
    </div>
  )
}
