import Hero from '../hero';
import Features from '../features';
import PromoBatchChange from '@/components/pages/home/promo-batch-change';
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
      <PromoBatchChange />
      <Features />
      <RelatedPosts posts={posts} module="LANDING" />
      <Community />
    </>
  );
};

export default Landing;
