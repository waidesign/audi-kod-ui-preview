export type AppView = 'home' | 'msrp' | 'login' | 'signup' | 'blog' | 'blog-post';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Guides' | 'VIN Decoding' | 'Audi News' | 'Buying Tips';
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
}
