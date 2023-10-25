import clsx from 'clsx';

import InfoIcon from '@/svgs/info.inline.svg';

const EnterpriseOnlyBlock = () => {
  return (
    <figure
      className={clsx(
        'hint-block border',
        'border-tones-purple-dark shadow-[0px_5px_15px_rgba(156,186,201,0.5)]',
      )}
    >
      <div
        className={clsx(
          'flex gap-x-4 px-5 pb-6 pt-6 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] md:gap-x-3 md:px-4 md:pb-5 md:pt-5 sm:gap-x-2 sm:px-3 sm:pb-4 sm:pt-4',
          'items-center bg-tones-purple-light',
        )}
      >
        <span
          className={clsx(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:h-7 md:w-7 sm:h-6 sm:w-6',
            'bg-primary-1',
          )}
        >
          <InfoIcon className="h-4 w-4 text-white" />
        </span>

        <div className="flex flex-col">
          <div
            className={clsx(
              'prose mt-1 space-y-2.5 !text-15 !leading-snug prose-p:my-2.5 prose-p:first:mt-0 prose-p:last:mb-0 prose-a:break-all prose-ol:my-0 prose-ol:!pl-0 prose-ul:!pl-0 sm:mt-0 sm:!text-14 sm:leading-snug',
              'prose-a:font-semibold prose-a:text-primary-1 prose-a:no-underline prose-li:marker:!text-primary-1',
            )}
          >
            This feature is only available in the Enterprise Plan.
          </div>
        </div>
      </div>
    </figure>
  );
};

export default EnterpriseOnlyBlock;
