import {
  Box,
  Container,
  Grid,
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

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="flex-start">
            <ContactForm />
            <ContactMap />
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
