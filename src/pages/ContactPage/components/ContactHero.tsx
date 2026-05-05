import { Box, Container, VStack, Badge, Text } from '@chakra-ui/react'

export const ContactHero = () => {
  return (
    <Box
      bg="linear-gradient(135deg, #f8f9ff 0%, #eff3fb 100%)"
      py={{ base: 16, md: 24 }}
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack textAlign="center" spacing={5} maxW="600px" mx="auto">
          <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
            Parlons de votre projet
          </Badge>
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '32px', md: '48px' }}
            color="gray.900"
            lineHeight={1.15}
          >
            Contactez-nous
          </Text>
          <Text fontSize="17px" color="gray.600" lineHeight={1.8}>
            Notre équipe est disponible pour discuter de vos besoins et vous proposer
            un accompagnement adapté à votre contexte.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
