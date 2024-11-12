import Hero from '../hero';
import Features from '../features';
import PromoBatchChange from '@/components/pages/home/promo-batch-change';
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
      <PromoBatchChange />
      <Features />
      <RelatedPosts posts={posts} module="LANDING" />
      <EnterpriseInquiry />
    </>
  );
};

export default Landing;
