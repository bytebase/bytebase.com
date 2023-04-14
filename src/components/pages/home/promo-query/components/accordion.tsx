import { useCallback, useState } from 'react';

import clsx from 'clsx';

interface AccordionProps {
  title: string;
  description: string;
  isOpenExternal?: boolean;
  onChange?: () => void;
  defaultOpen?: boolean;
}

const Accordion = ({
  title,
  description,
  defaultOpen,
  onChange,
  isOpenExternal,
}: AccordionProps) => {
  const [isOpenLocal, setIsOpenLocal] = useState(defaultOpen);
  const isOpen = onChange ? isOpenExternal : isOpenLocal;

  const handleToggleLocalIsOpen = useCallback(() => {
    setIsOpenLocal((prev) => !prev);
  }, []);
  const handleClick = onChange || handleToggleLocalIsOpen;

  return (
    <div className="bg-tones-green-light w-full">
      <div
        className={clsx(
          isOpen
            ? 'cursor-pointer pt-6 lg:pt-4 md:pt-3'
            : 'cursor-pointer py-6 lg:py-5 md:py-4 md:pt-3 sm:py-4',
        )}
        onClick={handleClick}
      >
        <div className="">
          {isOpen ? (
            <>
              <div className="flex items-center">
                <img
                  src="/images/accordion-arrow.svg"
                  alt=""
                  className="h-8 md:h-7 shadow-icon-green rounded-[100%] shrink-0"
                />
                <p className="ml-4 md:ml-3 font-bold leading-extra-tight -tracking-wider lg:tracking-normal text-24 lg:text-20 md:text-18 md:font-semibold">
                  {title}
                </p>
              </div>
              <p className="pl-12 md:pl-10 mt-[11px] 2xl:mt-2 lg:mt-1 md:mt-1.5 pb-6 2xl:pb-5 md:pb-4 sm:pb-3 text-16 lg:text-14 leading-normal lg:leading-snug">
                {description}
              </p>
            </>
          ) : (
            <div className="flex items-center">
              <img
                src="/images/accordion-arrow-green.svg"
                alt=""
                className="h-8 md:h-7 rounded-[100%] shrink-0"
              />
              <div className="ml-4 md:ml-3">
                <p className="font-bold leading-tight -tracking-wider lg:tracking-normal text-24 lg:text-20 md:text-18 md:font-semibold">
                  {title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
