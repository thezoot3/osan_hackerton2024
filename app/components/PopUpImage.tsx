import popUp from './popUpImage.module.css'
import { animated, useSpring } from '@react-spring/web'
import { SpringValues } from '@react-spring/web'
import { useEffect, useState } from 'react'
function PopUpImage({
  src,
  alt,
  appeared,
  spring,
  onClick,
}: {
  src: string
  alt: string
  appeared: boolean
  spring?: SpringValues
  onClick: () => void
}) {
  const popUpImgSpring = useSpring({
    from: {
      opacity: 0,
      y: '10%',
    },
    to: {
      opacity: 1,
      y: '0',
    },
    reverse: !appeared,
  })
  const popUpTextSpring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  })
  useEffect(() => {
    if (appeared) {
      popUpImgSpring.opacity.start()
      popUpImgSpring.y.start()
      popUpTextSpring.opacity.start()
    }
  }, [appeared, popUpImgSpring, popUpTextSpring])
  return (
    <div className={popUp.popImageWrapper} style={{ display: appeared ? 'flex' : 'none' }}>
      <animated.img src={src} alt={alt} style={{ ...(spring || popUpImgSpring) }} />
      <animated.span style={{ ...popUpTextSpring }}>{alt}</animated.span>
      <div className={popUp.popImageBackground} onClick={onClick} />
    </div>
  )
}
function usePopUpImage(): [string, string, boolean, () => void, (src: string, alt: string) => () => void] {
  const clickToCloseHandler = () => {
    setAppeared(false)
  }
  const clickToAppear = (src: string, alt: string) => {
    return () => {
      setAppeared((prev) => !prev)
      setSrc(src)
      setAlt(alt)
    }
  }
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')
  const [appeared, setAppeared] = useState(false)
  return [src, alt, appeared, clickToCloseHandler, clickToAppear]
}
export default PopUpImage
export { usePopUpImage }
