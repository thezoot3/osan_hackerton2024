'use client'
import InspectDetails from '@/app/service/inspect/prompt/InspectDetails'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ApiOrigin, UploadResponse } from '@/app/api'
import { InspectStore } from '@/app/service/inspect/InspectContext'
import { useRouter } from 'next/navigation'
import { Close } from '@mui/icons-material'
import PopUpImage, { usePopUpImage } from '@/app/components/PopUpImage'

export default function InspectResult() {
  const [garbageList, setList] = useState<Array<string> | null>(null)
  const { imageData } = useContext(InspectStore)
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [src, alt, appeared, clickToCloseHandler, clickToAppear] = usePopUpImage()
  useEffect(() => {
    if (!imageData) {
      router.push('/error/inspectImageNotFound')
    } else {
      prompt(URL.createObjectURL(imageData))
      setImageUrl(URL.createObjectURL(imageData))
    }
  }, [imageData, router])
  useEffect(() => {
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
    async function prompt(imageID: string) {
      fetch(ApiOrigin + '/inspect/prompt/' + imageID, { method: 'GET' }).then((res) =>
        res.json().then((r) => {
          const arr = new Set<string>(r.result)
          setList(Array.from(arr))
        }),
      )
    }
    if (imageData) {
      upload(imageData)
        .then((imageID) => {
          prompt(imageID).catch(() => {
            router.push('/error/anyError')
          })
        })
        .catch(() => {
          router.push('/error/anyError')
        })
    } else {
      router.push('/error/inspectImageNotFound')
    }
  }, [imageData, router])
  const gotoBack = useCallback(() => {
    router.push('/service/inspect')
  }, [router])
  return (
    <div className={'relative flex h-dvh w-full flex-col overflow-y-scroll px-8 py-24'}>
      <PopUpImage src={src} alt={alt} appeared={appeared} onClick={clickToCloseHandler} />
      <div className={'flex items-center justify-between'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-xl font-medium text-black'}>검사 결과</span>
          <span className={'text-sm font-light text-gray-500'}>다음과 같은 쓰레기를 찾았어요.</span>
        </div>
        <div className={'flex items-center gap-4'}>
          <div className={'h-12 w-12'}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={'origin image'}
              className={'h-full w-full rounded-lg'}
              onClick={clickToAppear(imageUrl, 'origin image')}
            />
          </div>
          <span className={'text-3xl font-normal'}>
            <Close fontSize={'inherit'} fontWeight={700} onClick={gotoBack} />
          </span>
        </div>
      </div>
      {garbageList ? (
        garbageList.length > 0 ? (
          garbageList.map((i) => {
            if (i) {
              return <InspectDetails garbageType={i} key={i} />
            }
            return null
          })
        ) : (
          <span className={'text-xl font-medium text-black'}>이미지에서 쓰레기 종류를 인식할 수 없습니다 😥</span>
        )
      ) : (
        <div className={'mt-3 h-96 w-full animate-pulse rounded-lg bg-gray-300'}></div>
      )}
    </div>
  )
}
