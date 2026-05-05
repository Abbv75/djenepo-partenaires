import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
  Circle,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiSearch, FiSettings, FiLayout, FiTrendingUp } from 'react-icons/fi'

const MotionBox = motion(Box)

const steps = [
  {
    icon: FiSearch,
    title: 'Diagnostic & Analyse',
    desc: 'Nous commençons par une immersion totale pour comprendre vos défis spécifiques et vos objectifs d\'impact.',
  },
  {
    icon: FiSettings,
    title: 'Design de Solutions',
    desc: 'Conception de théories de changement et d\'outils de suivi-évaluation personnalisés pour votre organisation.',
  },
  {
    icon: FiLayout,
    title: 'Implémentation Terrain',
    desc: 'Déploiement des outils et formation des équipes pour une collecte de données fiable et systématique.',
  },
  {
    icon: FiTrendingUp,
    title: 'Optimisation Continue',
    desc: 'Analyse des résultats et ajustements stratégiques pour maximiser l\'impact à long terme.',
  },
]

export const HomeProcess = () => {
  return (
    <Box py={{ base: 20, md: 32 }} bg="brand.600">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Text color="gold.400" fontWeight={700} fontSize="14px" textTransform="uppercase" letterSpacing="widest">
              Notre Méthodologie
            </Text>
            <Text
              as="h2"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '32px', md: '42px' }}
              color="white"
              lineHeight={1.2}
            >
              Un accompagnement de bout en bout
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} position="relative">
            {/* Connector Line (Desktop) */}
            <Box
              position="absolute"
              top="40px"
              left="10%"
              right="10%"
              h="2px"
              bg="whiteAlpha.200"
              zIndex={0}
              display={{ base: 'none', lg: 'block' }}
            />

            {steps.map((step, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                zIndex={1}
              >
                <VStack spacing={6} align={{ base: 'center', md: 'flex-start' }} textAlign={{ base: 'center', md: 'left' }}>
                  <Circle
                    size="80px"
                    bg="white"
                    color="brand.600"
                    boxShadow="0 10px 25px rgba(0,0,0,0.2)"
                    fontSize="30px"
                    position="relative"
                    _after={{
                      content: `"${i + 1}"`,
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      bg: 'gold.400',
                      color: 'white',
                      w: '30px',
                      h: '30px',
                      borderRadius: 'full',
                      fontSize: '14px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid',
                      borderColor: 'brand.600',
                    }}
                  >
                    <Icon as={step.icon} />
                  </Circle>
                  <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3}>
                    <Text color="white" fontWeight={800} fontSize="20px">
                      {step.title}
                    </Text>
                    <Text color="brand.100" fontSize="15px" lineHeight={1.7}>
                      {step.desc}
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
