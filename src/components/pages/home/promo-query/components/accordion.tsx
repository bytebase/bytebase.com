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
    <div className="w-full bg-tones-green-light">
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
                  className="h-8 shrink-0 rounded-[100%] shadow-icon-green md:h-7"
                />
                <p className="ml-4 text-24 font-bold leading-extra-tight -tracking-wider lg:text-20 lg:tracking-normal md:ml-3 md:text-18 md:font-semibold">
                  {title}
                </p>
              </div>
              <p className="mt-[11px] pl-12 pb-6 text-16 leading-normal 2xl:mt-2 2xl:pb-5 lg:mt-1 lg:text-14 lg:leading-snug md:mt-1.5 md:pl-10 md:pb-4 sm:pb-3">
                {description}
              </p>
            </>
          ) : (
            <div className="flex items-center">
              <img
                src="/images/accordion-arrow-green.svg"
                alt=""
                className="h-8 shrink-0 rounded-[100%] md:h-7"
              />
              <div className="ml-4 md:ml-3">
                <p className="text-24 font-bold leading-tight -tracking-wider lg:text-20 lg:tracking-normal md:text-18 md:font-semibold">
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
