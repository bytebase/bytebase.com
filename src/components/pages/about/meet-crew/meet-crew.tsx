import Image from 'next/image';

import Pill from '@/components/shared/pill';

import Founder from './founder';

const MeetCrew = () => (
  <section className="container overflow-x-hidden pt-56 pb-20 3xl:pt-52 3xl:pb-16 xl:pt-[158px] xl:pb-14 md:pt-[106px] md:pb-12 sm:pt-[83px] sm:pb-10">
    <div className="gap-x-grid grid grid-cols-12 items-start sm:grid-cols-4">
      <div className="relative col-span-full mb-[225px] grid xl:mb-[164px] md:mb-[134px] sm:mb-0 sm:flex sm:flex-col sm:pb-[279px] sm:text-center">
        <Pill theme="secondary-1" className="sm:mx-auto">
          Team
        </Pill>
        <h2 className="mt-3.5 font-title text-88 font-semibold leading-none xl:mt-3 xl:text-68 md:mt-2 md:text-54 sm:text-48 sm:leading-95">
          Meet our crew
        </h2>
        <Image
          src="/images/page/about/crew-ellipse.webp"
          alt="Built by engineers knowing database development flow"
          width={832}
          height={600}
          className="pointer-events-none absolute -bottom-[260px] -right-20 3xl:-right-[76px] xl:hidden"
        />
        <Image
          src="/images/page/about/crew-ellipse-xl.webp"
          alt="Built by engineers knowing database development flow"
          width={628}
          height={517}
          className="pointer-events-none absolute -bottom-[231px] -right-11 hidden xl:block md:hidden"
        />
        <Image
          src="/images/page/about/crew-ellipse-md.webp"
          alt="Built by engineers knowing database development flow"
          width={474}
          height={394}
          className="pointer-events-none absolute -bottom-[173px] -right-7 hidden md:block sm:hidden"
        />
        <Image
          src="/images/page/about/crew-ellipse-sm.webp"
          alt="Built by engineers knowing database development flow"
          width={360}
          height={260}
          className="pointer-events-none absolute bottom-1 left-1/2 hidden max-w-none -translate-x-1/2 justify-self-center sm:block"
        />
      </div>
      <Founder
        id="danny"
        className="col-span-6 -translate-y-[133px] xl:-translate-y-[89px] md:min-h-[429px] md:-translate-y-[62px] sm:col-span-full sm:min-h-0 sm:translate-y-0"
      />
      <Founder
        id="tianzhou"
        className="col-span-6 md:min-h-[429px] sm:col-span-full sm:mt-4 sm:min-h-0"
      />
    </div>
  </section>
);

export default MeetCrew;
