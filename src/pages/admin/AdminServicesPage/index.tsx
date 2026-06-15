import { useState } from 'react';
import {
  Box,
  Flex,
  Spinner,
  Center,
  Text,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Divider,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiCheck,
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
  FiHelpCircle
} from 'react-icons/fi';

import { PageHeader } from '../../../components/ui/PageHeader';
import { ConfirmDeleteAlert } from '../../../components/ui/ConfirmDeleteAlert';
import { ServiceModal } from './ServiceModal';
import { useAdminServices } from './hooks/useAdminServices';

const iconMap: Record<string, any> = {
  FiCompass,
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiBookOpen,
};

const styleMap: Record<string, { color: string; bg: string }> = {
  planification: { color: 'brand.600', bg: 'brand.50' },
  suivi: { color: 'gold.500', bg: 'gold.50' },
  formation: { color: 'teal.500', bg: 'teal.50' },
  appui: { color: 'purple.500', bg: 'purple.50' },
  recherche: { color: 'orange.500', bg: 'orange.50' },
  coaching: { color: 'pink.500', bg: 'pink.50' },
};

const getServiceStyle = (slug: string) => {
  return styleMap[slug] || { color: 'brand.600', bg: 'brand.50' };
};

export default function AdminServicesPage() {
  const {
    data: services,
    loading,
    isOpen,
    onClose,
    editingService,
    isAlertOpen,
    onAlertClose,
    isDeleting,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete
  } = useAdminServices();

  const [search, setSearch] = useState('');

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.tagline.toLowerCase().includes(search.toLowerCase()) ||
    service.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Gestion des Services"
        actionLabel="Nouveau service"
        onAction={() => handleOpenModal()}
      />

      <Flex mb={6} justify="flex-start">
        <InputGroup maxW="320px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher un service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
            borderRadius="md"
            focusBorderColor="brand.500"
          />
        </InputGroup>
      </Flex>

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : filteredServices.length === 0 ? (
        <Center p={10} bg="white" borderRadius="20px" border="1px" borderColor="gray.100">
          <Text color="gray.500" fontSize="md">
            Aucun service trouvé.
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredServices.map((service) => {
            const style = getServiceStyle(service.slug);
            const IconCmp = iconMap[service.icon] || FiHelpCircle;

            return (
              <Card
                key={service.id}
                borderRadius="24px"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="0 10px 30px rgba(0,0,0,0.02)"
                _hover={{
                  boxShadow: '0 20px 40px rgba(43,91,196,0.08)',
                  transform: 'translateY(-4px)',
                }}
                transition="all 0.3s ease"
                display="flex"
                flexDirection="column"
                bg="white"
              >
                <CardBody p={6} flex={1} display="flex" flexDirection="column">
                  <HStack spacing={4} mb={4} align="center">
                    <Flex
                      align="center"
                      justify="center"
                      w="56px"
                      h="56px"
                      bg={style.bg}
                      color={style.color}
                      borderRadius="16px"
                      flexShrink={0}
                    >
                      <IconCmp size={24} />
                    </Flex>
                    <Box overflow="hidden">
                      <HStack wrap="wrap" mb={0.5} spacing={1}>
                        <Badge colorScheme="purple" fontSize="10px" borderRadius="full" px={2}>
                          {service.slug}
                        </Badge>
                        {service.service_category && (
                          <Badge colorScheme="teal" fontSize="10px" borderRadius="full" px={2}>
                            {service.service_category.name}
                          </Badge>
                        )}
                      </HStack>
                      <Text
                        fontFamily="heading"
                        fontWeight="800"
                        fontSize="18px"
                        color="gray.900"
                        isTruncated
                      >
                        {service.title}
                      </Text>
                    </Box>
                  </HStack>

                  <Text fontSize="13px" fontWeight="600" color="gray.500" mb={3} noOfLines={1}>
                    {service.tagline}
                  </Text>

                  <Text color="gray.600" fontSize="14px" lineHeight={1.6} mb={4} noOfLines={3}>
                    {service.desc}
                  </Text>

                  <Divider my={3} />

                  <Box flex={1}>
                    <Text fontSize="12px" fontWeight="bold" color="gray.400" textTransform="uppercase" mb={2}>
                      Caractéristiques :
                    </Text>
                    <List spacing={2}>
                      {(service.features || []).slice(0, 3).map((feat, idx) => (
                        <ListItem key={idx} display="flex" alignItems="flex-start" fontSize="13px" color="gray.700">
                          <ListIcon as={FiCheck} color="green.500" mt="3px" />
                          <Text noOfLines={1}>{feat}</Text>
                        </ListItem>
                      ))}
                      {(service.features || []).length > 3 && (
                        <ListItem fontSize="12px" color="gray.400" pl={5} fontStyle="italic">
                          + {(service.features || []).length - 3} autres...
                        </ListItem>
                      )}
                    </List>
                  </Box>

                  <Divider my={4} />

                  <HStack justify="flex-end" spacing={2}>
                    <Button
                      size="sm"
                      leftIcon={<FiEdit2 />}
                      colorScheme="blue"
                      variant="ghost"
                      borderRadius="10px"
                      onClick={() => handleOpenModal(service)}
                    >
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FiTrash2 />}
                      colorScheme="red"
                      variant="ghost"
                      borderRadius="10px"
                      onClick={() => confirmDelete(service.id)}
                    >
                      Supprimer
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      )}

      {/* Add/Edit Modal */}
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        editingService={editingService}
        onSuccess={fetchData}
      />

      {/* Delete Confirmation Alert */}
      <ConfirmDeleteAlert
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        message="Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible."
      />
    </Box>
  );
}
