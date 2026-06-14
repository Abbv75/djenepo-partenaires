import { Box, Container, Text, Button } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

export const HomeCTA = () => {
  return (
    <Box py={{ base: 16, md: 24 }} bg="transparent">
      <Container maxW="800px" px={{ base: 4, md: 6 }}>
        <Box
          bg="linear-gradient(135deg, #2B5BC4 0%, #1f3fa0 100%)"
          borderRadius="28px"
          p={{ base: 8, md: 14 }}
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-60px"
            right="-60px"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="rgba(255,255,255,0.07)"
          />
          <Box
            position="absolute"
            bottom="-40px"
            left="-40px"
            w="150px"
            h="150px"
            borderRadius="full"
            bg="rgba(200,134,26,0.2)"
          />
          <Text
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '26px', md: '36px' }}
            color="white"
            mb={4}
            position="relative"
          >
            Prêt à transformer votre projet ?
          </Text>
          <Text color="brand.200" fontSize="16px" mb={8} lineHeight={1.7} position="relative">
            Parlons de vos objectifs et voyons comment DJENEPO PARTNERS peut
            vous accompagner vers un impact durable.
          </Text>
          <Link to="/contact">
            <Button
              bg="gold.500"
              color="white"
              size="lg"
              px={10}
              py={7}
              fontSize="16px"
              fontWeight={700}
              borderRadius="12px"
              _hover={{ bg: 'gold.600', transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(200,134,26,0.4)' }}
              transition="all 0.2s"
              position="relative"
            >
              Contactez-nous aujourd'hui
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
