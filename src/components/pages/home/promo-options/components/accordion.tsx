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
          ? 'bg-opacity-50 bg-tones-purple-light border-b-2 border-white'
          : 'bg-cite bg-tones-purple-light border-t-2 border-white sm:min-h-[89px] sm:flex sm:items-center',
        className,
      )}
    >
      <div
        className={clsx(
          isOpen
            ? 'cursor-pointer container py-0 md:pt-11 sm:pt-9 grid grid-cols-12 sm:grid-cols-4 grid-gap'
            : 'cursor-pointer container border-none py-[26px] md:py-6 sm:py-5',
        )}
        onClick={handleClick}
      >
        {isOpen ? (
          <div
            className={clsx(
              'flex col-start-1 col-end-8 lg:col-end-7 md:col-end-13 sm:col-end-5 pt-[165px] 2xl:pt-[124px] xl:pt-[115px] md:pt-0',
            )}
          >
            <img
              src="/images/accordion-arrow.svg"
              alt=""
              className="mt-1 w-14 lg:w-11 md:w-9 sm:w-7 h-14 lg:h-11 md:h-9 sm:h-7 shadow-icon rounded-[100%] shrink-0"
            />
            <div className="ml-[30px] lg:ml-6 md:ml-4 sm:ml-3">
              <p
                className={clsx(
                  isOpen
                    ? 'mt-[7px] font-bold leading-extra-tight tracking-tighter md:tracking-normal ml-0 text-44 lg:text-36 md:text-30 sm:text-24'
                    : 'ml-7 text-30',
                )}
              >
                {title}
              </p>
              {isOpen && (
                <div className="order-1 flex-grow col-start-1 col-end-8 sm:col-end-5">
                  <p className="mt-4 lg:mt-2 md:mt-1.5 text-18 lg:text-16 md:text-14 leading-normal 2xl:max-w-[604px] lg:!max-w-[538px]">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center h-full md:items-start col-start-1 col-end-8 ml-1.5 lg:ml-0">
            <img
              src="/images/accordion-arrow-closed.svg"
              alt=""
              className="h-11 w-11 lg:w-[38px] lg:h-[38px] md:w-8 md:h-8 sm:w-7 sm:h-7 rounded-[100%] shrink-0 md:-mt-1"
            />
            <div
              className={clsx(
                isOpen
                  ? 'font-bold leading-extra-tight sm:leading-tight tracking-tighter 2xl:tracking-normal ml-0 text-44 lg:text-36 md:text-30 sm:text-24'
                  : 'font-bold leading-extra-tight sm:leading-tight tracking-tighter 2xl:tracking-normal ml-7 lg:ml-6 md:ml-4 sm:ml-3 text-30 lg:text-24 md:text-20 sm:text-18',
              )}
            >
              {title}
              {isOpen && (
                <div className="order-1 flex-grow col-start-1 col-end-8">
                  <p className="mt-4.5 text-18 leading-none">{description}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {isOpen && (
          <div className="col-start-8 lg:col-start-7 col-end-13 md:col-start-2 md:col-end-12 sm:col-start-1 sm:col-end-5">
            <div>
              <Image
                className="order-2 flex-shrink-0 translate-x-3 sm:hidden"
                src={image}
                width={590}
                height={418}
                alt=""
              />
              <Image
                className="order-2 mt-6 w-full flex-shrink-0 translate-x-3 hidden sm:block"
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
