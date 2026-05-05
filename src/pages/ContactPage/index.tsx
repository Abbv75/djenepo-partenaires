import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Button,
  Icon,
  Badge,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiClock,
  FiMessageCircle,
} from 'react-icons/fi'

const MotionBox = motion(Box)

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Adresse',
    content: 'Bamako, Mali\nACI 2000, Hamdallaye',
    color: 'brand.600',
    bg: 'brand.50',
  },
  {
    icon: FiPhone,
    title: 'Téléphone',
    content: '+223 XX XX XX XX\n+223 XX XX XX XX',
    color: 'gold.500',
    bg: 'gold.50',
  },
  {
    icon: FiMail,
    title: 'Email',
    content: 'contact@djenepopartners.com\ninfo@djenepopartners.com',
    color: 'teal.500',
    bg: 'teal.50',
  },
  {
    icon: FiClock,
    title: 'Horaires',
    content: 'Lun – Ven : 8h00 – 17h00\nSam : 9h00 – 13h00',
    color: 'purple.500',
    bg: 'purple.50',
  },
]

export default function ContactPage() {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    email: '',
    organisation: '',
    sujet: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Message envoyé !',
        description: 'Nous vous répondrons dans les 24 heures ouvrables.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setForm({ nom: '', email: '', organisation: '', sujet: '', message: '' })
    }, 1800)
  }

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
          <VStack textAlign="center" spacing={5} maxW="600px" mx="auto">
            <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
              Parlons de votre projet
            </Badge>
            <Text
              as="h1"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '32px', md: '48px' }}
              color="gray.900"
              lineHeight={1.15}
            >
              Contactez-nous
            </Text>
            <Text fontSize="17px" color="gray.600" lineHeight={1.8}>
              Notre équipe est disponible pour discuter de vos besoins et vous proposer
              un accompagnement adapté à votre contexte.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Box py={{ base: 12, md: 16 }} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={16}>
            {contactInfo.map((info, i) => (
              <MotionBox
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  bg="white"
                  borderRadius="16px"
                  p={6}
                  border="1px solid"
                  borderColor="gray.100"
                  _hover={{
                    boxShadow: '0 8px 30px rgba(43,91,196,0.1)',
                    transform: 'translateY(-3px)',
                  }}
                  transition="all 0.2s"
                  h="full"
                >
                  <Box
                    w="48px"
                    h="48px"
                    bg={info.bg}
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={4}
                  >
                    <Icon as={info.icon} color={info.color} fontSize="20px" />
                  </Box>
                  <Text fontFamily="heading" fontWeight={700} fontSize="15px" color="gray.800" mb={2}>
                    {info.title}
                  </Text>
                  {info.content.split('\n').map((line, j) => (
                    <Text key={j} fontSize="13px" color="gray.600" lineHeight={1.7}>
                      {line}
                    </Text>
                  ))}
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Form + Map section */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="flex-start">
            {/* Contact Form */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Box
                  bg="white"
                  borderRadius="24px"
                  p={{ base: 6, md: 10 }}
                  border="1px solid"
                  borderColor="gray.100"
                  boxShadow="0 4px 24px rgba(0,0,0,0.06)"
                >
                  <HStack spacing={3} mb={8}>
                    <Box
                      w="42px"
                      h="42px"
                      bg="brand.50"
                      borderRadius="12px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiMessageCircle} color="brand.600" fontSize="18px" />
                    </Box>
                    <Box>
                      <Text fontFamily="heading" fontWeight={700} fontSize="20px" color="gray.900">
                        Envoyez-nous un message
                      </Text>
                      <Text fontSize="13px" color="gray.500">
                        Réponse sous 24h ouvrables
                      </Text>
                    </Box>
                  </HStack>

                  <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
                        <FormControl isRequired>
                          <FormLabel fontSize="13px" fontWeight={600} color="gray.700" mb={1.5}>
                            Nom complet
                          </FormLabel>
                          <Input
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                            placeholder="Jean Dupont"
                            borderRadius="10px"
                            borderColor="gray.200"
                            _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(43,91,196,0.1)' }}
                            h="46px"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize="13px" fontWeight={600} color="gray.700" mb={1.5}>
                            Email
                          </FormLabel>
                          <Input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="email@organisation.com"
                            borderRadius="10px"
                            borderColor="gray.200"
                            _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(43,91,196,0.1)' }}
                            h="46px"
                          />
                        </FormControl>
                      </SimpleGrid>

                      <FormControl>
                        <FormLabel fontSize="13px" fontWeight={600} color="gray.700" mb={1.5}>
                          Organisation
                        </FormLabel>
                        <Input
                          name="organisation"
                          value={form.organisation}
                          onChange={handleChange}
                          placeholder="Nom de votre organisation"
                          borderRadius="10px"
                          borderColor="gray.200"
                          _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(43,91,196,0.1)' }}
                          h="46px"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="13px" fontWeight={600} color="gray.700" mb={1.5}>
                          Sujet de votre demande
                        </FormLabel>
                        <Select
                          name="sujet"
                          value={form.sujet}
                          onChange={handleChange}
                          placeholder="Sélectionnez un sujet"
                          borderRadius="10px"
                          borderColor="gray.200"
                          _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(43,91,196,0.1)' }}
                          h="46px"
                        >
                          <option value="planification">Planification stratégique</option>
                          <option value="suivi">Suivi-Évaluation</option>
                          <option value="formation">Formation & Renforcement</option>
                          <option value="appui">Appui technique</option>
                          <option value="recherche">Recherche & Études</option>
                          <option value="autre">Autre demande</option>
                        </Select>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="13px" fontWeight={600} color="gray.700" mb={1.5}>
                          Votre message
                        </FormLabel>
                        <Textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre projet ou votre besoin en quelques lignes..."
                          borderRadius="10px"
                          borderColor="gray.200"
                          _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(43,91,196,0.1)' }}
                          rows={5}
                          resize="vertical"
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        variant="brand"
                        w="full"
                        size="lg"
                        h="50px"
                        fontSize="15px"
                        isLoading={loading}
                        loadingText="Envoi en cours..."
                        rightIcon={<FiSend />}
                      >
                        Envoyer le message
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </MotionBox>
            </GridItem>

            {/* Map + Info */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Map embed */}
                <Box
                  borderRadius="20px"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.100"
                  mb={6}
                  h="320px"
                  bg="gray.100"
                  position="relative"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31371.90226764834!2d-8.022082!3d12.6537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d016e6c8a5a1%3A0xd8a1e8de3f11c47d!2sBamako%2C%20Mali!5e0!3m2!1sfr!2sfr!4v1682345678901!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation DJENEPO PARTNERS - Bamako"
                  />
                </Box>

                {/* Why us */}
                <Box
                  bg="linear-gradient(135deg, #2B5BC4 0%, #1f3fa0 100%)"
                  borderRadius="20px"
                  p={8}
                  color="white"
                >
                  <Text fontFamily="heading" fontWeight={700} fontSize="18px" mb={5}>
                    Pourquoi nous choisir ?
                  </Text>
                  <VStack align="flex-start" spacing={4}>
                    {[
                      { emoji: '🎯', text: 'Expertise locale et connaissance du contexte africain' },
                      { emoji: '👥', text: 'Approche participative centrée sur les bénéficiaires' },
                      { emoji: '📊', text: 'Méthodologies rigoureuses et éprouvées sur le terrain' },
                      { emoji: '🌍', text: 'Présence dans 8 pays d\'Afrique de l\'Ouest' },
                      { emoji: '⚡', text: 'Réactivité et flexibilité dans nos interventions' },
                    ].map((item) => (
                      <HStack key={item.text} spacing={3} align="flex-start">
                        <Text fontSize="18px" flexShrink={0}>{item.emoji}</Text>
                        <Text fontSize="14px" color="brand.100" lineHeight={1.6}>
                          {item.text}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
