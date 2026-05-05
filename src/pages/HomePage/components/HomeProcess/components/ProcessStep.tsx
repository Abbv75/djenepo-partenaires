import { Box, VStack, Circle, Icon, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { itemVariants } from '../animations/variants'

const MotionBox = motion(Box)

interface ProcessStepProps {
  step: {
    icon: any
    title: string
    desc: string
  }
  index: number
}

export const ProcessStep = ({ step, index }: ProcessStepProps) => {
  return (
    <MotionBox
      variants={itemVariants}
      zIndex={1}
    >
      <VStack spacing={6} align={{ base: 'center', md: 'flex-start' }} textAlign={{ base: 'center', md: 'left' }}>
        <Circle
          size="80px"
          bg="white"
          color="brand.600"
          boxShadow="0 10px 25px rgba(0,0,0,0.2)"
          fontSize="30px"
          position="relative"
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.1) rotate(5deg)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
          }}
        >
          <Icon as={step.icon} />
          <Box
            position="absolute"
            top="-10px"
            right="-10px"
            bg="gold.400"
            color="white"
            w="30px"
            h="30px"
            borderRadius="full"
            fontSize="14px"
            fontWeight={800}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="3px solid"
            borderColor="brand.600"
          >
            {index + 1}
          </Box>
        </Circle>
        <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3}>
          <Text color="white" fontWeight={800} fontSize="20px">
            {step.title}
          </Text>
          <Text color="brand.100" fontSize="15px" lineHeight={1.7}>
            {step.desc}
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  )
}
