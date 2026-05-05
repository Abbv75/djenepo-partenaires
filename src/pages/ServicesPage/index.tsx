import { Box } from '@chakra-ui/react'
import { ServicesHero } from './components/ServicesHero'
import { ServicesList } from './components/ServicesList'
import { ServicesCTA } from './components/ServicesCTA'
import { useServiceHash } from './hooks/useServiceHash'

export default () => {
  useServiceHash()

  return (
    <Box pt="72px">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </Box>
  )
}
