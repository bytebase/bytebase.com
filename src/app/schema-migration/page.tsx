import getMetadata from '@/utils/get-metadata';

import { getBlogPostBySlug } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';
import Landing from '@/components/pages/schema-migration/landing';
import { BlogPost } from '@/types/blog-post';
import CONTENT_FOLDER from '@/lib/content-folder';

export const metadata = getMetadata(SEO_DATA.SCHEMA_MIGRATION);

const POSTS = [
  'bytebase-vs-liquibase',
  'bytebase-vs-flyway',
  'top-database-schema-change-tool-evolution',
];

const SchemaMigrationPage = () => {
  const relatedPosts: BlogPost[] = [];

  for (const post of POSTS) {
    const relatedPost = getBlogPostBySlug(CONTENT_FOLDER.blog, post);
    if (relatedPost) {
      relatedPosts.push(relatedPost);
    }
  }

  return (
    <>
      <h1 className="sr-only">Schema Migration</h1>
      <Landing posts={relatedPosts} subjects={['Flyway+++', 'Liquibase+++', 'DBeaver+++']} />
    </>
  );
};

export default SchemaMigrationPage;
