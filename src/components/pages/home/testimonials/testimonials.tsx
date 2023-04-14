const Testimonials = () => {
  return (
    <section className="pt-[176px] 2xl:pt-36 lg:pt-28 md:pt-20 pb-[234px] 2xl:pb-[202px] lg:pb-[218px] md:pb-[154px] sm:pb-[130px] bg-cite">
      <div className="container">
        <figure className="flex flex-col items-center mx-auto max-w-[1048px] lg:max-w-[776px] md:max-w-[590px] text-center">
          <img src="/images/quote.svg" alt="" className="h-10 lg:h-8 md:h-7 sm:h-6" />
          <blockquote>
            <p className="mt-16 2xl:mt-14 lg:mt-12 md:mt-10 sm:mt-6 text-40 lg:text-30 md:text-24 sm:text-20 leading-tight lg:leading-extra-tight md:leading-tight tracking-tight lg:tracking-tighter md:tracking-normal font-semibold">
              Bytebase helped us save $24M in OpEx. We’re also saving 50% of our time with automated
              renewal tracking and alerting across IT, Procurement, and Finance departments
            </p>
          </blockquote>
          <figcaption className="mt-8 lg:mt-6 md:mt-5 sm:mt-4 sm:text-12 font-semibold tracking-tight leading-none">
            — Brian Crosson, <cite className="font-normal not-italic">HD Supply</cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
