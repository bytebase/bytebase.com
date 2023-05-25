'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/shared/button';
import Field from '@/components/shared/field';
import Link from '@/components/shared/link/link';
import { BUTTON_SUCCESS_TIMEOUT_MS } from '@/lib/forms';
import { STATES } from '@/lib/states';
import Route from '@/lib/route';
import SuccessState from './success-state';

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
});

const ContactForm = ({ className, formId }: { className: string; formId: number }) => {
  const [buttonState, setButtonState] = useState(STATES.DEFAULT);
  const [formState, setFormState] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValueType>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (values: ValueType) => {
    const { firstname, lastname, email, company, message } = values;
    setButtonState(STATES.LOADING);

    const body = JSON.stringify({
      formId: formId,
      values: {
        fields: [
          {
            objectTypeId: '0-1',
            name: 'firstname',
            value: firstname,
          },
          {
            objectTypeId: '0-1',
            name: 'lastname',
            value: lastname,
          },
          {
            objectTypeId: '0-1',
            name: 'email',
            value: email,
          },
          {
            objectTypeId: '0-1',
            name: 'company',
            value: company,
          },
          {
            objectTypeId: '0-1',
            name: 'message',
            value: message,
          },
        ],
      },
    });

    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: body,
      });

      if (response.ok) {
        setButtonState(STATES.SUCCESS);
        setTimeout(() => {
          setButtonState(STATES.DEFAULT);
          setFormState(true);
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
      {formState && <SuccessState />}
      {!formState && (
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
            placeholder="Additional information"
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
                Submit
              </Button>
              {formError && (
                <span className="mt-1.5 text-12 leading-none text-secondary-6 sm:text-center 2xs:max-w-[144px]">
                  {formError}
                </span>
              )}
            </div>
            <p className="w-full max-w-[300px] text-14 text-gray-50 lg:max-w-full">
              By submiting, you agree with Bytebase&apos;s{' '}
              <Link className="font-semibold" theme="underline" size="xs" href={Route.PRIVACY}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link className="font-semibold" theme="underline" size="xs" href={Route.TERMS}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
