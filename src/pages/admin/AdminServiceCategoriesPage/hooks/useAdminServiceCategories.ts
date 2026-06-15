import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useServiceCategories, useDeleteServiceCategory } from '../../../../api/useServiceCategoriesQuery';
import { serviceCategoryKeys } from '../../../../api/queryKeys';
import type { ServiceCategory } from '../../../../types';

export function useAdminServiceCategories() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: data = [], isLoading: loading } = useServiceCategories();
  const deleteCategoryMutation = useDeleteServiceCategory();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCat, setEditingCat] = useState<ServiceCategory | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [catToDelete, setCatToDelete] = useState<number | null>(null);

  const fetchData = () => {
    queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
  };

  const handleOpenModal = (cat?: ServiceCategory) => {
    setEditingCat(cat ?? null);
    onOpen();
  };

  const confirmDelete = (id: number) => {
    setCatToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!catToDelete) return;
    deleteCategoryMutation.mutate(catToDelete, {
      onSuccess: () => {
        toast({ title: 'Catégorie supprimée', status: 'success' });
        onAlertClose();
        setCatToDelete(null);
      },
      onError: () => {
        toast({ title: 'Erreur lors de la suppression', status: 'error' });
        onAlertClose();
        setCatToDelete(null);
      },
    });
  };

  return {
    data,
    loading,
    isOpen,
    onClose,
    editingCat,
    isAlertOpen,
    onAlertClose,
    isDeleting: deleteCategoryMutation.isPending,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete,
  };
}
