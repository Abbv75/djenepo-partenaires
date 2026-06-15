import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { CustomModal } from '../../../components/ui/CustomModal';
import { DynamicForm } from '../../../components/ui/DynamicForm';
import type { FormField } from '../../../components/ui/DynamicForm';
import type { Service } from '../../../types';
import { serviceSchema } from '../../../schemas';
import { useCreateService, useUpdateService } from '../../../api/useServicesQuery';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingService: Service | null;
  onSuccess: () => void;
}

export function ServiceModal({ isOpen, onClose, editingService, onSuccess }: ServiceModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({
    title: '',
    slug: '',
    tagline: '',
    desc: '',
    icon: '',
    featuresString: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const isSubmitting = createService.isPending || updateService.isPending;

  useEffect(() => {
    setErrors({});
    if (editingService) {
      setFormData({
        title: editingService.title,
        slug: editingService.slug,
        tagline: editingService.tagline,
        desc: editingService.desc,
        icon: editingService.icon || '',
        featuresString: editingService.features ? editingService.features.join('\n') : '',
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        tagline: '',
        desc: '',
        icon: 'FiCompass',
        featuresString: '',
      });
    }
  }, [editingService, isOpen]);

  const handleFormChange = (name: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-generate slug from title if slug was empty or matches previous auto-slug
      if (name === 'title' && !editingService) {
        const generatedSlug = value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // remove accents
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        updated.slug = generatedSlug;
      }
      return updated;
    });

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

    // Map featuresString to features array for validation and submission
    const features = formData.featuresString
      ? formData.featuresString.split('\n').map((f: string) => f.trim()).filter(Boolean)
      : [];

    const dataToValidate = {
      title: formData.title,
      slug: formData.slug,
      tagline: formData.tagline,
      desc: formData.desc,
      icon: formData.icon,
      features,
    };

    const validation = serviceSchema.safeParse(dataToValidate);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      (validation.error as any).errors.forEach((err: any) => {
        const path = err.path[0] as string;
        if (path === 'features') {
          fieldErrors['featuresString'] = err.message;
        } else if (path) {
          fieldErrors[path] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = {
      title: formData.title,
      slug: formData.slug,
      tagline: formData.tagline,
      desc: formData.desc,
      icon: formData.icon,
      features,
    };

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

    if (editingService) {
      updateService.mutate(
        { id: editingService.id, data: payload },
        {
          onSuccess: () => { toast({ title: 'Service modifié', status: 'success' }); onMutationSuccess(); },
          onError: onMutationError,
        }
      );
    } else {
      createService.mutate(payload, {
        onSuccess: () => { toast({ title: 'Service ajouté', status: 'success' }); onMutationSuccess(); },
        onError: onMutationError,
      });
    }
  };

  const formFields: FormField[] = [
    { name: 'title', label: 'Titre du service', type: 'text', placeholder: 'Ex: Planification Stratégique' },
    { name: 'slug', label: 'Slug / Ancre HTML', type: 'text', placeholder: 'Ex: planification' },
    { name: 'tagline', label: 'Accroche / Tagline', type: 'text', placeholder: 'Ex: Des projets bien conçus dès le départ' },
    { name: 'desc', label: 'Description', type: 'textarea', placeholder: 'Description détaillée du service...', rows: 3 },
    { name: 'icon', label: 'Icône', type: 'icon-picker' },
    { 
      name: 'featuresString', 
      label: 'Caractéristiques (Une par ligne)', 
      type: 'textarea', 
      placeholder: 'Caractéristique 1\nCaractéristique 2\nCaractéristique 3', 
      rows: 5 
    },
  ];

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={editingService ? 'Modifier le service' : 'Nouveau service'}
      isSubmitting={isSubmitting}
      size="lg"
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
