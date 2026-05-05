import { VStack, HStack, Box, Badge, Text, Button, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { CONTACT_INFO } from '../../../../constant/contact'

const MotionBox = motion(Box)
const MotionText = motion(Text)

export const HeroMainContent = () => {
  return (
    <VStack align="flex-start" spacing={7}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge
          bg="whiteAlpha.200"
          color="gold.400"
          px={4}
          py={1.5}
          borderRadius="full"
          fontSize="13px"
          fontWeight={600}
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.300"
          display="inline-flex"
          alignItems="center"
          gap={2}
        >
          <Box w="6px" h="6px" borderRadius="full" bg="gold.400" />
          Basé à {CONTACT_INFO.address.city}
        </Badge>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Text
          as="h1"
          fontFamily="heading"
          fontWeight={800}
          fontSize={{ base: '38px', md: '56px', lg: '64px' }}
          lineHeight={1.1}
          color="white"
        >
          Expertise locale pour un{' '}
          <Text as="span" display="block" color="gold.400">
            impact durable
          </Text>
        </Text>
      </MotionBox>

      <MotionText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        fontSize={{ base: '17px', md: '19px' }}
        color="gray.300"
        lineHeight={1.8}
        maxW="600px"
      >
        DJENEPO PARTNERS accompagne les organisations internationales et locales
        dans la réalisation de leurs ambitions de développement en Afrique de l'Ouest.
      </MotionText>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <HStack spacing={4} flexWrap="wrap">
          <Link to="/services">
            <Button
              variant="brand"
              size="lg"
              h="60px"
              px={10}
              fontSize="16px"
              rightIcon={<FiArrowRight />}
              boxShadow="0 10px 25px rgba(43, 91, 196, 0.4)"
            >
              Nos expertises
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              color="white"
              size="lg"
              h="60px"
              px={10}
              fontSize="16px"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Parlons de votre projet
            </Button>
          </Link>
        </HStack>
      </MotionBox>

      <HStack spacing={8} pt={4}>
        {[
          { icon: FiCheck, text: 'Rigueur' },
          { icon: FiCheck, text: 'Impact' },
          { icon: FiCheck, text: 'Expertise' },
        ].map((item, i) => (
          <HStack key={i} spacing={2}>
            <Icon as={item.icon} color="gold.400" />
            <Text color="gray.400" fontWeight={500} fontSize="14px">
              {item.text}
            </Text>
          </HStack>
        ))}
      </HStack>
    </VStack>
  )
}
