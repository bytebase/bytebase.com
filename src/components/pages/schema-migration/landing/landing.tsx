import Hero from '../hero';
import Features from '../features';
import PromoAutomationChanges from '@/components/pages/home/promo-automation-changes';
import Community from '@/components/shared/community';
import RelatedPosts from '@/components/pages/blog/related-posts';
import { BlogPost } from '@/types/blog-post';

type RelatedPostsProps = {
  posts: BlogPost[];
  subjects: string[];
};

const Landing = ({ posts, subjects }: RelatedPostsProps) => {
  return (
    <>
      <Hero subjects={subjects} />
      <PromoAutomationChanges />
      <Features />
      <RelatedPosts posts={posts} module="LANDING" />
      <Community />
    </>
  );
};

export default Landing;
