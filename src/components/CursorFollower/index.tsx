import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCursor } from './hooks/useCursor'

const MotionBox = motion(Box)

export const CursorFollower = () => {
  const { mouseX, mouseY, smoothX, smoothY, isHovered, rippleControls } = useCursor()

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      pointerEvents="none"
      zIndex={9999}
      display={{ base: 'none', lg: 'block' }}
    >
      {/* Ripple Effect (Dispersion) */}
      <MotionBox
        position="absolute"
        w="40px"
        h="40px"
        border="2px solid"
        borderColor="brand.400"
        borderRadius="full"
        initial={{ scale: 1, opacity: 0 }}
        animate={rippleControls}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Small dot */}
      <MotionBox
        position="absolute"
        w="6px"
        h="6px"
        bg="brand.500"
        borderRadius="full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Larger circle following with delay */}
      <MotionBox
        position="absolute"
        w={isHovered ? '60px' : '30px'}
        h={isHovered ? '60px' : '30px'}
        border="1px solid"
        borderColor="brand.400"
        borderRadius="full"
        bg={isHovered ? 'brand.400' : 'transparent'}
        opacity={isHovered ? 0.2 : 0.4}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 150,
        }}
      />
    </Box>
  )
}
