import Image from 'next/image';

import getBlogTagTheme from '@/utils/get-blog-card-colors';
import slugifyText from '@/utils/slugify-text';
import clsx from 'clsx';
import format from 'date-fns/format';

import Link from '@/components/shared/link';

import { BlogPost } from '@/types/blog-post';

import ROUTE from '@/lib/route';

export type BlogPostTCardThemes = 'default' | 'small' | 'large';

const BlogPostCard = ({
  post,
  hasImage = true,
  theme = 'default',
  module = 'BLOG',
}: {
  post: BlogPost;
  hasImage?: boolean;
  theme: BlogPostTCardThemes;
  module?: 'BLOG' | 'LANDING';
}) => {
  const categorySlug = slugifyText(post.tags);
  const { tagColors, titleHover } = getBlogTagTheme(categorySlug);
  const date = new Date(post.published_at);
  const formattedDate = format(date, 'MMM dd, yyyy');

  return (
    <article
      className={clsx(
        'flex flex-col md:gap-y-3',
        theme === 'large' ? 'gap-y-5 lg:gap-y-4' : 'gap-y-4',
      )}
    >
      {hasImage && post?.feature_image && (
        <Link
          className="relative aspect-[2.07] overflow-hidden rounded-[4px] border border-gray-90 lg:aspect-[2.084] sm:aspect-[2.1]"
          href={`${ROUTE.BLOG}/${post.slug}`}
        >
          <Image
            className="absolute left-0 top-0 min-h-full min-w-full object-cover"
            src={post.feature_image}
            alt={post.title}
            fill
          />
        </Link>
      )}
      <div className="flex flex-col gap-y-3 md:gap-y-2">
        {module == 'BLOG' && (
          <Link
            aria-label={`Posts of ${post.tags} category`}
            className={clsx(
              tagColors,
              'inline-flex max-w-fit rounded-full px-3 py-[5px] text-14 font-medium leading-none',
            )}
            href={`${ROUTE.BLOG_CATEGORY}/${categorySlug}`}
          >
            {post.tags}
          </Link>
        )}
        <Link href={`${ROUTE.BLOG}/${post.slug}`}>
          <h3
            className={clsx(
              titleHover,
              'font-medium line-clamp-3 md:leading-tight',
              theme === 'small'
                ? 'text-18'
                : 'text-24 leading-snug xl:text-20 lg:leading-snug md:text-18',
            )}
          >
            {post.title}
          </h3>
        </Link>
        {module == 'BLOG' && (
          <div className="flex items-center gap-x-3 md:gap-x-2">
            <Image
              className={clsx(
                theme === 'small' && 'hidden md:block',
                'h-9 w-9 rounded-full border border-gray-90 md:h-8 md:w-8',
              )}
              src={`/images/authors/${slugifyText(post.author)}.webp`}
              alt={post.author}
              width={36}
              height={36}
            />
            <div className="relative flex gap-x-2 text-14 leading-none text-gray-40">
              <span>{post.author}</span>
              <time
                className="upppercase relative pl-2 uppercase
              before:absolute before:left-0 before:top-1/2 before:block before:h-0.5 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-40"
                dateTime={date.toString()}
              >
                {formattedDate}
              </time>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostCard;
