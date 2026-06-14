import { useState, useEffect, useMemo } from 'react';
import { Box, Flex, IconButton, useDisclosure, useToast, Spinner, Center, Text, Badge } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

import api from '../../../constant/AxiosInstance';
import { DataTable } from '../../../components/DataTable';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ConfirmDeleteAlert } from '../../../components/ui/ConfirmDeleteAlert';
import { BlogModal } from './BlogModal';
import type { BlogPost, Category } from '../../../types';

export default function AdminBlogsPage() {
  const [data, setData] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    } else {
      setEditingBlog(null);
    }
    onOpen();
  };

  const confirmDelete = (id: number) => {
    setBlogToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/blogs/${blogToDelete}`);
      toast({ title: 'Article supprimé', status: 'success' });
      fetchData();
    } catch (error) {
      toast({ title: 'Erreur lors de la suppression', status: 'error' });
    } finally {
      setIsDeleting(false);
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
      <PageHeader 
        title="Gestion des Articles" 
        actionLabel="Nouvel article" 
        onAction={() => handleOpenModal()} 
      />

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : (
        <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un article..." />
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
