import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/changelog/hero';
import Posts from '@/components/pages/changelog/posts';
import SubscriptionForm from '@/components/shared/subscription';

import { getAllChangelogPosts } from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.CHANGELOG);

export default function ChangelogPage() {
  const posts = getAllChangelogPosts();

  return (
    <>
      <Hero />
      <Posts posts={posts} />
      <SubscriptionForm />
    </>
  );
}
