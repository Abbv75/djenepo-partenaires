import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiShield, FiTrendingUp, FiMap } from 'react-icons/fi'

const MotionBox = motion(Box)

export const HeroStats = () => {
  const valeurs = [
    { icon: FiShield, title: 'Rigueur & Transparence', desc: 'Méthodologies d\'évaluation conformes aux exigences internationales.' },
    { icon: FiTrendingUp, title: 'Culture de l\'Impact', desc: 'Orienter chaque intervention vers des résultats durables et mesurables.' },
    { icon: FiMap, title: 'Engagement Terrain', desc: 'Une présence active et une connaissance pointue des réalités ouest-africaines.' },
  ]

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Box
        bg="whiteAlpha.100"
        backdropFilter="blur(20px)"
        borderRadius="30px"
        p={8}
        border="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="0 25px 50px rgba(0,0,0,0.3)"
      >
        <VStack spacing={6} align="stretch">
          <HStack spacing={4}>
            <Box w="40px" h="4px" bg="gold.400" borderRadius="full" />
            <Text color="white" fontWeight={700} fontSize="18px">
              Notre engagement
            </Text>
          </HStack>
          
          <VStack align="stretch" spacing={5}>
            {valeurs.map((item, i) => (
              <HStack key={i} align="flex-start" spacing={4}>
                <Box p={2} bg="whiteAlpha.100" borderRadius="10px" mt={0.5}>
                  <Icon as={item.icon} color="gold.400" fontSize="18px" />
                </Box>
                <VStack align="flex-start" spacing={0.5}>
                  <Text color="white" fontWeight={700} fontSize="14px">
                    {item.title}
                  </Text>
                  <Text color="gray.300" fontSize="12px" lineHeight={1.4}>
                    {item.desc}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>

          <Box p={4} bg="brand.600" borderRadius="16px" mt={2}>
            <HStack spacing={2} mb={1}>
              <Icon as={FiCheckCircle} color="gold.400" />
              <Text color="white" fontSize="13px" fontWeight={700}>
                Cabinet fondé en 2025
              </Text>
            </HStack>
            <Text color="brand.100" fontSize="12px">
              Spécialisé en Planification, Suivi-Évaluation et Formation en Afrique de l'Ouest.
            </Text>
          </Box>
        </VStack>
      </Box>
    </MotionBox>
  )
}
