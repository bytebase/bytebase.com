import clsx from 'clsx';

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
  const eventProp = {
    value: title,
    position: 'card',
  };
  return (
    <div
      className={clsx(
        'h-[276px] border border-tones-purple-dark bg-white text-center before:mb-6 before:block before:h-2 before:w-full 3xl:h-[272px] md:h-[245px] sm:h-[260px] sm:before:mb-5',
        {
          'before:bg-[#172136]': title === 'community',
          'border-l-0 before:bg-[#3DB8F5]': title === 'enterprise',
          'border-l-0 before:bg-[#5647EB]': title === 'pro',
        },
      )}
    >
      <div className="flex flex-col px-4 sm:px-2">
        <h3 className="font-title text-56 capitalize leading-none xl:text-44 md:text-34">
          {title}
        </h3>
        <p
          className="mx-auto mt-3 min-h-[54px] max-w-[244px] text-14 leading-tight tracking-tight text-gray-40 xl:mt-2 xl:min-h-[70px] sm:min-h-[88px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button
          className="mx-auto mt-5 w-[232px] 3xl:w-full xl:mt-4 md:mt-2 sm:mt-3"
          theme={buttonTheme}
          size="md"
          href={buttonUrl}
          event={EVENTS.PLAN_CLICK}
          eventProp={eventProp}
        >
          {buttonText}
        </Button>
        {additionalDescription && (
          <p className="mt-4 text-14 leading-tight tracking-tight text-gray-15 sm:mt-2.5">
            {additionalDescription}
          </p>
        )}
        <div
          className={clsx(
            'w-full',
            additionalDescription
              ? 'mt-5 xl:mt-4 sm:mt-2.5'
              : 'mt-[54px] xl:mt-[50px] sm:mt-[38px]',
          )}
        />
      </div>
    </div>
  );
};

export default PlanCard;
