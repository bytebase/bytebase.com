import Image from 'next/image';

import slugifyText from '@/utils/slugify-text';

import SocialLinks from '../social-links';
import { SocialLink } from '../social-links/social-links';

export type AuthorProps = {
  author: string;
};

const SocialItems = [
  {
    network: 'twitter',
    url: '#',
  },
  {
    network: 'linkedIn',
    url: '#',
  },
] as SocialLink[];

// TODO: fill the component of the real information
const Author = ({ author }: AuthorProps) => {
  return (
    <figure className="rounded-xl bg-gray-97 p-5 lg:col-span-5 md:col-span-6 sm:col-span-full sm:rounded-[4px]">
      <div className="flex items-center gap-x-3.5">
        <Image
          className="h-14 w-14 rounded-full border border-gray-90 bg-white"
          src={`/images/authors/${slugifyText(author)}.webp`}
          alt={author}
          width={56}
          height={56}
        />
        <span className="flex flex-col gap-y-0.5">
          <span className="text-18 font-semibold leading-tight">{author}</span>
          <span className="text-14 leading-snug text-gray-30">Product manager</span>
        </span>
      </div>
      <p className="mt-3 text-15 leading-snug lg:text-14">
        Changyu is a product marketer at Ahrefs. He has been involved in product marketing at
        various SaaS companies for more than 6 years, specializing in content marketing and short
        form video.
      </p>
      <SocialLinks items={SocialItems} />
    </figure>
  );
};

export default Author;
