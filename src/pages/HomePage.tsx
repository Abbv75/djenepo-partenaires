import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
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
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiCheck,
  FiArrowRight,
  FiAward,
  FiGlobe,
  FiBookOpen,
} from 'react-icons/fi'

const MotionBox = motion(Box)

const stats = [
  { value: '50+', label: 'Projets accompagnés', icon: FiTarget },
  { value: '12+', label: 'Années d\'expérience', icon: FiAward },
  { value: '8', label: 'Pays d\'intervention', icon: FiGlobe },
  { value: '200+', label: 'Acteurs formés', icon: FiUsers },
]

const services = [
  {
    icon: FiTarget,
    title: 'Planification Stratégique',
    desc: 'Théories du changement, logiques d\'intervention, cadres logiques adaptés.',
    color: 'brand.600',
    bg: 'brand.50',
  },
  {
    icon: FiTrendingUp,
    title: 'Suivi-Évaluation',
    desc: 'Systèmes de suivi performants, indicateurs SMART, collecte et analyse de données.',
    color: 'gold.500',
    bg: 'gold.50',
  },
  {
    icon: FiUsers,
    title: 'Formation & Renforcement',
    desc: 'Programmes de renforcement des capacités sur mesure pour les équipes terrain.',
    color: 'teal.500',
    bg: 'teal.50',
  },
  {
    icon: FiBookOpen,
    title: 'Appui Technique',
    desc: 'Accompagnement opérationnel des ONG et institutions dans leurs missions.',
    color: 'purple.500',
    bg: 'purple.50',
  },
]

export default function HomePage() {
  return (
    <Box>
      {/* ─── HERO ─── */}
      <Box
        pt={{ base: '100px', md: '120px' }}
        pb={{ base: 16, md: 24 }}
        position="relative"
        overflow="hidden"
        bg="white"
      >
        {/* Background decorations */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="brand.50"
          opacity={0.6}
          zIndex={0}
        />
        <Box
          position="absolute"
          bottom="-80px"
          left="-80px"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="gold.50"
          opacity={0.5}
          zIndex={0}
        />

        <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Badge
                  bg="brand.50"
                  color="brand.600"
                  px={4}
                  py={1.5}
                  borderRadius="full"
                  fontSize="13px"
                  fontWeight={600}
                  mb={5}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  <Box w="6px" h="6px" borderRadius="full" bg="brand.600" />
                  Basé à Bamako, Mali
                </Badge>

                <Text
                  as="h1"
                  fontFamily="heading"
                  fontWeight={800}
                  fontSize={{ base: '36px', md: '50px', lg: '56px' }}
                  lineHeight={1.1}
                  color="gray.900"
                  mb={6}
                >
                  Transformer les projets en{' '}
                  <Text as="span" color="brand.600">
                    leviers d'
                  </Text>
                  <Text as="span" color="gold.500">
                    impact durable
                  </Text>
                </Text>

                <Text fontSize="17px" color="gray.600" lineHeight={1.8} mb={8} maxW="500px">
                  DJENEPO PARTNERS accompagne les ONG, institutions publiques et partenaires
                  techniques dans la conception et la mise en œuvre de projets de développement
                  à fort impact.
                </Text>

                <HStack spacing={4} flexWrap="wrap">
                  <Link to="/services">
                    <Button variant="brand" size="lg" px={8} rightIcon={<FiArrowRight />}>
                      Nos services
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      variant="outline_brand"
                      size="lg"
                      px={8}
                    >
                      Discutons de votre projet
                    </Button>
                  </Link>
                </HStack>

                {/* Trust badges */}
                <HStack mt={10} spacing={6} flexWrap="wrap">
                  {['ONG', 'Institutions', 'Partenaires'].map((t) => (
                    <HStack key={t} spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text fontSize="14px" color="gray.600" fontWeight={500}>{t}</Text>
                    </HStack>
                  ))}
                </HStack>
              </MotionBox>
            </GridItem>

            {/* Stats card */}
            <GridItem display={{ base: 'none', lg: 'block' }}>
              <MotionBox
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Box
                  bg="white"
                  borderRadius="24px"
                  p={8}
                  boxShadow="0 20px 60px rgba(43,91,196,0.12)"
                  border="1px solid"
                  borderColor="gray.100"
                  position="relative"
                >
                  {/* Accent */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="4px"
                    bg="linear-gradient(90deg, #2B5BC4, #C8861A)"
                    borderTopRadius="24px"
                  />

                  <Text fontFamily="heading" fontWeight={700} fontSize="18px" color="gray.800" mb={6}>
                    Notre impact en chiffres
                  </Text>

                  <SimpleGrid columns={2} spacing={6}>
                    {stats.map((s) => (
                      <Box
                        key={s.label}
                        p={5}
                        bg="gray.50"
                        borderRadius="16px"
                        _hover={{ bg: 'brand.50', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <Icon as={s.icon} color="brand.600" fontSize="22px" mb={3} />
                        <Text
                          fontFamily="heading"
                          fontWeight={800}
                          fontSize="30px"
                          color="gray.900"
                          lineHeight={1}
                          mb={1}
                        >
                          {s.value}
                        </Text>
                        <Text fontSize="12px" color="gray.500" fontWeight={500}>
                          {s.label}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>

                  <Box mt={6} p={4} bg="brand.600" borderRadius="12px">
                    <Text color="white" fontSize="13px" fontWeight={600} mb={1}>
                      Partenaires de confiance
                    </Text>
                    <Text color="brand.200" fontSize="12px">
                      ONG · Institutions · Bailleurs · Collectivités
                    </Text>
                  </Box>
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

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
            {services.map((s, i) => (
              <MotionBox
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
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
