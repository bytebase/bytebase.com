import getMetadata from '@/utils/get-metadata';

import TutorialLayout from '@/components/pages/tutorial/tutorial-layout';
import Hero from '@/components/pages/tutorial/hero';

import { getAllBlogPosts } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.TUTORIAL);

export default function TutorialPage() {
  const posts = getAllBlogPosts('Tutorial');
  const integrations = new Map();
  posts.posts.forEach((post) => {
    post.integrations?.split(', ').forEach((integration) => {
      if (integrations.has(integration)) {
        integrations.set(integration, integrations.get(integration) + 1);
      } else {
        integrations.set(integration, 1);
      }
    });
  });

  return (
    <TutorialLayout posts={posts.posts}>
      <Hero />
    </TutorialLayout>
  );
}
