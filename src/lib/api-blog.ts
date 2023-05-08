import { getTimeToRead } from '@/utils/get-time-to-read';
import slugifyText from '@/utils/slugify-text';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { BlogPost } from '@/types/blog-post';

import CONTENT_FOLDER from './content-folder';

const POSTS_PER_PAGE = 21;

type BlogPostsWithTags = {
  posts: BlogPost[];
  tags: string[];
};

const getAllBlogPosts = (): BlogPostsWithTags => {
  const files = fs.readdirSync(CONTENT_FOLDER.blog).filter((file) => file.endsWith('.md'));

  const tagsSet = new Set();

  const posts: BlogPost[] = files
    .map((file) => {
      const slug = file.replace('.md', '');
      const post = getBlogPostBySlug(slug);

      if (!post || post.tags.includes('Hidden')) return null;

      post.tags.split(',').forEach((el) => {
        tagsSet.add(el.trim());
      });

      return {
        ...post,
      };
    })
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return { posts, tags: Array.from(tagsSet) as string[] };
};

const getBlogPostBySlug = (slug: string): BlogPost | null => {
  try {
    const filePath = path.join(CONTENT_FOLDER.blog, `${slug}.md`);
    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(markdownWithMeta);

    if (!data || !content) return null;

    return {
      ...data,
      content,
      slug,
      timeToRead: getTimeToRead(content),
    } as BlogPost;
  } catch (e) {
    return null;
  }
};

type PostPerPageProps = {
  page: number;
  category?: string;
};

const getBlogPostsPerPage = ({
  page,
  category = '',
}: PostPerPageProps):
  | (BlogPostsWithTags & { pageCount: number; recentPosts: BlogPost[] })
  | null => {
  const startIndex = (page - 1) * POSTS_PER_PAGE;

  const { posts, tags } = getAllBlogPosts();

  const postsInCategory = posts.filter(
    (el) => category === '' || category === slugifyText(el.tags),
  );

  const recentPosts = posts.filter((el) => el.tags !== 'Tutorial').slice(0, 5);

  const postsWithoutTutorial = postsInCategory.filter((el) => el.tags !== 'Tutorial');

  const result = postsWithoutTutorial.slice(startIndex, startIndex + POSTS_PER_PAGE);

  if (result.length === 0) return null;

  return {
    recentPosts,
    pageCount: Math.ceil(postsWithoutTutorial.length / POSTS_PER_PAGE),
    posts: result,
    tags: tags.filter((el) => el !== 'Tutorial'),
  };
};

const getTagNameBySlug = (tagSlag: string): string => {
  const tags: Record<string, string> = {
    announcement: 'Announcement',
    industry: 'Industry',
    explanation: 'Explanation',
    engineering: 'Engineering',
    'how-to': 'How-To',
    'case-study': 'Case Study',
  };

  return tags[tagSlag];
};

export {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsPerPage,
  getTagNameBySlug,
  POSTS_PER_PAGE,
};
