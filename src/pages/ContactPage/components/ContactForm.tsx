import { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Icon,
  Text,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiMessageCircle, FiSend } from 'react-icons/fi'

const MotionBox = motion(Box)

export const ContactForm = () => {
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
  )
}
