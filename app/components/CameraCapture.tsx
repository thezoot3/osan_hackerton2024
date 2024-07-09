'use client'
import Webcam from 'react-webcam'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
export interface CameraCaptureRef {
  isInited: boolean
  captureImage: (width: number, height: number) => string | null
  toggleFacingCamera: () => void
}
const CameraCapture = forwardRef<CameraCaptureRef>((props, ref) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [facingMode, setFacing] = useState<'user' | 'environment'>(
    'environment',
  )
  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])
  useEffect(() => {}, [])
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
      screenshotFormat={'image/png'}
      videoConstraints={{
        aspectRatio: size.height / size.width,
        facingMode: facingMode,
        noiseSuppression: true,
      }}
    />
  )
})
CameraCapture.displayName = 'CameraCapture'
export default CameraCapture
