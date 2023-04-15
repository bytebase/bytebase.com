'use client';

import { useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import clsx from 'clsx';

type TooltipProps = {
  className?: string;
  text: string;
};

const Tooltip = ({ className, text }: TooltipProps) => {
  const [isTooltipVisible, setTooltipVisibility] = useState(true);

  useEffect(() => {
    setTooltipVisibility(true);
  }, []);

  return (
    <>
      <button
        className={clsx('group peer shrink-0 p-1.5', className)}
        type="button"
        data-tooltip-id={text}
        data-tooltip-content={text}
        aria-label="Tooltip"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="opacity-80 transition-opacity duration-200 group-hover:opacity-100"
          src="/images/question.svg"
          height={16}
          width={16}
          loading="lazy"
          alt=""
          aria-hidden
        />
      </button>
      {isTooltipVisible && (
        <ReactTooltip
          id={text}
          className="opacity-1 z-10 max-w-[270px] rounded-xl bg-white p-4 pt-3 text-center text-15 leading-normal text-gray-30 shadow-tooltip"
          noArrow
        />
      )}
    </>
  );
};

export default Tooltip;
