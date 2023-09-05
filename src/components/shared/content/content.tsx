import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

import { Children, ReactNode, isValidElement } from 'react';

import slugifyText from '@/utils/slugify-text';
import clsx from 'clsx';
import remarkGfm from 'remark-gfm';

import CodeBlock from '@/components/shared/code-block';

import QuoteIcon from '@/svgs/quote.inline.svg';

import DocLinkBlock from './doc-link-block';
import EnterpriseOnlyBlock from './enterprise-only-block';
import HintBlock from './hint-block';
import IncludeBlock from './include-block';

const flattenChildrenToString = (children: ReactNode): string => {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
        return child.toString();
      }
      if (isValidElement(child)) {
        return flattenChildrenToString(child.props.children);
      }
      return '';
    })
    .join('');
};

const getId = (children: ReactNode): string => {
  const text = flattenChildrenToString(children);
  return slugifyText(text);
};

const components = {
  h2: ({ children, ...rest }: any) => {
    const id = getId(children);
    return (
      <h2 id={id} {...rest}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...rest }: any) => {
    const id = getId(children);
    return (
      <h3 id={id} {...rest}>
        {children}
      </h3>
    );
  },
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
        className="my-11 xl:my-10 md:my-9 sm:my-8"
        src={src}
        width={842}
        height={562}
        quality={100}
        alt={alt}
      />
    );
  },
  blockquote: (props: any) => {
    return (
      <blockquote {...props}>
        <QuoteIcon className="mb-6 h-10 lg:mb-5 lg:h-9 sm:mb-2 sm:h-7" />
        {props.children}
      </blockquote>
    );
  },
  HintBlock,
  DocLinkBlock,
  EnterpriseOnlyBlock,
  IncludeBlock,
  TutorialCardsWrapper: ({ children }: any) => (
    <ul className="not-prose my-11 grid list-none auto-rows-[268px] grid-cols-3 gap-5 !pl-0 xl:my-10 lg:gap-6 md:my-9 md:gap-5 sm:my-8 sm:auto-rows-[142px] sm:grid-cols-1 sm:gap-4">
      {children}
    </ul>
  ),
};

const Content = ({ className, content }: { className?: string; content: string }) => {
  return (
    <div className={clsx(className, 'content prose prose-lg max-w-none')}>
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              // Adds support for GitHub Flavored Markdown
              remarkGfm,
            ],
          },
        }}
      />
    </div>
  );
};

export default Content;
