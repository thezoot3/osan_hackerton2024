import './styles.css'
import InspectCamera from '@/app/service/inspect/InspectCamera'
export default function Inspect() {
  return (
    <div className="relative h-dvh w-full shadow-inner shadow-black">
      <InspectCamera />
    </div>
  )
}
