import clsx from 'clsx';

import Button from '@/components/shared/button';

import { Plan } from '@/types/pricing';

const PlanCard = ({
  title,
  description,
  additionalDescription,
  buttonText,
  buttonUrl,
  buttonTheme,
}: Plan) => {
  return (
    <div
      className={clsx(
        'h-[257px] border border-tones-purple-dark text-center before:mb-6 before:block before:h-2 before:w-full 3xl:h-[272px] xl:h-[254px] md:h-[245px] sm:h-[243px] sm:before:mb-5',
        title === 'team' ? 'border-l-0 border-r-0 bg-[#F9FAFF]' : 'bg-white',
        {
          'before:bg-[#5647EB]': title === 'team',
          'before:bg-[#3DB8F5]': title === 'free',
          'before:bg-[#172136]': title === 'enterprise',
        },
      )}
    >
      <div className="flex flex-col px-4 sm:px-2">
        <h3 className="font-title text-56 capitalize leading-none xl:text-44 md:text-34">
          {title}
        </h3>
        <p
          className="mx-auto mt-3 max-w-[244px] text-14 leading-tight tracking-tight text-gray-40 3xl:min-h-[54px] xl:mt-2 sm:min-h-[72px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button
          theme={buttonTheme}
          size="md"
          to={buttonUrl}
          additionalClassName="mt-5 w-[232px] 3xl:w-full mx-auto xl:mt-4 md:mt-5 sm:mt-3"
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
