import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { CustomModal } from '../../../components/ui/CustomModal';
import { DynamicForm } from '../../../components/ui/DynamicForm';
import type { FormField } from '../../../components/ui/DynamicForm';
import type { Category } from '../../../types';
import { categorySchema } from '../../../schemas';
import { useCreateCategory, useUpdateCategory } from '../../../api/useCategoriesQuery';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCat: Category | null;
  onSuccess: () => void;
}

export function CategoryModal({ isOpen, onClose, editingCat, onSuccess }: CategoryModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({ name: '', icon: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isSubmitting = createCategory.isPending || updateCategory.isPending;

  useEffect(() => {
    setErrors({});
    if (editingCat) {
      setFormData({ name: editingCat.name, icon: editingCat.icon || '' });
    } else {
      setFormData({ name: '', icon: 'FiGrid' });
    }
  }, [editingCat, isOpen]);

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

    const validation = categorySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      (validation.error as any).errors.forEach((err: any) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const onMutationSuccess = () => {
      onSuccess();
      onClose();
    };
    const onMutationError = (error: any) => {
      toast({
        title: 'Erreur',
        description: error.response?.data?.message || 'Une erreur est survenue',
        status: 'error',
      });
    };

    if (editingCat) {
      updateCategory.mutate(
        { id: editingCat.id, data: formData },
        {
          onSuccess: () => { toast({ title: 'Catégorie modifiée', status: 'success' }); onMutationSuccess(); },
          onError: onMutationError,
        }
      );
    } else {
      createCategory.mutate(formData, {
        onSuccess: () => { toast({ title: 'Catégorie ajoutée', status: 'success' }); onMutationSuccess(); },
        onError: onMutationError,
      });
    }
  };

  const formFields: FormField[] = [
    { name: 'name', label: 'Nom de la catégorie', type: 'text', placeholder: 'Ex: Technologies' },
    {
      name: 'icon',
      label: "Icône de la catégorie",
      type: 'icon-picker'
    }
  ];

  return (
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
  );
}
