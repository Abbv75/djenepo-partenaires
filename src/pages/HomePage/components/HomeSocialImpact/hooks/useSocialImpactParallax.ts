import { useRef } from 'react'
import { useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export const useSocialImpactParallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const yScrollImage = useTransform(scrollYProgress, [0, 1], [0, -50])
  const yScrollCard = useTransform(scrollYProgress, [0, 1], [0, -120])

  // Mouse Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const xMouseImage = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15])
  const yMouseImage = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15])

  const xMouseCard = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30])
  const yMouseCard = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30])

  // Combined Transforms
  const finalYImage = useTransform(
    [yScrollImage, yMouseImage],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  )
  const finalYCard = useTransform(
    [yScrollCard, yMouseCard],
    ([scroll, mouse]) => (scroll as number) + (mouse as number)
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return {
    sectionRef,
    finalYImage,
    finalYCard,
    xMouseImage,
    xMouseCard,
    handleMouseMove,
    handleMouseLeave
  }
}
