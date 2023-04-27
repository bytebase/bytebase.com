import clsx from 'clsx';

import { AccordionData } from '../promo-sql-editor';

// TODO: refactor markup for chevrons to span > image.svg
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
          <p className="flex items-center gap-4 text-24 leading-extra-tight tracking-tight xl:text-20 xl:leading-tight xl:tracking-normal md:gap-3 md:text-18">
            {activeIndex === idx ? (
              <img
                className="h-8 w-8 rounded-full shadow-[0_5px_10px_0_rgba(156,201,182,0.8)] md:h-7 md:w-7"
                src="/images/page/main/accordion-opened.svg"
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
            ) : (
              <img
                className="h-8 w-8 md:h-7 md:w-7"
                src="/images/page/main/accordion-closed-secondary-2.svg"
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
            )}
            <b className="font-bold md:font-semibold">{title}</b>
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
