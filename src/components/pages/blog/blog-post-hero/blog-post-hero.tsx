import Image from 'next/image';

import getBlogCardColors from '@/utils/get-blog-card-colors';
import slugifyText from '@/utils/slugify-text';
import clsx from 'clsx';
import format from 'date-fns/format';

import Link from '@/components/shared/link';

import { BlogPost } from '@/types/blog-post';

import ROUTE from '@/lib/route';

type BlogPostHeroProps = {
  post: BlogPost;
  isBlogPost?: boolean;
};

const BlogPostHero = ({ post, isBlogPost = true }: BlogPostHeroProps) => {
  const { tags, author, title, feature_image, slug, published_at, timeToRead } = post;
  const categorySlug = slugifyText(tags);
  const categoryUrl = `${ROUTE.BLOG_CATEGORY}/${categorySlug}`;
  const { tagColors, titleHover } = getBlogCardColors(categorySlug);
  const date = new Date(published_at);
  const formattedDate = format(date, 'MMM dd, yyyy');

  const WrapperTag = isBlogPost ? 'div' : 'article';

  return (
    <section
      className={clsx(
        isBlogPost
          ? 'pt-[136px] 2xl:pt-32 lg:pt-[120px] md:pt-[104px] sm:pt-24'
          : 'mt-16 2xl:mt-14 lg:mt-12 md:mt-8',
        'container',
      )}
    >
      {!isBlogPost && <h2 className="sr-only">Featured Post</h2>}
      <WrapperTag className="gap-x-grid grid grid-cols-12 items-center border-b border-gray-90 pb-14 lg:gap-y-6 lg:pb-12 md:gap-y-[18px] md:pb-10 sm:pb-8">
        <div className="col-span-6 flex flex-col gap-y-6 2xl:gap-y-5 xl:gap-y-3 md:col-span-full">
          <Link
            aria-label={`Posts of ${tags} category`}
            href={categoryUrl}
            className={clsx(
              tagColors,
              'inline-flex max-w-fit rounded-full px-3 py-[5px] text-14 font-medium leading-none',
            )}
          >
            {tags}
          </Link>
          {isBlogPost ? (
            <h1 className="font-title text-72 font-semibold leading-none 2xl:text-68 xl:text-50 md:text-46 sm:text-34">
              {title}
            </h1>
          ) : (
            <Link href={`${ROUTE.BLOG}/${slug}`} className={titleHover}>
              <h3 className="font-title text-72 font-semibold leading-none 2xl:text-68 xl:text-50 md:text-46 sm:text-34">
                {title}
              </h3>
            </Link>
          )}
          <div className="flex items-center gap-x-3">
            <Image
              className="h-9 w-9 rounded-full border border-gray-90"
              src={`/images/authors/${slugifyText(author)}.webp`}
              alt={author}
              width={36}
              height={36}
            />
            <div className="flex gap-x-2 text-14 leading-none text-gray-40">
              <span>{author}</span>
              <time
                className="relative pl-2 uppercase before:absolute before:left-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40"
                dateTime={date.toString()}
              >
                {formattedDate}
              </time>
              {isBlogPost && (
                <span className="relative pl-2 before:absolute before:left-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40 3xs:hidden">
                  {timeToRead}
                </span>
              )}
            </div>
          </div>
        </div>
        {isBlogPost ? (
          <Image
            className="relative col-span-6 aspect-[2] overflow-hidden rounded-lg border border-gray-15 border-opacity-20 object-cover shadow-pricing lg:aspect-[1.6] md:col-span-full md:aspect-auto"
            src={feature_image}
            alt={title}
            width="967"
            height="484"
            priority
          />
        ) : (
          <Link href={`${ROUTE.BLOG}/${slug}`} className="col-span-6 md:col-span-full">
            <Image
              className="relative aspect-[2] overflow-hidden rounded-lg border border-gray-15 border-opacity-20 object-cover shadow-pricing lg:aspect-[1.6] md:aspect-auto"
              src={feature_image}
              alt={title}
              width="967"
              height="484"
              priority
            />
          </Link>
        )}
      </WrapperTag>
    </section>
  );
};

export default BlogPostHero;
