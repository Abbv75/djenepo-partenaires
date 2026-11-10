import { VStack, HStack, Box, Text, Button, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { CONTACT_INFO } from '../../../../constant/contact'
import { ShinyBadge, BlurText } from '../../../../components/reactbits'

const MotionBox = motion(Box)
const MotionText = motion(Text)

export const HeroMainContent = () => {
  return (
    <VStack align="flex-start" spacing={7}>
      {/* ReactBits ShinyBadge */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ShinyBadge
          text={`Cabinet d'expertise en S&E • ${CONTACT_INFO.address.city}`}
          dotColor="gold.400"
        />
      </MotionBox>

      {/* Titre avec ReactBits BlurText */}
      <Box>
        <Text
          as="h1"
          fontFamily="heading"
          fontWeight={800}
          fontSize={{ base: '36px', md: '54px', lg: '62px' }}
          lineHeight={1.12}
          color="white"
          letterSpacing="-0.02em"
        >
          <BlurText text="Expertise locale pour un" delay={0.06} />{' '}
          <Text
            as="span"
            display="block"
            color="gold.400"
            textShadow="0 0 35px rgba(200, 134, 26, 0.4)"
          >
            <BlurText text="impact durable" delay={0.09} />
          </Text>
        </Text>
      </Box>

      <MotionText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        fontSize={{ base: '16px', md: '18px' }}
        color="gray.300"
        lineHeight={1.8}
        maxW="580px"
      >
        DJENEPO PARTNERS accompagne les institutions, ONG et programmes de développement
        dans la conception, le pilotage et l'évaluation rigoureuse de leurs interventions en Afrique de l'Ouest.
      </MotionText>

      {/* Boutons d'action */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <HStack spacing={4} flexWrap="wrap">
          <Link to="/services">
            <Button
              variant="brand"
              size="lg"
              h="56px"
              px={8}
              fontSize="15px"
              fontWeight={700}
              borderRadius="16px"
              rightIcon={<FiArrowRight />}
              boxShadow="0 10px 30px rgba(43, 91, 196, 0.45)"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 35px rgba(43, 91, 196, 0.55)',
              }}
              transition="all 0.25s ease"
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
              h="56px"
              px={8}
              fontSize="15px"
              fontWeight={600}
              borderRadius="16px"
              border="1px solid"
              borderColor="whiteAlpha.400"
              backdropFilter="blur(10px)"
              bg="whiteAlpha.100"
              _hover={{
                bg: 'whiteAlpha.200',
                borderColor: 'whiteAlpha.600',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.25s ease"
            >
              Échanger avec un consultant
            </Button>
          </Link>
        </HStack>
      </MotionBox>

      {/* Pilliers de confiance */}
      <HStack spacing={{ base: 4, sm: 8 }} pt={2} flexWrap="wrap">
        {[
          'Rigueur méthodologique',
          'Suivi orienté résultats',
          'Présence terrain active',
        ].map((item, i) => (
          <HStack key={i} spacing={2}>
            <Icon as={FiCheckCircle} color="gold.400" fontSize="16px" />
            <Text color="gray.300" fontWeight={500} fontSize="13px">
              {item}
            </Text>
          </HStack>
        ))}
      </HStack>
    </VStack>
  )
}
