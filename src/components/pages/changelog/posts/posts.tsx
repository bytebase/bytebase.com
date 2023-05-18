import format from 'date-fns/format';

import Content from '@/components/shared/content';
import Pagination from '@/components/shared/pagination';

import { ChangelogPost } from '@/types/changelog-post';
import Route from '@/lib/route';
import Link from '@/components/shared/link';
import clsx from 'clsx';

type PostsProps = {
  posts: ChangelogPost[];
  page: number;
  pageCount: number;
};

const Posts = ({ posts, page, pageCount }: PostsProps) => {
  if (!posts) return null;

  return (
    <section className="posts mt-[60px] lg:mt-[52px] md:mt-10 sm:mt-8">
      <div className="container">
        <ul className="relative flex flex-col gap-y-11 border-l border-gray-90 lg:gap-y-10 md:gap-y-9 sm:gap-y-14 sm:border-none">
          {posts.map(({ slug, title, author, published_at, timeToRead, content }, index) => {
            const date = new Date(published_at);
            const formattedDate = format(date, 'MMM dd, yyyy');
            return (
              <li key={slug}>
                <article className="gap-x-grid grid auto-rows-min grid-cols-12">
                  <header
                    className="sticky top-[60px] col-span-3 flex h-min flex-col gap-y-2.5 pl-5 before:absolute  before:top-0 before:left-0 before:h-full
                      before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-primary-1 lg:top-[52px] md:top-10 md:gap-y-2 md:pl-4 sm:relative sm:top-auto sm:col-span-full sm:pl-0 sm:before:hidden"
                  >
                    <time
                      className="text-14 font-semibold uppercase leading-none tracking-tight"
                      dateTime={date.toString()}
                    >
                      {formattedDate}
                    </time>
                    <div className="flex gap-x-2 text-14 leading-none text-gray-40">
                      {author && (
                        <span className="relative pr-2 before:absolute before:right-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40">
                          {author}
                        </span>
                      )}
                      <span>{timeToRead}</span>
                    </div>
                  </header>
                  <div
                    className={clsx(
                      index !== 0 &&
                        'border-t border-gray-90 pt-11 lg:pt-10 md:pt-9 sm:border-none sm:pt-0',
                      'col-span-6 -mt-1 lg:col-span-9 md:mt-0 sm:col-span-full sm:mt-4',
                    )}
                  >
                    <h2>
                      <Link
                        href={`${Route.CHANGELOG}/${slug}`}
                        className="text-36 font-bold leading-extra-tight hover:text-primary-1 hover:underline hover:underline-offset-[7px] lg:text-30 md:text-24 sm:text-20"
                      >
                        {title}
                      </Link>
                    </h2>
                    <Content content={content} className="mt-9 lg:mt-10 md:mt-9 sm:mt-8" />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <Pagination currentPageIndex={+page} pageCount={pageCount} path={Route.CHANGELOG} />
      </div>
    </section>
  );
};

export default Posts;
