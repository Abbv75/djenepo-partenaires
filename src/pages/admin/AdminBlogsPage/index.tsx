import { useMemo } from 'react';
import { Box, Flex, IconButton, Spinner, Center, Text, Badge } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

import { DataTable } from '../../../components/DataTable';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ConfirmDeleteAlert } from '../../../components/ui/ConfirmDeleteAlert';
import { BlogModal } from './BlogModal';
import type { BlogPost } from '../../../types';
import { useAdminBlogs } from './hooks/useAdminBlogs';

export default function AdminBlogsPage() {
  const {
    data,
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
