import { useState, useEffect, useMemo } from 'react';
import { Box, Flex, IconButton, useDisclosure, useToast, Spinner, Center, Text } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import { createColumnHelper } from '@tanstack/react-table';
import api from '../../constant/AxiosInstance';
import { DataTable } from '../../components/DataTable';
import { PageHeader } from '../../components/ui/PageHeader';
import { CustomModal } from '../../components/ui/CustomModal';
import { ConfirmDeleteAlert } from '../../components/ui/ConfirmDeleteAlert';
import { DynamicForm } from '../../components/ui/DynamicForm';
import type { FormField } from '../../components/ui/DynamicForm';
import type { Category } from '../../types';
import { categorySchema } from '../../schemas';

export default function AdminCategoriesPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({ name: '', icon: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors({});
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
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = categorySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      (validation.error as any).errors.forEach((err: any) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

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
    { 
      name: 'icon', 
      label: "Icône de la catégorie", 
      type: 'icon-picker'
    }
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
          errors={errors}
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
