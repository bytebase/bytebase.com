import getMetadata from '@/utils/get-metadata';

import { getBlogPostBySlug } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';
import Landing from '@/components/pages/sql-editor/landing';
import { BlogPost } from '@/types/blog-post';

export const metadata = getMetadata(SEO_DATA.SQL_EDITOR);

const POSTS = ['bytebase-vs-cloudbeaver', 'bytebase-vs-dbeaver', 'stop-using-navicat'];

const SQLEditorPage = () => {
  const relatedPosts: BlogPost[] = [];

  for (const post of POSTS) {
    const relatedPost = getBlogPostBySlug(post);
    if (relatedPost) {
      relatedPosts.push(relatedPost);
    }
  }

  return (
    <>
      <h1 className="sr-only">SQL Editor</h1>
      <Landing
        posts={relatedPosts}
        subjects={['DataGrip+++', 'DBeaver+++', 'Navicat+++', 'TablePlus+++']}
      />
    </>
  );
};

export default SQLEditorPage;
