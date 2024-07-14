'use client'
import CameraCapture, { CameraCaptureRef } from '@/app/components/CameraCapture'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Cameraswitch, FileUpload, ImageSearchOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { ApiOrigin, UploadResponse } from '@/app/api'
import bgImage from '@/public/images/camera_load.svg'
export default function InspectCamera() {
  const cameraRef = useRef<CameraCaptureRef>({} as CameraCaptureRef)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])
  const reverseFacingMode = useCallback(() => {
    cameraRef.current.toggleFacingCamera()
  }, [cameraRef])
  const nav = useRouter()
  const captureImage = useCallback(() => {
    const image = cameraRef.current.captureImage(size.width, size.height)
    if (image) {
      fetch(image).then((res) => {
        res.blob().then((blob) => {
          upload(blob).then((r) => {
            nav.push('/service/inspect/' + r)
          })
        })
      })
    }
    async function upload(imageBlob: Blob) {
      const formData = new FormData()
      formData.append('image', imageBlob)
      try {
        const res = (await (
          await fetch(ApiOrigin + '/inspect/upload', { method: 'POST', body: formData })
        ).json()) as UploadResponse
        return res.imageID
      } catch (e) {
        throw e
      }
    }
  }, [nav, size.height, size.width])
  return (
    <div
      className={'h-full bg-gray-200'}
      style={{ backgroundPosition: 'center', backgroundImage: `url(${bgImage.src})`, backgroundRepeat: 'no-repeat' }}
    >
      <CameraCapture ref={cameraRef} />
      <div className={'absolute bottom-28 z-50 flex w-full items-center justify-center'}>
        <div className={'flex items-center gap-10'}>
          <div id={'btn'} className="rounded-[3rem] p-3.5">
            <FileUpload className="text-white" />
          </div>
          <div
            id="btn_border"
            className="flex items-center justify-center rounded-[5rem] bg-indigo-600 p-6 text-3xl shadow-2xl shadow-black"
          >
            <ImageSearchOutlined className="text-white" fontSize={'inherit'} onClick={captureImage} />
          </div>
          <div id={'btn'} className="rounded-[3rem] p-3.5">
            <Cameraswitch className="text-white" onClick={reverseFacingMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
