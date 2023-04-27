import slugifyText from '@/utils/slugify-text';

import { BlogPost } from '@/types/blog-post';

import Pagination from './pagination/pagination';
import PostsGrid from './posts-grid';
import Tabs from './tabs';
import { TabCategory } from './tabs/tabs';

type PostsProps = {
  posts: BlogPost[];
  tabs: string[];
  page: number;
  category?: string;
  pageCount: number;
};

const Posts = ({ posts, tabs, page = 1, category = '', pageCount }: PostsProps) => {
  const tabsWithSlug = tabs.map((tab) => ({ label: tab, slug: slugifyText(tab) } as TabCategory));
  tabsWithSlug.unshift({ label: 'All Posts' } as TabCategory);

  return (
    <section className="posts mt-20 lg:mt-[78px] md:mt-16 sm:mt-14">
      <div className="container">
        <h1
          aria-hidden="true"
          className="font-title text-72 leading-none lg:text-50 md:text-46 sm:text-34"
        >
          Bytebase blog
        </h1>
        <Tabs items={tabsWithSlug} currentSlug={category} />
        <PostsGrid posts={posts} />
        {pageCount > 1 && (
          <Pagination currentPageIndex={page} categoryPath={category} pageCount={pageCount} />
        )}
      </div>
    </section>
  );
};

export default Posts;
