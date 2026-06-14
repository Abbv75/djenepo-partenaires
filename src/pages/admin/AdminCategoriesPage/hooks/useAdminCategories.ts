import { useState, useEffect } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import api from '../../../../constant/AxiosInstance';
import type { Category } from '../../../../types';

export function useAdminCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [catToDelete, setCatToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/categories');
      setData(res.data.data);
    } catch (error) {
      toast({ title: 'Erreur de chargement', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingCat(cat);
    } else {
      setEditingCat(null);
    }
    onOpen();
  };

  const confirmDelete = (id: number) => {
    setCatToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!catToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/categories/${catToDelete}`);
      toast({ title: 'Catégorie supprimée', status: 'success' });
      fetchData();
    } catch (error) {
      toast({ title: 'Erreur lors de la suppression', status: 'error' });
    } finally {
      setIsDeleting(false);
      onAlertClose();
      setCatToDelete(null);
    }
  };

  return {
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
  };
}
