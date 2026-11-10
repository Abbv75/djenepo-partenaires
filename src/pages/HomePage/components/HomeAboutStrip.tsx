import { Box, Container, Grid, VStack, HStack, Icon, Text, Badge } from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { GridBackground, SpotlightCard } from '../../../components/reactbits'

export const HomeAboutStrip = () => {
  return (
    <Box
      position="relative"
      bg="linear-gradient(135deg, #1b3fa0 0%, #15317e 100%)"
      py={{ base: 16, md: 20 }}
      overflow="hidden"
    >
      {/* ReactBits Grid Background */}
      <GridBackground color="rgba(255, 255, 255, 0.06)" size={32} opacity={0.7} />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={12} alignItems="center">
          <Box>
            <Badge
              bg="rgba(200, 134, 26, 0.2)"
              color="gold.300"
              border="1px solid"
              borderColor="gold.500"
              px={3.5}
              py={1}
              borderRadius="full"
              fontSize="12px"
              fontWeight={700}
              letterSpacing="0.05em"
              textTransform="uppercase"
              mb={4}
            >
              Qui sommes-nous ?
            </Badge>

            <Text
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '28px', md: '38px' }}
              color="white"
              lineHeight={1.2}
              letterSpacing="-0.02em"
              mb={6}
            >
              DJENEPO Partners Sarl
            </Text>

            <Text color="blue.100" fontSize="16px" lineHeight={1.8} mb={4}>
              DJENEPO Partners Sarl est un cabinet de conseil, d'expertise et de formation en suivi-évaluation, fondé en 2025 par un pool d'experts certifiés en S&E, en collaboration avec des universitaires et des praticiens du développement.
            </Text>

            <Text color="blue.200" fontSize="15px" lineHeight={1.8}>
              Nous accompagnons les organisations dans le pilotage de leurs projets à travers des dispositifs de suivi-évaluation robustes, permettant d'améliorer la prise de décision, la transparence et l'efficacité des interventions.
            </Text>
          </Box>

          {/* Carte Approche avec ReactBits SpotlightCard */}
          <SpotlightCard
            spotlightColor="rgba(200, 134, 26, 0.2)"
            spotlightSize={350}
            bg="rgba(255, 255, 255, 0.06)"
            backdropFilter="blur(20px)"
            p={{ base: 6, md: 8 }}
            borderRadius="24px"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 20px 50px rgba(0, 0, 0, 0.3)"
          >
            <VStack align="flex-start" spacing={5}>
              <HStack spacing={3} mb={1}>
                <Box w="3px" h="18px" bg="gold.400" borderRadius="full" />
                <Text color="white" fontWeight={700} fontSize="18px">
                  Notre Approche
                </Text>
              </HStack>

              {[
                'Une forte immersion terrain et contextualisation',
                'Une démarche participative et inclusive des acteurs',
                'Une orientation résultats et preuves mesurables',
                'Des indicateurs fiables, vérifiables et exploitables',
              ].map((item) => (
                <HStack
                  key={item}
                  spacing={3.5}
                  align="flex-start"
                  p={2.5}
                  w="full"
                  borderRadius="12px"
                  bg="whiteAlpha.50"
                  transition="all 0.2s"
                  _hover={{ bg: 'whiteAlpha.150', transform: 'translateX(3px)' }}
                >
                  <Icon as={FiCheckCircle} color="gold.400" fontSize="18px" mt={0.5} />
                  <Text color="white" fontSize="14px" fontWeight={500} lineHeight={1.5}>
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </SpotlightCard>
        </Grid>
      </Container>
    </Box>
  )
}
