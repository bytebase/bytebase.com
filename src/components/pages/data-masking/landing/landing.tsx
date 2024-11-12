import Hero from '../hero';
import Features from '../features';
import PromoDataMasking from '@/components/pages/home/promo-data-masking';
import EnterpriseInquiry from '@/components/shared/enterprise-inquiry';
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
      <EnterpriseInquiry />
    </>
  );
};

export default Landing;
