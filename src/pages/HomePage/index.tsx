import { Box } from '@chakra-ui/react'
import { HomeHero } from './components/HomeHero'
import { HomeAboutStrip } from './components/HomeAboutStrip'
import { HomeServicesGrid } from './components/HomeServicesGrid'
import { HomeImpact } from './components/HomeImpact'
import { HomeProcess } from './components/HomeProcess'
import { HomeSocialImpact } from './components/HomeSocialImpact'
import { HomeBlogSection } from './components/HomeBlogSection'
import { HomeCTA } from './components/HomeCTA'

export default () => {
  return (
    <Box>
      <HomeHero />
      <HomeAboutStrip />
      <HomeServicesGrid />
      <HomeImpact />
      <HomeProcess />
      <HomeSocialImpact />
      <HomeBlogSection />
      <HomeCTA />
    </Box>
  )
}

