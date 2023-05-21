import Pagination from '@/components/shared/pagination/pagination';

import { BlogPost } from '@/types/blog-post';

import Route from '@/lib/route';

import PostsGrid from './posts-grid';

type PostsProps = {
  posts: BlogPost[];
  page: number;
  category?: string;
  title: string;
  pageCount: number;
};

const Posts = ({ posts, title, page = 1, category = '', pageCount }: PostsProps) => {
  return (
    <section className="posts mt-20 lg:mt-[78px] md:mt-16 sm:mt-14">
      <div className="container">
        <h1
          aria-hidden="true"
          className="font-title text-72 leading-none lg:text-50 md:text-46 sm:text-34"
        >
          {title}
        </h1>
        <PostsGrid posts={posts} />
        {pageCount > 1 && (
          <Pagination
            marginClassName="mt-16 xl:mt-14 md:mt-12 sm:mt-8"
            currentPageIndex={page}
            path={category ? `${Route.BLOG_CATEGORY}/${category}` : Route.BLOG}
            pageCount={pageCount}
          />
        )}
      </div>
    </section>
  );
};

export default Posts;
