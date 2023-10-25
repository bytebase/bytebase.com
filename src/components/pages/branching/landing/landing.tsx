import Hero from '../hero';
import PromoBranching from '@/components/pages/home/promo-branching';
import Community from '@/components/shared/community';
import RelatedPosts from '@/components/pages/blog/related-posts';
import { BlogPost } from '@/types/blog-post';

type RelatedPostsProps = {
  posts: BlogPost[];
};

const Landing = ({ posts }: RelatedPostsProps) => {
  return (
    <>
      <Hero />
      <PromoBranching />
      <RelatedPosts posts={posts} module="LANDING" />
      <Community />
    </>
  );
};

export default Landing;
