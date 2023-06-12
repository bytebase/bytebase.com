const LOGOS = [
  {
    alt: 'Red Hat',
    src: '/images/logos/redhat.svg',
    width: 131,
    height: 40,
    mobileOrderClassName: 'xs:order-1',
  },
  {
    alt: 'DingTalk',
    src: '/images/logos/dingtalk.svg',
    width: 112,
    height: 40,
    mobileOrderClassName: 'xs:order-2',
  },
  {
    alt: 'Tencent',
    src: '/images/logos/tencent.svg',
    width: 118,
    height: 40,
    mobileOrderClassName: 'xs:order-9',
  },
  {
    alt: 'Kakao Entertainment',
    src: '/images/logos/kakao.svg',
    width: 94,
    height: 40,
    mobileOrderClassName: 'xs:order-4',
  },
  {
    alt: 'Kingsoft',
    src: '/images/logos/kingsoft.svg',
    width: 145,
    height: 40,
    mobileOrderClassName: 'xs:order-6',
  },
  {
    alt: 'Human horizons',
    src: '/images/logos/human-horizons.svg',
    width: 103,
    height: 40,
    mobileOrderClassName: 'xs:order-5',
  },
  {
    alt: 'Salla',
    src: '/images/logos/salla.svg',
    width: 75,
    height: 40,
    mobileOrderClassName: 'xs:order-8',
  },
  {
    alt: 'Miotech',
    src: '/images/logos/miotech.svg',
    width: 122,
    height: 40,
    mobileOrderClassName: 'xs:order-7',
  },
  {
    alt: 'Proton',
    src: '/images/logos/proton.svg',
    width: 91,
    height: 40,
    mobileOrderClassName: 'xs:order-3',
  },
  {
    alt: 'Meta',
    src: '/images/logos/meta.svg',
    width: 115,
    height: 40,
    mobileOrderClassName: 'xs:order-11',
  },
  {
    alt: 'Evermos',
    src: '/images/logos/evermos.svg',
    width: 151,
    height: 40,
    mobileOrderClassName: 'xs:order-12',
  },
  {
    alt: 'Aptive',
    src: '/images/logos/aptive.svg',
    width: 90,
    height: 40,
    mobileOrderClassName: 'xs:order-10',
  },
];

const Logos = () => {
  return (
    <div className="col-span-5 mt-9 border-t border-gray-90 pt-9 lg:col-span-full lg:mt-0 lg:border-none lg:pt-0">
      <p className="text-18 leading-extra-tight text-gray-40">Trusted by engineers worldwide</p>
      <ul className="it mt-7 flex flex-wrap items-start gap-y-5 gap-x-9 2xl:gap-x-7 xl:gap-x-9 md:gap-x-6 xs:gap-x-5 xs:gap-y-6">
        {LOGOS.map((logo, idx) => (
          <li key={idx} className={logo.mobileOrderClassName}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              className="h-10 2xl:h-[38px] xl:h-10 md:h-[38px] xs:h-8 xs:w-auto"
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logos;
