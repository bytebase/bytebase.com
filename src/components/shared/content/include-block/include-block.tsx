import Content from '@/components/shared/content';

import { getPostBySlug } from '@/lib/api-docs';

const getPost = (url: string) => {
  const docUrl = url.replace('/docs/', '');
  return getPostBySlug(docUrl);
};

const IncludeBlock = ({ url, db }: { url: string; db: string }) => {
  const post = getPost(url);

  if (!post) {
    return null;
  }
  if (db) {
    post.content = post.content.replaceAll('###db###', '-' + db);
  } else {
    post.content = post.content.replaceAll('###db###', '');
  }

  return <Content content={post.content} />;
};

export default IncludeBlock;
