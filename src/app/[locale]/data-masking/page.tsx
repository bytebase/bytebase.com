import getMetadata from '@/utils/get-metadata';

import { getBlogPostBySlug } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';
import Landing from '@/components/pages/data-masking/landing';
import { BlogPost } from '@/types/blog-post';

export const metadata = getMetadata(SEO_DATA.DATA_MASKING);

const POSTS = ['how-to-manage-database-access-control', 'mysql-data-masking', 'bytebase-vs-flyway'];

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
      <h1 className="sr-only">Dyanmic Data Masking</h1>
      <Landing posts={relatedPosts} />
    </>
  );
};

export default DataMaskingPage;
