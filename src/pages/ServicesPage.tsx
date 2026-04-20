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
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiCheck,
  FiArrowRight,
  FiBookOpen,
  FiBarChart2,
  FiCompass,
  FiLayers,
} from 'react-icons/fi'

const MotionBox = motion(Box)

const services = [
  {
    id: 'planification',
    icon: FiCompass,
    color: 'brand.600',
    bg: 'brand.50',
    title: 'Planification Stratégique',
    tagline: 'Des projets bien conçus dès le départ',
    desc: 'Nous aidons vos équipes à construire des cadres d\'intervention cohérents, à définir des théories du changement réalistes et à aligner vos activités sur vos objectifs de développement.',
    features: [
      'Élaboration de cadres logiques et logiques d\'intervention',
      'Construction de théories du changement participatives',
      'Analyse des parties prenantes et cartographie des acteurs',
      'Formulation de projets et programmes',
      'Alignement stratégique sur les ODD',
    ],
  },
  {
    id: 'suivi',
    icon: FiTrendingUp,
    color: 'gold.500',
    bg: 'gold.50',
    title: 'Suivi-Évaluation',
    tagline: 'Mesurer pour mieux agir',
    desc: 'DJENEPO PARTNERS conçoit et met en place des systèmes de suivi-évaluation robustes qui permettent à vos équipes de mesurer l\'impact réel de leurs interventions et de prendre des décisions fondées sur des données.',
    features: [
      'Conception de cadres de mesure de la performance (CMP)',
      'Développement d\'indicateurs SMART et tableaux de bord',
      'Mise en place de systèmes de collecte de données',
      'Évaluations intermédiaires et finales',
      'Analyse et capitalisation des résultats',
    ],
  },
  {
    id: 'formation',
    icon: FiUsers,
    color: 'teal.500',
    bg: 'teal.50',
    title: 'Formation & Renforcement des Capacités',
    tagline: 'Investir dans les hommes',
    desc: 'Nous développons et animons des programmes de formation sur mesure qui renforcent durablement les compétences des équipes projet, des coordinateurs terrain et des responsables de suivi-évaluation.',
    features: [
      'Formations en gestion axée sur les résultats (GAR)',
      'Ateliers de renforcement en suivi-évaluation',
      'Formation à la collecte de données mobile (KoboToolbox, ODK)',
      'Mentoring et accompagnement des équipes',
      'Développement de guides et outils pédagogiques',
    ],
  },
  {
    id: 'appui',
    icon: FiLayers,
    color: 'purple.500',
    bg: 'purple.50',
    title: 'Appui Technique',
    tagline: 'Un accompagnement opérationnel sur le terrain',
    desc: 'Nos experts interviennent directement auprès de vos équipes pour apporter un soutien technique ciblé dans la mise en œuvre de vos projets et programmes de développement.',
    features: [
      'Accompagnement à la mise en œuvre de projets',
      'Revues de performances et audits de projet',
      'Facilitation d\'ateliers et de réunions stratégiques',
      'Rédaction de rapports et documents techniques',
      'Conseil en stratégie organisationnelle',
    ],
  },
  {
    id: 'recherche',
    icon: FiBarChart2,
    color: 'orange.500',
    bg: 'orange.50',
    title: 'Recherche & Analyses',
    tagline: 'Des données pour guider vos décisions',
    desc: 'Nous réalisons des études de base, des enquêtes terrain et des analyses sectorielles qui alimentent la prise de décision éclairée et améliorent la conception des interventions.',
    features: [
      'Études de base et de fin de projet',
      'Enquêtes ménages et sondages d\'opinion',
      'Analyses de contexte et diagnostics sectoriels',
      'Cartographie des besoins et vulnérabilités',
      'Rapports d\'analyse et de synthèse',
    ],
  },
  {
    id: 'coaching',
    icon: FiBookOpen,
    color: 'pink.500',
    bg: 'pink.50',
    title: 'Coaching Organisationnel',
    tagline: 'Renforcer votre organisation de l\'intérieur',
    desc: 'Nous accompagnons les organisations dans leur développement institutionnel, la structuration de leurs processus internes et l\'amélioration de leur gouvernance pour une efficacité accrue.',
    features: [
      'Diagnostic organisationnel et plan de développement',
      'Structuration des processus internes',
      'Amélioration de la gouvernance et des procédures',
      'Gestion du changement organisationnel',
      'Développement de politiques et manuels de procédures',
    ],
  },
]

