'use client';

import Image from 'next/image';
import NextLink from 'next/link';

import { useEffect, useRef, useState } from 'react';

import useIntersectionObserver from '@/hooks/use-intersection-observer';
import useLocalStorage from '@/hooks/use-local-storage';
import useSegment from '@/hooks/use-segment';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import clsx from 'clsx';

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
  <div className={clsx('absolute top-full left-0 pt-3 transition-opacity duration-150', className)}>
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
        <InfoIcon className="inline-block h-auto w-2.5 rotate-180" />
      </span>
      <span>{message}</span>
    </div>
  </div>
);

const SubscriptionForm = ({ className }: { className?: string }) => {
  const containerRef = useRef(null);

  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState(STATES.DEFAULT);
  const [submittedEmail, setSubmittedEmail] = useLocalStorage('submittedEmailNewsletterForm', []);
  const [errorMessage, setErrorMessage] = useState('');
  const { analytics } = useSegment();

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    once: true,
    rootMargin: '500px 0px 0px 0px',
  });

  const {
    rive,
    RiveComponent,
    setContainerRef: setRiveRef,
  } = useRive({
    src: '/rive/rocket.riv',
    autoplay: false,
    stateMachines: 'SM',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      rive?.resizeDrawingSurfaceToCanvas();
    },
  });

  const input = useStateMachineInput(rive, 'SM', 'Type', false);

  useEffect(() => {
    if (rive && isIntersecting) {
      rive.play();
    }
  }, [rive, isIntersecting]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    input?.fire();
    setFormState(STATES.DEFAULT);
    setEmail(event.currentTarget.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email');
      setFormState(STATES.ERROR);
    } else if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Please enter a valid email');
      setFormState(STATES.ERROR);
    } else if (submittedEmail.includes(email)) {
      setErrorMessage('You have already submitted this email');
      setFormState(STATES.ERROR);
    } else {
      setSubmittedEmail([...submittedEmail, email]);
      setFormState(STATES.LOADING);
      setErrorMessage('');

      try {
        if (analytics) {
          // Manually updating user subscription status to re-subscribe
          // Doc: https://segment.com/docs/connections/destinations/catalog/mailchimp/#manually-updating-user-subscription-status
          analytics.identify(
            email,
            {
              category: 'subscribe-newsletter',
            },
            {
              integrations: {
                MailChimp: {
                  subscriptionStatus: 'subscribed',
                },
              },
            },
          );

          setTimeout(() => {
            setFormState(STATES.SUCCESS);
            setEmail('Thank you for subscribing!');

            setTimeout(() => {
              setFormState(STATES.DEFAULT);
              setEmail('');
            }, 2000);
          }, 2200);
        }
      } catch (error: any) {
        setFormState(STATES.ERROR);
        setErrorMessage(error?.message ?? error);
      }
    }
  };

  return (
    <section
      className={clsx(
        'mt-[124px] bg-primary-1 text-white 3xl:mt-[110px] xl:mt-[97px] md:mt-[54px] sm:mt-4.5',
        className,
      )}
      ref={containerRef}
    >
      <div className="container gap-x-grid grid grid-cols-12 overflow-x-clip sm:flex sm:flex-col">
        <div className="relative col-span-5 col-start-2 -ml-10 xl:col-span-6 xl:col-start-1 xl:ml-0">
          <div className="absolute -top-14 -bottom-10 w-full xl:-top-6 xl:-bottom-8 md:-top-4.5 md:-bottom-4.5 sm:hidden">
            <div
              className="aspect-square w-full max-w-[520px] 3xl:-ml-2 3xl:max-w-[510px] xl:ml-0 xl:max-w-[410px] md:max-w-[370px] sm:max-w-full"
              ref={setRiveRef}
            >
              {isIntersecting ? <RiveComponent /> : null}
            </div>
          </div>
          <Image
            className="hidden sm:absolute sm:-right-[86px] sm:-top-[84px] sm:block"
            src="/images/page/main/rocket.png"
            width={214}
            height={200}
            alt=""
          />
        </div>
        <div className="col-span-5 col-start-7 xl:col-span-6 xl:col-start-7 md:col-span-6 md:col-start-7  sm:max-w-[80%] 2xs:max-w-none">
          <form
            className="-ml-10 pt-16 pb-[75px] 3xl:ml-0 xl:-ml-6 xl:pb-[60px] xl:pt-[51px] md:ml-0 md:pt-10 md:pb-11 sm:pt-9 sm:pb-11"
            noValidate
            onSubmit={handleSubmit}
          >
            <h3 className="font-title text-88 font-semibold leading-none xl:text-68 xl:leading-104 md:text-56 md:leading-none sm:text-48 sm:leading-95">
              Subscribe to&nbsp;Newsletter
            </h3>
            <div className="relative mt-9 flex h-16 xl:mt-6 xl:h-12 md:mt-4 sm:mt-5">
              <input
                className={clsx(
                  'remove-autocomplete-styles flex-grow rounded-l-full py-6 px-7 text-16 leading-none tracking-tight placeholder-gray-40 outline-none transition-colors duration-200 disabled:bg-white xl:py-4 xl:px-5 sm:px-5',
                  formState === STATES.ERROR ? 'text-secondary-6' : 'text-gray-15',
                )}
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                placeholder="Your email address..."
                disabled={formState === STATES.LOADING || formState === STATES.SUCCESS}
                onChange={handleInputChange}
              />
              <button
                className={clsx(
                  'trans flex-shrink-0 rounded-r-full bg-center bg-no-repeat py-6 px-11 text-16 font-bold uppercase leading-none transition-colors duration-200 xl:py-4 md:py-3 md:px-5 sm:px-5 sm:py-3',
                  formState === STATES.SUCCESS
                    ? 'bg-secondary-2 hover:bg-secondary-2'
                    : 'bg-black hover:bg-[#17225B]',
                  {
                    'bg-[url(/images/loader.svg)] bg-[length:40px_40px] xl:bg-[length:28px_28px]':
                      formState === STATES.LOADING,
                    'bg-[url(/images/check-form.svg)] bg-[length:32px_32px] xl:bg-[length:24px_24px]':
                      formState === STATES.SUCCESS,
                    'pointer-events-none':
                      formState === STATES.LOADING || formState === STATES.SUCCESS,
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
            <p className="mt-5 text-14 leading-snug xl:mt-3 xl:max-w-[290px] md:mt-2">
              By subscribing, you agree with Revue&apos;s{' '}
              <NextLink href={Route.TERMS} className="border-b-2 border-white border-opacity-40">
                Terms of Service
              </NextLink>{' '}
              and{' '}
              <NextLink href={Route.PRIVACY} className="border-b-2 border-white border-opacity-40">
                Privacy Policy
              </NextLink>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionForm;
