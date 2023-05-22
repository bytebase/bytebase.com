import { getTimeToRead } from '@/utils/get-time-to-read';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { ChangelogPost } from '@/types/changelog-post';

import CONTENT_FOLDER from './content-folder';

const POSTS_PER_PAGE = 5;

const getAllChangelogPosts = (): ChangelogPost[] => {
  const files = fs.readdirSync(CONTENT_FOLDER.changelog).filter((file) => file.endsWith('.md'));

  const posts: ChangelogPost[] = files
    .map((file) => {
      const slug = file.replace('.md', '');
      const filePath = path.join(CONTENT_FOLDER.changelog, file);
      const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
      const { content, data } = matter(markdownWithMeta);

      if (!data || !content) return null;

      return {
        ...data,
        content,
        slug,
        timeToRead: getTimeToRead(content),
      } as ChangelogPost;
    })
    .filter((post): post is ChangelogPost => Boolean(post))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return posts;
};

const getChangelogPostsPerPage = (
  page: number,
): { posts: ChangelogPost[]; pageCount: number } | null => {
  const startIndex = (page - 1) * POSTS_PER_PAGE;

  const posts = getAllChangelogPosts();

  const result = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  if (result.length === 0) return null;

  return {
    pageCount: Math.ceil(posts.length / POSTS_PER_PAGE),
    posts: result,
  };
};

const getChangelogPostBySlug = (slug: string): ChangelogPost | null => {
  const posts = getAllChangelogPosts();

  return posts.find((post) => post.slug === slug) || null;
};

const getLatestChangelogPost = (): ChangelogPost | null => {
  const posts = getAllChangelogPosts();

  return posts[0] || null;
};

export {
  getAllChangelogPosts,
  getChangelogPostsPerPage,
  getLatestChangelogPost,
  getChangelogPostBySlug,
  POSTS_PER_PAGE,
};