export default function ServicesPage() {
  return (
    <Box pt="72px">
      {/* Header */}
      <Box
        bg="linear-gradient(135deg, #f8f9ff 0%, #eff3fb 100%)"
        py={{ base: 16, md: 24 }}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack textAlign="center" spacing={5} maxW="700px" mx="auto">
            <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
              Ce que nous faisons
            </Badge>
            <Text
              as="h1"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '32px', md: '48px' }}
              color="gray.900"
              lineHeight={1.15}
            >
              Nos services d'accompagnement
            </Text>
            <Text fontSize="17px" color="gray.600" lineHeight={1.8}>
              De la conception à l'évaluation, DJENEPO PARTNERS offre un accompagnement complet
              pour maximiser l'impact de vos projets de développement.
            </Text>
            <Link to="/contact">
              <Button variant="brand" size="lg" px={8} rightIcon={<FiArrowRight />}>
                Discuter de votre projet
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Services List */}
      <Box py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={16}>
            {services.map((service, i) => (
              <MotionBox
                key={service.id}
                w="full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                <Grid
                  templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                  gap={12}
                  alignItems="center"
                  direction={i % 2 === 1 ? 'row-reverse' : 'row'}
                >
                  <GridItem order={{ base: 1, lg: i % 2 === 1 ? 2 : 1 }}>
                    <HStack spacing={4} mb={5}>
                      <Box
                        w="56px"
                        h="56px"
                        bg={service.bg}
                        borderRadius="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={service.icon} color={service.color} fontSize="24px" />
                      </Box>
                      <Box>
                        <Text fontSize="12px" color="gray.500" fontWeight={600} textTransform="uppercase" letterSpacing="1px">
                          {service.tagline}
                        </Text>
                        <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '20px', md: '26px' }} color="gray.900">
                          {service.title}
                        </Text>
                      </Box>
                    </HStack>

                    <Text color="gray.600" fontSize="16px" lineHeight={1.8} mb={6}>
                      {service.desc}
                    </Text>

                    <List spacing={3}>
                      {service.features.map((f) => (
                        <ListItem key={f} display="flex" alignItems="center">
                          <ListIcon as={FiCheck} color="green.500" />
                          <Text fontSize="14px" color="gray.700">{f}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </GridItem>

                  <GridItem order={{ base: 2, lg: i % 2 === 1 ? 1 : 2 }}>
                    <Box
                      bg={service.bg}
                      borderRadius="24px"
                      p={10}
                      position="relative"
                      overflow="hidden"
                      minH="300px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        position="absolute"
                        top="-30px"
                        right="-30px"
                        w="120px"
                        h="120px"
                        borderRadius="full"
                        bg={service.color}
                        opacity={0.08}
                      />
                      <Box
                        position="absolute"
                        bottom="-20px"
                        left="-20px"
                        w="100px"
                        h="100px"
                        borderRadius="full"
                        bg={service.color}
                        opacity={0.06}
                      />
                      <VStack spacing={4}>
                        <Box
                          w="100px"
                          h="100px"
                          bg="white"
                          borderRadius="24px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow={`0 20px 50px ${service.color}30`}
                        >
                          <Icon as={service.icon} color={service.color} fontSize="44px" />
                        </Box>
                        <Text fontFamily="heading" fontWeight={700} fontSize="18px" color="gray.800" textAlign="center">
                          {service.title}
                        </Text>
                        <Text fontSize="13px" color="gray.500" textAlign="center" maxW="200px">
                          {service.tagline}
                        </Text>
                      </VStack>
                    </Box>
                  </GridItem>
                </Grid>

                {i < services.length - 1 && (
                  <Box h="1px" bg="gray.100" mt={16} />
                )}
              </MotionBox>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* CTA */}
      <Box py={{ base: 16, md: 20 }} bg="gray.50">
        <Container maxW="700px" textAlign="center" px={{ base: 4, md: 6 }}>
          <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '26px', md: '36px' }} color="gray.900" mb={4}>
            Un projet en tête ?
          </Text>
          <Text fontSize="16px" color="gray.600" lineHeight={1.8} mb={8}>
            Nos experts sont disponibles pour analyser vos besoins et vous proposer
            un accompagnement adapté à votre contexte.
          </Text>
          <Link to="/contact">
            <Button variant="brand" size="lg" px={10} rightIcon={<FiArrowRight />}>
              Prendre contact maintenant
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  )
}
