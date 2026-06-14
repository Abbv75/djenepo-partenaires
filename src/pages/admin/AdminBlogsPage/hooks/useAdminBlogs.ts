import { useState, useEffect } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import api from '../../../../constant/AxiosInstance';
import type { BlogPost, Category } from '../../../../types';

export function useAdminBlogs() {
  const [data, setData] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Delete Alert state
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [blogsRes, catsRes] = await Promise.all([
        api.get('/blogs'),
        api.get('/categories')
      ]);
      setData(blogsRes.data.data);
      setCategories(catsRes.data.data);
    } catch (error) {
      toast({ title: 'Erreur de chargement', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
    } else {
      setEditingBlog(null);
    }
    onOpen();
  };

  const confirmDelete = (id: number) => {
    setBlogToDelete(id);
    onAlertOpen();
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/blogs/${blogToDelete}`);
      toast({ title: 'Article supprimé', status: 'success' });
      fetchData();
    } catch (error) {
      toast({ title: 'Erreur lors de la suppression', status: 'error' });
    } finally {
      setIsDeleting(false);
      onAlertClose();
      setBlogToDelete(null);
    }
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
    isDeleting,
    fetchData,
    handleOpenModal,
    confirmDelete,
    handleDelete
  };
}
