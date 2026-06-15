import { useMemo } from 'react';
import { Box, Flex, IconButton, Spinner, Center, Text, Badge, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import { createColumnHelper } from '@tanstack/react-table';

import { DataTable } from '../../../components/DataTable';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ConfirmDeleteAlert } from '../../../components/ui/ConfirmDeleteAlert';
import { ServiceModal } from './ServiceModal';
import type { Service } from '../../../types';
import { useAdminServices } from './hooks/useAdminServices';

export default function AdminServicesPage() {
  const {
    data,
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

  const columnHelper = createColumnHelper<Service>();

  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Titre',
      cell: info => <Text fontWeight="bold">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('slug', {
      header: 'Slug / Ancre',
      cell: info => <Badge colorScheme="purple">{info.getValue()}</Badge>,
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
    columnHelper.accessor('features', {
      header: 'Caractéristiques',
      cell: info => {
        const feats = info.getValue() || [];
        return (
          <Wrap spacing={1} maxW="300px">
            {feats.map((feat, idx) => (
              <WrapItem key={idx}>
                <Tag size="sm" variant="subtle" colorScheme="gray">
                  {feat}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
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
        title="Gestion des Services"
        actionLabel="Nouveau service"
        onAction={() => handleOpenModal()}
      />

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : (
        <DataTable columns={columns} data={data} searchPlaceholder="Rechercher un service..." />
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
