const LOGOS = [
  {
    alt: 'Red Hat',
    src: '/images/logos/redhat.svg',
    width: 153,
    height: 64,
  },
  {
    alt: 'DingTalk',
    src: '/images/logos/dingtalk.svg',
    width: 117,
    height: 40,
  },
  {
    alt: 'Aptive',
    src: '/images/logos/aptive.svg',
    width: 90,
    height: 64,
  },
  {
    alt: 'Kakao Entertainment',
    src: '/images/logos/kakao.svg',
    width: 97,
    height: 40,
  },
  {
    alt: 'Kingsoft',
    src: '/images/logos/kingsoft.svg',
    width: 129,
    height: 40,
  },
  {
    alt: 'Human horizons',
    src: '/images/logos/human-horizons.svg',
    width: 100,
    height: 40,
  },
  {
    alt: 'Salla',
    src: '/images/logos/salla.svg',
    width: 74,
    height: 40,
  },
  {
    alt: 'Miotech',
    src: '/images/logos/miotech.svg',
    width: 123,
    height: 40,
  },
  {
    alt: 'Proton',
    src: '/images/logos/proton.svg',
    width: 158,
    height: 64,
  },
  {
    alt: 'Meta',
    src: '/images/logos/meta.svg',
    width: 118,
    height: 64,
  },
  {
    alt: 'Evermos',
    src: '/images/logos/evermos.svg',
    width: 149,
    height: 40,
  },
  {
    alt: 'Tencent',
    src: '/images/logos/tencent.svg',
    width: 298,
    height: 64,
  },
];

const Logos = () => {
  return (
    <div className="col-span-5 mt-9 border-t border-gray-90 pt-9 lg:col-span-8 lg:mt-0 lg:border-none lg:pt-0 sm:col-span-full">
      <p className="text-18 leading-extra-tight text-gray-40">Trusted by engineers worldwide</p>
      <ul className="it mt-7 inline-grid grid-cols-[repeat(4,auto)] items-center gap-y-5 gap-x-9 xl:gap-x-8 md:gap-x-9 sm:flex sm:flex-wrap sm:gap-6">
        {LOGOS.map((logo, idx) => (
          <li key={idx} className="flex justify-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img {...logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logos;
