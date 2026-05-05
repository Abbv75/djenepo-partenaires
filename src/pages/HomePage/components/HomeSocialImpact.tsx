import {
  Box,
  Container,
  VStack,
  Text,
  SimpleGrid,
  Image,
  Flex,
  Badge,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const HomeSocialImpact = () => {
  return (
    <Box py={{ base: 20, md: 32 }} bg="white">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: '1fr', lg: '0.8fr 1.2fr' }} gap={16} alignItems="center">
          <GridItem order={{ base: 2, lg: 1 }}>
            <Box position="relative">
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                borderRadius="30px"
                overflow="hidden"
                boxShadow="0 25px 50px rgba(0,0,0,0.1)"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Team collaboration in Africa"
                />
              </MotionBox>
              
              <Box
                position="absolute"
                bottom="-40px"
                right="-20px"
                bg="gold.400"
                p={8}
                borderRadius="30px"
                boxShadow="0 20px 40px rgba(212, 175, 55, 0.3)"
                display={{ base: 'none', md: 'block' }}
                maxW="300px"
              >
                <Text color="white" fontWeight={700} fontSize="18px" lineHeight={1.4}>
                  "Notre présence locale garantit une compréhension fine des enjeux du terrain."
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem order={{ base: 1, lg: 2 }}>
            <VStack align="flex-start" spacing={6}>
              <Badge bg="gold.50" color="gold.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
                Présence & Engagement
              </Badge>
              <Text
                as="h2"
                fontFamily="heading"
                fontWeight={800}
                fontSize={{ base: '32px', md: '46px' }}
                color="gray.900"
                lineHeight={1.1}
              >
                Une expertise ancrée dans les{' '}
                <Text as="span" color="brand.500">
                  réalités locales
                </Text>
              </Text>
              <Text fontSize="18px" color="gray.600" lineHeight={1.8}>
                Nous ne nous contentons pas de fournir des rapports. Nous accompagnons les changements sur le terrain, en travaillant main dans la main avec les communautés et les partenaires locaux pour assurer la pérennité de chaque intervention.
              </Text>

              <SimpleGrid columns={2} spacing={10} w="full" pt={4}>
                <VStack align="flex-start" spacing={1}>
                  <Text fontSize="32px" fontWeight={800} color="brand.600">15+</Text>
                  <Text fontSize="14px" fontWeight={600} color="gray.500" textTransform="uppercase">Pays d'intervention</Text>
                </VStack>
                <VStack align="flex-start" spacing={1}>
                  <Text fontSize="32px" fontWeight={800} color="brand.600">200+</Text>
                  <Text fontSize="14px" fontWeight={600} color="gray.500" textTransform="uppercase">Missions réussies</Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
