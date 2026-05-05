import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  VStack,
  Text,
  Button,
  Icon,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiCheck,
  FiArrowRight,
} from 'react-icons/fi'
import { SERVICES } from '../../constant/services'
import { HomeHero } from '../../components/HomeHero'

const MotionBox = motion(Box)

export default function HomePage() {
  // Take first 4 services for the home page summary
  const homeServices = SERVICES.slice(0, 4)

  return (
    <Box>
      <HomeHero />

      {/* ─── ABOUT STRIP ─── */}
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

      {/* ─── SERVICES ─── */}
      <Box py={{ base: 16, md: 24 }} bg="gray.50">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack mb={12} spacing={4} textAlign="center">
            <Badge bg="gold.50" color="gold.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
              Nos expertises
            </Badge>
            <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '28px', md: '38px' }} color="gray.900">
              Des services sur mesure pour vos projets
            </Text>
            <Text fontSize="16px" color="gray.600" maxW="560px" lineHeight={1.8}>
              Nous intervenons à chaque étape du cycle de projet pour maximiser votre impact
              sur le terrain.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {homeServices.map((s, i) => (
              <MotionBox
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/services#${s.id}`}>
                  <Box
                    bg="white"
                    borderRadius="20px"
                    p={7}
                    h="full"
                    border="1px solid"
                    borderColor="gray.100"
                    _hover={{
                      boxShadow: '0 12px 40px rgba(43,91,196,0.12)',
                      transform: 'translateY(-4px)',
                      borderColor: 'brand.200',
                    }}
                    transition="all 0.3s ease"
                    cursor="pointer"
                  >
                    <Box
                      w="52px"
                      h="52px"
                      bg={s.bg}
                      borderRadius="14px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={5}
                    >
                      <Icon as={s.icon} color={s.color} fontSize="22px" />
                    </Box>
                    <Text fontFamily="heading" fontWeight={700} fontSize="16px" color="gray.900" mb={3}>
                      {s.title}
                    </Text>
                    <Text fontSize="14px" color="gray.600" lineHeight={1.7}>
                      {s.desc}
                    </Text>
                  </Box>
                </Link>
              </MotionBox>
            ))}
          </SimpleGrid>

          <Flex justify="center" mt={10}>
            <Link to="/services">
              <Button variant="brand" size="lg" px={8} rightIcon={<FiArrowRight />}>
                Voir tous nos services
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* ─── CTA ─── */}
      <Box py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="800px" px={{ base: 4, md: 6 }}>
          <Box
            bg="linear-gradient(135deg, #2B5BC4 0%, #1f3fa0 100%)"
            borderRadius="28px"
            p={{ base: 8, md: 14 }}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="-60px"
              right="-60px"
              w="200px"
              h="200px"
              borderRadius="full"
              bg="rgba(255,255,255,0.07)"
            />
            <Box
              position="absolute"
              bottom="-40px"
              left="-40px"
              w="150px"
              h="150px"
              borderRadius="full"
              bg="rgba(200,134,26,0.2)"
            />
            <Text
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '26px', md: '36px' }}
              color="white"
              mb={4}
              position="relative"
            >
              Prêt à transformer votre projet ?
            </Text>
            <Text color="brand.200" fontSize="16px" mb={8} lineHeight={1.7} position="relative">
              Parlons de vos objectifs et voyons comment DJENEPO PARTNERS peut
              vous accompagner vers un impact durable.
            </Text>
            <Link to="/contact">
              <Button
                bg="gold.500"
                color="white"
                size="lg"
                px={10}
                py={7}
                fontSize="16px"
                fontWeight={700}
                borderRadius="12px"
                _hover={{ bg: 'gold.600', transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(200,134,26,0.4)' }}
                transition="all 0.2s"
                position="relative"
              >
                Contactez-nous aujourd'hui
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
