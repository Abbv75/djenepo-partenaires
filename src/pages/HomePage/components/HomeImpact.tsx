import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
  Image,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiActivity, FiTarget, FiPieChart, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import { SpotlightCard, CountUp } from '../../../components/reactbits'

const MotionBox = motion(Box)

interface ImpactStatProps {
  icon: any
  label: string
  numericValue?: number
  textValue?: string
  prefix?: string
  suffix?: string
  color: string
  delay: number
}

const ImpactStat = ({ icon, label, numericValue, textValue, prefix = '', suffix = '', color, delay }: ImpactStatProps) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    h="full"
  >
    <SpotlightCard
      spotlightColor={color === 'brand' ? 'rgba(43,91,196,0.12)' : 'rgba(200,134,26,0.14)'}
      spotlightSize={260}
      bg="white"
      p={5}
      borderRadius="20px"
      boxShadow="0 10px 30px rgba(0,0,0,0.04)"
      border="1px solid"
      borderColor="gray.150"
      _hover={{
        borderColor: `${color}.300`,
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
      }}
      h="full"
    >
      <HStack spacing={4}>
        <Box p={3} bg={`${color}.50`} borderRadius="14px" border="1px solid" borderColor={`${color}.100`}>
          <Icon as={icon} color={`${color}.600`} fontSize="22px" />
        </Box>
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="12px" color="gray.500" fontWeight={600} textTransform="uppercase" letterSpacing="0.05em">
            {label}
          </Text>
          <Text fontSize="22px" fontWeight={800} color="gray.900" lineHeight={1.2}>
            {numericValue !== undefined ? (
              <CountUp to={numericValue} prefix={prefix} suffix={suffix} duration={1.8} />
            ) : (
              textValue
            )}
          </Text>
        </VStack>
      </HStack>
    </SpotlightCard>
  </MotionBox>
)

export const HomeImpact = () => {
  return (
    <Box py={{ base: 20, md: 32 }} bg="#f8faff" overflow="hidden" position="relative">
      {/* Decorative Halo */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w="450px"
        h="450px"
        bg="radial-gradient(circle, rgba(200,134,26,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16} alignItems="center">
          <VStack align="flex-start" spacing={8}>
            <VStack align="flex-start" spacing={4}>
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
                Performance & Impact
              </Badge>
              <Text
                as="h2"
                fontFamily="heading"
                fontWeight={800}
                fontSize={{ base: '30px', md: '44px' }}
                color="gray.900"
                lineHeight={1.15}
                letterSpacing="-0.02em"
              >
                Optimisez vos résultats grâce au{' '}
                <Text as="span" color="gold.500">
                  Suivi & Évaluation
                </Text>
              </Text>
              <Text fontSize="16px" color="gray.600" lineHeight={1.8}>
                L'utilisation de dispositifs de suivi et d'outils d'évaluation rigoureux permet non seulement de mesurer l'impact, mais surtout de l'amplifier. Nous transformons vos données en décisions stratégiques.
              </Text>
            </VStack>

            {/* Grille de stats d'impact avec SpotlightCard et CountUp */}
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} w="full">
              <ImpactStat icon={FiTrendingUp} label="Efficacité" numericValue={45} prefix="+" suffix="%" color="brand" delay={0.1} />
              <ImpactStat icon={FiTarget} label="Précision" numericValue={98} suffix="%" color="gold" delay={0.2} />
              <ImpactStat icon={FiActivity} label="Réactivité" textValue="Temps Réel" color="brand" delay={0.3} />
              <ImpactStat icon={FiPieChart} label="Visibilité" textValue="360°" color="gold" delay={0.4} />
            </SimpleGrid>

            {/* Points forts méthodologiques */}
            <VStack align="flex-start" spacing={3} pt={2}>
              <Text fontWeight={700} fontSize="14px" color="gray.900" textTransform="uppercase" letterSpacing="0.04em" mb={1}>
                Notre Valeur Ajoutée :
              </Text>
              {[
                'Une expertise technique rigoureuse et certifiée',
                'Une connaissance approfondie du terrain en Afrique de l\'Ouest',
                'Des outils analytiques modernes (KoboToolbox, PowerBI, SIG)',
                'Production de résultats mesurables pour des décisions éclairées'
              ].map((text, i) => (
                <HStack key={i} spacing={3} align="flex-start">
                  <Icon as={FiCheckCircle} color="gold.500" fontSize="18px" mt={0.5} />
                  <Text fontWeight={500} color="gray.700" fontSize="14px" lineHeight={1.5}>
                    {text}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>

          {/* Côté Droit : Illustration & Dashboard avec graph animé */}
          <Box position="relative">
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              borderRadius="28px"
              overflow="hidden"
              boxShadow="0 30px 70px rgba(0,0,0,0.12)"
              border="6px solid white"
              bg="white"
            >
              <Image 
                src="/dashboard-impact.png" 
                alt="Visualisation des données et tableaux de bord S&E"
                w="full"
                h="auto"
                objectFit="cover"
              />
              
              {/* Carte graphique interactive */}
              <Box
                position="absolute"
                bottom="20px"
                right="20px"
                bg="rgba(255, 255, 255, 0.95)"
                backdropFilter="blur(16px)"
                p={4}
                borderRadius="20px"
                boxShadow="0 10px 30px rgba(0,0,0,0.12)"
                border="1px solid"
                borderColor="gray.100"
                w="210px"
              >
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text fontSize="11px" fontWeight={700} color="gray.500" letterSpacing="0.05em">
                      CROISSANCE S&E
                    </Text>
                    <Icon as={FiBarChart2} color="brand.500" />
                  </HStack>
                  <HStack align="flex-end" h="64px" spacing={2.5}>
                    {[40, 60, 45, 90, 75, 100].map((h, i) => (
                      <MotionBox
                        key={i}
                        w="full"
                        bg={i === 5 ? 'gold.400' : 'brand.500'}
                        borderRadius="6px"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                      />
                    ))}
                  </HStack>
                </VStack>
              </Box>
            </MotionBox>

            {/* Badge Flottant Impact */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              position="absolute"
              top="-25px"
              left="-25px"
              bg="brand.600"
              color="white"
              p={5}
              borderRadius="22px"
              boxShadow="0 20px 40px rgba(43, 91, 196, 0.35)"
              border="2px solid rgba(255, 255, 255, 0.2)"
              display={{ base: 'none', md: 'block' }}
            >
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="30px" fontWeight={800} lineHeight={1}>
                  <CountUp to={120} prefix="+" suffix="%" duration={2} />
                </Text>
                <Text fontSize="11px" fontWeight={700} letterSpacing="0.05em" opacity={0.85}>
                  D'IMPACT MESURABLE
                </Text>
              </VStack>
            </MotionBox>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
