import clsx from 'clsx';

import { BlogPost } from '@/types/blog-post';

import BlogPostCard from '../../blog-post-card';
import { BlogPostTCardThemes } from '../../blog-post-card/blog-post-card';

const getPostSize = (index: number): { size: string; theme: BlogPostTCardThemes } => {
  if ([3, 4, 15, 16].indexOf(index) > -1) {
    return {
      size: 'col-span-6',
      theme: 'large',
    };
  }

  if (index <= 3 || (index >= 9 && index <= 14)) {
    return {
      size: 'col-span-4 md:col-span-6',
      theme: 'default',
    };
  }
  return {
    size: 'col-span-3 md:col-span-6',
    theme: 'small',
  };
};

type PostsGridProps = {
  posts: BlogPost[];
};

const PostsGrid = ({ posts }: PostsGridProps) => {
  return (
    <ul className="gap-x-grid mt-16 grid grid-cols-12 gap-y-14 lg:mt-12 lg:gap-y-12 md:mt-8 md:gap-y-8 xs:mt-6">
      {posts.map((post, index) => {
        const { size, theme } = getPostSize(index);
        return (
          <li key={index} className={clsx('xs:col-span-full', size)}>
            <BlogPostCard post={post} theme={theme} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsGrid;
