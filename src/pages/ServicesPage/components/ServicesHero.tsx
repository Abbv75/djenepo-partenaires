import { Box, Container, VStack, HStack, Text, Button } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { FiArrowRight } from 'react-icons/fi'
import { GridBackground, ShinyBadge, BlurText, CountUp } from '../../../components/reactbits'
import { useServices } from '../../../api/useServicesQuery'

export const ServicesHero = () => {
  const { data: services = [] } = useServices()

  const scrollToService = (slug: string) => {
    const el = document.getElementById(slug)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box
      position="relative"
      bg="linear-gradient(135deg, #0b1530 0%, #152d6b 50%, #0d1b3e 100%)"
      py={{ base: 16, md: 24 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      overflow="hidden"
    >
      {/* ReactBits Grid Background avec fondu radial */}
      <GridBackground color="rgba(255, 255, 255, 0.08)" size={32} opacity={0.7} />

      {/* Halos d'ambiance */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(200, 134, 26, 0.2) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-10%"
        w="450px"
        h="450px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(63, 124, 226, 0.25) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <VStack textAlign="center" spacing={6} maxW="780px" mx="auto">
          {/* ReactBits ShinyBadge */}
          <ShinyBadge text="Solutions Méthodologiques & Stratégiques" dotColor="gold.400" />

          {/* Titre avec ReactBits BlurText */}
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '34px', md: '52px' }}
            color="white"
            lineHeight={1.15}
            letterSpacing="-0.02em"
          >
            <BlurText text="Nos services d'accompagnement" delay={0.05} />{' '}
            <Text as="span" display="block" color="gold.400" textShadow="0 0 30px rgba(200,134,26,0.35)">
              <BlurText text="orientés vers l'impact" delay={0.08} />
            </Text>
          </Text>

          <Text fontSize={{ base: '16px', md: '18px' }} color="blue.100" lineHeight={1.8}>
            De la conception à l'évaluation finale, DJENEPO PARTNERS déploie des dispositifs rigoureux,
            participatifs et digitalisés pour garantir l'efficacité de vos interventions en Afrique de l'Ouest.
          </Text>

          {/* CTA & Liens rapides */}
          <HStack spacing={4} pt={2} flexWrap="wrap" justify="center">
            <Link to="/contact">
              <Button
                bg="gold.500"
                color="white"
                size="lg"
                px={8}
                h="54px"
                borderRadius="16px"
                fontWeight={700}
                rightIcon={<FiArrowRight />}
                _hover={{
                  bg: 'gold.600',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(200,134,26,0.4)',
                }}
                boxShadow="0 8px 25px rgba(200,134,26,0.3)"
                transition="all 0.2s ease"
              >
                Discuter de votre projet
              </Button>
            </Link>
          </HStack>

          {/* Métriques d'expertise avec CountUp */}
          <HStack
            spacing={{ base: 6, md: 12 }}
            pt={6}
            borderTop="1px solid"
            borderColor="whiteAlpha.200"
            w="full"
            justify="center"
            flexWrap="wrap"
          >
            <VStack spacing={0}>
              <Text fontSize={{ base: '24px', md: '30px' }} fontWeight={800} color="white">
                <CountUp to={6} suffix="+" duration={1.5} />
              </Text>
              <Text fontSize="12px" color="blue.200" fontWeight={500}>
                Pôles d'expertise
              </Text>
            </VStack>

            <Box w="1px" h="30px" bg="whiteAlpha.300" display={{ base: 'none', sm: 'block' }} />

            <VStack spacing={0}>
              <Text fontSize={{ base: '24px', md: '30px' }} fontWeight={800} color="gold.400">
                <CountUp to={100} suffix="%" duration={1.8} />
              </Text>
              <Text fontSize="12px" color="blue.200" fontWeight={500}>
                Adaptabilité terrain
              </Text>
            </VStack>

            <Box w="1px" h="30px" bg="whiteAlpha.300" display={{ base: 'none', sm: 'block' }} />

            <VStack spacing={0}>
              <Text fontSize={{ base: '24px', md: '30px' }} fontWeight={800} color="brand.300">
                <CountUp to={35} suffix="+" duration={1.8} />
              </Text>
              <Text fontSize="12px" color="blue.200" fontWeight={500}>
                Rapports & diagnostics
              </Text>
            </VStack>
          </HStack>

          {/* Pilules d'ancrage rapide vers chaque service */}
          {services.length > 0 && (
            <HStack spacing={2} wrap="wrap" justify="center" pt={4}>
              <Text fontSize="12px" color="gray.400" fontWeight={600} mr={1}>
                Accès direct :
              </Text>
              {services.map((s) => (
                <Box
                  key={s.id}
                  as="button"
                  onClick={() => scrollToService(s.slug)}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="12px"
                  fontWeight={500}
                  bg="whiteAlpha.100"
                  color="blue.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  transition="all 0.2s"
                  _hover={{
                    bg: 'whiteAlpha.250',
                    color: 'white',
                    borderColor: 'gold.400',
                  }}
                >
                  {s.title}
                </Box>
              ))}
            </HStack>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
