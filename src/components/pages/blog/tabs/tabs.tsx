import slugifyText from '@/utils/slugify-text';
import clsx from 'clsx';

import Link from '@/components/shared/link';

import ROUTE from '@/lib/route';

type TabCategory = {
  label: string;
  slug?: string;
};

type TabsProps = {
  items: string[];
  currentSlug?: string;
};

const tabThemes = {
  explanation: {
    default: 'border-[#D1FAE5] text-[#056049] hover:bg-[#D1FAE5]',
    active: 'bg-[#056049] bg-[#056049]',
  },
  industry: {
    default: 'border-[#FEF6CD] text-[#8A420F] hover:bg-[#FEF6CD]',
    active: 'bg-[#8A420F] border-[#8A420F]',
  },
  announcement: {
    default: 'border-[#E0E7FF] text-[#382E9E] hover:bg-[#E0E7FF]',
    active: 'bg-[#382E9E] border-[#382E9E]',
  },
  engineering: {
    default: 'text-gray-15 border-gray-94 hover:bg-gray-94',
    active: 'bg-gray-15 border-gray-15',
  },
  'how-to': {
    default: 'border-[#F9E8FF] text-[#8E1B98] hover:bg-[#F9E8FF]',
    active: 'bg-[#8E1B98] border-[#8E1B98]',
  },
  'case-study': {
    default: 'border-[#CFFAFE] text-[#176782] hover:bg-[#CFFAFE]',
    active: 'bg-[#176782] border-[#176782]',
  },
  newsletter: {
    default: 'border-[#FEF6CD] text-[#8A420F] hover:bg-[#FEF6CD]',
    active: 'bg-[#8A420F] border-[#8A420F]',
  },
};

const getTabStyles = (slug: keyof typeof tabThemes | '', currentSlug: string) => {
  if (!slug) {
    if (!currentSlug) return 'bg-black border-black hover:bg-black';
    return 'text-black border-gray-90 hover:bg-gray-90';
  }

  return tabThemes[slug][slug === currentSlug ? 'active' : 'default'];
};

const Tabs = ({ items, currentSlug = '' }: TabsProps) => {
  const tabsWithSlug: TabCategory[] = items.map((tag) => ({ label: tag, slug: slugifyText(tag) }));
  tabsWithSlug.unshift({ label: 'All Posts' });

  return (
    <div className="container mt-8">
      <nav className="scrollbar-hidden overflow-auto lg:-mx-11 lg:mt-12 lg:px-11 md:-mx-7 md:mt-6 md:px-7 xs:-mx-4 xs:mt-5 xs:px-4">
        <ul className="flex w-max gap-x-4 text-black lg:gap-x-3 md:gap-x-2">
          {tabsWithSlug.map(({ label, slug = '' }, index) => (
            <li key={index}>
              <Link
                aria-label={!slug ? `${label}` : `Posts of ${label} category`}
                className={clsx(
                  getTabStyles(slug as keyof typeof tabThemes | '', currentSlug),
                  slug === currentSlug && 'text-white',
                  'block rounded-full border-2 px-[18px] py-[7px] text-16 font-medium leading-none md:text-14 xs:text-12',
                )}
                href={!slug ? ROUTE.BLOG : `${ROUTE.BLOG_CATEGORY}/${slug}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Tabs;
