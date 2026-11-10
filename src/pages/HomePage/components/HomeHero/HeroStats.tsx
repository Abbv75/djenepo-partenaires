import { Box, VStack, HStack, Text, Icon, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiShield, FiTrendingUp, FiMap, FiAward } from 'react-icons/fi'
import { SpotlightCard, CountUp } from '../../../../components/reactbits'

const MotionBox = motion(Box)

export const HeroStats = () => {
  const valeurs = [
    {
      icon: FiShield,
      title: 'Rigueur & Méthodes',
      desc: 'Dispositifs S&E alignés sur les standards OCDE/CAD et bailleurs internationaux.',
    },
    {
      icon: FiTrendingUp,
      title: 'Culture du Résultat',
      desc: 'Mesure d\'impact vérifiable avec indicateurs quantitatifs et qualitatifs.',
    },
    {
      icon: FiMap,
      title: 'Ancrage Sahélien',
      desc: 'Expertise de terrain au Mali et dans l\'espace UEMOA.',
    },
  ]

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <SpotlightCard
        spotlightColor="rgba(200, 134, 26, 0.16)"
        spotlightSize={400}
        bg="rgba(255, 255, 255, 0.04)"
        backdropFilter="blur(24px)"
        borderRadius="28px"
        p={8}
        border="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="0 25px 60px rgba(0, 0, 0, 0.4)"
      >
        <VStack spacing={6} align="stretch">
          {/* Header avec indicateur en direct */}
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box w="3px" h="20px" bg="gold.400" borderRadius="full" />
              <Text color="white" fontWeight={700} fontSize="17px" letterSpacing="-0.01em">
                Notre Engagement
              </Text>
            </HStack>
            <HStack spacing={1.5} bg="whiteAlpha.100" px={3} py={1} borderRadius="full">
              <Box w="6px" h="6px" borderRadius="full" bg="green.400" boxShadow="0 0 8px #48bb78" />
              <Text color="gray.300" fontSize="11px" fontWeight={600}>
                Cabinet Actif
              </Text>
            </HStack>
          </HStack>

          {/* 3 Pilliers de valeurs */}
          <VStack align="stretch" spacing={4}>
            {valeurs.map((item, i) => (
              <HStack
                key={i}
                align="flex-start"
                spacing={3.5}
                p={3}
                borderRadius="14px"
                bg="whiteAlpha.50"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="all 0.2s"
                _hover={{ bg: 'whiteAlpha.150', transform: 'translateX(3px)' }}
              >
                <Box p={2} bg="whiteAlpha.150" borderRadius="10px" mt={0.5}>
                  <Icon as={item.icon} color="gold.400" fontSize="16px" />
                </Box>
                <VStack align="flex-start" spacing={0.5}>
                  <Text color="white" fontWeight={700} fontSize="13px">
                    {item.title}
                  </Text>
                  <Text color="gray.300" fontSize="12px" lineHeight={1.4}>
                    {item.desc}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>

          {/* Grille de statistiques avec ReactBits CountUp */}
          <SimpleGrid columns={3} gap={3} pt={2}>
            <Box p={3.5} bg="whiteAlpha.100" borderRadius="16px" textAlign="center" border="1px solid" borderColor="whiteAlpha.150">
              <Text fontSize="20px" fontWeight={800} color="gold.400" lineHeight={1}>
                <CountUp to={2025} duration={1.5} />
              </Text>
              <Text fontSize="10px" color="gray.400" fontWeight={600} textTransform="uppercase" mt={1}>
                Fondation
              </Text>
            </Box>

            <Box p={3.5} bg="whiteAlpha.100" borderRadius="16px" textAlign="center" border="1px solid" borderColor="whiteAlpha.150">
              <Text fontSize="20px" fontWeight={800} color="white" lineHeight={1}>
                <CountUp to={100} duration={1.8} suffix="%" />
              </Text>
              <Text fontSize="10px" color="gray.400" fontWeight={600} textTransform="uppercase" mt={1}>
                Rigueur
              </Text>
            </Box>

            <Box p={3.5} bg="whiteAlpha.100" borderRadius="16px" textAlign="center" border="1px solid" borderColor="whiteAlpha.150">
              <Text fontSize="20px" fontWeight={800} color="brand.300" lineHeight={1}>
                <CountUp to={35} duration={1.8} suffix="+" />
              </Text>
              <Text fontSize="10px" color="gray.400" fontWeight={600} textTransform="uppercase" mt={1}>
                Rapports & Articles
              </Text>
            </Box>
          </SimpleGrid>

          {/* Bandeau inférieur d'accréditation */}
          <Box p={3.5} bg="brand.600" borderRadius="16px" boxShadow="0 8px 20px rgba(43,91,196,0.3)">
            <HStack spacing={2} mb={1}>
              <Icon as={FiAward} color="gold.400" fontSize="15px" />
              <Text color="white" fontSize="12px" fontWeight={700}>
                Pool d'experts certifiés S&E
              </Text>
            </HStack>
            <Text color="brand.100" fontSize="11px" lineHeight={1.4}>
              Interventions en planification stratégique, GAR et évaluations d'impact au Mali.
            </Text>
          </Box>
        </VStack>
      </SpotlightCard>
    </MotionBox>
  )
}
