'use client'
import Webcam from 'react-webcam'

export default function CameraCapture() {
  return (
    <Webcam
      width={window.innerWidth}
      height={window.innerHeight}
      videoConstraints={{
        aspectRatio: window.innerHeight / window.innerWidth,
        facingMode: 'environment',
      }}
    />
  )
}
