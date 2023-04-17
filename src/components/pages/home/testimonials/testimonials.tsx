import QuoteIcon from '@/svgs/quote.inline.svg';

const Testimonials = () => {
  return (
    <section className="bg-cite pt-[176px] pb-[234px] 2xl:pt-36 2xl:pb-[202px] lg:pt-28 lg:pb-[218px] md:pt-20 md:pb-[154px] sm:pb-[130px]">
      <div className="container">
        <figure className="mx-auto flex max-w-[1048px] flex-col items-center text-center lg:max-w-[776px] md:max-w-[590px]">
          <QuoteIcon width={50} height={40} className="w-auto lg:h-8 md:h-7 sm:h-6" />
          <blockquote>
            <p className="mt-16 text-40 font-semibold leading-tight tracking-tight 2xl:mt-14 lg:mt-12 lg:text-30 lg:leading-extra-tight lg:tracking-tighter md:mt-10 md:text-24 md:leading-tight md:tracking-normal sm:mt-6 sm:text-20">
              Bytebase helped us save $24M in OpEx. We’re also saving 50% of our time with automated
              renewal tracking and alerting across IT, Procurement, and Finance departments
            </p>
          </blockquote>
          <figcaption className="mt-8 font-semibold leading-none tracking-tight lg:mt-6 md:mt-5 sm:mt-4 sm:text-12">
            — Brian Crosson, <cite className="font-normal not-italic">HD Supply</cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
