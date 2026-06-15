import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
  icon: z.string().min(1, "Le nom de l'icône est requis")
});

export const blogPostSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  category_id: z.string().min(1, "La catégorie est requise"),
  author_name: z.string().min(1, "Le nom de l'auteur est requis"),
  read_time: z.string().min(1, "Le temps de lecture est requis"),
  date: z.string().min(1, "La date de publication est requise"),
  image_url: z.string().min(1, "L'URL de l'image est requise"),
  excerpt: z.string().min(1, "Le résumé est requis"),
  content: z.string().min(1, "Le contenu de l'article est requis")
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  tagline: z.string().min(1, "L'accroche est requise"),
  desc: z.string().min(1, "La description est requise"),
  icon: z.string().min(1, "L'icône est requise"),
  features: z.array(z.string()).min(1, "Au moins une caractéristique est requise"),
});
