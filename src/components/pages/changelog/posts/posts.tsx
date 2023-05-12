import clsx from 'clsx';
import format from 'date-fns/format';

import Content from '@/components/shared/content';

import { ChangelogPost } from '@/types/changelog-post';

type PostsProps = {
  posts: ChangelogPost[];
};

const Posts = ({ posts }: PostsProps) => {
  return (
    <section className="posts mt-[60px] lg:mt-[52px] md:mt-10 sm:mt-8">
      <div className="container">
        <ul className="relative flex flex-col gap-y-10 border-l border-gray-90 lg:gap-y-9 md:gap-y-16 sm:gap-y-7 sm:border-none">
          {posts.map(({ slug, title, author, published_at, timeToRead, content }, index) => {
            const date = new Date(published_at);
            const formattedDate = format(date, 'MMM dd, yyyy');
            return (
              <li key={slug} id={slug} className={clsx(index !== 0 && 'pt-10 lg:pt-9 sm:pt-7')}>
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
                  <div className="col-span-6 -mt-1 lg:col-span-9 md:mt-0 sm:col-span-full sm:mt-4">
                    <h1 className="text-44 font-bold leading-extra-tight lg:text-36 md:text-30">
                      {title}
                    </h1>
                    <Content content={content} className="mt-11 lg:mt-10 md:mt-9 sm:mt-8" />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Posts;
