import { useState, useEffect } from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Card, CardBody, Heading, Flex, Icon } from '@chakra-ui/react';
import { FiGrid, FiFileText } from 'react-icons/fi';
import api from '../../constant/AxiosInstance';

export default function AdminHomePage() {
  const [stats, setStats] = useState({ categories: 0, blogs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
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
      }
    };
    fetchStats();
  }, []);

  return (
    <Box>
      <Heading size="lg" mb={6} color="gray.700">Tableau de bord</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card shadow="sm" borderTopWidth="4px" borderTopColor="brand.500">
          <CardBody>
            <Flex align="center">
              <Box p={3} bg="brand.50" color="brand.600" rounded="lg" mr={4}>
                <Icon as={FiGrid} boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontSize="md" color="gray.500">Catégories</StatLabel>
                <StatNumber fontSize="3xl" fontWeight="bold" color="gray.700">{stats.categories}</StatNumber>
                <StatHelpText mb={0}>Total des catégories</StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>

        <Card shadow="sm" borderTopWidth="4px" borderTopColor="gold.500">
          <CardBody>
            <Flex align="center">
              <Box p={3} bg="gold.50" color="gold.600" rounded="lg" mr={4}>
                <Icon as={FiFileText} boxSize={6} />
              </Box>
              <Stat>
                <StatLabel fontSize="md" color="gray.500">Articles</StatLabel>
                <StatNumber fontSize="3xl" fontWeight="bold" color="gray.700">{stats.blogs}</StatNumber>
                <StatHelpText mb={0}>Total des articles publiés</StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
}
