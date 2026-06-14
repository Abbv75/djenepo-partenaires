import { useState, useEffect, useMemo } from 'react';
import {
  Box, Button, Heading, Flex, IconButton, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input,
  useToast, Spinner, Center, Text, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
  Select, Textarea, Badge
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  createColumnHelper,
} from '@tanstack/react-table';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');
import api from '../../constant/AxiosInstance';
import { DataTable } from '../../components/DataTable';

interface Category {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string;
  read_time: string;
  image_url: string;
  date: string;
  category_id: number;
  category?: Category;
}

export default function AdminBlogsPage() {
  const [data, setData] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', slug: '', excerpt: '', content: '', 
    author_name: '', read_time: '', image_url: '', date: '', category_id: '' 
  });

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  const toast = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [blogsRes, catsRes] = await Promise.all([
        api.get('/blogs'),
        api.get('/categories')
      ]);
      setData(blogsRes.data.data);
      setCategories(catsRes.data.data);
    } catch (error) {
      toast({ title: 'Erreur de chargement', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        author_name: blog.author_name,
        read_time: blog.read_time,
        image_url: blog.image_url,
        date: blog.date,
        category_id: blog.category_id.toString()
      });
    } else {
      setEditingBlog(null);
      setFormData({ 
        title: '', slug: '', excerpt: '', content: '', 
        author_name: '', read_time: '', image_url: '', date: '', category_id: categories[0]?.id.toString() || '' 
      });
    }
    onOpen();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog.id}`, formData);
        toast({ title: 'Article modifié', status: 'success' });
      } else {
        await api.post('/blogs', formData);
        toast({ title: 'Article ajouté', status: 'success' });
      }
      onClose();
      fetchData();
    } catch (error: any) {
      toast({ 
        title: 'Erreur', 
        description: error.response?.data?.message || 'Une erreur est survenue',
        status: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: number) => {
    setBlogToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    try {
      await api.delete(`/blogs/${blogToDelete}`);
      toast({ title: 'Article supprimé', status: 'success' });
      fetchData();
    } catch (error) {
      toast({ title: 'Erreur lors de la suppression', status: 'error' });
    } finally {
      onAlertClose();
      setBlogToDelete(null);
    }
  };

  // TanStack Table configuration
  const columnHelper = createColumnHelper<BlogPost>();
  
  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('title', {
      header: 'Titre',
      cell: info => <Text fontWeight="bold" noOfLines={1} maxW="200px">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('category.name', {
      header: 'Catégorie',
      cell: info => <Badge colorScheme="brand">{info.getValue()}</Badge>,
    }),
    columnHelper.accessor('author_name', {
      header: 'Auteur',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => dayjs(info.getValue()).format('D MMMM YYYY'),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (props) => (
        <Flex gap={2}>
          <IconButton
            aria-label="Modifier"
            icon={<FiEdit2 />}
            size="sm"
            colorScheme="blue"
            variant="ghost"
            onClick={() => handleOpenModal(props.row.original)}
          />
          <IconButton
            aria-label="Supprimer"
            icon={<FiTrash2 />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => confirmDelete(props.row.original.id)}
          />
        </Flex>
      ),
    })
  ], []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="gray.700">Gestion des Articles</Heading>
        <Button leftIcon={<FiPlus />} variant="brand" onClick={() => handleOpenModal()}>
          Nouvel article
        </Button>
      </Flex>

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : (
        <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un article..." />
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>{editingBlog ? 'Modifier l\'article' : 'Nouvel article'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex gap={4} mb={4}>
              <FormControl isRequired>
                <FormLabel>Titre</FormLabel>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Slug</FormLabel>
                <Input 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})} 
                />
              </FormControl>
            </Flex>

            <Flex gap={4} mb={4}>
              <FormControl isRequired>
                <FormLabel>Catégorie</FormLabel>
                <Select 
                  value={formData.category_id}
                  onChange={e => setFormData({...formData, category_id: e.target.value})}
                >
                  <option value="">Sélectionner...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Auteur</FormLabel>
                <Input 
                  value={formData.author_name} 
                  onChange={e => setFormData({...formData, author_name: e.target.value})} 
                />
              </FormControl>
            </Flex>

            <Flex gap={4} mb={4}>
              <FormControl isRequired>
                <FormLabel>Temps de lecture</FormLabel>
                <Input 
                  value={formData.read_time} 
                  onChange={e => setFormData({...formData, read_time: e.target.value})} 
                  placeholder="Ex: 5 min"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date de publication</FormLabel>
                <Input 
                  type="date"
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})} 
                />
              </FormControl>
            </Flex>

            <FormControl isRequired mb={4}>
              <FormLabel>Image URL (absolue ou path)</FormLabel>
              <Input 
                value={formData.image_url} 
                onChange={e => setFormData({...formData, image_url: e.target.value})} 
              />
            </FormControl>

            <FormControl isRequired mb={4}>
              <FormLabel>Extrait (Résumé)</FormLabel>
              <Textarea 
                value={formData.excerpt} 
                onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                rows={2}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contenu complet</FormLabel>
              <Textarea 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
                rows={6}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} variant="ghost">Annuler</Button>
            <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
              Enregistrer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer l'article
            </AlertDialogHeader>
            <AlertDialogBody>
              Êtes-vous sûr ? Cette action est irréversible.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
