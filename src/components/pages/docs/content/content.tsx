import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

import clsx from 'clsx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import CodeBlock from '@/components/shared/code-block';

import DocLinkBlock from '../doc-link-block';
import HintBlock from '../hint-block';
import IncludeBlock from '../include-block';

interface ContentProps {
  className?: string;
  content: string;
}

const components = {
  table: (props: any) => (
    <figure className="table-wrapper">
      <table {...props} />
    </figure>
  ),
  pre: (props: any) => <>{props.children}</>,
  code: (props: any) => {
    if (props?.className?.startsWith('language-')) {
      return <CodeBlock {...props} />;
    }
    return <code {...props} />;
  },
  img: (props: any) => {
    const { src, alt } = props;
    return (
      <Image
        className="my-11"
        src={src}
        width={716}
        height={344}
        style={{ width: '100%', height: '100%' }}
        alt={alt}
      />
    );
  },
  HintBlock,
  DocLinkBlock,
  IncludeBlock,
};

const Content = ({ className, content }: ContentProps) => {
  return (
    <div className={clsx(className, 'content prose prose-lg max-w-none')}>
      {/* @ts-expect-error Server Component */}
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              // Adds support for GitHub Flavored Markdown
              remarkGfm,
            ],
            // These work together to add IDs and linkify headings
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </div>
  );
};

export default Content;
