'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/shared/button';
import Field from '@/components/shared/field';
import Link from '@/components/shared/link/link';
import {
  BUTTON_SUCCESS_TIMEOUT_MS,
  ENTERPRISE_INQUIRY,
  VIEW_LIVE_DEMO,
  WHITE_PAPER,
} from '@/lib/forms';
import { STATES } from '@/lib/states';
import Route from '@/lib/route';
import { useRouter } from 'next/navigation';

const feishuWebhookList = [
  'https://open.feishu.cn/open-apis/bot/v2/hook/5a2a1fe6-2ed8-4c0b-8621-0be9ebd188ec',
];

type ValueType = {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  message?: string;
  website?: string; // Honeypot field
};

const validationSchema = yup.object().shape({
  firstname: yup.string().trim().required('First name is a required field'),
  lastname: yup.string().trim().required('Last name is a required field'),
  email: yup
    .string()
    .trim()
    .email('Please provide a valid email')
    .required('Work email is a required field'),
  company: yup.string().trim().required('Company name is a required field'),
  message: yup.string().trim().optional(),
  website: yup.string().trim().optional(), // Honeypot field - should be empty
});

const getButtonTitle = (formId: string) => {
  switch (formId) {
    case VIEW_LIVE_DEMO:
      return 'View Live Demo';
    case WHITE_PAPER:
      return 'Download White Paper';
    case ENTERPRISE_INQUIRY:
      return 'Submit Inquiry';
    default:
      return 'Submit';
  }
};

// Detects spam-like patterns in text (random mixed-case strings)
const isLikelySpam = (text: string): boolean => {
  if (!text) return false;

  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length === 0) return false;

  // Allow all uppercase (like "IBM", "NASA", "JOHN SMITH")
  if (letters === letters.toUpperCase()) return false;

  // Allow all lowercase (like "john smith")
  if (letters === letters.toLowerCase()) return false;

  // Count ANY case transitions (uppercase to lowercase OR lowercase to uppercase)
  const lowToHigh = (text.match(/[a-z][A-Z]/g) || []).length;
  const highToLow = (text.match(/[A-Z][a-z]/g) || []).length;
  const totalTransitions = lowToHigh + highToLow;

  // Count uppercase letters
  const uppercaseCount = (letters.match(/[A-Z]/g) || []).length;
  const uppercaseRatio = uppercaseCount / letters.length;

  // Spam pattern 1: 4+ total case transitions
  // Examples: CuxFbsjOMshzd (6), lxBMWgpkbCX (4), wUwqIVjOmhQbJi (10)
  // Legitimate: Christopher (2), McDonald (2), iPhone (2), MacBook (2)
  if (totalTransitions >= 4) return true;

  // Spam pattern 2: Uppercase ratio in suspicious range (30-95%)
  // Too random to be legitimate mixed case (which is typically <30%)
  // Not all caps (which would be 100%)
  // Examples: lxBMWgpkbCX (42%), cVBaaQcPphWeXH (64%), CuxFbsjOMshzd (38%)
  // Legitimate: McDonald (25%), iPhone (33% but only 2 transitions), John (25%)
  if (uppercaseRatio > 0.3 && uppercaseRatio < 0.95) return true;

  return false;
};

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

const detectSpamSubmission = (values: ValueType): boolean => {
  const { firstname, lastname, company, email, message } = values;

  let spamScore = 0;

  // High confidence spam indicators (3 points each)
  if (isLikelySpam(firstname)) spamScore += 3;
  if (isLikelySpam(lastname)) spamScore += 3;
  if (isLikelySpam(company)) spamScore += 3;
  if (company.trim().length <= 2) spamScore += 3;

  // Medium confidence indicators (2 points each)
  const freeEmailDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    't-online.de',
  ];
  const emailDomain = email.toLowerCase().split('@')[1] || '';
  if (!emailDomain) {
    // Invalid email format (missing domain) - likely spam
    spamScore += 2;
  } else if (freeEmailDomains.includes(emailDomain)) {
    spamScore += 2;
  }

  // Low confidence indicators (1 point each)
  const messageWords = (message || '')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  if (messageWords.length < 5) spamScore += 1;

  // Flag as spam if score >= 5
  // Examples:
  // - Random case name (3) + free email (2) = spam
  // - Random case name (3) + short company (3) = spam
  // - Free email (2) + short message (1) + short company (3) = spam
  // - Free email (2) + short company (3) = not spam (legitimate small companies)
  // - Free email (2) + short message (1) = not spam
  return spamScore >= 5;
};

