import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import api from '../../../constant/AxiosInstance';
import { CustomModal } from '../../../components/ui/CustomModal';
import { DynamicForm } from '../../../components/ui/DynamicForm';
import type { FormField } from '../../../components/ui/DynamicForm';
import type { Category } from '../../../types';
import { categorySchema } from '../../../schemas';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCat: Category | null;
  onSuccess: () => void;
}

export function CategoryModal({ isOpen, onClose, editingCat, onSuccess }: CategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({ name: '', icon: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();

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
      onSuccess();
      onClose();
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
