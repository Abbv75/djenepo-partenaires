import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
  Image,
  Flex,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiActivity, FiTarget, FiPieChart, FiBarChart2, FiCheckCircle } from 'react-icons/fi'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const ImpactStat = ({ icon, label, value, color, delay }: any) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    bg="white"
    p={6}
    borderRadius="24px"
    boxShadow="0 10px 30px rgba(0,0,0,0.05)"
    border="1px solid"
    borderColor="gray.100"
  >
    <HStack spacing={4}>
      <Box p={3} bg={`${color}.50`} borderRadius="12px">
        <Icon as={icon} color={`${color}.500`} fontSize="24px" />
      </Box>
      <VStack align="flex-start" spacing={0}>
        <Text fontSize="13px" color="gray.500" fontWeight={600} textTransform="uppercase" letterSpacing="wider">
          {label}
        </Text>
        <Text fontSize="24px" fontWeight={800} color="gray.900">
          {value}
        </Text>
      </VStack>
    </HStack>
  </MotionBox>
)

export const HomeImpact = () => {
  return (
    <Box py={{ base: 20, md: 32 }} bg="gray.50" overflow="hidden" position="relative">
      {/* Decorative Blur */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="400px"
        h="400px"
        bg="gold.100"
        filter="blur(100px)"
        opacity={0.5}
        borderRadius="full"
        zIndex={0}
      />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16} alignItems="center">
          <VStack align="flex-start" spacing={8}>
            <VStack align="flex-start" spacing={4}>
              <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
                Performance & Impact
              </Badge>
              <Text
                as="h2"
                fontFamily="heading"
                fontWeight={800}
                fontSize={{ base: '32px', md: '46px' }}
                color="gray.900"
                lineHeight={1.1}
              >
                Optimisez vos résultats grâce au{' '}
                <Text as="span" color="gold.500">
                  Suivi & Évaluation
                </Text>
              </Text>
              <Text fontSize="18px" color="gray.600" lineHeight={1.8}>
                L'utilisation de balises de suivi et d'outils d'évaluation rigoureux permet non seulement de mesurer l'impact, mais surtout de l'amplifier. Nous transformons vos données en décisions stratégiques.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
              <ImpactStat icon={FiTrendingUp} label="Efficacité" value="+45%" color="green" delay={0.1} />
              <ImpactStat icon={FiTarget} label="Précision" value="98%" color="brand" delay={0.2} />
              <ImpactStat icon={FiActivity} label="Réactivité" value="Temps Réel" color="orange" delay={0.3} />
              <ImpactStat icon={FiPieChart} label="Visibilité" value="360°" color="purple" delay={0.4} />
            </SimpleGrid>

            <VStack align="flex-start" spacing={4} pt={4}>
              {[
                'Réduction des marges d\'erreur opérationnelles',
                'Optimisation de l\'allocation des ressources',
                'Reporting transparent pour les bailleurs de fonds',
                'Apprentissage institutionnel continu'
              ].map((text, i) => (
                <HStack key={i} spacing={3}>
                  <Icon as={FiCheckCircle} color="gold.500" fontSize="20px" />
                  <Text fontWeight={600} color="gray.700">{text}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>

          <Box position="relative">
            {/* Main Illustration */}
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              borderRadius="30px"
              overflow="hidden"
              boxShadow="0 30px 60px rgba(0,0,0,0.15)"
              border="8px solid white"
            >
              <Image 
                src="https://images.unsplash.com/photo-1551288049-bbda48658a71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Data Visualization"
              />
              
              {/* Overlay Graph Mockup */}
              <Box
                position="absolute"
                bottom="20px"
                right="20px"
                bg="white"
                p={4}
                borderRadius="20px"
                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                w="200px"
              >
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text fontSize="12px" fontWeight={700} color="gray.500">CROISSANCE</Text>
                    <Icon as={FiBarChart2} color="brand.500" />
                  </HStack>
                  <HStack align="flex-end" h="60px" spacing={2}>
                    {[40, 60, 45, 90, 75, 100].map((h, i) => (
                      <MotionBox
                        key={i}
                        w="full"
                        bg={i === 5 ? 'gold.400' : 'brand.500'}
                        borderRadius="4px"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </HStack>
                </VStack>
              </Box>
            </MotionBox>

            {/* Floating Card */}
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              position="absolute"
              top="-30px"
              left="-30px"
              bg="brand.600"
              color="white"
              p={6}
              borderRadius="24px"
              boxShadow="0 20px 40px rgba(43, 91, 196, 0.3)"
              display={{ base: 'none', md: 'block' }}
            >
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="32px" fontWeight={800}>+120%</Text>
                <Text fontSize="12px" fontWeight={500} opacity={0.8}>D'IMPACT MESURABLE</Text>
              </VStack>
            </MotionBox>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
