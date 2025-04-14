export type BlogPost = {
  title: string;
  description: string;
  content: string;
  og_image?: string;
  feature_image: string;
  updated_at: string;
  author: string;
  tags: string;
  slug: string;
  timeToRead: string;
  featured: boolean;
  integrations?: string; // only for tutorial
  estimated_time?: string; // only for tutorial
  category?: string; // only for tutorial
  feature_name?: string;
};
