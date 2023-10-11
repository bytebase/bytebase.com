import format from 'date-fns/format';

import Content from '@/components/shared/content';
import Pagination from '@/components/shared/pagination';

import { ChangelogPost } from '@/types/changelog-post';
import Route from '@/lib/route';
import Link from '@/components/shared/link';
import clsx from 'clsx';

type PostsListProps = {
  posts: ChangelogPost[];
  page: number;
  pageCount: number;
};

const getPostPreview = (content: string) => {
  return content.split('\n##').slice(0, 2).join('\n##');
};

const PostsList = ({ posts, page, pageCount }: PostsListProps) => {
  if (!posts) return null;

  return (
    <section className="posts mt-[60px] lg:mt-12 md:mt-10 sm:mt-8">
      <div className="container">
        <ul className="relative flex flex-col gap-y-11 before:absolute before:left-0 before:top-1 before:h-[calc(100%-4px)] before:w-px before:bg-gray-90 lg:gap-y-9 md:gap-y-7 sm:mt-8 sm:gap-y-7 sm:before:hidden">
          {posts.map(({ slug, title, author, published_at, timeToRead, content }, index) => {
            const date = new Date(published_at);
            const formattedDate = format(date, 'MMM dd, yyyy');
            const preview = getPostPreview(content);

            return (
              <li key={slug} className={clsx(index !== 0 && 'border-gray-90 sm:border-t sm:pt-7')}>
                <article className="gap-x-grid grid auto-rows-min grid-cols-12">
                  <header
                    className={clsx(
                      index !== 0 ? 'mt-12 lg:mt-10 md:mt-8' : 'mt-1',
                      'sticky top-[144px] col-span-3 flex h-min flex-col gap-y-2.5 pl-5 before:absolute before:top-0 before:left-0 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-primary-1 lg:top-[52px] md:top-10 md:gap-y-2 md:pl-4 sm:relative sm:top-auto sm:col-span-full sm:mt-0 sm:pl-0 sm:before:hidden',
                    )}
                  >
                    <time
                      className="text-14 font-semibold uppercase leading-none tracking-tight"
                      dateTime={date.toString()}
                    >
                      {formattedDate}
                    </time>
                    <div className="flex gap-x-2 text-14 leading-none text-gray-40 md:gap-x-1.5">
                      {author && (
                        <span className="relative pr-2 before:absolute before:right-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40 md:pr-1.5">
                          {author}
                        </span>
                      )}
                      <span>{timeToRead}</span>
                    </div>
                  </header>
                  <div
                    className={clsx(
                      index !== 0 &&
                        'border-t border-gray-90 pt-11 lg:pt-9 md:pt-7 sm:border-none sm:pt-0',
                      'col-span-6 lg:col-span-9 md:mt-0 sm:col-span-full sm:mt-5',
                    )}
                  >
                    <h2 className="text-30 lg:text-24 md:text-20 sm:text-18">
                      <Link
                        href={`${Route.CHANGELOG}/${slug}`}
                        className="text-36 font-bold leading-extra-tight underline-offset-8 hover:text-primary-1 hover:underline lg:text-30 lg:leading-tight lg:underline-offset-4 md:text-24"
                      >
                        {title}
                      </Link>
                    </h2>
                    <Content content={preview} className="content-sm mt-9 lg:mt-6 md:mt-5" />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <Pagination
          marginClassName="mt-20 xl:mt-14 md:mt-12 sm:mt-10"
          currentPageIndex={+page}
          pageCount={pageCount}
          path={Route.CHANGELOG}
        />
      </div>
    </section>
  );
};

export default PostsList;
