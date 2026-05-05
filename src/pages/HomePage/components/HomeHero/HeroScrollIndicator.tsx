import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const HeroScrollIndicator = () => {
  return (
    <Box
      position="absolute"
      bottom="40px"
      left="50%"
      transform="translateX(-50%)"
      zIndex={1}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Box w="24px" h="40px" border="2px solid" borderColor="whiteAlpha.400" borderRadius="full" position="relative">
          <Box w="2px" h="8px" bg="gold.400" position="absolute" top="8px" left="50%" transform="translateX(-50%)" borderRadius="full" />
        </Box>
      </motion.div>
    </Box>
  )
}
