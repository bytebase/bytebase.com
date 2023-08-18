import Link from '@/components/shared/link';

import { BlogPost } from '@/types/blog-post';

import ROUTE from '@/lib/route';

import Arrow from '@/svgs/arrow.inline.svg';

import BlogPostCard from '../blog-post-card';

type RelatedPostsProps = {
  posts: BlogPost[];
  module: 'BLOG' | 'LANDING';
};

const RelatedPosts = ({ posts, module }: RelatedPostsProps) => {
  if (!posts) return null;

  return (
    <section className="container related-posts mt-20 lg:mt-14 md:mt-10 sm:mt-8">
      <div className="flex items-center justify-between border-t border-gray-90 pt-16 lg:pt-8 md:pt-10 sm:pt-8">
        <h2 className="font-title text-52 leading-none lg:text-50 md:text-46 sm:text-34">
          Related posts
        </h2>
        {module == 'BLOG' && (
          <Link
            className="flex items-center gap-x-2.5 rounded-full bg-gray-97 px-5 py-[11px] text-18 font-medium leading-none hover:bg-gray-90 md:text-16 sm:gap-x-2 sm:py-2 sm:px-4 sm:text-14"
            href={ROUTE.BLOG}
          >
            Back to blog
            <Arrow className="w-5 sm:w-4" />
          </Link>
        )}
      </div>
      <ul className="gap-x-grid mt-10 grid grid-cols-12 lg:mt-8 md:mt-6 md:gap-y-8 sm:gap-y-8">
        {posts.map((post, index) => (
          <li className="col-span-4 sm:col-span-full" key={index}>
            <BlogPostCard post={post} theme="default" module={module} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;
