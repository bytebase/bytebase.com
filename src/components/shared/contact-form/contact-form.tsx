'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/shared/button';
import Field from '@/components/shared/field';
import Link from '@/components/shared/link/link';
import { BUTTON_SUCCESS_TIMEOUT_MS } from '@/lib/forms';
import { STATES } from '@/lib/states';
import Route from '@/lib/route';

interface ContactFormProps {
  className?: string;
}

interface ValueType {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  message: string;
}

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

const ContactForm: FC<ContactFormProps> = ({ className }) => {
  const [buttonState, setButtonState] = useState(STATES.DEFAULT);
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

    try {
      const response = await fetch('/api/submit-hubspot-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          formId: '',
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
        }),
      });
      if (response.ok) {
        setButtonState(STATES.SUCCESS);
        setTimeout(() => {
          setButtonState(STATES.DEFAULT);
          reset();
        }, BUTTON_SUCCESS_TIMEOUT_MS);
      } else {
        setButtonState(STATES.DEFAULT);
        setFormError('Something went wrong. Please reload the page and try again.');
      }
    } catch (error: any) {
      setButtonState(STATES.DEFAULT);
      setFormError(error?.message ?? error.toString());
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
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
      <div className="relative col-span-full flex items-center gap-x-5 md:flex-col-reverse md:items-start md:gap-x-10">
        <Button
          className="w-60 shrink-0 p-4 lg:w-[212px] md:w-full"
          theme="primary-filled"
          size="md"
          type="submit"
          state={buttonState}
        >
          Submit
        </Button>
        <p className="text-14 text-gray-50">
          By submiting, you agree with Bytebase&apos;s{' '}
          <Link className="font-semibold" theme="underline" size="xs" href={Route.PRIVACY}>
            Terms of Service{' '}
          </Link>
          and{' '}
          <Link className="font-semibold" theme="underline" size="xs" href={Route.TERMS}>
            Privacy Policy{' '}
          </Link>
        </p>

        {formError && (
          <span className="text-error xl:text-10 sm:text-10 absolute top-[calc(100%+4px)] text-12 leading-none lg:text-12">
            {formError}
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
