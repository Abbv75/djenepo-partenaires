import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useBlogs, useDeleteBlog } from '../../../../api/useBlogsQuery';
import { useCategories } from '../../../../api/useCategoriesQuery';
import { blogKeys } from '../../../../api/queryKeys';
import type { BlogPost } from '../../../../types';

export function useAdminBlogs() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: data = [], isLoading: loading } = useBlogs();
  const { data: categories = [] } = useCategories();
  const deleteBlogMutation = useDeleteBlog();

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  const fetchData = () => {
    queryClient.invalidateQueries({ queryKey: blogKeys.list() });
  };

  const handleOpenModal = (blog?: BlogPost) => {
    setEditingBlog(blog ?? null);
    onOpen();
  };

  const confirmDelete = (id: number) => {
    setBlogToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    deleteBlogMutation.mutate(blogToDelete, {
      onSuccess: () => {
        toast({ title: 'Article supprimé', status: 'success' });
        onAlertClose();
        setBlogToDelete(null);
      },
      onError: () => {
        toast({ title: 'Erreur lors de la suppression', status: 'error' });
        onAlertClose();
        setBlogToDelete(null);
      },
    });
  };

  return {
    data,
    categories,
    loading,
    isOpen,
    onClose,
    editingBlog,
    isAlertOpen,
    onAlertClose,
    isDeleting: deleteBlogMutation.isPending,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete,
  };
}
