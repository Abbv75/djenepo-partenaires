import { Box, Image, Text } from '@chakra-ui/react'
import { motion, MotionValue } from 'framer-motion'

const MotionBox = motion(Box)

interface ImpactMediaProps {
  finalYImage: MotionValue<number>
  xMouseImage: MotionValue<number>
  finalYCard: MotionValue<number>
  xMouseCard: MotionValue<number>
}

export const ImpactMedia = ({ finalYImage, xMouseImage, finalYCard, xMouseCard }: ImpactMediaProps) => {
  return (
    <Box position="relative">
      <MotionBox
        style={{ 
          y: finalYImage,
          x: xMouseImage,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        borderRadius="30px"
        overflow="hidden"
        boxShadow="0 25px 50px rgba(0,0,0,0.1)"
      >
        <Image
          src="/map-intervention.png"
          alt="Zones d'intervention DJENEPO Partners en Afrique de l'Ouest"
        />
      </MotionBox>

      <MotionBox
        style={{ 
          y: finalYCard,
          x: xMouseCard,
        }}
        position="absolute"
        bottom="-40px"
        right="-20px"
        bg="gold.400"
        p={8}
        borderRadius="30px"
        boxShadow="0 20px 40px rgba(212, 175, 55, 0.3)"
        display={{ base: 'none', md: 'block' }}
        maxW="300px"
        zIndex={2}
      >
        <Text color="white" fontWeight={700} fontSize="18px" lineHeight={1.4}>
          "Notre présence locale garantit une compréhension fine des enjeux du terrain."
        </Text>
      </MotionBox>
    </Box>
  )
}
