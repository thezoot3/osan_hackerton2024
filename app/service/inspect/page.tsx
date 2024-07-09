import './styles.css'
import InspectCamera from '@/app/service/inspect/InspectCamera'
export default function Inspect() {
  return (
    <div className="relative min-h-dvh w-full shadow-inner shadow-black">
      <InspectCamera />
    </div>
  )
}
