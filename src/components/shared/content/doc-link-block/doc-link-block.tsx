import Link from '@/components/shared/link';

import BookOpenIcon from '@/svgs/book-open.inline.svg';

const DocLinkBlock = ({ url, title }: { url: string; title: string }) => (
  <figure className="not-prose">
    <Link
      className="doc-link-block flex items-center justify-center rounded-[70px] border-2 border-gray-90 p-4 text-13 font-bold uppercase leading-none tracking-wide hover:border-gray-60 active:border-gray-60"
      href={url}
    >
      <BookOpenIcon className="mr-2 h-4 w-4" />
      <span>{title}</span>
    </Link>
  </figure>
);

export default DocLinkBlock;
