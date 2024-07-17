'use client'
import React, { createContext, useState } from 'react'
interface InspectContextType {
  imageData: Blob | undefined
  setImageData: (imageData: Blob) => void
}
export const InspectStore = createContext<InspectContextType>({ imageData: undefined, setImageData: () => {} })
export default function InspectContext({ children }: { children: React.ReactNode }) {
  const [imageData, setImageData] = useState<Blob | undefined>(undefined)
  return <InspectStore.Provider value={{ imageData, setImageData }}>{children}</InspectStore.Provider>
}
