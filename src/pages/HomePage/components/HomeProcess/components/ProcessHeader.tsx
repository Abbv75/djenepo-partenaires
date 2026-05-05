import { VStack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { headerVariants } from '../animations/variants'

const MotionVStack = motion(VStack)

export const ProcessHeader = () => {
  return (
    <MotionVStack
      spacing={4}
      textAlign="center"
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Text color="gold.400" fontWeight={700} fontSize="14px" textTransform="uppercase" letterSpacing="widest">
        Notre Méthodologie
      </Text>
      <Text
        as="h2"
        fontFamily="heading"
        fontWeight={800}
        fontSize={{ base: '32px', md: '42px' }}
        color="white"
        lineHeight={1.2}
      >
        Un accompagnement de bout en bout
      </Text>
    </MotionVStack>
  )
}
