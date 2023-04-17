import NextLink from 'next/link';

import DiscordIcon from '@/svgs/discord.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';

const Cards = () => {
  return (
    <ul className="gap-x-grid mt-11 grid grid-cols-3 text-center 2xl:mt-[26px] lg:mt-[34px] md:mt-[25px] sm:-mt-[70px] sm:flex sm:flex-col sm:gap-y-4">
      <li className="-translate-y-[132px] bg-tones-purple-light shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] 2xl:-translate-y-[128px] lg:max-h-[400px] lg:-translate-y-[57px] md:max-h-[368px] md:-translate-y-12 sm:-translate-y-0 sm:items-start">
        <div className="flex h-full flex-col items-center justify-between p-9 pb-14 shadow-[inset_0_0_0_1px_rgba(172,178,210,0.5)] 2xl:p-[31px] lg:max-h-[400px] lg:p-[23px] lg:pb-8 md:max-h-[368px] md:p-[19px] md:pb-7 md:pt-7 sm:px-6 sm:pt-7 sm:pb-5">
          <div className="flex flex-col items-center justify-between sm:items-start">
            <div className="flex flex-col items-center sm:flex-row">
              <DiscordIcon className="h-20 w-20 text-primary-1 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px]" />
              <p className="mt-6 2xl:mt-6 lg:mt-4 md:mt-5 sm:mt-0">
                <b className="font-title text-56 font-semibold leading-none lg:text-44 md:text-34 sm:ml-4">
                  Discord
                </b>
              </p>
            </div>
            <p className="mt-5 text-20 leading-normal 2xl:mt-5 lg:mt-3 lg:text-18 md:text-16 md:leading-snug sm:mt-3 sm:text-start">
              Participate in discussion with others DBAs or developers.
            </p>
          </div>
          <NextLink
            href="#"
            className="mx-auto mt-11 flex w-fit justify-center rounded-full bg-primary-1 px-14 py-6 text-16 font-bold uppercase leading-none tracking-wide text-white 2xl:mt-8 xl:w-full lg:mt-[50px] md:p-4.5 md:text-13 sm:mt-4 sm:pb-[17px]"
          >
            Join Us
          </NextLink>
        </div>
      </li>
      <li className="flex h-full flex-col items-center justify-between bg-tones-blue-light shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] lg:max-h-[400px] md:max-h-[368px] sm:items-start">
        <div className="flex flex-col items-center justify-between p-9 pb-14 shadow-[inset_0_0_0_1px_rgba(156,186,201,0.5)] 2xl:p-[31px] lg:max-h-[400px] lg:p-[23px] lg:pb-8 md:max-h-[368px] md:p-[19px] md:pb-7 md:pt-7 sm:px-6 sm:pt-7 sm:pb-5">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex flex-col items-center sm:flex-row">
              <TwitterIcon className="h-20 w-20 text-secondary-3 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px]" />
              <p className="mt-6 2xl:mt-6 lg:mt-4 md:mt-5 sm:mt-0">
                <b className="font-title text-56 font-semibold leading-none lg:text-44 md:text-34 sm:ml-4">
                  Twitter
                </b>
              </p>
            </div>
            <p className="mt-5 text-20 leading-normal 2xl:mt-5 lg:mt-3 lg:text-18 md:text-16 md:leading-snug sm:mt-3 sm:text-start">
              Latest news and updates about Bytebase. Tag us if you need any help or want to share a
              feedback.
            </p>
          </div>
          <NextLink
            href="#"
            className="mx-auto mt-11 flex w-fit justify-center rounded-full bg-secondary-3 px-14 py-6 text-16 font-bold uppercase leading-none tracking-wide text-white 2xl:mt-8 xl:w-full lg:mt-6 md:p-4.5 md:text-13 sm:mt-4 sm:pb-[17px]"
          >
            Follow Us
          </NextLink>
        </div>
      </li>
      <li className="flex h-full translate-y-[80px] flex-col items-center justify-between bg-gray-97 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] 2xl:translate-y-[76px] lg:max-h-[400px] lg:translate-y-[57px] md:max-h-[368px] md:translate-y-10 sm:translate-y-0 sm:items-start">
        <div className="flex flex-col items-center justify-between p-9 pb-14 shadow-[inset_0_0_0_1px_rgba(167,175,190,0.5)] 2xl:p-[31px] lg:max-h-[400px] lg:p-7 lg:px-5 lg:pb-8 md:max-h-[368px] md:p-[19px] md:pt-7 md:pb-7 sm:pl-6 sm:pt-7 sm:pb-5 sm:pr-5">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex flex-col items-center sm:flex-row">
              <GithubIcon className="h-20 w-20 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px]" />
              <p className="mt-6 2xl:mt-6 lg:mt-4 md:mt-5 sm:mt-0">
                <b className="font-title text-56 font-semibold leading-none lg:text-44 md:text-34 sm:ml-4">
                  GitHub
                </b>
              </p>
            </div>
            <p className="mt-5 text-20 leading-normal 2xl:mt-5 lg:mt-3 lg:text-18 md:text-16 md:leading-snug sm:mt-3 sm:text-start">
              We appreciate any help even if it&apos;s a small typo change or an issue report.
              It&apos;s easy to become a contributor.
            </p>
          </div>
          <NextLink
            href="#"
            className="mx-auto mt-11 flex w-fit justify-center rounded-full bg-gray-15 px-14 py-6 text-16 font-bold uppercase leading-none tracking-wide text-white 2xl:mt-8 xl:w-full lg:mt-5 lg:px-4 md:p-4.5 md:text-13 sm:mt-4 sm:pb-[17px]"
          >
            Explore Codebase
          </NextLink>
        </div>
      </li>
    </ul>
  );
};

export default Cards;
