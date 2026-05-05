import {
  Box,
  Container,
  VStack, Text,
  SimpleGrid,
  Icon,
  Circle
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiSearch, FiSettings, FiLayout, FiTrendingUp } from 'react-icons/fi'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

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
    <Box py={{ base: 20, md: 32 }} bg="brand.600" overflow="hidden">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack spacing={16}>
          <MotionVStack
            spacing={4}
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
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
          </MotionVStack>

          <Box position="relative" w="full">
            {/* Connector Line (Desktop) */}
            <Box
              position="absolute"
              top="40px"
              left="10%"
              right="10%"
              h="2px"
              zIndex={0}
              display={{ base: 'none', lg: 'block' }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                  originX: 0
                }}
              />
            </Box>

            <SimpleGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={8}
            >
              {steps.map((step, i) => (
                <MotionBox
                  key={i}
                  variants={itemVariants}
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
                      transition="all 0.3s ease"
                      _hover={{
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Icon as={step.icon} />
                      <Box
                        position="absolute"
                        top="-10px"
                        right="-10px"
                        bg="gold.400"
                        color="white"
                        w="30px"
                        h="30px"
                        borderRadius="full"
                        fontSize="14px"
                        fontWeight={800}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="3px solid"
                        borderColor="brand.600"
                      >
                        {i + 1}
                      </Box>
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
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
