import { Box, Container, VStack, Heading, Text, Button, HStack, Icon, Badge } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { FiHome, FiCompass, FiAlertCircle } from 'react-icons/fi'

export default function NotFoundPage() {
  return (
    <Box
      minH="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{ base: 16, md: 24 }}
      px={4}
      bg="linear-gradient(180deg, #fafbfc 0%, #f0f4fa 100%)"
    >
      <Container maxW="600px">
        <VStack spacing={6} textAlign="center">
          <Box
            p={5}
            bg="brand.50"
            color="brand.600"
            borderRadius="24px"
            border="1px solid"
            borderColor="brand.100"
            boxShadow="0 10px 30px rgba(43, 91, 196, 0.12)"
          >
            <Icon as={FiAlertCircle} fontSize="48px" />
          </Box>

          <Badge
            colorScheme="red"
            px={4}
            py={1.5}
            borderRadius="full"
            fontSize="13px"
            fontWeight={700}
            letterSpacing="0.05em"
          >
            ERREUR 404
          </Badge>

          <Heading
            as="h1"
            fontFamily="heading"
            fontSize={{ base: '28px', md: '38px' }}
            fontWeight={800}
            color="gray.900"
            lineHeight={1.2}
          >
            Page introuvable
          </Heading>

          <Text fontSize="16px" color="gray.600" maxW="480px" lineHeight={1.8}>
            Oups ! La page que vous recherchez semble introuvable, a été déplacée ou n'existe plus.
            Vérifiez l'adresse ou revenez sur le site principal.
          </Text>

          <HStack spacing={4} pt={4} flexWrap="wrap" justify="center">
            <Link to="/">
              <Button
                bg="brand.600"
                color="white"
                size="lg"
                px={8}
                h="52px"
                borderRadius="14px"
                fontWeight={700}
                leftIcon={<FiHome />}
                _hover={{ bg: 'brand.700', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Retour à l'accueil
              </Button>
            </Link>

            <Link to="/services">
              <Button
                variant="outline"
                colorScheme="brand"
                size="lg"
                px={8}
                h="52px"
                borderRadius="14px"
                fontWeight={700}
                leftIcon={<FiCompass />}
                _hover={{ bg: 'brand.50' }}
              >
                Nos expertises
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
