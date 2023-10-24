import clsx from 'clsx';

import ChevronIcon from '@/svgs/bold-chevron.inline.svg';
import { AccordionData } from '../promo-accordion';

const Accordion = ({
  onChange,
  activeIndex,
  items,
}: {
  onChange: (index: number) => void;
  activeIndex: number;
  items: AccordionData[];
}) => {
  return (
    <ul className="divide-y divide-tones-green-dark">
      {items.map(({ title, description }, idx) => (
        <li
          key={idx}
          className={clsx('py-6 first:pt-0 last:pb-0 xl:py-5 md:py-4.5 sm:py-4', {
            'cursor-pointer': activeIndex !== idx,
          })}
          onClick={() => onChange(idx)}
        >
          <p className="group flex items-center gap-4 text-24 leading-extra-tight tracking-tight xl:text-20 xl:leading-tight xl:tracking-normal md:gap-3 md:text-18">
            <span
              className={clsx(
                'relative block h-8 w-8 rounded-full shadow-[0_5px_10px_0_rgba(156,201,182,0.8)] transition-colors duration-200 md:h-7 md:w-7',
                activeIndex !== idx && 'group-hover:bg-tones-deep-green-dark',
                activeIndex === idx ? 'bg-white' : 'bg-secondary-2 ',
              )}
            >
              <ChevronIcon
                className={clsx(
                  'absolute top-1/2 left-1/2 h-3.5 w-5 -translate-x-1/2 -translate-y-1/2 text-white transition-[transform,colors] duration-200',
                  activeIndex === idx && 'rotate-90 !text-gray-15',
                )}
              />
            </span>
            <b
              className={clsx(
                'font-bold text-gray-15 transition-colors duration-200 md:font-semibold',
                activeIndex !== idx && 'group-hover:text-tones-deep-green-dark',
              )}
            >
              {title}
            </b>
          </p>
          {activeIndex === idx && (
            <p className="pt-2 pl-12 text-16 xl:pt-1 xl:text-14 xl:leading-snug md:pt-1.5 md:pl-10">
              {description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
