'use client'
import Webcam from 'react-webcam'
import { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
export interface CameraCaptureRef {
  isInited: boolean
  captureImage: (width: number, height: number) => string | null
  toggleFacingCamera: () => void
}
const CameraCapture = forwardRef<CameraCaptureRef>((props, ref) => {
  const webcamRef = useRef<Webcam>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [facingMode, setFacing] = useState<'user' | 'environment' | undefined>('environment')
  let isVertical = true
  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])
  useEffect(() => {
    if (size.height > size.width) {
      isVertical = true
    } else {
      isVertical = false
    }
  }, [size.height, size.width])
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
        return prev === 'environment' ? 'user' : 'environment'
      })
    },
  }))

  return (
    <Fragment>
      <Webcam
        width={isVertical ? size.width : undefined}
        height={!isVertical ? size.height : undefined}
        ref={webcamRef}
        mirrored={facingMode === 'user'}
        screenshotFormat={'image/webp'}
        screenshotQuality={0.5}
        videoConstraints={{ aspectRatio: size.height / size.width, facingMode: facingMode }}
        style={{ overflow: 'hidden', objectFit: 'cover' }}
      />
    </Fragment>
  )
})
CameraCapture.displayName = 'CameraCapture'
export default CameraCapture
