import { useEffect, useState } from 'react'
import { useMotionValue, useSpring, useAnimation } from 'framer-motion'

export const useCursor = () => {
  const [isHovered, setIsHovered] = useState(false)
  const rippleControls = useAnimation()
  
  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for the follower
  const springConfig = { damping: 25, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      
      setIsHovered(!!isClickable)
    }

    const handleMouseDown = () => {
      rippleControls.start({
        scale: [1, 2.5],
        opacity: [0.5, 0],
        transition: { duration: 0.5, ease: "easeOut" }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [mouseX, mouseY, rippleControls])

  return {
    mouseX,
    mouseY,
    smoothX,
    smoothY,
    isHovered,
    rippleControls
  }
}
