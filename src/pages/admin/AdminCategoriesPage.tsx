import { useState, useEffect, useMemo } from 'react';
import {
  Box, Button, Heading, Flex, IconButton, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input,
  useToast, Spinner, Center, Text, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
} from '@chakra-ui/react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  createColumnHelper,
} from '@tanstack/react-table';
import React from 'react';
import api from '../../constant/AxiosInstance';
import { DataTable } from '../../components/DataTable';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export default function AdminCategoriesPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', icon: '' });

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
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
      setFormData({ name: cat.name, slug: cat.slug, icon: cat.icon });
    } else {
      setEditingCat(null);
      setFormData({ name: '', slug: '', icon: 'FiGrid' });
    }
    onOpen();
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
    try {
      await api.delete(`/categories/${catToDelete}`);
      toast({ title: 'Catégorie supprimée', status: 'success' });
      fetchData();
    } catch (error) {
      toast({ title: 'Erreur lors de la suppression', status: 'error' });
    } finally {
      onAlertClose();
      setCatToDelete(null);
    }
  };

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
    columnHelper.accessor('slug', {
      header: 'Slug',
      cell: info => info.getValue(),
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
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="gray.700">Gestion des Catégories</Heading>
        <Button leftIcon={<FiPlus />} variant="brand" onClick={() => handleOpenModal()}>
          Nouvelle catégorie
        </Button>
      </Flex>

      {loading ? (
        <Center p={10}>
          <Spinner color="brand.500" size="xl" />
        </Center>
      ) : (
        <DataTable columns={columns} data={data} searchPlaceholder="Rechercher une catégorie..." />
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>{editingCat ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired mb={4}>
              <FormLabel>Nom de la catégorie</FormLabel>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Ex: Technologies"
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Slug (URL)</FormLabel>
              <Input 
                value={formData.slug} 
                onChange={e => setFormData({...formData, slug: e.target.value})} 
                placeholder="Ex: technologies"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nom de l'icône (React Icons)</FormLabel>
              <Input 
                value={formData.icon} 
                onChange={e => setFormData({...formData, icon: e.target.value})} 
                placeholder="Ex: FiMonitor"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} variant="ghost">Annuler</Button>
            <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
              Enregistrer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer la catégorie
            </AlertDialogHeader>
            <AlertDialogBody>
              Êtes-vous sûr ? Vous ne pourrez pas annuler cette action.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
