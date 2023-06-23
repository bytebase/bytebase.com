import Content from '@/components/shared/content';

import { getBlogPostBySlug } from '@/lib/api-blog';
import { getPostBySlug } from '@/lib/api-docs';
import CONTENT_FOLDER from '@/lib/content-folder';

const getPost = (url: string) => {
  if (url.startsWith('/blog')) {
    return getBlogPostBySlug(CONTENT_FOLDER.blog, url);
  }
  const docUrl = url.replace('/docs/', '');
  return getPostBySlug(docUrl);
};

const IncludeBlock = ({ url }: { url: string }) => {
  const post = getPost(url);

  if (!post) {
    return null;
  }

  return <Content content={post.content} />;
};

export default IncludeBlock;
