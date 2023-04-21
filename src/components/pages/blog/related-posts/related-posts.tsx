import { BlogPost } from '@/types/blog-post';

import BlogPostCard from '../blog-post-card';

type RelatedPostsProps = {
  posts: BlogPost[];
};

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts) return null;

  return (
    <section className="container related-posts">
      <ul className="gap-x-grid mt-14 grid grid-cols-12 lg:mt-12 md:mt-10 md:gap-y-8 sm:mt-8 sm:gap-y-6">
        {posts.map((post, index) => (
          <li
            className="col-span-3 pr-9 2xl:pr-0 md:col-span-6 sm:col-span-full sm:gap-y-6"
            key={index}
          >
            <BlogPostCard post={post} hasImage={false} theme="small" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;
