import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
  Button
} from '@chakra-ui/react';
import {
  FiHome,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiChevronDown,
  FiBriefcase
} from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';

const NavItem = ({ icon, children, to, isActive, onClick }: { icon: any, children: React.ReactNode, to: string, isActive: boolean, onClick?: () => void }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate({ to });
    if (onClick) onClick();
  };

  return (
    <Flex
      align="center"
      p="3"
      mx="4"
      borderRadius="12px"
      role="group"
      cursor="pointer"
      bg={isActive ? 'brand.50' : 'transparent'}
      color={isActive ? 'brand.600' : 'gray.500'}
      _hover={{
        bg: isActive ? 'brand.100' : 'gray.50',
        color: isActive ? 'brand.700' : 'gray.800',
        transform: 'translateX(4px)'
      }}
      transition="all 0.3s ease"
      onClick={handleClick}
      position="relative"
    >
      {isActive && (
        <Box 
          position="absolute" 
          left="-4px" 
          top="50%" 
          transform="translateY(-50%)" 
          w="4px" 
          h="24px" 
          bg="brand.500" 
          borderRadius="full" 
        />
      )}
      {icon && (
        <Icon
          mr="4"
          fontSize="18"
          as={icon}
        />
      )}
      <Text fontWeight={isActive ? '700' : '500'} fontSize="15px">{children}</Text>
    </Flex>
  );
};

export default function DashboardLayout() {
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  const navItems = [
    { name: 'Tableau de bord', icon: FiHome, path: '/admin' },
    { name: 'Catégories', icon: FiGrid, path: '/admin/categories' },
    { name: 'Articles de blog', icon: FiFileText, path: '/admin/blogs' },
    { name: 'Services', icon: FiBriefcase, path: '/admin/services' },
  ];

  const SidebarContent = ({ ...rest }) => (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.100"
      w={{ base: 'full', md: '280px' }}
      pos="fixed"
      h="full"
      boxShadow="4px 0 24px rgba(0,0,0,0.02)"
      zIndex="10"
      {...rest}
    >
      <Flex h="80px" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="22px" fontWeight="800" color="gray.900" letterSpacing="tight">
          Djenepo<Text as="span" color="brand.500">Admin</Text>
        </Text>
      </Flex>
      <VStack spacing={2} align="stretch" mt={6}>
        {navItems.map((item) => (
          <NavItem 
            key={item.name} 
            icon={item.icon} 
            to={item.path}
            isActive={location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
      
      <Box position="absolute" bottom="8" left="0" w="full" px="4">
        <Flex
          align="center"
          p="3"
          borderRadius="12px"
          cursor="pointer"
          color="red.500"
          _hover={{ bg: 'red.50', color: 'red.600' }}
          transition="all 0.2s"
          onClick={handleLogout}
        >
          <Icon mr="4" fontSize="18" as={FiLogOut} />
          <Text fontWeight="600" fontSize="15px">Déconnexion</Text>
        </Flex>
      </Box>
    </Box>
  );

  return (
    <Box minH="100vh" bg="#F7F9FC">
      {/* Desktop Sidebar */}
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      
      {/* Mobile Drawer */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <DrawerContent borderRightRadius="24px">
          <DrawerCloseButton mt={4} />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.100" pt={6}>
            <Text fontSize="22px" fontWeight="800" color="gray.900">
              Djenepo<Text as="span" color="brand.500">Admin</Text>
            </Text>
          </DrawerHeader>
          <DrawerBody p={0} pt={6}>
            <VStack spacing={2} align="stretch">
              {navItems.map((item) => (
                <NavItem 
                  key={item.name} 
                  icon={item.icon} 
                  to={item.path}
                  isActive={location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))}
                  onClick={onClose}
                >
                  {item.name}
                </NavItem>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <Box ml={{ base: 0, md: '280px' }} transition="all 0.3s">
        {/* Glassmorphism Header */}
        <Flex
          px={{ base: 4, md: 8 }}
          height="80px"
          alignItems="center"
          bg="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(16px)"
          borderBottomWidth="1px"
          borderBottomColor="whiteAlpha.400"
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          position="sticky"
          top={0}
          zIndex={5}
        >
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            aria-label="open menu"
            icon={<FiMenu size={24} />}
            color="gray.700"
          />

          {/* Mobile Title */}
          <Text display={{ base: 'block', md: 'none' }} fontSize="18px" fontWeight="700" color="gray.900">
            Djenepo<Text as="span" color="brand.500">Admin</Text>
          </Text>

          <HStack spacing={{ base: '2', md: '6' }}>
            <Flex alignItems="center">
              <Menu autoSelect={false}>
                <MenuButton 
                  as={Button} 
                  variant="ghost" 
                  rightIcon={<FiChevronDown />}
                  px={3}
                  py={6}
                  borderRadius="16px"
                  _hover={{ bg: 'whiteAlpha.800' }}
                  _active={{ bg: 'white' }}
                >
                  <HStack spacing={3}>
                    <Avatar size="sm" name={user?.name} bg="brand.500" color="white" border="2px solid white" shadow="sm" />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="0"
                    >
                      <Text fontSize="14px" fontWeight="700" color="gray.800">{user?.name}</Text>
                      <Text fontSize="11px" color="gray.500" fontWeight="600">Administrateur</Text>
                    </VStack>
                  </HStack>
                </MenuButton>
                <MenuList 
                  bg="white"
                  borderColor="gray.100"
                  boxShadow="0 10px 40px rgba(0,0,0,0.08)"
                  borderRadius="16px"
                  p={2}
                  minW="200px"
                >
                  <MenuItem 
                    onClick={() => {
                      navigate({ to: '/' })
                    }} 
                    icon={<FiHome size={16} />}
                    borderRadius="10px"
                    _hover={{ bg: 'gray.50' }}
                    fontWeight="500"
                    mb={1}
                  >
                    Retour au site
                  </MenuItem>
                  <Divider my={1} />
                  <MenuItem 
                    onClick={handleLogout} 
                    color="red.500" 
                    icon={<FiLogOut size={16} />}
                    borderRadius="10px"
                    _hover={{ bg: 'red.50', color: 'red.600' }}
                    fontWeight="600"
                  >
                    Se déconnecter
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>

        {/* Page Content */}
        <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
