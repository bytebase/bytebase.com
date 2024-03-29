import { getBlogPostBySlug } from '@/lib/api-blog';
import Landing from '@/components/pages/schema-migration/landing';
import { BlogPost } from '@/types/blog-post';
import getMetadata from '@/utils/get-metadata';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.LIQUIBASE);
const POSTS = [
  'bytebase-vs-liquibase',
  'top-database-schema-change-tool-evolution',
  'how-to-handle-database-schema-change',
];

const Page = () => {
  const relatedPosts: BlogPost[] = [];

  for (const post of POSTS) {
    const relatedPost = getBlogPostBySlug(post);
    if (relatedPost) {
      relatedPosts.push(relatedPost);
    }
  }

  return (
    <>
      <h1 className="sr-only">{metadata.title}</h1>
      <Landing posts={relatedPosts} subjects={[metadata.title]} />
    </>
  );
};

export default Page;
