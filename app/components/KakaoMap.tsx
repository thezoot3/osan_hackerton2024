'use client'
import { Map as KMap, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk'
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
  id: string
  coordinate: { lat: number; lng: number }
  image?: { src: string; width: number; height: number }
}
export interface KakaoMapAddInfoWindowParam {
  id: string
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
  moveToSpecificCoordinate(coor: Coordinate): void
}
export interface Coordinate {
  lat: number
  lng: number
}
const KakaoMap = forwardRef((props: KakaoMapProps, ref) => {
  useEffect(() => {
    enableMapSet()
  }, [])
  const [center, setCenter] = useState<Coordinate>(props.centerCoordinates)
  const [markers, setMarkers] = useImmer(new Map<string, KakaoMapMarkerData>())
  const [clickedMarker, setClickedMarker] = useState<string | null>()
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
  function onMarkerClickFactory(id: string) {
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
      moveToSpecificCoordinate(coor: Coordinate) {
        setCenter(coor)
      },
    }),
    [setMarkers],
  )
  return (
    <KMap
      center={center!}
      style={{ width: '100%', height: '100%' }}
      level={props.zoomLevel}
      onZoomChanged={onAnyMove}
      onDragEnd={onAnyMove}
    >
      <MapTypeControl position={'TOPRIGHT'} />
      {Array.from(markers.keys()).map((id, i) => {
        const marker = markers.get(id)!
        if (isMarkerVisable(marker.coordinate)) {
          if (marker.infoWindow) {
            return (
              <MapMarker
                zIndex={-10}
                position={marker.coordinate}
                key={id + i}
                clickable={true}
                onClick={onMarkerClickFactory(id)}
                image={{
                  src: marker.image?.src || '',
                  size: { width: marker.image?.width || 0, height: marker.image?.height || 0 },
                }}
              >
                {clickedMarker === id ? marker.infoWindow : null}
              </MapMarker>
            )
          } else {
            return (
              <MapMarker
                zIndex={-10}
                position={marker.coordinate}
                key={id}
                image={{
                  src: marker.image?.src || '',
                  size: { width: marker.image?.width || 0, height: marker.image?.height || 0 },
                }}
              ></MapMarker>
            )
          }
        }
      })}
    </KMap>
  )
})
KakaoMap.displayName = 'KakaoMap'
export default KakaoMap
