import { Box } from '@chakra-ui/react'
import { motion, MotionValue } from 'framer-motion'

const MotionBox = motion(Box)

interface HeroDecorationsProps {
  y1: MotionValue<string>
  y2: MotionValue<string>
}

export const HeroDecorations = ({ y1, y2 }: HeroDecorationsProps) => {
  return (
    <>
      <MotionBox
        position="absolute"
        top="20%"
        right="-5%"
        w="500px"
        h="500px"
        bg="brand.600"
        filter="blur(150px)"
        opacity={0.15}
        borderRadius="full"
        zIndex={0}
        style={{ y: y1 }}
      />
      <MotionBox
        position="absolute"
        bottom="-10%"
        left="10%"
        w="400px"
        h="400px"
        bg="gold.500"
        filter="blur(120px)"
        opacity={0.1}
        borderRadius="full"
        zIndex={0}
        style={{ y: y2 }}
      />
    </>
  )
}
