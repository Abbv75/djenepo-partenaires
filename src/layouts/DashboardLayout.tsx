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
} from '@chakra-ui/react';
import {
  FiHome,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiChevronDown
} from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/logo.png';

const NavItem = ({ icon, children, to, isActive }: { icon: any, children: React.ReactNode, to: string, isActive: boolean }) => {
  const navigate = useNavigate();
  return (
    <Flex
      align="center"
      p="3"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      bg={isActive ? 'brand.600' : 'transparent'}
      color={isActive ? 'white' : 'gray.400'}
      _hover={{
        bg: isActive ? 'brand.700' : 'whiteAlpha.100',
        color: 'white',
      }}
      onClick={() => navigate({ to })}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{ color: 'white' }}
          as={icon}
        />
      )}
      <Text fontWeight={isActive ? '600' : '500'}>{children}</Text>
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
  ];

  const SidebarContent = ({ ...rest }) => (
    <Box
      bg="brand.900"
      borderRight="1px"
      borderRightColor="gray.700"
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="full"
      color="white"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Admin DP
        </Text>
      </Flex>
      <VStack spacing={2} align="stretch" mt={4}>
        {navItems.map((item) => (
          <NavItem 
            key={item.name} 
            icon={item.icon} 
            to={item.path}
            isActive={location.pathname === item.path}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent bg="brand.900">
          <DrawerCloseButton color="white" mt={4} />
          <DrawerHeader color="white" borderBottomWidth="1px" borderColor="gray.700">Admin DP</DrawerHeader>
          <DrawerBody p={0} pt={4}>
            <VStack spacing={2} align="stretch">
              {navItems.map((item) => (
                <NavItem 
                  key={item.name} 
                  icon={item.icon} 
                  to={item.path}
                  isActive={location.pathname === item.path}
                >
                  {item.name}
                </NavItem>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 64 }}>
        <Flex
          px={{ base: 4, md: 8 }}
          height="20"
          alignItems="center"
          bg="white"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
        >
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />

          <HStack spacing={{ base: '0', md: '6' }}>
            <Flex alignItems="center">
              <Menu>
                <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    <Avatar size="sm" name={user?.name} bg="brand.500" color="white" />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm" fontWeight="bold">{user?.name}</Text>
                      <Text fontSize="xs" color="gray.500">Admin</Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg="white"
                  borderColor="gray.200"
                >
                  <MenuItem onClick={handleLogout} color="red.500" icon={<FiLogOut />}>
                    Se déconnecter
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>

        <Box p="8">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
