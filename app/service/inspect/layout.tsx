import { ReactNode } from 'react'
import InspectContext from '@/app/service/inspect/InspectContext'

export default function InspectLayout({ children }: { children: ReactNode }) {
  return <InspectContext>{children}</InspectContext>
}
