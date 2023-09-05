import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import Promo from '@/components/pages/database-glossary/promo';
import WordArticle from '@/components/pages/database-glossary/word-article';
import Features from '@/components/shared/features';

import { getAllGlossaryPosts, getGlossaryBySlug } from '@/lib/api-glossary';
import Route from '@/lib/route';

export default function GlossaryWordPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = getGlossaryBySlug(slug);

  if (!post) return notFound();

  return (
    <div className="container gap-x-grid grid grid-cols-12">
      <WordArticle post={post} />
      <Promo />
      <Features className="mt-20 xl:mt-16 md:mt-12" />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllGlossaryPosts();

  const pages: { slug: string }[] = [];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  posts.forEach(({ list }) => list.forEach(({ slug }) => pages.push({ slug: slug! })));

  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const post = getGlossaryBySlug(slug);

  if (!post) return notFound();

  const { name, description } = post;

  return getMetadata({
    title: name,
    description: description.substring(0, 160),
    pathname: `${Route.DATABASE_GLOSSARY}/${slug}/`,
  });
}
