import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const ConnectorLine = () => {
  return (
    <Box
      position="absolute"
      top="40px"
      left="10%"
      right="10%"
      h="2px"
      zIndex={0}
      display={{ base: 'none', lg: 'block' }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
          originX: 0
        }}
      />
    </Box>
  )
}
