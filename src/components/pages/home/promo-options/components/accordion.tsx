import Image from 'next/image';

import { useCallback, useState } from 'react';

import clsx from 'clsx';

interface AccordionProps {
  title: string;
  description: string;
  image: string;
  imageMobile: string;
  isOpenExternal?: boolean;
  onChange?: () => void;
  defaultOpen: boolean;
  className?: string;
}

const Accordion = ({
  title,
  description,
  image,
  imageMobile,
  defaultOpen,
  onChange,
  isOpenExternal,
  className,
}: AccordionProps) => {
  const [isOpenLocal, setIsOpenLocal] = useState(defaultOpen);
  const isOpen = onChange ? isOpenExternal : isOpenLocal;

  const handleToggleLocalIsOpen = useCallback(() => {
    setIsOpenLocal((prev) => !prev);
  }, []);
  const handleClick = onChange || handleToggleLocalIsOpen;

  return (
    <div
      className={clsx(
        isOpen
          ? 'border-b-2 border-white bg-tones-purple-light bg-opacity-50'
          : 'border-t-2 border-white bg-tones-purple-light bg-cite sm:flex sm:min-h-[89px] sm:items-center',
        className,
      )}
    >
      <div
        className={clsx(
          isOpen
            ? 'container grid-gap grid cursor-pointer grid-cols-12 py-0 md:pt-11 sm:grid-cols-4 sm:pt-9'
            : 'container cursor-pointer border-none py-[26px] md:py-6 sm:py-5',
        )}
        onClick={handleClick}
      >
        {isOpen ? (
          <div
            className={clsx(
              'col-start-1 col-end-8 flex pt-[165px] 2xl:pt-[124px] xl:pt-[115px] lg:col-end-7 md:col-end-13 md:pt-0 sm:col-end-5',
            )}
          >
            <img
              src="/images/accordion-arrow.svg"
              alt=""
              className="mt-1 h-14 w-14 shrink-0 rounded-[100%] shadow-icon lg:h-11 lg:w-11 md:h-9 md:w-9 sm:h-7 sm:w-7"
            />
            <div className="ml-[30px] lg:ml-6 md:ml-4 sm:ml-3">
              <p
                className={clsx(
                  isOpen
                    ? 'mt-[7px] ml-0 text-44 font-bold leading-extra-tight tracking-tighter lg:text-36 md:text-30 md:tracking-normal sm:text-24'
                    : 'ml-7 text-30',
                )}
              >
                {title}
              </p>
              {isOpen && (
                <div className="order-1 col-start-1 col-end-8 flex-grow sm:col-end-5">
                  <p className="mt-4 text-18 leading-normal 2xl:max-w-[604px] lg:mt-2 lg:!max-w-[538px] lg:text-16 md:mt-1.5 md:text-14">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="col-start-1 col-end-8 ml-1.5 flex h-full items-center lg:ml-0 md:items-start">
            <img
              src="/images/accordion-arrow-closed.svg"
              alt=""
              className="h-11 w-11 shrink-0 rounded-[100%] lg:h-[38px] lg:w-[38px] md:-mt-1 md:h-8 md:w-8 sm:h-7 sm:w-7"
            />
            <div
              className={clsx(
                isOpen
                  ? 'ml-0 text-44 font-bold leading-extra-tight tracking-tighter 2xl:tracking-normal lg:text-36 md:text-30 sm:text-24 sm:leading-tight'
                  : 'ml-7 text-30 font-bold leading-extra-tight tracking-tighter 2xl:tracking-normal lg:ml-6 lg:text-24 md:ml-4 md:text-20 sm:ml-3 sm:text-18 sm:leading-tight',
              )}
            >
              {title}
              {isOpen && (
                <div className="order-1 col-start-1 col-end-8 flex-grow">
                  <p className="mt-4.5 text-18 leading-none">{description}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {isOpen && (
          <div className="col-start-8 col-end-13 lg:col-start-7 md:col-start-2 md:col-end-12 sm:col-start-1 sm:col-end-5">
            <div>
              <Image
                className="order-2 flex-shrink-0 translate-x-3 sm:hidden"
                src={image}
                width={590}
                height={418}
                alt=""
              />
              <Image
                className="order-2 mt-6 hidden w-full flex-shrink-0 translate-x-3 sm:block"
                src={imageMobile}
                width={328}
                height={270}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
