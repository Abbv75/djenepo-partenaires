import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  Box,
  Flex,
  HStack,
  VStack,
  IconButton,
  Button,
  useDisclosure,
  Container,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FiChevronDown, FiLogOut, FiHome, FiMail } from 'react-icons/fi'
import { IMAGES } from '../constant/image'
import { useAuthStore } from '../store/useAuthStore'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (to: string) =>
    to === '/' ? currentPath === '/' : currentPath.startsWith(to)

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={scrolled ? 'rgba(255, 255, 255, 0.85)' : 'white'}
      backdropFilter={scrolled ? 'blur(12px)' : 'none'}
      boxShadow={scrolled ? '0 4px 30px rgba(0, 0, 0, 0.05)' : 'none'}
      borderBottom="1px solid"
      borderColor={scrolled ? 'whiteAlpha.300' : 'gray.100'}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <Flex h={{ base: '70px', md: '80px' }} align="center" justify="space-between">
          {/* Logo */}
          <Link to="/">
            <Box _hover={{ transform: 'scale(1.02)' }} transition="all 0.2s">
              <Image 
                src={IMAGES.logo} 
                alt="Djenepo Partners" 
                h={{ base: "40px", md: "52px" }}
                w="auto"
                objectFit="contain"
              />
            </Box>
          </Link>

          {/* Desktop Nav */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Box
                  px={5}
                  py={2.5}
                  borderRadius="12px"
                  fontWeight={isActive(link.to) ? 700 : 500}
                  fontSize="15px"
                  color={isActive(link.to) ? 'brand.600' : 'gray.600'}
                  bg={isActive(link.to) ? 'brand.50' : 'transparent'}
                  _hover={{
                    bg: isActive(link.to) ? 'brand.50' : 'gray.50',
                    color: isActive(link.to) ? 'brand.700' : 'gray.900',
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                >
                  {link.label}
                  {isActive(link.to) && (
                    <Box
                      position="absolute"
                      bottom="4px"
                      left="50%"
                      transform="translateX(-50%)"
                      w="16px"
                      h="3px"
                      borderRadius="full"
                      bg="brand.500"
                    />
                  )}
                </Box>
              </Link>
            ))}
          </HStack>

          {/* CTA & User Menu */}
          <HStack display={{ base: 'none', md: 'flex' }} spacing={4}>
            {!isAuthenticated && (
              <Link to="/contact">
                <Button 
                  variant="brand" 
                  size="md" 
                  borderRadius="12px"
                  px={6}
                  fontWeight={600}
                  boxShadow="0 4px 14px 0 rgba(43,91,196,0.39)"
                  _hover={{ 
                    transform: 'translateY(-2px)', 
                    boxShadow: '0 6px 20px rgba(43,91,196,0.3)' 
                  }}
                  transition="all 0.3s ease"
                >
                  Nous contacter
                </Button>
              </Link>
            )}

            {isAuthenticated && (
              <Menu autoSelect={false}>
                <MenuButton 
                  as={Button} 
                  variant="ghost" 
                  rightIcon={<FiChevronDown />}
                  px={3}
                  py={6}
                  borderRadius="16px"
                  _hover={{ bg: 'gray.50' }}
                  _active={{ bg: 'gray.100' }}
                >
                  <HStack spacing={3}>
                    <Avatar size="sm" name={user?.name} bg="brand.500" color="white" border="2px solid white" shadow="sm" />
                    <VStack spacing={0} align="flex-start" display={{ base: 'none', lg: 'flex' }}>
                      <Text fontSize="14px" fontWeight="600" lineHeight="1">{user?.name}</Text>
                      <Text fontSize="11px" color="gray.500" fontWeight="500">Administrateur</Text>
                    </VStack>
                  </HStack>
                </MenuButton>
                <MenuList 
                  border="none" 
                  boxShadow="0 10px 40px rgba(0,0,0,0.1)" 
                  borderRadius="16px" 
                  p={2}
                  minW="220px"
                >
                  <MenuItem 
                    icon={<FiHome size={18} />} 
                    onClick={() => routerState.location.pathname !== '/admin' && (window.location.href = '/admin')}
                    borderRadius="10px"
                    _hover={{ bg: 'brand.50', color: 'brand.600' }}
                    fontWeight="500"
                    mb={1}
                  >
                    Tableau de bord
                  </MenuItem>
                  <Divider my={1} />
                  <MenuItem 
                    icon={<FiLogOut size={18} />} 
                    color="red.500"
                    borderRadius="10px"
                    _hover={{ bg: 'red.50', color: 'red.600' }}
                    fontWeight="500"
                    onClick={() => {
                      logout();
                      window.location.href = '/login';
                    }}
                  >
                    Se déconnecter
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>

          {/* Mobile Hamburger */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            icon={<HamburgerIcon w={6} h={6} />}
            variant="ghost"
            aria-label="Toggle menu"
            color="gray.800"
            _hover={{ bg: 'gray.100' }}
            borderRadius="12px"
          />
        </Flex>
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <DrawerContent borderLeftRadius="24px">
          <DrawerCloseButton mt={4} mr={4} size="lg" borderRadius="full" _hover={{ bg: 'gray.100' }} />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.100" pt={6} pb={4}>
            <Image 
              src={IMAGES.logo} 
              alt="Djenepo Partners" 
              h="40px"
              w="auto"
            />
          </DrawerHeader>
          <DrawerBody px={6} py={8}>
            <VStack spacing={4} align="stretch">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={onClose}>
                  <Box
                    px={5}
                    py={4}
                    borderRadius="16px"
                    fontWeight={isActive(link.to) ? 700 : 500}
                    fontSize="16px"
                    color={isActive(link.to) ? 'brand.600' : 'gray.700'}
                    bg={isActive(link.to) ? 'brand.50' : 'gray.50'}
                    _hover={{ bg: 'brand.100' }}
                    transition="all 0.2s"
                    display="flex"
                    alignItems="center"
                  >
                    {link.label}
                  </Box>
                </Link>
              ))}
              
              <Divider my={4} />
              
              {!isAuthenticated ? (
                <Link to="/contact" onClick={onClose}>
                  <Button variant="brand" w="full" size="lg" borderRadius="16px" leftIcon={<FiMail />}>
                    Nous contacter
                  </Button>
                </Link>
              ) : (
                <VStack spacing={3}>
                  <Button 
                    variant="outline" 
                    colorScheme="brand" 
                    w="full" 
                    size="lg" 
                    borderRadius="16px" 
                    leftIcon={<FiHome />}
                    onClick={() => {
                      onClose();
                      window.location.href = '/admin';
                    }}
                  >
                    Tableau de bord
                  </Button>
                  <Button 
                    variant="ghost" 
                    colorScheme="red" 
                    w="full" 
                    size="lg" 
                    borderRadius="16px" 
                    leftIcon={<FiLogOut />}
                    onClick={() => {
                      logout();
                      onClose();
                      window.location.href = '/login';
                    }}
                  >
                    Déconnexion
                  </Button>
                </VStack>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
