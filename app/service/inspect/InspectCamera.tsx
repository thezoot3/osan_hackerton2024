'use client'
import CameraCapture, { CameraCaptureRef } from '@/app/components/CameraCapture'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import {
  Cameraswitch,
  FileUpload,
  ImageSearchOutlined,
} from '@mui/icons-material'

export default function InspectCamera() {
  const cameraRef = useRef<CameraCaptureRef>({} as CameraCaptureRef)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])
  const reverseFacingMode = useCallback(() => {
    cameraRef.current.toggleFacingCamera()
  }, [cameraRef])
  const captureImage = useCallback(() => {
    const image = cameraRef.current.captureImage(size.width, size.height)
    let a = document.createElement('a') //Create <a>
    a.href = image || ''
    a.download = 'Image.png' //File name Here
    a.click()
  }, [size.height, size.width])
  return (
    <Fragment>
      <CameraCapture ref={cameraRef} />
      <div
        className={
          'absolute bottom-28 z-30 flex w-full items-center justify-center px-20'
        }
      >
        <div className={'flex w-full items-center justify-between'}>
          <div id={'btn'} className="rounded-[3rem] p-3">
            <FileUpload className="text-white" />
          </div>
          <div
            id="btn_border"
            className="flex items-center justify-center rounded-[6rem] bg-indigo-600 p-6 text-3xl shadow-2xl shadow-black"
          >
            <ImageSearchOutlined
              className="text-white"
              fontSize={'inherit'}
              onClick={captureImage}
            />
          </div>
          <div id={'btn'} className="rounded-[3rem] p-3">
            <Cameraswitch className="text-white" onClick={reverseFacingMode} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
