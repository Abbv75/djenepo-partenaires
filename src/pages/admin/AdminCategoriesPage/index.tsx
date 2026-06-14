import { useMemo } from 'react';
import { Box, Flex, IconButton, Spinner, Center, Text } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import { createColumnHelper } from '@tanstack/react-table';

import { DataTable } from '../../../components/DataTable';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ConfirmDeleteAlert } from '../../../components/ui/ConfirmDeleteAlert';
import { CategoryModal } from './CategoryModal';
import type { Category } from '../../../types';
import { useAdminCategories } from './hooks/useAdminCategories';

export default function AdminCategoriesPage() {
  const {
    data,
    loading,
    isOpen,
    onClose,
    editingCat,
    isAlertOpen,
    onAlertClose,
    isDeleting,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete
  } = useAdminCategories();

  // TanStack Table configuration
  const columnHelper = createColumnHelper<Category>();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Nom',
      cell: info => <Text fontWeight="bold">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('icon', {
      header: 'Icône',
      cell: info => {
        const iconName = info.getValue() as string;
        let IconCmp: any = null;
        if (iconName) {
          if (iconName.startsWith('Fi')) IconCmp = (FiIcons as any)[iconName];
          if (iconName.startsWith('Hi')) IconCmp = (HiIcons as any)[iconName];
        }
        return (
          <Flex align="center" gap={3}>
            {IconCmp && (
              <Flex
                align="center"
                justify="center"
                w="36px"
                h="36px"
                bg="brand.50"
                color="brand.500"
                borderRadius="md"
              >
                <IconCmp size={20} />
              </Flex>
            )}
            <Text color="gray.600" fontSize="sm">{iconName}</Text>
          </Flex>
        );
      },
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
        title="Gestion des Catégories"
        actionLabel="Nouvelle catégorie"
        onAction={() => handleOpenModal()}
      />

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : (
        <DataTable columns={columns} data={data} searchPlaceholder="Rechercher une catégorie..." />
      )}

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={isOpen}
        onClose={onClose}
        editingCat={editingCat}
        onSuccess={fetchData}
      />

      {/* Delete Confirmation Alert */}
      <ConfirmDeleteAlert
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        message="Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible."
      />
    </Box>
  );
}

