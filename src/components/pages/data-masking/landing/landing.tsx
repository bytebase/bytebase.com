import Hero from '../hero';
import Features from '../features';
import PromoDataMasking from '@/components/pages/home/promo-data-masking';
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
      <PromoDataMasking />
      <Features />
      <RelatedPosts posts={posts} module="LANDING" />
      <Community />
    </>
  );
};

export default Landing;
