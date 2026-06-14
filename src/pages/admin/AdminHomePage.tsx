import { useState, useEffect } from 'react';
import { 
  Box, 
  SimpleGrid, 
  Card, 
  CardBody, 
  Flex, 
  Icon,
  Text,
  VStack,
  Skeleton
} from '@chakra-ui/react';
import { FiGrid, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import api from '../../constant/AxiosInstance';
import { useAuthStore } from '../../store/useAuthStore';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function AdminHomePage() {
  const [stats, setStats] = useState({ categories: 0, blogs: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [catRes, blogRes] = await Promise.all([
          api.get('/categories'),
          api.get('/blogs')
        ]);
        setStats({
          categories: catRes.data.data.length,
          blogs: blogRes.data.data.length
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Catégories',
      value: stats.categories,
      icon: FiGrid,
      color: 'brand',
      gradient: 'linear(to-br, brand.500, brand.700)',
      helpText: 'Catégories disponibles'
    },
    {
      title: 'Articles de Blog',
      value: stats.blogs,
      icon: FiFileText,
      color: 'gold',
      gradient: 'linear(to-br, gold.400, gold.600)',
      helpText: 'Articles publiés'
    }
  ];

  return (
    <Box>
      {/* Welcome Banner */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
        p={{ base: 6, md: 8 }}
        borderRadius="24px"
        bgGradient="linear(to-r, brand.900, brand.700)"
        color="white"
        position="relative"
        overflow="hidden"
        boxShadow="0 20px 40px rgba(43,91,196,0.2)"
      >
        <Box position="relative" zIndex={2}>
          <VStack align="flex-start" spacing={2}>
            <Text fontSize={{ base: '24px', md: '32px' }} fontWeight="800" fontFamily="heading" lineHeight={1.2}>
              Bonjour, {user?.name || 'Admin'} !
            </Text>
            <Text fontSize={{ base: '15px', md: '17px' }} color="whiteAlpha.800" maxW="600px">
              Bienvenue sur votre tableau de bord. Voici un résumé de l'activité récente de votre plateforme.
            </Text>
          </VStack>
        </Box>
        
        {/* Decorative background circles */}
        <Box position="absolute" top="-20%" right="-5%" w="300px" h="300px" bg="whiteAlpha.100" borderRadius="full" filter="blur(40px)" zIndex={1} />
        <Box position="absolute" bottom="-30%" right="10%" w="200px" h="200px" bg="brand.400" opacity="0.3" borderRadius="full" filter="blur(30px)" zIndex={1} />
      </MotionBox>
      
      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {statCards.map((stat, index) => (
          <MotionCard 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            borderRadius="20px"
            overflow="hidden"
            border="none"
            boxShadow="0 10px 30px rgba(0,0,0,0.04)"
            _hover={{ 
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
            }}
          >
            <CardBody p={6}>
              <Flex justify="space-between" align="flex-start">
                <Box>
                  <Text fontSize="14px" fontWeight="600" color="gray.500" mb={1} textTransform="uppercase" letterSpacing="wider">
                    {stat.title}
                  </Text>
                  {loading ? (
                    <Skeleton height="40px" width="60px" my={2} />
                  ) : (
                    <Text fontSize="38px" fontWeight="800" color="gray.800" lineHeight={1}>
                      {stat.value}
                    </Text>
                  )}
                  <Flex align="center" mt={3} color="green.500" fontSize="13px" fontWeight="600">
                    <Icon as={FiTrendingUp} mr={1} />
                    <Text>{stat.helpText}</Text>
                  </Flex>
                </Box>
                
                <Flex 
                  align="center" 
                  justify="center" 
                  w="56px" 
                  h="56px" 
                  borderRadius="16px" 
                  bgGradient={stat.gradient}
                  color="white"
                  boxShadow={`0 10px 20px var(--chakra-colors-${stat.color}-200)`}
                >
                  <Icon as={stat.icon} boxSize={7} />
                </Flex>
              </Flex>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>
    </Box>
  );
}
