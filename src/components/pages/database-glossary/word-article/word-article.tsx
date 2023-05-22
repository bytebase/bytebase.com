import Link from '@/components/shared/link';

import { Glossary } from '@/types/glossary';

import Route from '@/lib/route';

import ExternalIcon from '@/svgs/external-square.inline.svg';

const WordArticle = ({ post: { name, reference, description } }: { post: Glossary }) => {
  return (
    <article className="col-span-6 col-start-4 border-b border-gray-90 pt-[136px] pb-14 2xl:pt-32 xl:col-span-8 xl:col-start-3 xl:pt-[120px] xl:pb-12 md:col-span-full md:pt-24 md:pb-10 sm:pb-9">
      <nav className="flex gap-x-[11px] font-medium">
        <Link className="text-gray-30 hover:text-gray-50" href={Route.DATABASE_GLOSSARY}>
          Database glossary
        </Link>
        <span>/</span>
        {name}
      </nav>
      <h1 className="mt-7 font-title text-90 font-semibold leading-none lg:mt-6 lg:text-68 md:text-56 sm:text-48">
        What is {name}?
      </h1>
      <p className="mt-4 text-18 lg:mt-3 md:mt-2 md:text-16 md:leading-snug">{description}</p>
      {reference && (
        <a
          className="mt-11 flex items-center gap-x-2 text-18 font-medium leading-none transition-colors duration-200 hover:text-gray-40 lg:mt-10 md:mt-9 sm:mt-8 sm:text-16"
          href={reference}
          target="_blank"
        >
          External reference
          <ExternalIcon className="w-4" />
        </a>
      )}
    </article>
  );
};

export default WordArticle;
