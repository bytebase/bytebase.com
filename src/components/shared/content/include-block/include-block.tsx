import Content from '@/components/shared/content';

import { getBlogPostBySlug } from '@/lib/api-blog';
import { getPostBySlug } from '@/lib/api-docs';

const getPost = (url: string) => {
  if (url.startsWith('/blog')) {
    return getBlogPostBySlug(url);
  }
  return getPostBySlug(url);
};

const IncludeBlock = ({ url }: { url: string }) => {
  const post = getPost(url);

  if (!post) {
    return null;
  }

  return <Content content={post.content} />;
};

export default IncludeBlock;
