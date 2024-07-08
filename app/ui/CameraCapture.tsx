'use client'
import Webcam from 'react-webcam'
import { useEffect, useState } from 'react'

export default function CameraCapture() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])
  return (
    <Webcam
      width={size.width}
      height={size.height}
      videoConstraints={{
        aspectRatio: size.height / size.width,
        facingMode: 'environment',
      }}
    />
  )
}
