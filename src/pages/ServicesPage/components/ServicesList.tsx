import { useState, useMemo } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Icon,
  Text,
  Badge,
  Button,
  Grid,
  GridItem,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import {
  FiCheck,
  FiArrowRight,
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
  FiHelpCircle,
  FiAward,
} from 'react-icons/fi'
import { useServices } from '../../../api/useServicesQuery'
import { useServiceCategories } from '../../../api/useServiceCategoriesQuery'
import { SpotlightCard } from '../../../components/reactbits'

const MotionBox = motion(Box)

const iconMap: Record<string, any> = {
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
}

const styleMap: Record<string, { color: string; bg: string; glow: string }> = {
  planification: {
    color: '#2B5BC4',
    bg: '#eef4ff',
    glow: 'rgba(43, 91, 196, 0.14)',
  },
  suivi: {
    color: '#C8861A',
    bg: '#fff9ed',
    glow: 'rgba(200, 134, 26, 0.16)',
  },
  formation: {
    color: '#0D9488',
    bg: '#f0fdfa',
    glow: 'rgba(13, 148, 136, 0.14)',
  },
  appui: {
    color: '#7C3AED',
    bg: '#f5f3ff',
    glow: 'rgba(124, 58, 237, 0.14)',
  },
  recherche: {
    color: '#EA580C',
    bg: '#fff7ed',
    glow: 'rgba(234, 88, 12, 0.14)',
  },
  coaching: {
    color: '#DB2777',
    bg: '#fdf2f8',
    glow: 'rgba(219, 39, 119, 0.14)',
  },
}

const getServiceStyle = (slug: string) => {
  return (
    styleMap[slug] || {
      color: '#2B5BC4',
      bg: '#eef4ff',
      glow: 'rgba(43, 91, 196, 0.14)',
    }
  )
}

