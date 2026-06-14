import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import api from '../../../constant/AxiosInstance';
import { CustomModal } from '../../../components/ui/CustomModal';
import { DynamicForm } from '../../../components/ui/DynamicForm';
import type { FormField } from '../../../components/ui/DynamicForm';
import type { BlogPost, Category } from '../../../types';
import { blogPostSchema } from '../../../schemas';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingBlog: BlogPost | null;
  categories: Category[];
  onSuccess: () => void;
}

export function BlogModal({ isOpen, onClose, editingBlog, categories, onSuccess }: BlogModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    title: '', excerpt: '', content: '',
    author_name: '', read_time: '', image_url: '', date: '', category_id: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const toast = useToast();

  useEffect(() => {
    setErrors({});
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        excerpt: editingBlog.excerpt,
        content: editingBlog.content,
        author_name: editingBlog.author_name,
        read_time: editingBlog.read_time,
        image_url: editingBlog.image_url,
        date: editingBlog.date,
        category_id: editingBlog.category_id.toString()
      });
    } else {
      setFormData({
        title: '', excerpt: '', content: '',
        author_name: '', read_time: '', image_url: '', date: '', category_id: categories[0]?.id.toString() || ''
      });
    }
  }, [editingBlog, categories, isOpen]);

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

    const validation = blogPostSchema.safeParse(formData);
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
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog.id}`, formData);
        toast({ title: 'Article modifié', status: 'success' });
      } else {
        await api.post('/blogs', formData);
        toast({ title: 'Article ajouté', status: 'success' });
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
    { name: 'title', label: 'Titre', type: 'text', colSpan: 1 },
    { 
      name: 'category_id', 
      label: 'Catégorie', 
      type: 'select', 
      options: categories.map(c => ({ value: c.id, label: c.name })), 
      colSpan: 1 
    },
    { name: 'author_name', label: 'Auteur', type: 'text', colSpan: 1 },
    { name: 'read_time', label: 'Temps de lecture', type: 'text', placeholder: 'Ex: 5 min', colSpan: 1 },
    { name: 'date', label: 'Date de publication', type: 'date', colSpan: 1 },
    { name: 'image_url', label: 'Image URL', type: 'text', colSpan: 2 },
    { name: 'excerpt', label: 'Extrait (Résumé)', type: 'textarea', rows: 2, colSpan: 2 },
    { name: 'content', label: 'Contenu complet', type: 'textarea', rows: 6, colSpan: 2 }
  ];

  return (
    <CustomModal 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      title={editingBlog ? 'Modifier l\'article' : 'Nouvel article'}
      isSubmitting={isSubmitting}
      size="xl"
    >
      <DynamicForm 
        fields={formFields} 
        formData={formData} 
        onChange={handleFormChange} 
        errors={errors}
        columns={2}
      />
    </CustomModal>
  );
}
