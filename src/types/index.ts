export interface Category {
  id: number;
  name: string;
  icon?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  read_time: string;
  image_url: string;
  date: string;
  category_id: number;
  category?: Category;
}

export interface Service {
  id: number;
  service_category_id: number;
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  icon: string;
  service_category?: ServiceCategory;
}

export interface ServiceCategory {
  id: number;
  name: string;
  icon: string;
}
