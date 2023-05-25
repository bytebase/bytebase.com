import { ReactNode, forwardRef } from 'react';

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
      borderColor = 'border-gray-70',
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
          'remove-autocomplete-styles w-full appearance-none rounded-md border border-gray-70 px-4 text-black transition-colors duration-200 placeholder:text-gray-60 placeholder-shown:text-gray-70 focus:border-white focus:shadow-field-focus focus:outline-none md:px-3',
          (Tag === FIELD_TAGS.INPUT || Tag === FIELD_TAGS.SELECT) && 'h-14 md:h-12',
          Tag === FIELD_TAGS.TEXTAREA && 'md:min-h-24 min-h-[104px] py-4',
          Tag === FIELD_TAGS.SELECT &&
            'bg-white bg-[url(/images/chevron-down.svg)] bg-[center_right_1rem] bg-no-repeat',
          error ? 'border-none shadow-field-error' : borderColor,
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
        <span className="mt-1.5 text-12 leading-none text-secondary-6">{error}</span>
      )}
    </div>
  ),
);

Field.displayName = 'Field';

export default Field;
