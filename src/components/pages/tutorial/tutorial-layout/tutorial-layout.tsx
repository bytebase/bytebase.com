'use client';

import { ReactNode, useRef } from 'react';

// import Aside from '../aside';
import Posts from '../posts';
import { BlogPost } from '@/types/blog-post';

type TutorialLayoutProps = {
  posts: BlogPost[];
  children: ReactNode;
};

const TutorialLayout = ({ posts, children }: TutorialLayoutProps) => {
  const wrapperRef = useRef<HTMLElement>(null);

  return (
    <>
      {children}
      <section ref={wrapperRef} className="container lg:pt-12 md:pt-8 sm:pt-6">
        <div className="w-full">
          <Posts posts={posts} />
        </div>
      </section>
    </>
  );
};

export default TutorialLayout;
