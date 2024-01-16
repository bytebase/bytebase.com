'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/shared/button';
import Field from '@/components/shared/field';
import Link from '@/components/shared/link/link';
import { BUTTON_SUCCESS_TIMEOUT_MS, ENTERPRISE_INQUIRY, VIEW_LIVE_DEMO } from '@/lib/forms';
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
  message: string;
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
  message: yup.string().trim().required('Please tell us your interests'),
});

const ContactForm = ({ className, formId }: { className: string; formId: string }) => {
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
    const { firstname, lastname, email, company, message } = values;

    setButtonState(STATES.LOADING);
    setFormError('');

    try {
      if (formId == VIEW_LIVE_DEMO || formId == ENTERPRISE_INQUIRY) {
        const tag = formId == VIEW_LIVE_DEMO ? 'demo' : 'enterprise-inquiry';
        await fetch('/api/subscribe', {
          method: 'POST',
          body: JSON.stringify({ email, tag }),
        });
      }

      const responses = await Promise.all(
        feishuWebhookList.map((url) =>
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json, text/plain, */*',
            },
            body: JSON.stringify({
              msg_type: 'text',
              content: {
                text: `${formId} by ${firstname} ${lastname} (${email}) from ${company}\n\n${message}`,
              },
            }),
          }),
        ),
      );

      if (responses.every((response) => response.ok)) {
        if (formId == VIEW_LIVE_DEMO) {
          window.open(Route.LIVE_DEMO, '_blank');
        }

        let confirm = Route.CONFIRM_MESSAGE;
        if (formId == VIEW_LIVE_DEMO) {
          confirm = Route.CONFIRM_VIEW_LIVE_DEMO;
        } else if (formId == ENTERPRISE_INQUIRY) {
          confirm = Route.CONFIRM_INQUIRY;
        }
        setButtonState(STATES.SUCCESS);
        setTimeout(() => {
          router.push(confirm);
          setButtonState(STATES.DEFAULT);
          reset();
        }, BUTTON_SUCCESS_TIMEOUT_MS);
      } else {
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
          placeholder="I'm interested in (e.g. Database CI/CD, GitOps, Data Access Control, Data Masking)*"
          error={errors?.message?.message}
          {...register('message')}
        />
        <div className="relative col-span-full flex items-center gap-x-5 sm:flex-col sm:items-start sm:gap-y-2">
          <div className="flex w-full max-w-[260px] flex-col items-center lg:max-w-[320px] sm:max-w-full">
            <Button
              className="w-full shrink-0 p-4"
              theme="primary-filled"
              size="md"
              type="submit"
              state={buttonState}
            >
              {formId == VIEW_LIVE_DEMO ? 'View Live Demo' : 'Submit'}
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