export const ServicesList = () => {
  const { data: services = [], isLoading, isError } = useServices()
  const { data: categories = [] } = useServiceCategories()
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')

  // Catégories avec comptage
  const categoryFilterList = useMemo(() => {
    return [
      { id: 'Toutes', name: 'Toutes les expertises', count: services.length },
      ...categories.map((cat) => ({
        id: cat.id.toString(),
        name: cat.name,
        count: services.filter((s) => s.service_category_id === cat.id).length,
      })),
    ]
  }, [categories, services])

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'Toutes') return services
    const catId = parseInt(selectedCategory, 10)
    return services.filter((s) => s.service_category_id === catId)
  }, [services, selectedCategory])

  if (isLoading) {
    return (
      <Box py={24} display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="3px" speed="0.75s" />
          <Text fontSize="14px" color="gray.500" fontWeight={500}>
            Chargement des expertises...
          </Text>
        </VStack>
      </Box>
    )
  }

  if (isError) {
    return (
      <Container maxW="1200px" py={12}>
        <Alert status="error" borderRadius="16px" p={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight={700}>Erreur de chargement</Text>
            <Text fontSize="14px" color="gray.700">
              Impossible de charger les services pour le moment. Veuillez vérifier votre connexion.
            </Text>
          </Box>
        </Alert>
      </Container>
    )
  }

  return (
    <Box py={{ base: 14, md: 20 }} bg="#fafbfc">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        {/* Filtre par catégorie de services */}
        {categories.length > 0 && (
          <HStack
            wrap="wrap"
            justify="center"
            spacing={2.5}
            mb={{ base: 12, md: 16 }}
            py={1}
          >
            {categoryFilterList.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <Box
                  key={cat.id}
                  as="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="13px"
                  fontWeight={600}
                  bg={isSelected ? 'brand.600' : 'white'}
                  color={isSelected ? 'white' : 'gray.600'}
                  border="1px solid"
                  borderColor={isSelected ? 'brand.600' : 'gray.200'}
                  boxShadow={isSelected ? '0 4px 12px rgba(43,91,196,0.25)' : 'none'}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    bg: isSelected ? 'brand.700' : 'gray.50',
                    borderColor: isSelected ? 'brand.700' : 'gray.300',
                    transform: 'translateY(-1px)',
                  }}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  <Text>{cat.name}</Text>
                  <Box
                    as="span"
                    px={1.5}
                    py={0.5}
                    borderRadius="full"
                    fontSize="11px"
                    bg={isSelected ? 'whiteAlpha.300' : 'gray.100'}
                    color={isSelected ? 'white' : 'gray.500'}
                  >
                    {cat.count}
                  </Box>
                </Box>
              )
            })}
          </HStack>
        )}

        {/* Liste des Services en Cartes Spotlight Bento */}
        <VStack spacing={12} align="stretch">
          {filteredServices.map((service, i) => {
            const style = getServiceStyle(service.slug)
            const iconComponent = iconMap[service.icon] || FiHelpCircle
            const isReversed = i % 2 === 1

            return (
              <MotionBox
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.05 }}
                scrollMarginTop="110px"
              >
                <SpotlightCard
                  spotlightColor={style.glow}
                  spotlightSize={420}
                  bg="white"
                  borderRadius="28px"
                  p={{ base: 6, md: 10 }}
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="0 6px 30px rgba(0, 0, 0, 0.03)"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.09)',
                    borderColor: 'brand.200',
                  }}
                >
                  <Grid
                    templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }}
                    gap={{ base: 8, lg: 12 }}
                    alignItems="center"
                  >
                    {/* Colonne Contenu */}
                    <GridItem order={{ base: 1, lg: isReversed ? 2 : 1 }}>
                      <VStack align="flex-start" spacing={5}>
                        {/* En-tête : Badge Catégorie + Slug */}
                        <HStack spacing={2.5} wrap="wrap">
                          <Badge
                            bg={style.bg}
                            color={style.color}
                            px={3.5}
                            py={1}
                            borderRadius="full"
                            fontSize="11px"
                            fontWeight={700}
                            letterSpacing="0.04em"
                            textTransform="uppercase"
                          >
                            {service.tagline}
                          </Badge>
                          {service.service_category && (
                            <Badge
                              bg="gray.100"
                              color="gray.700"
                              fontSize="11px"
                              borderRadius="full"
                              px={3}
                              py={1}
                              fontWeight={600}
                            >
                              {service.service_category.name}
                            </Badge>
                          )}
                        </HStack>

                        {/* Titre avec Icône */}
                        <HStack spacing={3.5} align="center">
                          <Box
                            w="48px"
                            h="48px"
                            borderRadius="14px"
                            bg={style.bg}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            border="1px solid"
                            borderColor="whiteAlpha.400"
                          >
                            <Icon as={iconComponent} color={style.color} fontSize="22px" />
                          </Box>
                          <Text
                            fontFamily="heading"
                            fontWeight={800}
                            fontSize={{ base: '22px', md: '28px' }}
                            color="gray.900"
                            lineHeight={1.25}
                            letterSpacing="-0.01em"
                          >
                            {service.title}
                          </Text>
                        </HStack>

                        {/* Description */}
                        <Text color="gray.600" fontSize={{ base: '14px', md: '15px' }} lineHeight={1.8}>
                          {service.desc}
                        </Text>

                        {/* Grille des caractéristiques et interventions */}
                        {service.features && service.features.length > 0 && (
                          <Box w="full" pt={2}>
                            <Text
                              fontSize="12px"
                              fontWeight={700}
                              color="gray.400"
                              textTransform="uppercase"
                              letterSpacing="0.05em"
                              mb={3}
                            >
                              Périmètre d'intervention :
                            </Text>
                            <Grid
                              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
                              gap={2.5}
                            >
                              {service.features.map((feat, idx) => (
                                <HStack
                                  key={idx}
                                  spacing={2.5}
                                  align="flex-start"
                                  p={2.5}
                                  borderRadius="12px"
                                  bg="gray.50"
                                  border="1px solid"
                                  borderColor="gray.150"
                                  transition="all 0.2s"
                                  _hover={{ bg: style.bg, borderColor: style.color }}
                                >
                                  <Icon as={FiCheck} color={style.color} fontSize="14px" mt={0.5} flexShrink={0} />
                                  <Text fontSize="13px" color="gray.700" fontWeight={500} lineHeight={1.4}>
                                    {feat}
                                  </Text>
                                </HStack>
                              ))}
                            </Grid>
                          </Box>
                        )}

                        {/* Bouton d'action direct */}
                        <Box pt={3}>
                          <Link to="/contact">
                            <Button
                              variant="outline_brand"
                              size="md"
                              h="46px"
                              px={6}
                              borderRadius="14px"
                              fontWeight={600}
                              fontSize="14px"
                              rightIcon={<FiArrowRight />}
                            >
                              Solliciter notre expertise sur ce volet
                            </Button>
                          </Link>
                        </Box>
                      </VStack>
                    </GridItem>

                    {/* Colonne Visuelle Interactive */}
                    <GridItem order={{ base: 2, lg: isReversed ? 1 : 2 }}>
                      <Box
                        bg={style.bg}
                        borderRadius="24px"
                        p={{ base: 6, md: 8 }}
                        position="relative"
                        overflow="hidden"
                        border="1px solid"
                        borderColor="rgba(0, 0, 0, 0.04)"
                        minH={{ base: '260px', md: '340px' }}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        {/* Halos d'ambiance géométriques */}
                        <Box
                          position="absolute"
                          top="-40px"
                          right="-40px"
                          w="180px"
                          h="180px"
                          borderRadius="full"
                          bg={style.color}
                          opacity={0.12}
                          filter="blur(25px)"
                        />
                        <Box
                          position="absolute"
                          bottom="-30px"
                          left="-30px"
                          w="140px"
                          h="140px"
                          borderRadius="full"
                          bg={style.color}
                          opacity={0.08}
                          filter="blur(20px)"
                        />

                        {/* Badge de garantie méthodologique */}
                        <Flex justify="space-between" align="center" position="relative" zIndex={1}>
                          <HStack spacing={2} bg="white" px={3} py={1} borderRadius="full" boxShadow="sm">
                            <Icon as={FiAward} color={style.color} fontSize="13px" />
                            <Text fontSize="11px" fontWeight={700} color="gray.700">
                              Livrable Garanti
                            </Text>
                          </HStack>
                          <Text fontSize="11px" fontWeight={600} color={style.color}>
                            Cabinet Certifié S&E
                          </Text>
                        </Flex>

                        {/* Carte centrale élégante */}
                        <VStack
                          spacing={3}
                          py={6}
                          position="relative"
                          zIndex={1}
                          textAlign="center"
                        >
                          <Box
                            w="80px"
                            h="80px"
                            bg="white"
                            borderRadius="22px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            boxShadow="0 14px 35px rgba(0, 0, 0, 0.08)"
                            border="1px solid"
                            borderColor="rgba(0, 0, 0, 0.04)"
                            transition="transform 0.3s ease"
                            _hover={{ transform: 'scale(1.08)' }}
                          >
                            <Icon as={iconComponent} color={style.color} fontSize="34px" />
                          </Box>

                          <Text
                            fontFamily="heading"
                            fontWeight={800}
                            fontSize="17px"
                            color="gray.900"
                            maxW="260px"
                            lineHeight={1.3}
                          >
                            {service.title}
                          </Text>

                          <Text fontSize="12px" color="gray.500" maxW="240px">
                            {service.tagline}
                          </Text>
                        </VStack>

                        {/* Footer d'information */}
                        <HStack
                          justify="center"
                          position="relative"
                          zIndex={1}
                          pt={2}
                          borderTop="1px solid"
                          borderColor="rgba(0, 0, 0, 0.06)"
                        >
                          <Text fontSize="12px" fontWeight={600} color={style.color}>
                            Méthodologie standardisée & outillage digital
                          </Text>
                        </HStack>
                      </Box>
                    </GridItem>
                  </Grid>
                </SpotlightCard>
              </MotionBox>
            )
          })}
        </VStack>
      </Container>
    </Box>
  )
}
