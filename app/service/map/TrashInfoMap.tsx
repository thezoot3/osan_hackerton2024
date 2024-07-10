'use client'
import KakaoMap, { KakaoMapRef } from '@/app/components/KakaoMap'
import { useEffect, useRef } from 'react'

export default function TrashInfoMap() {
  const mapRef = useRef<KakaoMapRef>()
  useEffect(() => {
    const ar = []
    const ar2 = []
    for (let i = 0; i < 200; i++) {
      ar.push({
        id: i,
        coordinate: {
          lng: 127.075171 + (Math.random() - 1) * 0.1,
          lat: 37.149711 + (Math.random() - 1) * 0.1,
        },
      })
      ar2.push({
        id: i,
        infoWindow: <div>{i}</div>,
      })
    }
    mapRef.current?.addMarker(ar)
    mapRef.current?.addMarkerInfoWindow(ar2)
  }, [mapRef])
  return (
    <KakaoMap
      autoMarkerMerge={true}
      markerOptimization={true}
      ref={mapRef}
      centerCoordinates={{ lng: 127.077238, lat: 37.149754 }}
      zoomLevel={6}
    />
  )
}
