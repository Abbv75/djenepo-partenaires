import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiAward, FiTarget, FiGlobe } from 'react-icons/fi'
import { CONTACT_INFO } from '../constant/contact'

const MotionBox = motion(Box)
const MotionText = motion(Text)

export const HomeHero = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box
      position="relative"
      minH={{ base: '100vh', lg: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="gray.900"
      pt="72px"
    >
      {/* Background Image with Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        backgroundImage="url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(to right, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.7) 50%, rgba(10, 15, 30, 0.4) 100%)"
        />
      </Box>

      {/* Decorative Elements */}
      <Box
        position="absolute"
        top="20%"
        right="-5%"
        w="500px"
        h="500px"
        bg="brand.600"
        filter="blur(150px)"
        opacity={0.15}
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="10%"
        w="400px"
        h="400px"
        bg="gold.500"
        filter="blur(120px)"
        opacity={0.1}
        borderRadius="full"
        zIndex={0}
      />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={12} alignItems="center">
          <GridItem>
            <VStack align="flex-start" spacing={7}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge
                  bg="whiteAlpha.200"
                  color="gold.400"
                  px={4}
                  py={1.5}
                  borderRadius="full"
                  fontSize="13px"
                  fontWeight={600}
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  <Box w="6px" h="6px" borderRadius="full" bg="gold.400" />
                  Basé à {CONTACT_INFO.address.city}
                </Badge>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Text
                  as="h1"
                  fontFamily="heading"
                  fontWeight={800}
                  fontSize={{ base: '38px', md: '56px', lg: '64px' }}
                  lineHeight={1.1}
                  color="white"
                >
                  Expertise locale pour un{' '}
                  <Text as="span" display="block" color="gold.400">
                    impact durable
                  </Text>
                </Text>
              </MotionBox>

              <MotionText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                fontSize={{ base: '17px', md: '19px' }}
                color="gray.300"
                lineHeight={1.8}
                maxW="600px"
              >
                DJENEPO PARTNERS accompagne les organisations internationales et locales
                dans la réalisation de leurs ambitions de développement en Afrique de l'Ouest.
              </MotionText>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <HStack spacing={4} flexWrap="wrap">
                  <Link to="/services">
                    <Button
                      variant="brand"
                      size="lg"
                      h="60px"
                      px={10}
                      fontSize="16px"
                      rightIcon={<FiArrowRight />}
                      boxShadow="0 10px 25px rgba(43, 91, 196, 0.4)"
                    >
                      Nos expertises
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      colorScheme="whiteAlpha"
                      color="white"
                      size="lg"
                      h="60px"
                      px={10}
                      fontSize="16px"
                      _hover={{ bg: 'whiteAlpha.200' }}
                    >
                      Parlons de votre projet
                    </Button>
                  </Link>
                </HStack>
              </MotionBox>

              <HStack spacing={8} pt={4}>
                {[
                  { icon: FiCheck, text: 'Rigueur' },
                  { icon: FiCheck, text: 'Impact' },
                  { icon: FiCheck, text: 'Expertise' },
                ].map((item, i) => (
                  <HStack key={i} spacing={2}>
                    <Icon as={item.icon} color="gold.400" />
                    <Text color="gray.400" fontWeight={500} fontSize="14px">
                      {item.text}
                    </Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>
          </GridItem>

          <GridItem display={{ base: 'none', lg: 'block' }}>
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
                    {[
                      { icon: FiTarget, value: '50+', label: 'Projets' },
                      { icon: FiAward, value: '12+', label: 'Ans Exp.' },
                      { icon: FiGlobe, value: '8', label: 'Pays' },
                      { icon: FiCheck, value: '100%', label: 'Engagement' },
                    ].map((stat, i) => (
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
          </GridItem>
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <Box
        position="absolute"
        bottom="40px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={1}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Box w="24px" h="40px" border="2px solid" borderColor="whiteAlpha.400" borderRadius="full" position="relative">
            <Box w="2px" h="8px" bg="gold.400" position="absolute" top="8px" left="50%" transform="translateX(-50%)" borderRadius="full" />
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}
