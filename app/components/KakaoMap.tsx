'use client'
import { Map as KMap, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import React, { forwardRef, ReactElement, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { useImmer } from 'use-immer'
import { enableMapSet } from 'immer'

export interface KakaoMapProps {
  centerCoordinates: {
    lat: number
    lng: number
  }
  zoomLevel: number
  markerOptimization: boolean
  autoMarkerMerge: boolean
}
export interface KakaoMapAddMarkerParam {
  id: number
  coordinate: { lat: number; lng: number }
  image?: { src: string; width: number; height: number }
}
export interface KakaoMapAddInfoWindowParam {
  id: number
  infoWindow: ReactElement
}
export interface KakaoMapMarkerData {
  coordinate: { lat: number; lng: number }
  image?: { src: string; width: number; height: number }
  infoWindow?: ReactElement
}
export interface KakaoMapRef {
  addMarker(markers: KakaoMapAddMarkerParam[]): void
  addMarkerInfoWindow(infoWindow: KakaoMapAddInfoWindowParam[]): void
}
export interface Coordinate {
  lat: number
  lng: number
}
const KakaoMap = forwardRef((props: KakaoMapProps, ref) => {
  useEffect(() => {
    enableMapSet()
  }, [])
  const [markers, setMarkers] = useImmer(new Map<number, KakaoMapMarkerData>())
  const [clickedMarker, setClickedMarker] = useState<number | null>()
  const [viewPoint, setViewPoint] = useState<{
    sw: Coordinate
    ne: Coordinate
  } | null>({ sw: { lng: -180, lat: -90 }, ne: { lng: 180, lat: 90 } })
  const isMarkerVisable = useCallback(
    (coordinate: Coordinate) => {
      if (viewPoint) {
        return (
          coordinate.lat >= viewPoint.sw.lat &&
          coordinate.lat <= viewPoint.ne.lat &&
          coordinate.lng >= viewPoint.sw.lng &&
          coordinate.lng <= viewPoint.ne.lng
        )
      }
      return false
    },
    [viewPoint],
  )
  function onAnyMove(map: kakao.maps.Map) {
    const bound = map.getBounds()
    setViewPoint({
      sw: {
        lat: bound.getSouthWest().getLat(),
        lng: bound.getSouthWest().getLng(),
      },
      ne: {
        lat: bound.getNorthEast().getLat(),
        lng: bound.getNorthEast().getLng(),
      },
    })
  }
  function onMarkerClickFactory(id: number) {
    return () => {
      setClickedMarker(id)
    }
  }
  useImperativeHandle(
    ref,
    () => ({
      addMarker(markers: KakaoMapAddMarkerParam[]) {
        setMarkers((prev) => {
          markers.forEach((marker) => {
            if (!prev.has(marker.id)) {
              prev.set(marker.id, {
                coordinate: marker.coordinate,
                image: marker.image || undefined,
              })
            }
            return
          })
          return prev
        })
      },
      addMarkerInfoWindow(infoWindows: KakaoMapAddInfoWindowParam[]) {
        setMarkers((prev) => {
          infoWindows.forEach((item) => {
            if (prev.has(item.id)) {
              //@ts-ignore
              prev.set(item.id, {
                ...prev.get(item.id),
                infoWindow: item.infoWindow,
              })
            }
            return
          })
          return prev
        })
      },
    }),
    [],
  )
  useEffect(() => {
    console.log(markers)
  }, [markers])
  return (
    <KMap
      center={props.centerCoordinates}
      style={{ width: '100%', height: '100dvh' }}
      level={props.zoomLevel}
      onZoomChanged={onAnyMove}
      onDragEnd={onAnyMove}
    >
      {Array.from(markers.keys()).map((id) => {
        const marker = markers.get(id)!
        /*console.log(
          isMarkerVisable(marker.coordinate),
          viewPoint,
          marker.coordinate,
        )*/
        if (isMarkerVisable(marker.coordinate)) {
          if (marker.infoWindow) {
            return (
              <MapMarker position={marker.coordinate} key={id} clickable={true} onClick={onMarkerClickFactory(id)}>
                {clickedMarker === id ? marker.infoWindow : null}
              </MapMarker>
            )
          } else {
            return <MapMarker position={marker.coordinate} key={id} />
          }
        }
      })}
    </KMap>
  )
})
KakaoMap.displayName = 'KakaoMap'
export default KakaoMap
