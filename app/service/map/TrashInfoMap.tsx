'use client'
import KakaoMap, { KakaoMapAddInfoWindowParam, KakaoMapAddMarkerParam, KakaoMapRef } from '@/app/components/KakaoMap'
import { useEffect, useRef } from 'react'
import { number } from 'prop-types'
import TrashMapInfoWindow from '@/app/service/map/TrashMapInfoWindow'
import { ApiOrigin } from '@/app/api'
import ClothMapInfoWindow from '@/app/service/map/ClothMapInfoWindow'
interface AbstractTrashInfoMap {
  name: string
  lat: number
  lng: number
}
interface AbstractClothInfoMap {
  name: string
  lat: number
  lng: number
}
export default function TrashInfoMap() {
  const mapRef = useRef<KakaoMapRef>()
  useEffect(() => {
    async function getTrashData() {
      const data: AbstractTrashInfoMap[] = await (await fetch(ApiOrigin + '/map/sellers/abstract')).json()
      const returnArray: KakaoMapAddMarkerParam[] = []
      data.forEach((r) => {
        returnArray.push({
          id: r.name,
          coordinate: { lat: r.lat, lng: r.lng },
          image: {
            src: 'https://raw.githubusercontent.com/thezoot3/osan_hackerton2024/master/public/images/store.png',
            width: 40,
            height: 40,
          },
        })
      })
      return returnArray
    }
    async function getClothData() {
      const data: AbstractClothInfoMap[] = await (await fetch(ApiOrigin + '/map/cloth/abstract')).json()
      const returnArray: KakaoMapAddMarkerParam[] = []
      data.forEach((r) => {
        returnArray.push({
          id: r.name,
          coordinate: { lat: r.lat, lng: r.lng },
          image: {
            src: 'https://raw.githubusercontent.com/thezoot3/osan_hackerton2024/master/public/images/cloth.png',
            width: 40,
            height: 40,
          },
        })
      })
      return returnArray
    }
    getTrashData().then((r) => {
      mapRef.current?.addMarker(r)
      const infoWindow: KakaoMapAddInfoWindowParam[] = r.map((r) => {
        return {
          id: r.id,
          infoWindow: <TrashMapInfoWindow name={r.id} key={r.id} />,
        }
      })
      mapRef.current?.addMarkerInfoWindow(infoWindow)
      getClothData().then((r) => {
        mapRef.current?.addMarker(r)
        const infoWindow: KakaoMapAddInfoWindowParam[] = r.map((r) => {
          return {
            id: r.id,
            infoWindow: <ClothMapInfoWindow name={r.id} lng={r.coordinate.lng} lat={r.coordinate.lat} key={r.id} />,
          }
        })
        mapRef.current?.addMarkerInfoWindow(infoWindow)
      })
    })
  }, [mapRef])
  return (
    <KakaoMap
      autoMarkerMerge={true}
      markerOptimization={true}
      ref={mapRef}
      centerCoordinates={{ lng: 127.077238, lat: 37.149754 }}
      zoomLevel={5}
    />
  )
}
