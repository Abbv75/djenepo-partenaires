import { Link } from 'react-router-dom'
import {
  Box,
  Container, HStack,
  VStack,
  Text,
  Button,
  Icon,
  Badge,
  SimpleGrid,
  Tag
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiTarget
} from 'react-icons/fi'

const MotionBox = motion(Box)

const realisations = [
  {
    id: 1,
    category: 'Suivi-Évaluation',
    categoryColor: 'brand',
    title: 'Système de Suivi-Évaluation du Programme FIDA Burundi',
    client: 'FIDA / Gouvernement du Burundi',
    location: 'Burundi',
    year: '2022–2024',
    beneficiaires: '12 000 ménages',
    desc: 'Conception et mise en place d\'un système de suivi-évaluation intégré pour un programme agricole couvrant 3 provinces du Burundi, incluant des outils de collecte mobile, un tableau de bord de performance et des formations d\'équipes terrain.',
    impact: [
      'Système de monitoring déployé sur 3 provinces',
      '+85% de la qualité des rapports mensuels',
      '45 agents terrain formés à la collecte mobile',
    ],
    tags: ['FIDA', 'Agriculture', 'S&E', 'KoboToolbox'],
  },
  {
    id: 2,
    category: 'Planification',
    categoryColor: 'gold',
    title: 'Élaboration du Plan Stratégique d\'une ONG nationale',
    client: 'ONG Santé Communautaire Mali',
    location: 'Mali',
    year: '2023',
    beneficiaires: '5 régions couvertes',
    desc: 'Accompagnement d\'une ONG nationale de santé dans l\'élaboration de son plan stratégique quinquennal 2023–2028, incluant une analyse de contexte approfondie, des consultations participatives auprès de 200 parties prenantes et la définition d\'une théorie du changement.',
    impact: [
      'Plan stratégique 5 ans adopté par le conseil d\'administration',
      '+200 parties prenantes consultées',
      'Cadre logique aligné sur les ODD 3 et 5',
    ],
    tags: ['Santé', 'Stratégie', 'ODD', 'Participation'],
  },
  {
    id: 3,
    category: 'Formation',
    categoryColor: 'teal',
    title: 'Programme de Renforcement des Capacités en GAR',
    client: 'Consortium d\'ONG – Région de Mopti',
    location: 'Mali – Mopti',
    year: '2022',
    beneficiaires: '65 agents formés',
    desc: 'Animation d\'un programme de formation intensive sur la Gestion Axée sur les Résultats (GAR) pour un consortium de 8 ONG locales intervenant dans les secteurs de l\'éducation, la nutrition et la protection de l\'enfance dans la région de Mopti.',
    impact: [
      '65 agents et coordinateurs formés en 3 sessions',
      '8 ONG partenaires renforcées',
      'Guides pratiques GAR produits en 3 langues',
    ],
    tags: ['GAR', 'Formation', 'Éducation', 'Mopti'],
  },
  {
    id: 4,
    category: 'Appui Technique',
    categoryColor: 'purple',
    title: 'Évaluation Finale du Programme PAIFAR-B',
    client: 'FIDA / Gouvernement du Burkina Faso',
    location: 'Burkina Faso',
    year: '2023',
    beneficiaires: '18 000 bénéficiaires',
    desc: 'Conduite d\'une évaluation externe finale d\'un programme de développement rural, incluant une enquête terrain auprès de 800 ménages, des entretiens qualitatifs avec les parties prenantes et la rédaction d\'un rapport d\'évaluation complet.',
    impact: [
      'Rapport d\'évaluation soumis au FIDA',
      'Données collectées auprès de 800 ménages',
      'Recommandations stratégiques intégrées',
    ],
    tags: ['Évaluation', 'Rural', 'FIDA', 'Burkina Faso'],
  },
  {
    id: 5,
    category: 'Recherche',
    categoryColor: 'orange',
    title: 'Étude de Référence – Projet Nutrition Sénégal',
    client: 'ONG Internationale – USAID',
    location: 'Sénégal',
    year: '2021',
    beneficiaires: '3 régions',
    desc: 'Réalisation d\'une étude de base pour un projet de nutrition financé par USAID couvrant 3 régions du Sénégal. Enquête quantitative auprès de 1200 ménages et entretiens qualitatifs pour établir les valeurs de référence des indicateurs de nutrition infantile.',
    impact: [
      'Enquête auprès de 1 200 ménages',
      'Baseline validée par USAID',
      'Indicateurs de nutrition établis pour 5 ans',
    ],
    tags: ['Nutrition', 'Recherche', 'USAID', 'Sénégal'],
  },
  {
    id: 6,
    category: 'Coaching',
    categoryColor: 'pink',
    title: 'Restructuration Institutionnelle – Collectivité Locale',
    client: 'Mairie de Bamako – District',
    location: 'Mali – Bamako',
    year: '2024',
    beneficiaires: '250 000 habitants',
    desc: 'Accompagnement d\'une collectivité territoriale dans la restructuration de ses services, l\'élaboration de manuels de procédures et la mise en place d\'un système de planification et de budget axé sur les résultats.',
    impact: [
      'Manuel de procédures adopté',
      'Plan de développement communal élaboré',
      '80 agents communaux sensibilisés',
    ],
    tags: ['Gouvernance', 'Institutions', 'Bamako', 'Planning'],
  },
]

