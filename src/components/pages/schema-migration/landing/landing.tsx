import Hero from '../hero';
import Features from '../features';
import PromoAutomationChanges from '@/components/pages/home/promo-automation-changes';
import EnterpriseInquiry from '@/components/shared/enterprise-inquiry';
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
      <div className="mt-20 xl:mt-16 md:mt-12 sm:mt-8">
        <PromoAutomationChanges />
      </div>
      <Features />
      <RelatedPosts posts={posts} module="LANDING" />
      <EnterpriseInquiry />
    </>
  );
};

export default Landing;
