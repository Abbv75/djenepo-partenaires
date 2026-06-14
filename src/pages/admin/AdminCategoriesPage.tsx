import { useState, useEffect, useMemo } from 'react';
import { Box, Flex, IconButton, useDisclosure, useToast, Spinner, Center, Text } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { createColumnHelper } from '@tanstack/react-table';
import api from '../../constant/AxiosInstance';
import { DataTable } from '../../components/DataTable';
import { PageHeader } from '../../components/ui/PageHeader';
import { CustomModal } from '../../components/ui/CustomModal';
import { ConfirmDeleteAlert } from '../../components/ui/ConfirmDeleteAlert';
import { DynamicForm } from '../../components/ui/DynamicForm';
import type { FormField } from '../../components/ui/DynamicForm';
import type { Category } from '../../types';

export default function AdminCategoriesPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({ name: '', icon: '' });

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [catToDelete, setCatToDelete] = useState<number | null>(null);

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
      setFormData({ name: cat.name, icon: cat.icon || '' });
    } else {
      setEditingCat(null);
      setFormData({ name: '', icon: 'FiGrid' });
    }
    onOpen();
  };

  const handleFormChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCat) {
        await api.put(`/categories/${editingCat.id}`, formData);
        toast({ title: 'Catégorie modifiée', status: 'success' });
      } else {
        await api.post('/categories', formData);
        toast({ title: 'Catégorie ajoutée', status: 'success' });
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

  // Dynamic Form configuration
  const formFields: FormField[] = [
    { name: 'name', label: 'Nom de la catégorie', type: 'text', placeholder: 'Ex: Technologies' },
    { name: 'icon', label: "Nom de l'icône (React Icons)", type: 'text', placeholder: 'Ex: FiMonitor' }
  ];

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
      cell: info => info.getValue(),
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

      {/* Add/Edit Modal with Dynamic Form */}
      <CustomModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={handleSubmit}
        title={editingCat ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        isSubmitting={isSubmitting}
      >
        <DynamicForm 
          fields={formFields} 
          formData={formData} 
          onChange={handleFormChange} 
        />
      </CustomModal>

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
