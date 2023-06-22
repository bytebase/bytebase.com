'use client';

import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import Link from '@/components/shared/link';
import { BlogPost } from '@/types/blog-post';

type PostsProps = {
  posts: BlogPost[];
};

const Aside = ({ posts }: PostsProps) => {
  return (
    <aside className="glossary-aside col-span-3 lg:hidden">
      <nav className="scrollbar-hidden sticky -top-3.5 flex max-h-[calc(100vh+14px)] flex-col overflow-y-auto pt-16 pb-9">
        {/* {posts.map(({ letter, list }, index) => {
          return (
            <div
              key={index}
              className={clsx(index !== 0 && 'pt-11', 'border-l border-gray-90 pl-5 leading-none')}
            >
              <span className="text-14 font-bold tracking-wider">{letter}</span>
              <ul className="mt-4 flex flex-col gap-y-2.5">
                {list.map(({ slug, name }) => {
                  return (
                    <li key={slug} className=" leading-none">
                      <Link
                        href={`#${slug}`}
                        className={clsx(
                          slug === activeHash && 'font-medium text-primary-1',
                          'text-14 leading-tight tracking-tight text-gray-40 hover:text-primary-1',
                        )}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })} */}
      </nav>
    </aside>
  );
};

export default Aside;
