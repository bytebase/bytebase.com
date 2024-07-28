'use client';

import { useEffect, useState } from 'react';

import Link from '@/components/shared/link';

import Route from '@/lib/route';

import GitHubIcon from '@/svgs/github.inline.svg';

const API_URL = 'https://api.github.com/repos/bytebase/bytebase';

const GithubStarCounter = () => {
  const [starsCount, setStarsCount] = useState(null);

  useEffect(() => {
    const prevStarsCount = window.sessionStorage.getItem('bytebase_github_stargazers_count');

    if (prevStarsCount) {
      setStarsCount(prevStarsCount);

      return;
    }

    async function getStarCount() {
      const updatedStarsCount = await fetch(API_URL)
        .then((res) => res.json())
        .then((json) => json.stargazers_count);

      window.sessionStorage.setItem('bytebase_github_stargazers_count', updatedStarsCount);

      setStarsCount(updatedStarsCount);
    }

    getStarCount();
  }, []);

  return (
    <Link
      href={Route.GITHUB}
      className="inline-flex items-center gap-2 text-16 font-bold uppercase leading-none"
    >
      <GitHubIcon width={24} height={24} />
      <span className="w-12 whitespace-nowrap">
        {starsCount ? `${(starsCount / 1000).toFixed(1)}k` : '...'}
      </span>
    </Link>
  );
};

export default GithubStarCounter;
