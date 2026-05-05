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
  Divider,
  Icon,
  Image
} from '@chakra-ui/react'
import { IMAGES } from '../constant/image'
import { CONTACT_INFO } from '../constant/contact'
import { FiMapPin, FiPhone, FiMail, FiLinkedin, FiFacebook } from 'react-icons/fi'

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Planification Stratégique', to: '/services' },
      { label: 'Suivi-Évaluation', to: '/services' },
      { label: 'Formation & Renforcement', to: '/services' },
      { label: 'Appui Technique', to: '/services' },
    ],
  },
]

export default function Footer() {
  return (
    <Box as="footer" bg="gray.900" color="white" pt={16} pb={6}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: '2fr 1fr 1fr' }}
          gap={12}
          mb={12}
        >
          {/* Brand */}
          <GridItem>
            <Box mb={5} bg="white" p={2} borderRadius="8px" display="inline-block">
              <Image 
                src={IMAGES.logo} 
                alt="Djenepo Partners" 
                h="44px"
                w="auto"
                objectFit="contain"
              />
            </Box>
            <Text color="gray.400" fontSize="14px" lineHeight={1.8} maxW="300px" mb={6}>
              Société de conseil basée à Bamako, spécialisée dans l'accompagnement stratégique
              des projets de développement en Afrique.
            </Text>
            <VStack align="flex-start" spacing={3}>
              <HStack spacing={3}>
                <Icon as={FiMapPin} color="gold.400" />
                <Text color="gray.400" fontSize="14px">{CONTACT_INFO.address.city}</Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FiPhone} color="gold.400" />
                <Text color="gray.400" fontSize="14px">{CONTACT_INFO.phones[0]}</Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FiMail} color="gold.400" />
                <Text color="gray.400" fontSize="14px">{CONTACT_INFO.emails[0]}</Text>
              </HStack>
            </VStack>
          </GridItem>

          {/* Links */}
          {footerLinks.map((section) => (
            <GridItem key={section.title}>
              <Text
                fontFamily="heading"
                fontWeight={700}
                fontSize="13px"
                color="white"
                letterSpacing="1px"
                textTransform="uppercase"
                mb={5}
              >
                {section.title}
              </Text>
              <VStack align="flex-start" spacing={3}>
                {section.links.map((link) => (
                  <Link key={link.label} to={link.to}>
                    <Text
                      color="gray.400"
                      fontSize="14px"
                      _hover={{ color: 'gold.400' }}
                      transition="color 0.2s"
                      cursor="pointer"
                    >
                      {link.label}
                    </Text>
                  </Link>
                ))}
              </VStack>
            </GridItem>
          ))}
        </Grid>

        <Divider borderColor="gray.700" mb={6} />

        <Flex
          justify="space-between"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap={4}
        >
          <Text color="gray.500" fontSize="13px">
            © {new Date().getFullYear()} DJENEPO PARTNERS SARL. Tous droits réservés.
          </Text>
          <HStack spacing={4}>
            <Box
              as="a"
              href={CONTACT_INFO.socials.linkedin}
              target="_blank"
              w="35px"
              h="35px"
              borderRadius="8px"
              bg="gray.800"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'brand.600' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Icon as={FiLinkedin} color="gray.400" _hover={{ color: 'white' }} />
            </Box>
            <Box
              as="a"
              href={CONTACT_INFO.socials.facebook}
              target="_blank"
              w="35px"
              h="35px"
              borderRadius="8px"
              bg="gray.800"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'brand.600' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Icon as={FiFacebook} color="gray.400" _hover={{ color: 'white' }} />
            </Box>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
