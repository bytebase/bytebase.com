import { ReactNode, Ref, forwardRef } from 'react';

import clsx from 'clsx';

export const FIELD_TAGS = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
} as const;

interface FieldProps {
  className?: string;
  inputClassName?: string;
  name: string;
  borderColor?: string;
  type?: string;
  children?: ReactNode;
  tag?: (typeof FIELD_TAGS)[keyof typeof FIELD_TAGS];
  error?: string;
  showErrorMessage?: boolean;
  isDisabled?: boolean;
  [x: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Field = forwardRef<any, FieldProps>(
  (
    {
      className = null,
      inputClassName = null,
      name,
      borderColor = 'border-gray-80',
      type = 'text',
      children = null,
      tag: Tag = 'input',
      error = null,
      showErrorMessage = true,
      isDisabled = false,
      ...otherProps
    },
    ref,
  ) => (
    <div className={clsx('relative flex flex-col items-start', className)}>
      <Tag
        className={clsx(
          'remove-autocomplete-styles w-full appearance-none rounded border px-4 text-black transition-colors duration-200 placeholder:text-gray-70  placeholder-shown:text-gray-70 focus-within:outline-none',
          (Tag === FIELD_TAGS.INPUT || Tag === FIELD_TAGS.SELECT) && 'h-12',
          Tag === FIELD_TAGS.TEXTAREA && 'min-h-[128px] py-4',
          Tag === FIELD_TAGS.SELECT &&
            'bg-white bg-[url(/images/chevron-down.svg)] bg-[center_right_1rem] bg-no-repeat',
          error ? 'border-error' : borderColor,
          inputClassName,
        )}
        ref={ref}
        name={name}
        type={Tag !== FIELD_TAGS.SELECT ? type : undefined}
        disabled={isDisabled}
        {...otherProps}
      >
        {Tag === FIELD_TAGS.SELECT ? children : null}
      </Tag>

      {showErrorMessage && error && (
        <span className="text-10 text-error absolute top-[calc(100%+0.25rem)] leading-none">
          {error}
        </span>
      )}
    </div>
  ),
);

Field.displayName = 'Field';

export default Field;
