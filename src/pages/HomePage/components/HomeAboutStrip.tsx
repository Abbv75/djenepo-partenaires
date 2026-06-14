import { Box, Container, Grid, VStack, HStack, Icon, Text } from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'

export const HomeAboutStrip = () => {
  return (
    <Box bg="brand.600" py={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={12} alignItems="center">
          <Box>
            <Text
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: "13px", md: "14px" }}
              color="gold.400"
              letterSpacing="wider"
              textTransform="uppercase"
              mb={3}
            >
              Qui sommes-nous ?
            </Text>
            <Text
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '28px', md: '36px' }}
              color="white"
              lineHeight={1.2}
              mb={6}
            >
              DJENEPO Partners Sarl
            </Text>
            <Text color="brand.100" fontSize="16px" lineHeight={1.8} mb={4}>
              DJENEPO Partners Sarl est un cabinet de conseil, d'expertise et de formation en suivi-évaluation, fondé en 2025 par un pool d'experts certifiés en S&E, en collaboration avec des universitaires et des praticiens du développement.
            </Text>
            <Text color="brand.200" fontSize="15px" lineHeight={1.8}>
              Nous accompagnons les organisations dans le pilotage de leurs projets à travers des dispositifs de suivi-évaluation robustes, permettant d'améliorer la prise de décision, la transparence et l'efficacité des interventions.
            </Text>
          </Box>
          <VStack align="flex-start" spacing={5} bg="whiteAlpha.100" p={8} borderRadius="24px" border="1px solid" borderColor="whiteAlpha.200">
            <Text color="white" fontWeight={700} fontSize="17px" mb={2}>
              Notre champ d'intervention
            </Text>
            {[
              'Conception & Planification du projet',
              'Suivi opérationnel en temps réel',
              'Évaluation finale & d\'impact',
              'Capitalisation & Apprentissage continu',
            ].map((item) => (
              <HStack key={item} spacing={3} align="flex-start">
                <Icon as={FiCheckCircle} color="gold.400" fontSize="20px" mt={0.5} />
                <Text color="white" fontSize="15px" fontWeight={500} lineHeight={1.4}>
                  {item}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Grid>
      </Container>
    </Box>
  )
}

