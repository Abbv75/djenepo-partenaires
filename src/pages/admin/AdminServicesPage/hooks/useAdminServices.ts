import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useServices, useDeleteService } from '../../../../api/useServicesQuery';
import { serviceKeys } from '../../../../api/queryKeys';
import type { Service } from '../../../../types';

export function useAdminServices() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: data = [], isLoading: loading } = useServices();
  const deleteServiceMutation = useDeleteService();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

  const fetchData = () => {
    queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
  };

  const handleOpenModal = (service?: Service) => {
    setEditingService(service ?? null);
    onOpen();
  };

  const confirmDelete = (id: number) => {
    setServiceToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    deleteServiceMutation.mutate(serviceToDelete, {
      onSuccess: () => {
        toast({ title: 'Service supprimé', status: 'success' });
        onAlertClose();
        setServiceToDelete(null);
      },
      onError: () => {
        toast({ title: 'Erreur lors de la suppression', status: 'error' });
        onAlertClose();
        setServiceToDelete(null);
      },
    });
  };

  return {
    data,
    loading,
    isOpen,
    onClose,
    editingService,
    isAlertOpen,
    onAlertClose,
    isDeleting: deleteServiceMutation.isPending,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete,
  };
}
