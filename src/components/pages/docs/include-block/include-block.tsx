import { getPostBySlug } from '@/lib/api-docs';

import Content from '../content';

const IncludeBlock = ({ url }: { url: string }) => {
  const post = getPostBySlug(url.replace(/^\//, ''));

  if (!post) return null;

  const { content } = post;

  return (
    <figure className="include-block">
      <Content content={content} />
    </figure>
  );
};

export default IncludeBlock;
