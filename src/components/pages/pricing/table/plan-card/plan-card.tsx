'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/shared/button';

import { Plan } from '@/types/pricing';
import { EVENTS } from '@/lib/events';

const PlanCard = ({
  title,
  description,
  additionalDescription,
  buttonText,
  buttonUrl,
  buttonTheme,
}: Plan) => {
  const [fullMode, setFullMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const eventProp = {
    value: title,
    position: 'card',
  };

  useEffect(() => {
    const container = containerRef.current;
    const containerParent = container?.parentElement;
    if (!container || !containerParent) {
      return;
    }

    window.addEventListener('scroll', () => {
      const position = window.getComputedStyle(containerParent).position;
      if (position !== 'sticky') {
        setFullMode(true);
        return;
      }

      const stickyTop = parseInt(window.getComputedStyle(containerParent).top, 10);
      const rect = container.getBoundingClientRect();
      if (rect.top <= stickyTop) {
        setFullMode(false);
      } else {
        setFullMode(true);
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'border border-tones-purple-dark bg-white text-center before:mb-6 before:block before:h-2 before:w-full sm:before:mb-5',
        {
          'before:bg-[#172136]': title === 'community',
          'border-l-0 before:bg-[#3DB8F5]': title === 'pro',
          'border-x-0 before:bg-[#5647EB]': title === 'enterprise',
        },
        fullMode ? 'h-full border-b-0' : 'h-auto',
      )}
    >
      <div className="flex flex-col px-4 sm:px-2">
        <h3
          className={clsx(
            'font-title capitalize leading-none',
            fullMode ? 'text-56 xl:text-44 md:text-34' : 'text-34',
          )}
        >
          {title}
        </h3>
        <p
          className="mx-auto mt-3 min-h-[24px] max-w-[244px] text-18 leading-tight tracking-tight text-gray-40 xl:mt-2 xl:min-h-[40px] sm:min-h-[58px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button
          className="mx-auto mt-5 w-[232px] 3xl:w-full xl:mt-4 md:mt-2 sm:mt-3"
          theme={buttonTheme}
          size={fullMode ? 'md' : 'sm'}
          href={buttonUrl}
          event={EVENTS.PLAN_CLICK}
          eventProp={eventProp}
        >
          <span className="text-wrap sm:text-14">{buttonText}</span>
        </Button>
        {fullMode && additionalDescription && (
          <p className="mt-4 text-14 leading-6 tracking-tight text-gray-15 sm:mt-2">
            {additionalDescription}
          </p>
        )}
        <div
          className={clsx(
            'w-full',
            additionalDescription ? 'mt-[14px]' : 'mt-[46px] sm:mt-[38px]',
            fullMode ? '' : '!mt-5',
          )}
        />
      </div>
    </div>
  );
};

export default PlanCard;
