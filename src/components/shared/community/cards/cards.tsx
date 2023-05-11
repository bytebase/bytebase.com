import NextLink from 'next/link';

import clsx from 'clsx';

import Route from '@/lib/route';

import DiscordIcon from '@/svgs/discord.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';

const socials = [
  {
    name: 'Discord',
    description: 'Participate in discussion with other DBAs and developers.',
    href: Route.DISCORD,
    action: 'Join Us',
  },
  {
    name: 'Twitter',
    description:
      'Latest news and updates. Tag us if you need any help or want to share a feedback.',
    href: Route.TWITTER,
    action: 'Follow Us',
  },
  {
    name: 'GitHub',
    description:
      "We appreciate any contribution even if it's a small typo change or an issue report.",
    href: Route.GITHUB,
    action: 'Explore Codebase',
  },
];

const icon = {
  Discord: DiscordIcon,
  Twitter: TwitterIcon,
  GitHub: GithubIcon,
};

const Icon = ({ name }: { name: keyof typeof icon }) => {
  const Component = icon[name];

  return (
    <Component
      className={clsx('h-20 w-20 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px]', {
        'text-primary-1': name === 'Discord',
        'text-secondary-3': name === 'Twitter',
      })}
    />
  );
};

const Card = ({
  name,
  description,
  href,
  action,
}: {
  name: keyof typeof icon;
  description: string;
  href: string;
  action: string;
}) => {
  return (
    <NextLink className="group block h-full sm:h-auto" href={href}>
      <article
        className={clsx(
          'flex h-full flex-col items-center border border-solid p-9 pb-14 transition-shadow duration-300 3xl:p-8 xl:px-6 xl:py-7 md:px-5 sm:h-auto sm:items-start sm:px-6 sm:pb-5',
          {
            '-translate-y-[132px] border-tones-purple-dark bg-tones-purple-light shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] group-hover:shadow-[inset_6px_6px_0_#fff,0_8px_20px_rgba(172,178,210,0.7)] 3xl:-translate-y-[128px] xl:-translate-y-[58px] md:-translate-y-12 sm:translate-y-0':
              name === 'Discord',
            'border-tones-blue-dark bg-tones-blue-light shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(156,186,201,0.5)] group-hover:shadow-[inset_6px_6px_0_#fff,0_8px_20px_rgba(156,186,201,0.7)]':
              name === 'Twitter',
            'translate-y-[80px] border-gray-70 bg-gray-97 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(167,175,190,0.5)] group-hover:shadow-[inset_6px_6px_0_#fff,0_8px_20px_rgba(167,175,190,0.7)] 3xl:translate-y-[76px] xl:translate-y-[58px] md:translate-y-10 sm:translate-y-0':
              name === 'GitHub',
          },
        )}
      >
        <header className="mb-4.5 flex flex-col items-center gap-6 xl:mb-4 xl:gap-3 md:gap-5 sm:mb-3 sm:flex-row sm:gap-4">
          <Icon name={name} />
          <h3 className="font-title text-56 font-semibold leading-none xl:text-44 md:text-34">
            {name}
          </h3>
        </header>
        <p className="mb-11 text-center text-20 leading-normal 3xl:mb-8 xl:mb-7 xl:text-18 xl:leading-snug md:mb-6 md:text-16 sm:mb-4 sm:text-left">
          {description}
        </p>
        <span
          className={clsx(
            'mt-auto w-fit rounded-full px-14 py-6 text-center text-16 font-bold uppercase leading-none tracking-wide text-white transition-colors duration-300 xl:w-full xl:px-2 md:py-4.5 md:text-13',
            {
              'bg-primary-1 group-hover:bg-primary-2': name === 'Discord',
              'bg-secondary-3 group-hover:bg-[#0B95DA]': name === 'Twitter',
              'bg-gray-15 group-hover:bg-[#364563]': name === 'GitHub',
            },
          )}
        >
          {action}
        </span>
      </article>
    </NextLink>
  );
};

const Cards = () => {
  return (
    <ul className="gap-x-grid mt-[68px] grid grid-cols-3 pb-[80px] 3xl:mt-[39px] 3xl:pb-[76px] xl:mt-[49px] xl:pb-10 md:mt-9 sm:mt-0 sm:grid-cols-none sm:gap-4 sm:pb-0">
      {socials.map(({ name, description, href, action }) => (
        <li key={name} className="sm:col-span-full">
          <Card
            name={name as keyof typeof icon}
            description={description}
            href={href}
            action={action}
          />
        </li>
      ))}
    </ul>
  );
};

export default Cards;
