'use client';

import { usePathname } from 'next/navigation';

import { ReactNode, useEffect } from 'react';

import { DocSearch } from '@docsearch/react';

import Link from '@/components/shared/link';

const AlgoliaSearch = ({ className }: { className?: string }) => {
  const scrollToHash = () => {
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 0);
  };

  useEffect(() => {
    scrollToHash();
  }, []);

  return (
    <div className={className}>
      <DocSearch
        appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!}
        placeholder="What you need?"
        hitComponent={Hit}
      />
    </div>
  );
};

const Hit = ({ hit, children }: { hit: any; children: ReactNode }) => {
  const pathname = usePathname();

  const handleClick = () => {
    const [path, hash] = hit.url.split('#');
    if (path === pathname && hash) {
      setTimeout(
        () =>
          document.querySelector(`#${hash}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          }),
        0,
      );
    }
  };

  return (
    <Link href={hit.url} className="DocSearch-Hit--Child" onClick={handleClick}>
      {children}
    </Link>
  );
};

export default AlgoliaSearch;
