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
  pinned: boolean;
  integrations?: string;
  estimated_time?: string; // only for tutorial
  feature_name?: string; // only for feature doc
};
