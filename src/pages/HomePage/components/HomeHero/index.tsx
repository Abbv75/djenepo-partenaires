import { useRef } from 'react'
import { Box, Container, Grid, GridItem } from '@chakra-ui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroBackground } from './HeroBackground'
import { HeroDecorations } from './HeroDecorations'
import { HeroMainContent } from './HeroMainContent'
import { HeroStats } from './HeroStats'
import { HeroScrollIndicator } from './HeroScrollIndicator'

const MotionBox = motion(Box)

export const HomeHero = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  // Background parallax (more pronounced)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  
  // Decorative elements parallax (more pronounced)
  const decorativeY1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const decorativeY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])
  
  // Content parallax (more pronounced)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <Box
      ref={targetRef}
      position="relative"
      minH={{ base: '100vh', lg: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="gray.900"
      pt="72px"
    >
      <HeroBackground y={backgroundY} />
      <HeroDecorations y1={decorativeY1} y2={decorativeY2} />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <MotionBox style={{ y: contentY }}>
          <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={12} alignItems="center">
            <GridItem>
              <HeroMainContent />
            </GridItem>

            <GridItem display={{ base: 'none', lg: 'block' }}>
              <HeroStats />
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>

      <HeroScrollIndicator />
    </Box>
  )
}
