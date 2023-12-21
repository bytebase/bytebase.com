import Link from '@/components/shared/link';
import Image from 'next/image';

import clsx from 'clsx';

import LinkedInIcon from '@/svgs/linkedin.inline.svg';
import GitHubIcon from '@/svgs/github.inline.svg';

const founder = {
  danny: {
    name: 'Danny',
    position: 'Co-Founder & CTO',
    linkedin: 'https://www.linkedin.com/in/danny-xu-579b1a54/',
    github: 'https://github.com/d-bytebase',
    image: {
      default: '/images/page/about/danny.webp',
      xl: '/images/page/about/danny-xl.webp',
      md: '/images/page/about/danny-md.webp',
      sm: '/images/page/about/danny-sm.webp',
    },
    about:
      "Danny was the Staff Engineer at Google Cloud and TL overseeing Cloud SQL and API&nbsp;&&nbsp;Service Infrastructure. He has won Google's highest engineering award twice.",
  },
  tianzhou: {
    name: 'Tianzhou',
    position: 'Co-Founder & CEO',
    linkedin: 'https://www.linkedin.com/in/tianzhouchen/',
    github: 'https://github.com/tianzhou',
    image: {
      default: '/images/page/about/tianzhou.webp',
      xl: '/images/page/about/tianzhou-xl.webp',
      md: '/images/page/about/tianzhou-md.webp',
      sm: '/images/page/about/tianzhou-sm.webp',
    },
    about:
      'Tianzhou was the TL of Google Cloud SQL, and the maintainer of Google&apos;s internal PostgreSQL / MySQL fork.',
  },
};

const Founder = ({ id, className }: { id: keyof typeof founder; className?: string }) => {
  const { position, linkedin, github, name, image, about } = founder[id];

  return (
    <article
      className={clsx(
        'flex items-start border border-solid pt-8 pb-6 xl:pt-6 xl:pl-6 xl:pb-5 xl:pr-1 md:flex-col md:items-center md:p-6 md:pb-5 sm:items-start sm:pb-6',
        {
          'border-tones-blue-dark bg-tones-blue-light pl-8 pr-2 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(156,186,201,0.5)]':
            id === 'danny',
          'border-tones-green-dark bg-tones-green-light pl-2 pr-8 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(156,186,201,0.5)] 3xl:pr-10':
            id === 'tianzhou',
        },
        className,
      )}
    >
      <Image
        src={image.default}
        alt=""
        width={244}
        height={244}
        className={clsx('shrink-0 xl:hidden', {
          'order-2': id === 'danny',
          'mr-1': id === 'tianzhou',
        })}
      />
      <Image
        src={image.xl}
        alt=""
        width={180}
        height={196}
        className={clsx('hidden shrink-0 xl:block md:hidden', {
          'order-2 mt-1': id === 'danny',
          'order-2 mt-4': id === 'tianzhou',
        })}
      />
      <Image
        src={image.md}
        alt=""
        width={198}
        height={168}
        className="mb-2 hidden shrink md:block sm:hidden"
      />
      <div className="flex grow flex-col gap-6 xl:gap-2 md:grow-0 md:gap-4 sm:gap-2.5">
        <div className="sm:flex sm:flex-row sm:items-center sm:gap-4">
          <Image
            src={image.sm}
            alt=""
            width={92}
            height={93}
            className="hidden shrink-0 sm:block"
          />
          <div className="flex flex-col gap-1 md:gap-0 md:text-center sm:grow sm:text-left">
            <h3 className="order-2 font-title text-56 font-semibold leading-none xl:text-44 md:text-38 sm:text-34">
              {name}
            </h3>
            <small
              className={clsx(
                'font-sans text-18 font-semibold xl:text-16 xl:leading-snug md:text-15 sm:text-14',
                {
                  'text-tones-deep-blue-dark': id === 'danny',
                  'text-tones-deep-green-dark': id === 'tianzhou',
                },
              )}
            >
              <div className="flex items-center">
                {position}
                <Link href={linkedin}>
                  <LinkedInIcon
                    width={20}
                    height={20}
                    className="ml-1 shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
                  />
                </Link>
                <Link href={github}>
                  <GitHubIcon
                    width={16}
                    height={16}
                    className="ml-1 shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
                  />
                </Link>
              </div>
            </small>
          </div>
        </div>
        <p
          className={clsx('text-18 xl:text-16 xl:leading-snug md:text-center sm:text-left', {
            'xl:-mr-1 md:mr-0': id === 'danny',
          })}
          dangerouslySetInnerHTML={{ __html: about }}
        />
      </div>
    </article>
  );
};

export default Founder;
