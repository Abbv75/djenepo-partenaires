import { Box, Container, VStack, HStack, Badge, Text, Grid, GridItem, Flex, Button, Icon } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { SERVICES } from '../../../constant/services'
import { SpotlightCard } from '../../../components/reactbits'

const MotionGridItem = motion(GridItem)

export const HomeServicesGrid = () => {
  const homeServices = SERVICES.slice(0, 4)

  return (
    <Box py={{ base: 16, md: 24 }} bg="white" position="relative" overflow="hidden">
      {/* Halo d'ambiance en arrière-plan */}
      <Box
        position="absolute"
        top="10%"
        left="-10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(43,91,196,0.06) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative">
        <VStack mb={{ base: 10, md: 14 }} spacing={4} textAlign="center">
          <Badge
            bg="brand.50"
            color="brand.600"
            px={4}
            py={1.5}
            borderRadius="full"
            fontSize="12px"
            fontWeight={700}
            border="1px solid"
            borderColor="brand.100"
            letterSpacing="0.04em"
            textTransform="uppercase"
          >
            Nos expertises clés
          </Badge>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '28px', md: '40px' }}
            color="gray.900"
            lineHeight={1.2}
            letterSpacing="-0.02em"
          >
            Des solutions sur mesure pour vos projets
          </Text>
          <Text fontSize={{ base: '15px', md: '17px' }} color="gray.600" maxW="600px" lineHeight={1.8}>
            Nous intervenons à chaque étape du cycle de projet pour maximiser votre impact,
            garantir la transparence et piloter par la preuve.
          </Text>
        </VStack>

        {/* Bento Grid Asymétrique 12 colonnes */}
        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }}
          gap={6}
          alignItems="stretch"
        >
          {homeServices.map((s, i) => {
            // Asymétrie Bento : Row 1 (7 cols + 5 cols), Row 2 (5 cols + 7 cols)
            const isWide = i === 0 || i === 3;
            const colSpan = { base: 12, lg: isWide ? 7 : 5 };

            return (
              <MotionGridItem
                key={s.id}
                colSpan={colSpan}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                display="flex"
              >
                <Link to="/services" hash={s.id} style={{ width: '100%', display: 'flex' }}>
                  <SpotlightCard
                    spotlightColor="rgba(43, 91, 196, 0.1)"
                    spotlightSize={320}
                    w="full"
                    bg="#fafbfc"
                    borderRadius="24px"
                    p={{ base: 6, md: 8 }}
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.02)"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px -10px rgba(43, 91, 196, 0.12)',
                      borderColor: 'brand.300',
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      {/* En-tête : Icône + Badge Tagline */}
                      <Flex justify="space-between" align="center" mb={5}>
                        <Box
                          w="54px"
                          h="54px"
                          bg={s.bg}
                          borderRadius="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="1px solid"
                          borderColor="whiteAlpha.400"
                          boxShadow="0 4px 12px rgba(0,0,0,0.04)"
                        >
                          <Icon as={s.icon} color={s.color} fontSize="22px" />
                        </Box>

                        <Badge
                          bg="white"
                          color="gray.600"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="11px"
                          fontWeight={600}
                          border="1px solid"
                          borderColor="gray.200"
                        >
                          {s.tagline}
                        </Badge>
                      </Flex>

                      {/* Titre & Description */}
                      <Text
                        fontFamily="heading"
                        fontWeight={800}
                        fontSize={{ base: '18px', md: '21px' }}
                        color="gray.900"
                        mb={3}
                        lineHeight={1.3}
                      >
                        {s.title}
                      </Text>

                      <Text fontSize="14px" color="gray.600" lineHeight={1.7} mb={6}>
                        {s.desc}
                      </Text>

                      {/* Caractéristiques principales (visible sur grand format) */}
                      {isWide && s.features && (
                        <Box pt={2} mb={6}>
                          <HStack wrap="wrap" spacing={2}>
                            {s.features.slice(0, 3).map((feat, idx) => (
                              <HStack
                                key={idx}
                                spacing={1.5}
                                bg="white"
                                px={3}
                                py={1.5}
                                borderRadius="10px"
                                border="1px solid"
                                borderColor="gray.150"
                              >
                                <Icon as={FiCheck} color="brand.600" fontSize="12px" />
                                <Text fontSize="12px" color="gray.700" fontWeight={500}>
                                  {feat}
                                </Text>
                              </HStack>
                            ))}
                          </HStack>
                        </Box>
                      )}
                    </Box>

                    {/* Footer : Lien interactif */}
                    <Flex
                      justify="space-between"
                      align="center"
                      pt={4}
                      borderTop="1px solid"
                      borderColor="gray.100"
                    >
                      <Text fontSize="12px" fontWeight={600} color="gray.400">
                        En savoir plus
                      </Text>
                      <HStack
                        spacing={1.5}
                        color="brand.600"
                        fontWeight={700}
                        fontSize="13px"
                        transition="transform 0.2s"
                        _groupHover={{ transform: 'translateX(4px)' }}
                      >
                        <Text>Explorer</Text>
                        <Icon as={FiArrowRight} />
                      </HStack>
                    </Flex>
                  </SpotlightCard>
                </Link>
              </MotionGridItem>
            )
          })}
        </Grid>

        {/* Bouton CTA global */}
        <Flex justify="center" mt={12}>
          <Link to="/services">
            <Button
              variant="brand"
              size="lg"
              px={9}
              h="54px"
              borderRadius="16px"
              fontWeight={700}
              rightIcon={<FiArrowRight />}
              boxShadow="0 8px 25px rgba(43,91,196,0.3)"
            >
              Découvrir l'ensemble de nos services
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
