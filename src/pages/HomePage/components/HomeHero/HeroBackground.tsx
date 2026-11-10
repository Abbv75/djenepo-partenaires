import { Box } from '@chakra-ui/react'
import { motion, MotionValue } from 'framer-motion'
import { GridBackground } from '../../../../components/reactbits'

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
      {/* Superposition sombre élégante */}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(135deg, rgba(11, 19, 41, 0.96) 0%, rgba(13, 27, 62, 0.88) 50%, rgba(11, 19, 41, 0.75) 100%)"
      />

      {/* ReactBits Grid Pattern avec fondu radial */}
      <GridBackground color="rgba(255, 255, 255, 0.07)" size={36} opacity={0.8} />
    </MotionBox>
  )
}
