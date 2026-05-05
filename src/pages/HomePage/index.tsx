import { Box } from '@chakra-ui/react'
import { HomeHero } from './components/HomeHero'
import { HomeAboutStrip } from './components/HomeAboutStrip'
import { HomeServicesGrid } from './components/HomeServicesGrid'
import { HomeCTA } from './components/HomeCTA'

export default () => {
  return (
    <Box>
      <HomeHero />
      <HomeAboutStrip />
      <HomeServicesGrid />
      <HomeCTA />
    </Box>
  )
}
