import {
  Box,
  Container,
  Grid,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react'
import { ContactHero } from './components/ContactHero'
import { ContactInfoCards } from './components/ContactInfoCards'
import { ContactForm } from './components/ContactForm'
import ContactMap from './components/ContactMap'

export default function ContactPage() {
  return (
    <Box pt="72px">
      <ContactHero />

      <Box py={{ base: 12, md: 16 }} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <ContactInfoCards />

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="flex-start" mb={20}>
            <ContactForm />
            <ContactMap />
          </Grid>

          {/* Section Partenaires */}
          <VStack spacing={8} pt={16} borderTop="1px solid" borderColor="gray.100" textAlign="center">
            <VStack spacing={2}>
              <Text fontSize="12px" color="brand.600" fontWeight={700} textTransform="uppercase" letterSpacing="1.5px">
                Ils nous font confiance
              </Text>
              <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '24px', md: '32px' }} color="gray.900">
                Nos Partenaires
              </Text>
            </VStack>
            <Box w="full" maxW="1000px" mx="auto" px={6} py={8} bg="gray.50" borderRadius="24px" display="flex" justifyContent="center" alignItems="center">
              <Image 
                src="/assets/images/partenaires.png" 
                alt="Nos partenaires" 
                maxH="120px" 
                objectFit="contain" 
                filter="grayscale(100%)"
                opacity={0.8}
                _hover={{ filter: 'grayscale(0%)', opacity: 1 }}
                transition="all 0.3s ease"
              />
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
