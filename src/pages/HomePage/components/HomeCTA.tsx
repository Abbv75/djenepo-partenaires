import { Box, Container, Text, Button, VStack } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { FiArrowRight } from 'react-icons/fi'
import { GridBackground, ShinyBadge } from '../../../components/reactbits'

export const HomeCTA = () => {
  return (
    <Box py={{ base: 16, md: 24 }} bg="transparent" position="relative">
      <Container maxW="900px" px={{ base: 4, md: 6 }}>
        <Box
          position="relative"
          bg="linear-gradient(135deg, #1b3fa0 0%, #152d73 100%)"
          borderRadius="32px"
          p={{ base: 8, md: 16 }}
          textAlign="center"
          overflow="hidden"
          boxShadow="0 25px 60px -15px rgba(27, 63, 160, 0.4)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          {/* ReactBits Grid Background */}
          <GridBackground color="rgba(255, 255, 255, 0.08)" size={28} opacity={0.7} />

          {/* Sphères d'ambiance lumineuses */}
          <Box
            position="absolute"
            top="-80px"
            right="-80px"
            w="240px"
            h="240px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(200, 134, 26, 0.25) 0%, transparent 70%)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            bottom="-60px"
            left="-60px"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(63, 124, 226, 0.3) 0%, transparent 70%)"
            pointerEvents="none"
          />

          <VStack spacing={6} position="relative" zIndex={1} maxW="640px" mx="auto">
            <ShinyBadge text="Prêt à faire la différence ?" dotColor="gold.400" />

            <Text
              as="h2"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '26px', md: '38px' }}
              color="white"
              lineHeight={1.2}
              letterSpacing="-0.02em"
            >
              Prêt à transformer l'impact de votre projet ?
            </Text>

            <Text color="blue.100" fontSize={{ base: '15px', md: '17px' }} lineHeight={1.8}>
              Discutons ensemble de vos défis méthodologiques et construisons des dispositifs
              de suivi-évaluation sur mesure pour vos programmes en Afrique de l'Ouest.
            </Text>

            <Box pt={2}>
              <Link to="/contact">
                <Button
                  bg="gold.500"
                  color="white"
                  size="lg"
                  px={10}
                  h="56px"
                  fontSize="16px"
                  fontWeight={700}
                  borderRadius="16px"
                  rightIcon={<FiArrowRight />}
                  _hover={{
                    bg: 'gold.600',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(200,134,26,0.45)',
                  }}
                  boxShadow="0 8px 25px rgba(200,134,26,0.35)"
                  transition="all 0.25s ease"
                >
                  Contactez notre équipe
                </Button>
              </Link>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
