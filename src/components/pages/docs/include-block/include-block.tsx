import { getPostBySlug } from '@/lib/api-docs';

import Content from '../content';

interface IncludeBlockProps {
  url: string;
}

const IncludeBlock = ({ url }: IncludeBlockProps) => {
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
