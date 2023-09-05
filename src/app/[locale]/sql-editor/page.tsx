import getMetadata from '@/utils/get-metadata';

import { getBlogPostBySlug } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';
import Landing from '@/components/pages/sql-editor/landing';
import { BlogPost } from '@/types/blog-post';
import CONTENT_FOLDER from '@/lib/content-folder';

export const metadata = getMetadata(SEO_DATA.SQL_EDITOR);

const POSTS = ['top-dbeaver-alternative', 'top-open-source-sql-clients', 'stop-using-navicat'];

const SQLEditorPage = () => {
  const relatedPosts: BlogPost[] = [];

  for (const post of POSTS) {
    const relatedPost = getBlogPostBySlug(CONTENT_FOLDER.blog, post);
    if (relatedPost) {
      relatedPosts.push(relatedPost);
    }
  }

  return (
    <>
      <h1 className="sr-only">SQL Editor</h1>
      <Landing posts={relatedPosts} subjects={['DBeaver+++', 'Navicat+++', 'TablePlus+++']} />
    </>
  );
};

export default SQLEditorPage;
