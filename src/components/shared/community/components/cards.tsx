import NextLink from 'next/link';

import DiscordIcon from '@/svgs/discord.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';

const Cards = () => {
  return (
    <ul className="mt-11 2xl:mt-[26px] lg:mt-[34px] md:mt-[25px] sm:-mt-[70px] grid grid-cols-3 grid-gap text-center sm:flex sm:flex-col sm:gap-y-4">
      <li className="shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] lg:max-h-[400px] md:max-h-[368px] -translate-y-[132px] 2xl:-translate-y-[128px] lg:-translate-y-[57px] md:-translate-y-12 sm:-translate-y-0 bg-tones-purple-light sm:items-start">
        <div className="lg:max-h-[400px] md:max-h-[368px] flex flex-col items-center justify-between p-9 pb-14 2xl:p-[31px] lg:p-[23px] lg:pb-8 md:p-[19px] md:pb-7 md:pt-7 sm:px-6 sm:pt-7 sm:pb-5 shadow-[inset_0_0_0_1px_rgba(172,178,210,0.5)] h-full">
          <div className="flex flex-col items-center justify-between sm:items-start">
            <div className="flex flex-col items-center sm:flex-row">
              <DiscordIcon className="w-20 h-20 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px] text-primary-1" />
              <p className="mt-6 2xl:mt-6 lg:mt-4 md:mt-5 sm:mt-0">
                <b className="text-56 lg:text-44 md:text-34 leading-none font-title font-semibold sm:ml-4">
                  Discord
                </b>
              </p>
            </div>
            <p className="mt-5 2xl:mt-5 lg:mt-3 text-20 lg:text-18 md:text-16 leading-normal md:leading-snug sm:mt-3 sm:text-start">
              Participate in discussion with others DBAs or developers.
            </p>
          </div>
          <NextLink
            href="#"
            className="xl:w-full justify-center flex mx-auto w-fit mt-11 2xl:mt-8 lg:mt-[50px] sm:mt-4 px-14 py-6 uppercase text-16 md:text-13 md:p-4.5 sm:pb-[17px] leading-none font-bold tracking-wide text-white bg-primary-1 rounded-full"
          >
            Join Us
          </NextLink>
        </div>
      </li>
      <li className="flex flex-col items-center md:max-h-[368px] h-full justify-between bg-tones-blue-light shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] lg:max-h-[400px] sm:items-start">
        <div className="lg:max-h-[400px] md:max-h-[368px] flex flex-col items-center justify-between p-9 pb-14 2xl:p-[31px] lg:p-[23px] lg:pb-8 md:p-[19px] md:pb-7 md:pt-7 sm:px-6 sm:pt-7 sm:pb-5 shadow-[inset_0_0_0_1px_rgba(156,186,201,0.5)]">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex flex-col items-center sm:flex-row">
              <TwitterIcon className="w-20 h-20 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px] text-secondary-3" />
              <p className="mt-6 2xl:mt-6 lg:mt-4 md:mt-5 sm:mt-0">
                <b className="text-56 lg:text-44 md:text-34 leading-none font-title font-semibold sm:ml-4">
                  Twitter
                </b>
              </p>
            </div>
            <p className="mt-5 2xl:mt-5 lg:mt-3 text-20 lg:text-18 md:text-16 leading-normal md:leading-snug sm:mt-3 sm:text-start">
              Latest news and updates about Bytebase. Tag us if you need any help or want to share a
              feedback.
            </p>
          </div>
          <NextLink
            href="#"
            className="xl:w-full justify-center flex mx-auto w-fit mt-11 2xl:mt-8 lg:mt-6 sm:mt-4 px-14 py-6 uppercase text-16 md:text-13 md:p-4.5 sm:pb-[17px] leading-none font-bold tracking-wide text-white bg-secondary-3 rounded-full"
          >
            Follow Us
          </NextLink>
        </div>
      </li>
      <li className="flex flex-col items-center md:max-h-[368px] h-full justify-between translate-y-[80px] 2xl:translate-y-[76px] lg:translate-y-[57px] md:translate-y-10 sm:translate-y-0 bg-gray-97 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] lg:max-h-[400px] sm:items-start">
        <div className="lg:max-h-[400px] md:max-h-[368px] flex flex-col items-center justify-between p-9 pb-14 2xl:p-[31px] lg:p-7 lg:px-5 md:p-[19px] md:pt-7 md:pb-7 sm:pl-6 sm:pt-7 sm:pb-5 sm:pr-5 lg:pb-8 shadow-[inset_0_0_0_1px_rgba(167,175,190,0.5)]">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex flex-col items-center sm:flex-row">
              <GithubIcon className="w-20 h-20 md:h-[60px] md:w-[60px] sm:h-[50px] sm:w-[50px]" />
              <p className="mt-6 2xl:mt-6 lg:mt-4 md:mt-5 sm:mt-0">
                <b className="text-56 lg:text-44 md:text-34 leading-none font-title font-semibold sm:ml-4">
                  GitHub
                </b>
              </p>
            </div>
            <p className="mt-5 2xl:mt-5 lg:mt-3 text-20 lg:text-18 md:text-16 leading-normal md:leading-snug sm:mt-3 sm:text-start">
              We appreciate any help even if it&apos;s a small typo change or an issue report.
              It&apos;s easy to become a contributor.
            </p>
          </div>
          <NextLink
            href="#"
            className="xl:w-full justify-center flex mx-auto w-fit mt-11 2xl:mt-8 lg:mt-5 sm:mt-4 px-14 lg:px-4 py-6 uppercase text-16 md:text-13 md:p-4.5 sm:pb-[17px] leading-none font-bold tracking-wide text-white bg-gray-15 rounded-full"
          >
            Explore Codebase
          </NextLink>
        </div>
      </li>
    </ul>
  );
};

export default Cards;
