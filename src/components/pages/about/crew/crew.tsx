import Image from 'next/image';

import { LinkUnderlined } from '@/components/shared/link-underlined';

import { crewList } from './data';

const Crew = () => (
  <section className="container mt-20 border-t border-gray-90 pt-[52px]">
    <ul className="gap-x-grid grid grid-cols-12 gap-y-20">
      {crewList.map((member, index) => (
        <li className="col-span-3 flex flex-col items-center justify-center" key={index}>
          <Image src={member.image} alt="" width={244} height={244} />
          <p className="text-24 font-bold leading-none md:text-20 sm:text-18">{member.name}</p>
          <p className="mt-1 text-center text-20 leading-7">{member.position}</p>
        </li>
      ))}
      <li className="col-span-3 flex flex-col items-center justify-center">
        <Image src="/images/page/about/join.webp" alt="" width={244} height={244} />
        <LinkUnderlined href="/jobs">Join us</LinkUnderlined>
      </li>
    </ul>
  </section>
);

export default Crew;
