import Link from '@/components/shared/link';

import PROMO_DATA from '@/lib/promo-data';

const Promo = () => {
  const aside = PROMO_DATA.BLOG_ASIDE;

  return (
    <Link
      className="flex flex-col justify-between rounded-xl bg-primary-1 p-5 text-white hover:bg-primary-2 lg:col-span-5 lg:col-start-2 md:col-span-6 sm:col-span-full sm:rounded-[4px]"
      href={aside.pathname}
    >
      <div>
        <h3 className="font-title text-34 leading-none">{aside.title}</h3>
        <p className="mt-3 text-15 leading-snug lg:mt-2.5 sm:mt-2">{aside.description}</p>
      </div>
      <span className="mt-4 flex h-9 w-[122px] items-center justify-center rounded-full bg-gray-15 text-13 font-bold uppercase tracking-wide text-white">
        {aside.cta}
      </span>
    </Link>
  );
};

export default Promo;
