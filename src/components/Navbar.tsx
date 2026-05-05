import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  Flex,
  HStack,
  VStack,
  IconButton,
  Button,
  Text,
  useDisclosure,
  Collapse,
  Container
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={scrolled ? 'white' : 'white'}
      boxShadow={scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)'}
      transition="all 0.3s ease"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Flex h="72px" align="center" justify="space-between">
          {/* Logo */}
          <Link to="/">
            <HStack spacing={3}>
              <Box
                w="44px"
                h="44px"
                bg="brand.600"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Text color="white" fontWeight={800} fontSize="18px" fontFamily="heading">
                  D
                </Text>
              </Box>
              <VStack spacing={0} align="flex-start">
                <Text
                  fontFamily="heading"
                  fontWeight={800}
                  fontSize="15px"
                  color="brand.600"
                  lineHeight={1}
                  letterSpacing="-0.3px"
                >
                  DJENEPO
                </Text>
                <Text
                  fontFamily="heading"
                  fontWeight={600}
                  fontSize="11px"
                  color="gold.500"
                  lineHeight={1}
                  letterSpacing="1.5px"
                  mt="2px"
                >
                  PARTNERS
                </Text>
              </VStack>
            </HStack>
          </Link>

          {/* Desktop Nav */}
          <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Box
                  px={4}
                  py={2}
                  borderRadius="8px"
                  fontWeight={isActive(link.to) ? 600 : 500}
                  fontSize="15px"
                  color={isActive(link.to) ? 'brand.600' : 'gray.700'}
                  bg={isActive(link.to) ? 'brand.50' : 'transparent'}
                  _hover={{
                    bg: 'brand.50',
                    color: 'brand.600',
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                  position="relative"
                >
                  {link.label}
                  {isActive(link.to) && (
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="50%"
                      transform="translateX(-50%)"
                      w="4px"
                      h="4px"
                      borderRadius="full"
                      bg="gold.500"
                    />
                  )}
                </Box>
              </Link>
            ))}
          </HStack>

          {/* CTA */}
          <HStack display={{ base: 'none', md: 'flex' }}>
            <Link to="/contact">
              <Button
                variant="brand"
                size="sm"
                px={5}
                py={5}
                fontSize="14px"
              >
                Nous contacter
              </Button>
            </Link>
          </HStack>

          {/* Mobile Hamburger */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle menu"
            color="gray.700"
          />
        </Flex>
      </Container>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box bg="white" borderTop="1px solid" borderColor="gray.100" py={4} px={6}>
          <VStack spacing={1} align="stretch">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={onToggle}>
                <Box
                  px={4}
                  py={3}
                  borderRadius="8px"
                  fontWeight={isActive(link.to) ? 600 : 500}
                  fontSize="15px"
                  color={isActive(link.to) ? 'brand.600' : 'gray.700'}
                  bg={isActive(link.to) ? 'brand.50' : 'transparent'}
                  _hover={{ bg: 'brand.50', color: 'brand.600' }}
                  transition="all 0.2s"
                >
                  {link.label}
                </Box>
              </Link>
            ))}
            <Link to="/contact" onClick={onToggle}>
              <Button variant="brand" w="full" mt={2}>
                Nous contacter
              </Button>
            </Link>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  )
}
