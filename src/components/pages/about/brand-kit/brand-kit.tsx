import Image from 'next/image';

import clsx from 'clsx';

import Button from '@/components/shared/button';
import Pill from '@/components/shared/pill';

const brandColors = [
  {
    title: 'Theme color',
    color: '#4F46E5',
  },
  {
    title: 'Logo color',
    color: '#111827',
  },
];

const brandLogos = [
  {
    image: '/images/page/about/bytebase-full-logo.svg',
    width: 379,
    heigh: 80,
    className: 'xl:h-auto xl:w-[280px]',
  },
  {
    image: '/images/page/about/bytebase-text-logo.svg',
    width: 280,
    heigh: 80,
    className: 'xl:h-auto xl:w-[210px] md:w-[160px]',
  },
  {
    image: '/images/page/about/bytebase-logo.svg',
    width: 142,
    heigh: 134,
    className: 'xl:h-auto xl:w-[110px] md:w-[90px]',
  },
];

const BRANDKIT_FILE_PATH = '/download/bytebase-brand-kit.zip';

const BrandKit = () => (
  <section
    className="w-full bg-tones-purple-light/30 py-36 xl:py-32 md:py-24 sm:py-16"
    id="brand-kit"
  >
    <div className="container gap-x-grid grid grid-cols-12 sm:grid-cols-4">
      <Pill theme="secondary-1" className="col-span-full justify-self-center">
        Brand kit
      </Pill>
      <h2 className="col-span-full mb-14 mt-5 justify-self-center text-center font-title text-88 font-semibold leading-none xl:text-68 lg:mb-12 lg:mt-4 md:mb-10 md:mt-3 md:text-54 sm:mb-8 sm:text-48 sm:leading-95">
        Bytebase brand
      </h2>
      {brandColors.map(({ title, color }) => (
        <div
          className={clsx(
            'col-span-6 row-start-3 flex h-full max-h-[300px] min-h-[300px] flex-col items-center justify-center border border-gray-90 xl:max-h-[208px] xl:min-h-[208px] sm:col-span-full sm:row-auto sm:max-h-[190px] sm:min-h-[190px]',
            color === '#4F46E5' ? 'bg-primary-1' : 'bg-gray-15',
          )}
          key={color}
        >
          <span className="mb-3 text-20 font-medium leading-none text-white sm:mb-2 sm:text-16">
            {title}
          </span>
          <span className="leading-4.5 text-30 font-bold text-white sm:text-24">{color}</span>
        </div>
      ))}
      {brandLogos.map(({ image, width, heigh, className }, index) => (
        <div
          className="min-h-[300px col-span-4 row-start-4 mt-10 grid h-full max-h-[300px] min-h-[300px] place-items-center border border-gray-90 p-10 3xl:mt-9 xl:mt-6 xl:max-h-[208px] xl:min-h-[208px] md:mt-5 md:p-6 sm:col-span-full sm:row-auto sm:mt-4 sm:max-h-[190px] sm:min-h-[190px]"
          key={index}
        >
          <Image src={image} alt="" width={width} height={heigh} className={className} />
        </div>
      ))}
      <Button
        className="col-span-full mt-14 justify-self-center px-6 py-4 text-14 xl:mt-12 sm:mt-10"
        href={BRANDKIT_FILE_PATH}
        target="_blank"
        theme="primary-outline"
        size="md"
      >
        Download Brand Kit
      </Button>
    </div>
  </section>
);

export default BrandKit;
