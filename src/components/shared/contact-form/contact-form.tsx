'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '@/components/shared/button';
import Field from '@/components/shared/field';
import Link from '@/components/shared/link/link';

import Route from '@/lib/route';
import { STATES } from '@/lib/states';

type ValueType = {
  name: string;
  email: string;
  company: string;
  databaseUsers: string;
  message: string;
  website?: string; // Honeypot field
};

const DATABASE_USERS_OPTIONS = ['1-10', '11-50', '51-200', '200+'];

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  email: yup
    .string()
    .trim()
    .email('Please provide a valid email')
    .required('Work email is a required field'),
  company: yup.string().trim().required('Company name is a required field'),
  databaseUsers: yup.string().trim().required('Please select the number of database users'),
  message: yup.string().trim().required('Please tell us how we can help'),
  website: yup.string().trim().optional(),
});

// Retry a fetch request up to 3 times with exponential backoff
const fetchWithRetry = async (url: string, options: RequestInit): Promise<Response> => {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      // If not ok, treat as retriable error
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;
    }

    // Wait before retrying (exponential backoff: 500ms, 1000ms, 2000ms)
    if (attempt < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500 * Math.pow(2, attempt)));
    }
  }

  // All retries failed, throw the last error
  throw lastError || new Error('Request failed');
};

const ContactForm = ({ className, redirectURL }: { className: string; redirectURL: string }) => {
  const [buttonState, setButtonState] = useState(STATES.DEFAULT);
  const [formError, setFormError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValueType>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values: ValueType) => {
    const { name, email, company, databaseUsers, message, website } = values;

    // Honeypot check - if filled, it's a bot
    if (website?.trim()) {
      // Silently reject the submission (don't show error to bot)
      setButtonState(STATES.SUCCESS);
      setTimeout(() => {
        setButtonState(STATES.DEFAULT);
        reset();
      }, 1000);
      return;
    }

    setButtonState(STATES.LOADING);
    setFormError('');

    try {
      // Fire-and-forget: subscribe failure should not block Slack notification
      void fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: 'enterprise-inquiry' }),
      }).catch(() => undefined);

      // Google Sheets is the source of truth — must succeed
      await fetchWithRetry('/api/google-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, databaseUsers, message }),
      });

      // Fire-and-forget: Slack notification failure should not block submission
      void fetchWithRetry('/api/slack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, databaseUsers, message }),
      }).catch(() => undefined);

      setButtonState(STATES.SUCCESS);
      setTimeout(() => {
        router.push(redirectURL);
        setButtonState(STATES.DEFAULT);
        reset();
      }, 1000);
    } catch {
      setButtonState(STATES.ERROR);
      setTimeout(() => {
        setButtonState(STATES.DEFAULT);
      }, 1000);
      setFormError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={className}>
      <form
        className="grid grid-cols-2 gap-5 md:grid-cols-1 sm:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          className="col-span-full"
          type="text"
          placeholder="Full name*"
          error={errors?.name?.message}
          {...register('name')}
        />
        <Field
          className="col-span-full"
          type="email"
          placeholder="name@company.com*"
          error={errors?.email?.message}
          {...register('email')}
        />
        <Field
          className="col-span-full"
          type="text"
          placeholder="Company name*"
          error={errors?.company?.message}
          {...register('company')}
        />
        <Field
          className="col-span-full"
          tag="select"
          error={errors?.databaseUsers?.message}
          defaultValue=""
          {...register('databaseUsers')}
        >
          <option value="" disabled>
            Database Users*
          </option>
          {DATABASE_USERS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
        <Field
          className="col-span-full"
          inputClassName="p-4 pt-3 md:pt-2"
          tag="textarea"
          placeholder="e.g. database CI/CD, data access control, dynamic data masking, just-in-time database access, one-off data change"
          error={errors?.message?.message}
          {...register('message')}
        />
        {/* Honeypot field - hidden from users but visible to bots */}
        <div className="pointer-events-none absolute left-[-9999px] opacity-0" aria-hidden="true">
          <label htmlFor="website-field" tabIndex={-1}>
            Website
          </label>
          <Field
            id="website-field"
            type="text"
            placeholder="https://yourcompany.com"
            autoComplete="off"
            tabIndex={-1}
            {...register('website')}
          />
        </div>
        <div className="relative col-span-full flex items-center gap-x-5 sm:flex-col sm:items-start sm:gap-y-2">
          <div className="flex w-full max-w-[260px] flex-col items-center lg:max-w-[320px] sm:max-w-full">
            <Button
              className="w-full shrink-0 p-4"
              theme="primary-filled"
              size="md"
              type="submit"
              state={buttonState}
            >
              Contact Us
            </Button>
            {formError && (
              <span className="mt-1.5 text-12 leading-none text-secondary-6 sm:text-center 2xs:max-w-[144px]">
                {formError}
              </span>
            )}
          </div>
          <p className="w-full max-w-[300px] text-14 text-gray-50 lg:max-w-full">
            By submitting, you agree with Bytebase&apos;s{' '}
            <Link className="font-semibold" theme="underline" size="xs" href={Route.TERMS}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className="font-semibold" theme="underline" size="xs" href={Route.PRIVACY}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