const ContactForm = ({
  className,
  formId,
  redirectURL,
}: {
  className: string;
  formId: string;
  redirectURL: string;
  comment?: string;
}) => {
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
    const { firstname, lastname, email, company, message, website } = values;

    // Honeypot check - if filled, it's a bot
    if (website && website.trim().length > 0) {
      // Silently reject the submission (don't show error to bot)
      setButtonState(STATES.SUCCESS);
      setTimeout(() => {
        setButtonState(STATES.DEFAULT);
        reset();
      }, BUTTON_SUCCESS_TIMEOUT_MS);
      return;
    }

    setButtonState(STATES.LOADING);
    setFormError('');

    const isSpam = detectSpamSubmission(values);
    const spamPrefix = isSpam ? '🙄 ' : '';

    try {
      if (
        formId == VIEW_LIVE_DEMO ||
        formId == ENTERPRISE_INQUIRY ||
        formId.startsWith(WHITE_PAPER)
      ) {
        let tag = '';
        if (formId == VIEW_LIVE_DEMO) {
          tag = 'demo';
        } else if (formId == ENTERPRISE_INQUIRY) {
          tag = 'enterprise-inquiry';
        } else if (formId.startsWith(WHITE_PAPER)) {
          tag = 'white-paper';
        }
        await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify({ email, tag }),
        });
      }

      // Send to Feishu (fire-and-forget) and Slack (must succeed) in parallel with retries
      const slackPromise = fetchWithRetry('/api/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          firstname,
          lastname,
          email,
          company,
          message,
          isSpam,
        }),
      });

      // Feishu: fire-and-forget, ignore failures
      feishuWebhookList.forEach((url) => {
        void fetchWithRetry(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
          },
          body: JSON.stringify({
            msg_type: 'text',
            content: {
              text: `${spamPrefix}${formId} by ${firstname} ${lastname} (${email}) from ${company}\n\n${message}`,
            },
          }),
        }).catch(() => {
          // Ignore Feishu failures
        });
      });

      // Wait for Slack to complete (throws on failure after retries)
      try {
        const slackResult = await slackPromise;
        if (!slackResult.ok) {
          throw new Error('Slack webhook failed');
        }

        // Success - redirect user
        if (formId == VIEW_LIVE_DEMO) {
          window.open(Route.LIVE_DEMO, '_blank');
        }

        setButtonState(STATES.SUCCESS);
        setTimeout(() => {
          router.push(redirectURL);
          setButtonState(STATES.DEFAULT);
          reset();
        }, BUTTON_SUCCESS_TIMEOUT_MS);
      } catch (slackError) {
        // Slack failed after retries - show error
        setButtonState(STATES.ERROR);
        setTimeout(() => {
          setButtonState(STATES.DEFAULT);
        }, BUTTON_SUCCESS_TIMEOUT_MS);
        setFormError('Something went wrong. Please try again later.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setButtonState(STATES.DEFAULT);
      setFormError(error?.message ?? error.toString());
    }
  };

  return (
    <div className={className}>
      <form
        className="grid grid-cols-2 gap-5 md:grid-cols-1 sm:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          type="text"
          placeholder="First name*"
          error={errors?.firstname?.message}
          {...register('firstname')}
        />
        <Field
          type="text"
          placeholder="Last name*"
          error={errors?.lastname?.message}
          {...register('lastname')}
        />
        <Field
          className="col-span-full"
          type="email"
          placeholder="Work email*"
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
          inputClassName="p-4 pt-3 md:pt-2"
          tag="textarea"
          placeholder="I'm interested in (e.g. Database CI/CD, GitOps, Data Access Control, Dynamic Data Masking)"
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
            name="website"
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
              {getButtonTitle(formId)}
            </Button>
            {formError && (
              <span className="mt-1.5 text-12 leading-none text-secondary-6 sm:text-center 2xs:max-w-[144px]">
                {formError}
              </span>
            )}
          </div>
          <p className="w-full max-w-[300px] text-14 text-gray-50 lg:max-w-full">
            By submiting, you agree with Bytebase&apos;s{' '}
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
