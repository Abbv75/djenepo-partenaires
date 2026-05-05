import { Box, Container, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export const ServicesCTA = () => {
  return (
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
  )
}
