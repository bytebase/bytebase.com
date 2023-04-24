import QuoteIcon from '@/svgs/quote.inline.svg';

const Testimonials = () => {
  return (
    <section className="bg-radial-blue pt-[176px] pb-[233px] 3xl:pt-36 3xl:pb-[200px] xl:pt-28 xl:pb-[218px] md:pt-20 md:pb-[154px] sm:pb-[130px]">
      <div className="container">
        <figure className="mx-auto flex max-w-[1048px] flex-col items-center text-center 3xl:max-w-[776px] md:max-w-[590px]">
          <QuoteIcon width={50} height={40} className="w-auto 3xl:h-8 md:h-7 sm:h-6" />
          <blockquote>
            <p className="mt-[68px] text-40 font-semibold leading-tight tracking-tight 3xl:mt-[60px] 3xl:text-30 3xl:leading-extra-tight xl:mt-[52px] lg:tracking-tighter md:mt-[42px] md:text-24 md:leading-tight sm:mt-6 sm:text-20">
              Bytebase helped us save $24M in OpEx. We’re also saving 50% of our time with automated
              renewal tracking and alerting across IT, Procurement, and Finance departments
            </p>
          </blockquote>
          <figcaption className="mt-7 font-semibold leading-none tracking-tight 3xl:mt-6 xl:mt-5 md:mt-4.5 sm:text-12">
            — Brian Crosson, <cite className="font-normal not-italic">HD Supply</cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
