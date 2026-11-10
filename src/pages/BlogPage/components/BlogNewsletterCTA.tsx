import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { FiMail, FiCheck, FiArrowRight } from 'react-icons/fi'
import { ShinyBadge } from '../../../components/reactbits'

export const BlogNewsletterCTA = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const toast = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast({
        title: 'Adresse email invalide',
        description: 'Veuillez saisir une adresse email correcte.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubscribed(true)
    toast({
      title: 'Inscription confirmée !',
      description: 'Merci pour votre intérêt pour nos publications.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    setEmail('')
  }

  return (
    <Box py={{ base: 12, md: 16 }} bg="#fafbfc">
      <Container maxW="1100px" px={{ base: 4, md: 6 }}>
        <Box
          position="relative"
          bg="linear-gradient(135deg, #0b1530 0%, #152d6b 100%)"
          borderRadius="20px"
          p={{ base: 8, md: 12 }}
          overflow="hidden"
          boxShadow="0 20px 40px -15px rgba(11, 21, 48, 0.3)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          {/* Halo d'ambiance */}
          <Box
            position="absolute"
            top="-50%"
            right="-10%"
            w="400px"
            h="400px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(200, 134, 26, 0.2) 0%, transparent 70%)"
            pointerEvents="none"
          />

          <VStack spacing={6} textAlign="center" maxW="650px" mx="auto" position="relative" zIndex={1}>
            <ShinyBadge text="Veille & Partage de Connaissances" dotColor="gold.400" />

            <Text
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '24px', md: '34px' }}
              color="white"
              lineHeight={1.2}
            >
              Recevez nos synthèses méthodologiques et retours d'expérience
            </Text>

            <Text fontSize="15px" color="blue.100" lineHeight={1.7}>
              Abonnez-vous à notre lettre d'information pour ne manquer aucune publication, étude de cas ou cadre logique partagé par nos experts.
            </Text>

            {isSubscribed ? (
              <HStack
                bg="whiteAlpha.200"
                px={6}
                py={3.5}
                borderRadius="14px"
                border="1px solid"
                borderColor="green.400"
                color="green.300"
                spacing={3}
              >
                <Icon as={FiCheck} boxSize={5} />
                <Text fontWeight={600} fontSize="14px">
                  Vous êtes bien inscrit à notre veille stratégique.
                </Text>
              </HStack>
            ) : (
              <Box as="form" onSubmit={handleSubscribe} w="full" maxW="460px">
                <HStack spacing={2} flexWrap={{ base: 'wrap', sm: 'nowrap' }}>
                  <Input
                    placeholder="Votre adresse email professionnelle"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="whiteAlpha.150"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="14px"
                    color="white"
                    fontSize="14px"
                    h="50px"
                    _placeholder={{ color: 'blue.200' }}
                    _focus={{
                      borderColor: 'gold.400',
                      boxShadow: '0 0 0 3px rgba(200, 134, 26, 0.3)',
                    }}
                  />
                  <Button
                    type="submit"
                    bg="gold.500"
                    color="white"
                    h="50px"
                    px={6}
                    borderRadius="14px"
                    fontWeight={700}
                    fontSize="14px"
                    leftIcon={<FiMail />}
                    w={{ base: 'full', sm: 'auto' }}
                    flexShrink={0}
                    _hover={{
                      bg: 'gold.600',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 8px 20px rgba(200, 134, 26, 0.35)',
                    }}
                    transition="all 0.2s"
                  >
                    S'abonner
                  </Button>
                </HStack>
              </Box>
            )}

            <HStack spacing={4} pt={2} justify="center" flexWrap="wrap">
              <Text fontSize="13px" color="blue.200">
                Vous avez un projet spécifique à évaluer ?
              </Text>
              <Link to="/contact">
                <HStack
                  spacing={1}
                  color="gold.400"
                  fontWeight={700}
                  fontSize="13px"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <Text>Contactez nos consultants</Text>
                  <Icon as={FiArrowRight} />
                </HStack>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
