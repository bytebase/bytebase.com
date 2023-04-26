import Image from 'next/image';

import { LinkUnderlined } from '@/components/shared/link-underlined';

import ROUTE from '@/lib/route';

import { crewList } from './data';

const Crew = () => (
  <section className="container">
    <ul className="gap-x-grid grid grid-cols-12 gap-y-20 border-t border-gray-90 pt-[52px] 3xl:gap-y-16 3xl:pt-12 xl:gap-y-14 xl:pt-10 md:gap-y-8 md:pt-9 sm:grid-cols-4 sm:gap-y-6 sm:pt-6">
      {crewList.map((member, index) => (
        <li
          className="col-span-3 flex flex-col items-center justify-start sm:col-span-2"
          key={index}
        >
          <Image
            src={member.image}
            alt=""
            width={244}
            height={244}
            className="xl:w-full sm:-mt-2.5"
          />
          <p className="-mt-1 text-24 font-bold leading-none 3xl:mt-0 xl:text-20 md:text-18">
            {member.name}
          </p>
          <p className="mt-1 text-center text-20 leading-snug xl:text-18 xl:leading-tight md:mt-0.5 md:text-16 md:leading-snug sm:mt-0">
            {member.position}
          </p>
        </li>
      ))}
      <li className="col-span-3 flex flex-col items-center justify-start sm:col-span-2">
        <Image src="/images/page/about/join.webp" alt="" width={244} height={244} />
        <LinkUnderlined href={ROUTE.JOBS} className="mt-4.5">
          Join us
        </LinkUnderlined>
      </li>
    </ul>
  </section>
);

export default Crew;
