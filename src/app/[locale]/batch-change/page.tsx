import getMetadata from '@/utils/get-metadata';

import { getBlogPostBySlug } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';
import Landing from '@/components/pages/batch-change/landing';
import { BlogPost } from '@/types/blog-post';

export const metadata = getMetadata(SEO_DATA.BATCH_CHANGE);

const POSTS = [
  'how-to-handle-database-schema-change',
  'bytebase-vs-liquibase',
  'bytebase-vs-flyway',
];

const DataMaskingPage = () => {
  const relatedPosts: BlogPost[] = [];

  for (const post of POSTS) {
    const relatedPost = getBlogPostBySlug(post);
    if (relatedPost) {
      relatedPosts.push(relatedPost);
    }
  }

  return (
    <>
      <h1 className="sr-only">Batch Change Databases</h1>
      <Landing posts={relatedPosts} />
    </>
  );
};

export default DataMaskingPage;
