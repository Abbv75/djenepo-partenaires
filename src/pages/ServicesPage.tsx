import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  Container, Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Button,
  Icon,
  Badge, List,
  ListItem,
  ListIcon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiCheck,
  FiArrowRight,
} from 'react-icons/fi'
import { SERVICES } from '../constant/services'

const MotionBox = motion(Box)

export default function ServicesPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        // Small delay to ensure everything is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [hash])

  return (
    <Box pt="72px">
      {/* Header */}
      <Box
        bg="linear-gradient(135deg, #f8f9ff 0%, #eff3fb 100%)"
        py={{ base: 16, md: 24 }}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack textAlign="center" spacing={5} maxW="700px" mx="auto">
            <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
              Ce que nous faisons
            </Badge>
            <Text
              as="h1"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '32px', md: '48px' }}
              color="gray.900"
              lineHeight={1.15}
            >
              Nos services d'accompagnement
            </Text>
            <Text fontSize="17px" color="gray.600" lineHeight={1.8}>
              De la conception à l'évaluation, DJENEPO PARTNERS offre un accompagnement complet
              pour maximiser l'impact de vos projets de développement.
            </Text>
            <Link to="/contact">
              <Button variant="brand" size="lg" px={8} rightIcon={<FiArrowRight />}>
                Discuter de votre projet
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Services List */}
      <Box py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={16}>
            {SERVICES.map((service, i) => (
              <MotionBox
                key={service.id}
                id={service.id}
                w="full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                scrollMarginTop="100px"
              >
                <Grid
                  templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                  gap={12}
                  alignItems="center"
                >
                  <GridItem order={{ base: 1, lg: i % 2 === 1 ? 2 : 1 }}>
                    <HStack spacing={4} mb={5}>
                      <Box
                        w="56px"
                        h="56px"
                        bg={service.bg}
                        borderRadius="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={service.icon} color={service.color} fontSize="24px" />
                      </Box>
                      <Box>
                        <Text fontSize="12px" color="gray.500" fontWeight={600} textTransform="uppercase" letterSpacing="1px">
                          {service.tagline}
                        </Text>
                        <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '20px', md: '26px' }} color="gray.900">
                          {service.title}
                        </Text>
                      </Box>
                    </HStack>

                    <Text color="gray.600" fontSize="16px" lineHeight={1.8} mb={6}>
                      {service.desc}
                    </Text>

                    <List spacing={3}>
                      {service.features.map((f) => (
                        <ListItem key={f} display="flex" alignItems="center">
                          <ListIcon as={FiCheck} color="green.500" />
                          <Text fontSize="14px" color="gray.700">{f}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </GridItem>

                  <GridItem order={{ base: 2, lg: i % 2 === 1 ? 1 : 2 }}>
                    <Box
                      bg={service.bg}
                      borderRadius="24px"
                      p={10}
                      position="relative"
                      overflow="hidden"
                      minH="300px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        position="absolute"
                        top="-30px"
                        right="-30px"
                        w="120px"
                        h="120px"
                        borderRadius="full"
                        bg={service.color}
                        opacity={0.08}
                      />
                      <Box
                        position="absolute"
                        bottom="-20px"
                        left="-20px"
                        w="100px"
                        h="100px"
                        borderRadius="full"
                        bg={service.color}
                        opacity={0.06}
                      />
                      <VStack spacing={4}>
                        <Box
                          w="100px"
                          h="100px"
                          bg="white"
                          borderRadius="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow={`0 20px 50px ${service.color}30`}
                        >
                          <Icon as={service.icon} color={service.color} fontSize="44px" />
                        </Box>
                        <Text fontFamily="heading" fontWeight={700} fontSize="18px" color="gray.800" textAlign="center">
                          {service.title}
                        </Text>
                        <Text fontSize="13px" color="gray.500" textAlign="center" maxW="200px">
                          {service.tagline}
                        </Text>
                      </VStack>
                    </Box>
                  </GridItem>
                </Grid>

                {i < SERVICES.length - 1 && (
                  <Box h="1px" bg="gray.100" mt={16} />
                )}
              </MotionBox>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* CTA */}
      <Box py={{ base: 16, md: 20 }} bg="gray.50">
        <Container maxW="700px" textAlign="center" px={{ base: 4, md: 6 }}>
          <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '26px', md: '36px' }} color="gray.900" mb={4}>
            Un projet en tête ?
          </Text>
          <Text fontSize="16px" color="gray.600" lineHeight={1.8} mb={8}>
            Nos experts sont disponibles pour analyser vos besoins et vous proposer
            un accompagnement adapté à votre contexte.
          </Text>
          <Link to="/contact">
            <Button variant="brand" size="lg" px={10} rightIcon={<FiArrowRight />}>
              Prendre contact maintenant
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  )
}
