import Breadcrumbs from '@/components/shared/breadcrumbs';
import Content from '@/components/shared/content';
import Link from '@/components/shared/link';
import Route from '@/lib/route';

import { ChangelogPost } from '@/types/changelog-post';
import slugifyText from '@/utils/slugify-text';

import { format } from 'date-fns';
import Image from 'next/image';

type PostProps = {
  post: ChangelogPost;
};

const Post = ({ post }: PostProps) => {
  const { content, published_at, timeToRead, title, author } = post;
  const date = new Date(published_at);
  const formattedDate = format(date, 'MMM dd, yyyy');

  const breadcrumbs = [
    {
      title: 'Bytebase Changelog',
      url: Route.CHANGELOG,
    },
    {
      title,
    },
  ];

  return (
    <section className="posts container mt-[136px] 2xl:mt-32 lg:mt-[120px] md:mt-[104px] sm:mt-24">
      <div className="gap-x-grid grid auto-rows-min grid-cols-12">
        <article className="col-span-6 col-start-4 xl:col-span-8 xl:col-start-3 md:col-span-full">
          <Breadcrumbs items={breadcrumbs} />
          <header className="border-b border-gray-90 pb-11 lg:pb-10 md:pb-8 sm:pb-6">
            <h1 className="mt-7 text-44 font-bold leading-extra-tight lg:mt-6 lg:text-40 md:mt-5 md:text-36">
              {title}
            </h1>
            <div className="mt-6 flex items-center gap-x-2.5 text-14 leading-none text-gray-40 lg:mt-5 md:mt-4">
              {author && (
                <>
                  <Image
                    className="h-9 w-9 rounded-full border border-gray-90"
                    src={`/images/authors/${slugifyText(author)}.webp`}
                    alt={author}
                    width={36}
                    height={36}
                  />
                  <span className="relative pr-2.5 pl-0.5 before:absolute before:right-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40">
                    {author}
                  </span>
                </>
              )}
              <time
                className="relative pr-2.5 text-14 uppercase leading-none before:absolute before:right-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40"
                dateTime={date.toString()}
              >
                {formattedDate}
              </time>
              <span className="3xs:hidden">{timeToRead}</span>
            </div>
          </header>
          <Content content={content} className="mt-11 lg:mt-10 md:mt-8 sm:mt-6" />
          <Link
            className="mt-14 flex h-[52px] items-center justify-center rounded-full border-2 border-gray-90 text-14 font-bold uppercase leading-none -tracking-tight hover:border-gray-60 lg:mt-12 md:mt-10 sm:mt-8"
            href={Route.CHANGELOG}
          >
            Back to Changelog
          </Link>
        </article>
      </div>
    </section>
  );
};

export default Post;
