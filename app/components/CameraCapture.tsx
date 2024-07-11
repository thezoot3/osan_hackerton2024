'use client'
import Webcam from 'react-webcam'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
export interface CameraCaptureRef {
  isInited: boolean
  captureImage: (width: number, height: number) => string | null
  toggleFacingCamera: () => void
}
const CameraCapture = forwardRef<CameraCaptureRef>((props, ref) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [facingMode, setFacing] = useState<'user' | 'environment'>('environment')
  const [videoC, setVideoC] = useState<{}>()
  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])
  useEffect(() => {
    if (size.height > size.width) {
      setVideoC({
        width: size.width,
      })
    } else {
      setVideoC({
        height: size.height,
      })
    }
  }, [])
  useImperativeHandle(ref, () => ({
    isInited: Boolean(webcamRef.current),
    captureImage: (width: number, height: number): string | null => {
      if (webcamRef.current) {
        return webcamRef.current.getScreenshot({ width, height })
      } else {
        throw new Error('component not inited')
      }
    },
    toggleFacingCamera: () => {
      setFacing((prev) => {
        return prev === 'user' ? 'environment' : 'user'
      })
    },
  }))
  const webcamRef = useRef<Webcam>(null)
  return (
    <Webcam
      width={size.width}
      height={size.height}
      ref={webcamRef}
      mirrored={facingMode === 'user'}
      screenshotFormat={'image/jpeg'}
      videoConstraints={{ ...videoC, aspectRatio: size.height / size.width, facingMode: facingMode }}
      style={{ overflow: 'hidden', objectFit: 'cover' }}
    />
  )
})
CameraCapture.displayName = 'CameraCapture'
export default CameraCapture
