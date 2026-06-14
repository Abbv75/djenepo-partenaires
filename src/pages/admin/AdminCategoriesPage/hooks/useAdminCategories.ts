import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useCategories, useDeleteCategory } from '../../../../api/useCategoriesQuery';
import { categoryKeys } from '../../../../api/queryKeys';
import type { Category } from '../../../../types';

export function useAdminCategories() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: data = [], isLoading: loading } = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [catToDelete, setCatToDelete] = useState<number | null>(null);

  const fetchData = () => {
    queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
  };

  const handleOpenModal = (cat?: Category) => {
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
