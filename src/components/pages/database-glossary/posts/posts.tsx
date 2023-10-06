import clsx from 'clsx';
import Link from '@/components/shared/link';

import { GlossaryLetterSet } from '@/types/glossary';

type PostsProps = {
  posts: GlossaryLetterSet[];
};

const Posts = ({ posts }: PostsProps) => {
  if (!posts) return null;

  return (
    <ul className="col-span-6 flex flex-col gap-y-20 pt-16 lg:col-span-9 lg:gap-y-[72px] lg:pt-0 md:col-span-full md:mt-8 md:gap-y-16 sm:mt-6 sm:gap-14">
      {posts.map(({ letter, list }) => {
        return (
          <li key={letter}>
            <span className="text-44 font-bold leading-extra-tight lg:text-36 md:text-30">
              {letter}
            </span>
            <ul className="mt-6 flex flex-col gap-y-6 lg:mt-5 lg:gap-y-5 md:mt-4 md:gap-y-4 sm:mt-1 sm:gap-y-1">
              {list.map(({ slug, name, tagList, description }) => {
                return (
                  <li key={slug}>
                    <article id={slug} className="glossary-post pt-4">
                      <header className="flex flex-row gap-x-2">
                        {tagList.map((tag, index) => {
                          return (
                            <span
                              key={tag}
                              className={clsx(
                                index !== 0 &&
                                  'pl-1.5 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-0.5 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:bg-primary-1',
                                'relative text-14 font-medium leading-none text-primary-1',
                              )}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </header>
                      <div className="mt-2 text-30 font-semibold leading-tight lg:text-24 md:text-20 sm:mt-1.5 sm:text-18 sm:leading-snug">
                        <Link href={slug!}>{name}</Link>
                      </div>
                      <p className="mt-5 text-18 lg:mt-4 lg:text-16 lg:leading-snug sm:mt-2">
                        {description}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
