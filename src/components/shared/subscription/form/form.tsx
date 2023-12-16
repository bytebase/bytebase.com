'use client';

import { useCallback, useState } from 'react';

import clsx from 'clsx';

import Link from '@/components/shared/link';

import Route from '@/lib/route';

import InfoIcon from '@/svgs/info.inline.svg';
import triangle from '@/svgs/triangle.svg';

const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex, no-useless-escape
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

const STATES = {
  DEFAULT: 'default',
  ERROR: 'error',
  LOADING: 'loading',
  SUCCESS: 'success',
};

const ErrorMessage = ({ className, message }: { className?: string; message: string }) => (
  <div className={clsx('absolute left-0 top-full pt-3 transition-opacity duration-150', className)}>
    <div className="relative flex rounded-lg border border-secondary-6 bg-[#EFDFDE] px-3.5 py-3 text-14 leading-tight tracking-tight text-secondary-6 shadow-[0px_0px_30px_rgba(0,0,0,0.2)]">
      <img
        className="absolute bottom-[calc(100%-1.5px)] left-5 h-auto w-5"
        src={triangle}
        width={26}
        height={14}
        alt=""
        loading="lazy"
      />
      <span className="mr-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-secondary-6">
        <InfoIcon className="inline-block h-auto w-2.5 rotate-180 text-white" />
      </span>
      <span>{message}</span>
    </div>
  </div>
);

const Form = ({ fireInput }: { fireInput?: () => void }) => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState(STATES.DEFAULT);

  const [errorMessage, setErrorMessage] = useState('');

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      fireInput && fireInput();
      setFormState(STATES.DEFAULT);
      setEmail(event.currentTarget.value.trim());
    },
    [fireInput],
  );

  const onSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (!email) {
        setErrorMessage('Please enter your email');
        setFormState(STATES.ERROR);
        return;
      }

      if (!EMAIL_REGEX.test(email)) {
        setErrorMessage('Please enter a valid email');
        setFormState(STATES.ERROR);
        return;
      }

      setFormState(STATES.LOADING);
      setErrorMessage('');

      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify({ email, tag: 'newsletter' }),
        });

        setTimeout(() => {
          setFormState(STATES.SUCCESS);
          setEmail('Thank you for subscribing!');

          setTimeout(() => {
            setFormState(STATES.DEFAULT);
            setEmail('');
          }, 2000);
        }, 2200);
      } catch (error: any) {
        setFormState(STATES.ERROR);
        setErrorMessage(error?.message ?? error);
      }
    },
    [email],
  );

  return (
    <form className="text-white" noValidate onSubmit={onSubmit}>
      <div className="relative flex h-16 xl:h-12">
        <input
          className={clsx(
            'remove-autocomplete-styles flex-grow rounded-l-full px-7 py-6 text-16 leading-none tracking-tight placeholder-gray-40 outline-none transition-colors duration-200 disabled:bg-white xl:px-5 xl:py-4 sm:px-5',
            formState === STATES.ERROR ? 'text-secondary-6' : 'text-gray-15',
          )}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          placeholder="Your email address..."
          disabled={formState === STATES.LOADING || formState === STATES.SUCCESS}
          onChange={onChange}
        />
        <button
          aria-label="Subscribe"
          className={clsx(
            'trans flex-shrink-0 rounded-r-full bg-center bg-no-repeat px-11 py-6 text-16 font-bold uppercase leading-none transition-colors duration-200 xl:py-4 md:px-5 md:py-3 sm:px-5 sm:py-3',
            formState === STATES.SUCCESS
              ? 'bg-secondary-2 hover:bg-secondary-2'
              : 'bg-black hover:bg-[#17225B]',
            {
              'bg-[url(/images/loader.svg)] bg-[length:40px_40px] xl:bg-[length:28px_28px]':
                formState === STATES.LOADING,
              'bg-[url(/images/check-form.svg)] bg-[length:32px_32px] xl:bg-[length:24px_24px]':
                formState === STATES.SUCCESS,
              'pointer-events-none': formState === STATES.LOADING || formState === STATES.SUCCESS,
            },
          )}
          type="submit"
        >
          <span
            className={clsx('md:hidden', {
              'opacity-0': formState === STATES.LOADING || formState === STATES.SUCCESS,
            })}
          >
            Subscribe
          </span>
          <img
            className={clsx('hidden h-6 w-6 md:block', {
              'opacity-0': formState === STATES.LOADING || formState === STATES.SUCCESS,
            })}
            src="/images/arrow-form.svg"
            alt=""
            width={24}
            height={24}
            loading="lazy"
          />
        </button>
        <ErrorMessage
          className={clsx(
            formState === STATES.ERROR
              ? 'pointer-events-auto visible opacity-100'
              : 'pointer-events-auto invisible opacity-0',
          )}
          message={errorMessage}
        />
      </div>
      <p
        aria-label="By subscribing, you agree with Bytebase's Terms of Service and Privacy Policy."
        className="mt-5 text-14 leading-snug xl:mt-3 xl:max-w-[290px] md:mt-2"
      >
        By subscribing, you agree with Bytebase&apos;s{' '}
        <Link href={Route.TERMS} className="border-b-2 border-white border-opacity-40">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href={Route.PRIVACY} className="border-b-2 border-white border-opacity-40">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
};

export default Form;
