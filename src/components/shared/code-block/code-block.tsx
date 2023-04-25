'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';

import CheckIcon from './images/check.inline.svg';
import CopyIcon from './images/copy.inline.svg';

const DEFAULT_LANGUAGE = 'bash';

const CodeBlock = ({
  className,
  children,
  ...otherProps
}: {
  className?: string;
  children: string;
}) => {
  const { isCopied, handleCopy } = useCopyToClipboard(3000);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : DEFAULT_LANGUAGE;
  const code = children?.trim();

  return (
    <figure className="code-block group relative" {...otherProps}>
      <SyntaxHighlighter className="no-scrollbars" language={language} useInlineStyles={false}>
        {code}
      </SyntaxHighlighter>
      <button
        className="invisible absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded bg-gray-30 text-white opacity-0 transition-[background-color,opacity,visibility] duration-200 hover:bg-gray-50 group-hover:visible group-hover:opacity-100 lg:visible lg:opacity-100"
        type="button"
        disabled={isCopied}
        onClick={() => handleCopy(code)}
      >
        {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </button>
    </figure>
  );
};

export default CodeBlock;