const categoryColorMap: Record<string, any> = {
  brand: { bg: 'brand.50', color: 'brand.600' },
  gold: { bg: 'gold.50', color: 'gold.600' },
  teal: { bg: 'teal.50', color: 'teal.600' },
  purple: { bg: 'purple.50', color: 'purple.600' },
  orange: { bg: 'orange.50', color: 'orange.600' },
  pink: { bg: 'pink.50', color: 'pink.600' },
}

export default function RealisationsPage() {
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
              Notre portfolio
            </Badge>
            <Text
              as="h1"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '32px', md: '48px' }}
              color="gray.900"
              lineHeight={1.15}
            >
              Nos réalisations
            </Text>
            <Text fontSize="17px" color="gray.600" lineHeight={1.8}>
              Découvrez quelques projets phares pour lesquels DJENEPO PARTNERS a apporté
              son expertise pour créer un impact durable sur le terrain.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Stats band */}
      <Box bg="brand.600" py={10}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
            {[
              { val: '50+', label: 'Projets réalisés' },
              { val: '8', label: 'Pays couverts' },
              { val: '12+', label: "Années d'expérience" },
              { val: '30+', label: 'Clients satisfaits' },
            ].map((s) => (
              <Box key={s.label}>
                <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '28px', md: '36px' }} color="white">
                  {s.val}
                </Text>
                <Text color="brand.200" fontSize="13px" fontWeight={500}>
                  {s.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Cards */}
      <Box py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {realisations.map((r, i) => {
              const colors = categoryColorMap[r.categoryColor]
              return (
                <MotionBox
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Box
                    bg="white"
                    borderRadius="20px"
                    border="1px solid"
                    borderColor="gray.100"
                    overflow="hidden"
                    h="full"
                    display="flex"
                    flexDirection="column"
                    _hover={{
                      boxShadow: '0 16px 48px rgba(43,91,196,0.12)',
                      transform: 'translateY(-4px)',
                      borderColor: 'brand.200',
                    }}
                    transition="all 0.3s ease"
                  >
                    {/* Color bar */}
                    <Box h="5px" bg={`${r.categoryColor === 'brand' ? 'brand.600' : r.categoryColor === 'gold' ? 'gold.500' : `${r.categoryColor}.500`}`} />

                    <Box p={7} flex={1} display="flex" flexDirection="column">
                      {/* Category */}
                      <HStack mb={4} justify="space-between">
                        <Badge
                          bg={colors.bg}
                          color={colors.color}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="12px"
                          fontWeight={600}
                        >
                          {r.category}
                        </Badge>
                        <HStack spacing={1} color="gray.400">
                          <Icon as={FiCalendar} fontSize="12px" />
                          <Text fontSize="12px">{r.year}</Text>
                        </HStack>
                      </HStack>

                      {/* Title */}
                      <Text
                        fontFamily="heading"
                        fontWeight={700}
                        fontSize="17px"
                        color="gray.900"
                        lineHeight={1.4}
                        mb={3}
                      >
                        {r.title}
                      </Text>

                      {/* Client + Location */}
                      <VStack align="flex-start" spacing={1} mb={4}>
                        <HStack spacing={2}>
                          <Icon as={FiUsers} color="gray.400" fontSize="13px" />
                          <Text fontSize="13px" color="gray.600">{r.client}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FiMapPin} color="gray.400" fontSize="13px" />
                          <Text fontSize="13px" color="gray.600">{r.location}</Text>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FiTarget} color="gray.400" fontSize="13px" />
                          <Text fontSize="13px" color="gray.600">{r.beneficiaires}</Text>
                        </HStack>
                      </VStack>

                      {/* Desc */}
                      <Text fontSize="14px" color="gray.600" lineHeight={1.7} mb={5} flex={1}>
                        {r.desc}
                      </Text>

                      {/* Impact */}
                      <Box bg="gray.50" borderRadius="12px" p={4} mb={5}>
                        <Text fontSize="12px" fontWeight={700} color="gray.700" mb={2} textTransform="uppercase" letterSpacing="0.5px">
                          Résultats clés
                        </Text>
                        <VStack align="flex-start" spacing={1.5}>
                          {r.impact.map((imp) => (
                            <HStack key={imp} spacing={2} align="flex-start">
                              <Box w="5px" h="5px" borderRadius="full" bg="green.500" mt="6px" flexShrink={0} />
                              <Text fontSize="12px" color="gray.700">{imp}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      {/* Tags */}
                      <HStack flexWrap="wrap" gap={2}>
                        {r.tags.map((tag) => (
                          <Tag
                            key={tag}
                            size="sm"
                            bg="gray.100"
                            color="gray.600"
                            borderRadius="full"
                            fontSize="11px"
                            fontWeight={600}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </HStack>
                    </Box>
                  </Box>
                </MotionBox>
              )
            })}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA */}
      <Box py={{ base: 16, md: 20 }} bg="gray.50">
        <Container maxW="700px" textAlign="center" px={{ base: 4, md: 6 }}>
          <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '26px', md: '36px' }} color="gray.900" mb={4}>
            Votre projet peut être le prochain
          </Text>
          <Text fontSize="16px" color="gray.600" lineHeight={1.8} mb={8}>
            Rejoignez nos clients satisfaits et transformez votre projet en levier
            d'impact durable pour les populations.
          </Text>
          <Link to="/contact">
            <Button variant="brand" size="lg" px={10} rightIcon={<FiArrowRight />}>
              Lancer votre projet avec nous
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  )
}
