'use client'
import KakaoMap, {
  Coordinate,
  KakaoMapAddInfoWindowParam,
  KakaoMapAddMarkerParam,
  KakaoMapRef,
} from '@/app/components/KakaoMap'
import { useEffect, useRef, useState } from 'react'
import TrashMapInfoWindow from '@/app/service/map/TrashMapInfoWindow'
import { ApiOrigin } from '@/app/api'
import ClothMapInfoWindow from '@/app/service/map/ClothMapInfoWindow'
import { GpsFixed } from '@mui/icons-material'
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
  const [location, setLocation] = useState<Coordinate>()
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
            width: 35,
            height: 35,
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
            width: 35,
            height: 35,
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
  function getLocation() {
    navigator.geolocation.getCurrentPosition((data) => {
      mapRef.current?.moveToSpecificCoordinate({ lat: data.coords.latitude, lng: data.coords.longitude })
    })
  }
  return (
    <div className={'relative h-full w-full'}>
      <KakaoMap
        autoMarkerMerge={true}
        markerOptimization={true}
        ref={mapRef}
        centerCoordinates={{ lng: 127.077238, lat: 37.149754 }}
        zoomLevel={5}
      />
      <div className={'absolute bottom-3 right-3 z-50 rounded bg-gray-200 p-3 drop-shadow'} onClick={getLocation}>
        <GpsFixed />
      </div>
    </div>
  )
}
