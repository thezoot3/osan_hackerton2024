import CameraCapture from '@/app/ui/CameraCapture'
import './styles.css'
import {
  Cameraswitch,
  FlashlightOff,
  ImageSearchOutlined,
} from '@mui/icons-material'
export default function Inspect() {
  return (
    <div className="relative min-h-dvh w-full shadow-inner shadow-black">
      <CameraCapture />
      <div
        className={
          'absolute bottom-28 z-30 flex w-full items-center justify-center px-20'
        }
      >
        <div className={'flex w-full items-center justify-between'}>
          <div id={'btn'} className="rounded-[3rem] p-3">
            <FlashlightOff className="text-white" />
          </div>
          <div
            id="btn_border"
            className="flex items-center justify-center rounded-[6rem] bg-indigo-600 p-6 text-3xl shadow-2xl shadow-black"
          >
            <ImageSearchOutlined className="text-white" fontSize={'inherit'} />
          </div>
          <div id={'btn'} className="rounded-[3rem] p-3">
            <Cameraswitch className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
