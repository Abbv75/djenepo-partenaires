import { Box } from '@chakra-ui/react'
import { motion, MotionValue } from 'framer-motion'

const MotionBox = motion(Box)

interface HeroBackgroundProps {
  y: MotionValue<string>
}

export const HeroBackground = ({ y }: HeroBackgroundProps) => {
  return (
    <MotionBox
      position="absolute"
      top="-20%"
      left={0}
      right={0}
      bottom="-20%"
      zIndex={0}
      backgroundImage="url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
      backgroundSize="cover"
      backgroundPosition="center"
      style={{ y }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(to right, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.7) 50%, rgba(10, 15, 30, 0.4) 100%)"
      />
    </MotionBox>
  )
}
