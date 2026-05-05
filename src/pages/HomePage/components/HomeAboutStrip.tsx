import { Box, Container, Grid, VStack, HStack, Icon, Text } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

export const HomeAboutStrip = () => {
  return (
    <Box bg="brand.600" py={14}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12} alignItems="center">
          <Box>
            <Text
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '28px', md: '36px' }}
              color="white"
              lineHeight={1.2}
              mb={4}
            >
              Notre approche : rigoureuse et participative
            </Text>
            <Text color="brand.200" fontSize="16px" lineHeight={1.8}>
              Avec une méthodologie éprouvée, DJENEPO PARTNERS aide ses clients à concevoir
              des théories de changement efficaces, à mettre en place des systèmes de suivi
              performants et à renforcer durablement les capacités des acteurs terrain.
            </Text>
          </Box>
          <VStack align="flex-start" spacing={4}>
            {[
              'Théories de changement efficaces',
              'Systèmes de suivi performants',
              'Renforcement durable des capacités',
              'Approche participative et inclusive',
            ].map((item) => (
              <HStack key={item} spacing={3}>
                <Box
                  w="24px"
                  h="24px"
                  borderRadius="full"
                  bg="gold.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon as={FiCheck} color="white" fontSize="12px" />
                </Box>
                <Text color="white" fontSize="15px" fontWeight={500}>
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
