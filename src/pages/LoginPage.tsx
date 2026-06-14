import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  HStack,
  Icon
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaQuoteLeft } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';
import api from '../api/axios';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/login', { email, password });
      login(response.data.data.token, response.data.data.user);
      toast({
        title: 'Connexion réussie',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate({ to: '/' });
    } catch (err: any) {
      toast({
        title: 'Erreur de connexion',
        description: err.response?.data?.message || 'Identifiants incorrects',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" direction={{ base: 'column', lg: 'row' }}>
      {/* Left side: Form */}
      <Flex 
        flex={{ base: 1, lg: 0.8 }} 
        align="center" 
        justify="center" 
        bg="white" 
        p={{ base: 8, md: 16 }}
      >
        <Box w="full" maxW="md">
          <Image src={logo} alt="Djénépo Partners" h="12" mb={12} cursor="pointer" onClick={() => navigate({ to: '/' })} />
          
          <VStack spacing={8} align="flex-start" as="form" onSubmit={handleSubmit} w="full">
            <VStack spacing={2} align="flex-start">
              <Heading fontSize="3xl" color="brand.800" fontWeight="bold">
                Bienvenue,
              </Heading>
              <Text color="gray.500" fontSize="md">
                Connectez-vous pour accéder à votre espace d'administration.
              </Text>
            </VStack>

            <VStack spacing={5} w="full">
              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">Adresse Email</FormLabel>
                <Input 
                  type="email" 
                  placeholder="admin@djenepo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="brand.500"
                  size="lg"
                  bg="gray.50"
                  _hover={{ bg: 'gray.100' }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="600" color="gray.700">Mot de passe</FormLabel>
                <InputGroup size="lg">
                  <Input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    focusBorderColor="brand.500"
                    bg="gray.50"
                    _hover={{ bg: 'gray.100' }}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Masquer' : 'Afficher'}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button 
                type="submit" 
                variant="brand"
                size="lg" 
                w="full"
                isLoading={loading}
                loadingText="Connexion..."
                mt={2}
              >
                Se connecter
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Flex>

      {/* Right side: Testimonial / Branding */}
      <Flex 
        flex={1} 
        bg="brand.800" 
        color="white" 
        p={12} 
        align="center" 
        justify="center"
        display={{ base: 'none', lg: 'flex' }}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative elements */}
        <Box 
          position="absolute" 
          top="-10%" 
          right="-10%" 
          w="400px" 
          h="400px" 
          bg="brand.600" 
          rounded="full" 
          opacity="0.5" 
          filter="blur(50px)" 
        />
        <Box 
          position="absolute" 
          bottom="-10%" 
          left="-10%" 
          w="300px" 
          h="300px" 
          bg="gold.500" 
          rounded="full" 
          opacity="0.15" 
          filter="blur(50px)" 
        />

        <Box maxW="lg" position="relative" zIndex={1}>
          <Icon as={FaQuoteLeft} w={12} h={12} color="gold.400" mb={8} opacity={0.8} />
          <Heading fontSize="3xl" lineHeight="1.6" fontWeight="semibold" mb={10}>
            "L'excellence en suivi-évaluation, c'est de transformer les données complexes en décisions claires et impactantes pour nos partenaires."
          </Heading>
          
          <HStack spacing={4}>
            <Box w="14" h="14" bg="whiteAlpha.200" rounded="full" display="flex" alignItems="center" justifyContent="center">
              <Text fontWeight="bold" fontSize="xl">DP</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg">Direction Générale</Text>
              <Text color="brand.200" fontSize="sm">Djénépo Partners</Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
