import { Box, Container, Grid, GridItem } from '@chakra-ui/react'
import { useSocialImpactParallax } from './hooks/useSocialImpactParallax'
import { ImpactMedia } from './components/ImpactMedia'
import { ImpactContent } from './components/ImpactContent'

export const HomeSocialImpact = () => {
  const {
    sectionRef,
    finalYImage,
    finalYCard,
    xMouseImage,
    xMouseCard,
    handleMouseMove,
    handleMouseLeave
  } = useSocialImpactParallax()

  return (
    <Box 
      py={{ base: 20, md: 32 }} 
      bg="white" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: '1fr', lg: '0.8fr 1.2fr' }} gap={16} alignItems="center">
          <GridItem order={{ base: 2, lg: 1 }}>
            <ImpactMedia 
              finalYImage={finalYImage}
              xMouseImage={xMouseImage}
              finalYCard={finalYCard}
              xMouseCard={xMouseCard}
            />
          </GridItem>

          <GridItem order={{ base: 1, lg: 2 }}>
            <ImpactContent />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
