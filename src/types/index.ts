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
