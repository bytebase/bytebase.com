import Image from 'next/image';

const MeetCrew = () => (
  <section className="container gap-x-grid grid grid-cols-12 sm:grid-cols-4">
    <div className="relative col-span-12">
      <Image
        src="/images/page/about/crew-ellipse.svg"
        alt="Built by engineers knowing database development flow"
        width={832}
        height={600}
        className="absolute -bottom-[260px] -right-[90px] mt-36"
      />
      <div className="mt-56">
        <span className="w-fit rounded-[20px] bg-secondary-1 py-2 px-2.5 text-12 font-bold uppercase leading-none tracking-wider">
          Team
        </span>
        <h2 className="mt-5 font-title text-88 font-semibold leading-none">Meet our crew</h2>
      </div>
    </div>
    <div className="relative col-span-6 row-start-2 mt-[220px] -translate-y-[133px] bg-tones-blue-light shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)]">
      <div className="flex items-start gap-1 pt-8 pb-6 pl-8 pr-2 shadow-[inset_0_0_0_1px_rgba(156,186,201,0.5)]">
        <div>
          <span className="text-18 font-semibold text-tones-deep-blue-dark">Co-Founder & CTO</span>
          <p className="mt-2 font-title text-56 font-semibold leading-none">Danny</p>
          <p className="font-regular mt-5 text-18">
            Danny was the Staff Engineer at Google Cloud and TL overseeing Cloud SQL and API &
            Service Infrastructure. He has won Google&apos;s highest engineering award twice.
          </p>
        </div>
        <Image
          src="/images/page/about/danny.webp"
          alt=""
          width={244}
          height={244}
          className="shrink-0"
        />
      </div>
      <Image
        src="/images/hat.png"
        width={92}
        height={65}
        alt=""
        className="absolute -top-7 -left-9 lg:-top-4.5 lg:-left-6 lg:h-[42px] lg:w-[58px] sm:h-[46px] sm:w-16"
      />
    </div>

    <div className="col-span-6 row-start-2 mt-[220px] bg-tones-green-light shadow-[inset_6px_6px_0_#fff,0_5px_20px_rgba(143,188,169,0.4)]">
      <div className="flex items-start gap-1 pt-8 pb-6 pl-2 pr-8 shadow-[inset_0_0_0_1px_rgba(143,188,169,0.4)]">
        <Image
          src="/images/page/about/tianzhou.webp"
          alt=""
          width={244}
          height={244}
          className="shrink-0"
        />
        <div>
          <span className="text-18 font-semibold text-tones-deep-green-dark">Co-Founder & CEO</span>
          <p className="mt-2 font-title text-56 font-semibold leading-none">Tianzhou</p>
          <p className="mt-5 text-18">
            Tianzhou was the TL of Google Cloud SQL, the maintainer of Google&apos;s internal
            PostgreSQL and MySQL branch. He was the head of Database/
            <wbr />
            DevTools/
            <wbr />
            Collaboration group in Ant Group.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default MeetCrew;
