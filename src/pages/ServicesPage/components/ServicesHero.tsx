import { Box, Container, VStack, Badge, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export const ServicesHero = () => {
  return (
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
  )
}
