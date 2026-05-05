import { Box, VStack, HStack, Text, Grid, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiTarget, FiAward, FiGlobe, FiCheck } from 'react-icons/fi'

const MotionBox = motion(Box)

export const HeroStats = () => {
  const stats = [
    { icon: FiTarget, value: '50+', label: 'Projets' },
    { icon: FiAward, value: '12+', label: 'Ans Exp.' },
    { icon: FiGlobe, value: '8', label: 'Pays' },
    { icon: FiCheck, value: '100%', label: 'Engagement' },
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
              En quelques chiffres
            </Text>
          </HStack>
          
          <Grid templateColumns="1fr 1fr" gap={6}>
            {stats.map((stat, i) => (
              <VStack key={i} align="flex-start" spacing={1}>
                <Icon as={stat.icon} color="gold.400" fontSize="20px" mb={1} />
                <Text color="white" fontWeight={800} fontSize="28px" lineHeight={1}>
                  {stat.value}
                </Text>
                <Text color="gray.400" fontSize="12px" fontWeight={600} textTransform="uppercase">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </Grid>

          <Box p={4} bg="brand.600" borderRadius="16px">
            <Text color="white" fontSize="13px" fontWeight={600} mb={1}>
              Partenaire stratégique
            </Text>
            <Text color="brand.100" fontSize="12px">
              ONG · Institutions · Gouvernements
            </Text>
          </Box>
        </VStack>
      </Box>
    </MotionBox>
  )
}
