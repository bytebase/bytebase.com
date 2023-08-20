import Hero from '@/components/pages/sql-editor/hero';
import Features from '@/components/pages/sql-editor/features';
import PromoSQLEditor from '@/components/pages/home/promo-sql-editor';
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
      <PromoSQLEditor />
      <Features />
      <RelatedPosts posts={posts} module="LANDING" />
      <Community />
    </>
  );
};

export default Landing;
