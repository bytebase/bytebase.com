import clsx from 'clsx';

const SuccessState = () => (
  <div
    className={clsx(
      'flex h-full min-h-[400px] w-full flex-col items-center justify-center md:min-h-[446px]',
    )}
  >
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-secondary-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/check-form-green.svg" alt="" aria-hidden />
    </div>
    <h2 className="mt-8 text-center font-title text-44 leading-none lg:text-40 md:mt-6 md:text-36">
      Your message has been sent
    </h2>
    <p className="mt-3 text-center text-16 2xs:max-w-[60%]">
      We will contact you in 2 business days!
    </p>
  </div>
);

export default SuccessState;
