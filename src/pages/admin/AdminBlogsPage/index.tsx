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
  Image,
  Avatar,
  Icon,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Divider,
} from '@chakra-ui/react';
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiCalendar,
  FiClock
} from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

import { PageHeader } from '../../../components/ui/PageHeader';
import { ConfirmDeleteAlert } from '../../../components/ui/ConfirmDeleteAlert';
import { BlogModal } from './BlogModal';
import { useAdminBlogs } from './hooks/useAdminBlogs';
import { resolveImageUrl } from '../../../utils/imageUrl';

export default function AdminBlogsPage() {
  const {
    data: blogs,
    categories,
    loading,
    isOpen,
    onClose,
    editingBlog,
    isAlertOpen,
    onAlertClose,
    isDeleting,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete
  } = useAdminBlogs();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const uniqueCategories = ['Toutes', ...Array.from(new Set(blogs.map((blog) => blog.category?.name ?? '')))].filter(Boolean);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
      (blog.category?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (blog.author_name || '').toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'Toutes' || (blog.category?.name ?? '') === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <PageHeader 
        title="Gestion des Articles" 
        actionLabel="Nouvel article" 
        onAction={() => handleOpenModal()} 
      />

      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={8} align={{ base: 'stretch', md: 'center' }} justify="space-between">
        <InputGroup maxW="320px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
            borderRadius="md"
            focusBorderColor="brand.500"
          />
        </InputGroup>

        <HStack wrap="wrap" spacing={2} py={1}>
          {uniqueCategories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              borderRadius="full"
              variant={selectedCategory === cat ? 'solid' : 'outline'}
              colorScheme={selectedCategory === cat ? 'brand' : 'gray'}
              px={4}
              bg={selectedCategory === cat ? 'brand.600' : 'white'}
              color={selectedCategory === cat ? 'white' : 'gray.600'}
              borderColor={selectedCategory === cat ? 'brand.600' : 'gray.200'}
              _hover={{
                bg: selectedCategory === cat ? 'brand.700' : 'gray.50',
              }}
            >
              {cat}
            </Button>
          ))}
        </HStack>
      </Flex>

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : filteredBlogs.length === 0 ? (
        <Center p={10} bg="white" borderRadius="20px" border="1px" borderColor="gray.100">
          <Text color="gray.500" fontSize="md">
            Aucun article trouvé.
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
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
              <Box position="relative" h="200px" overflow="hidden">
                <Image
                  src={resolveImageUrl(blog.image_url)}
                  alt={blog.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
                {blog.category && (
                  <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    bg="brand.600"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="11px"
                    fontWeight={600}
                  >
                    {blog.category.name}
                  </Badge>
                )}
              </Box>

              <CardBody p={6} flex={1} display="flex" flexDirection="column">
                <HStack spacing={4} mb={3} color="gray.400" fontSize="12px">
                  <HStack spacing={1}>
                    <Icon as={FiCalendar} />
                    <Text>{dayjs(blog.date).format('D MMMM YYYY')}</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={FiClock} />
                    <Text>{blog.read_time}</Text>
                  </HStack>
                </HStack>

                <Text
                  fontFamily="heading"
                  fontWeight={700}
                  fontSize="16px"
                  color="gray.900"
                  lineHeight={1.4}
                  mb={2}
                  noOfLines={2}
                >
                  {blog.title}
                </Text>

                <Text fontSize="13px" color="gray.600" lineHeight={1.6} mb={4} noOfLines={3} flex={1}>
                  {blog.excerpt}
                </Text>

                <Divider my={3} />

                <HStack justify="space-between" align="center" mb={4}>
                  <HStack spacing={2.5}>
                    <Avatar size="xs" name={blog.author_name} />
                    <Text fontSize="12px" fontWeight={600} color="gray.700">
                      {blog.author_name}
                    </Text>
                  </HStack>
                </HStack>

                <Divider mb={4} />

                <HStack justify="flex-end" spacing={2}>
                  <Button
                    size="sm"
                    leftIcon={<FiEdit2 />}
                    colorScheme="blue"
                    variant="ghost"
                    borderRadius="10px"
                    onClick={() => handleOpenModal(blog)}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<FiTrash2 />}
                    colorScheme="red"
                    variant="ghost"
                    borderRadius="10px"
                    onClick={() => confirmDelete(blog.id)}
                  >
                    Supprimer
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Add/Edit Modal */}
      <BlogModal 
        isOpen={isOpen} 
        onClose={onClose} 
        editingBlog={editingBlog} 
        categories={categories} 
        onSuccess={fetchData} 
      />

      {/* Delete Confirmation Alert */}
      <ConfirmDeleteAlert 
        isOpen={isAlertOpen} 
        onClose={onAlertClose} 
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
      />
    </Box>
  );
}
