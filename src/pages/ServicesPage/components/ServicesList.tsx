import { Box, Container, VStack, Grid, GridItem, HStack, Icon, Text, List, ListItem, ListIcon, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiCheck,
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
  FiHelpCircle
} from 'react-icons/fi'
import { useServices } from '../../../api/useServicesQuery'

const MotionBox = motion(Box)

const iconMap: Record<string, any> = {
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
};

const styleMap: Record<string, { color: string; bg: string }> = {
  planification: { color: 'brand.600', bg: 'brand.50' },
  suivi: { color: 'gold.500', bg: 'gold.50' },
  formation: { color: 'teal.500', bg: 'teal.50' },
  appui: { color: 'purple.500', bg: 'purple.50' },
  recherche: { color: 'orange.500', bg: 'orange.50' },
  coaching: { color: 'pink.500', bg: 'pink.50' },
};

const getServiceStyle = (slug: string) => {
  return styleMap[slug] || { color: 'brand.600', bg: 'brand.50' };
};

export const ServicesList = () => {
  const { data: services = [], isLoading, isError } = useServices();

  if (isLoading) {
    return (
      <Box py={20} display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxW="1200px" py={10}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          Impossible de charger les services. Veuillez réessayer plus tard.
        </Alert>
      </Container>
    );
  }

  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack spacing={16}>
          {services.map((service, i) => {
            const style = getServiceStyle(service.slug);
            const iconComponent = iconMap[service.icon] || FiHelpCircle;
            
            return (
              <MotionBox
                key={service.id}
                id={service.slug}
                w="full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                scrollMarginTop="100px"
              >
                <Grid
                  templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                  gap={12}
                  alignItems="center"
                >
                  <GridItem order={{ base: 1, lg: i % 2 === 1 ? 2 : 1 }}>
                    <HStack spacing={4} mb={5}>
                      <Box
                        w="56px"
                        h="56px"
                        bg={style.bg}
                        borderRadius="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={iconComponent} color={style.color} fontSize="24px" />
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
                      bg={style.bg}
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
                        bg={style.color}
                        opacity={0.08}
                      />
                      <Box
                        position="absolute"
                        bottom="-20px"
                        left="-20px"
                        w="100px"
                        h="100px"
                        borderRadius="full"
                        bg={style.color}
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
                          boxShadow={`0 20px 50px ${style.color}30`}
                        >
                          <Icon as={iconComponent} color={style.color} fontSize="44px" />
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
            )
          })}
        </VStack>
      </Container>
    </Box>
  )
}
