import Logos from '@/components/pages/contact/logos';
import Button from '@/components/shared/button';
import Route from '@/lib/route';

const EnterpriseInquiry = () => {
  return (
    <section className="container enterprise-inquiry mt-20 lg:mt-14 md:mt-10 sm:mt-8">
      <div className="flex items-center justify-between border-t border-gray-90 pt-16 lg:pt-8 md:pt-10 sm:pt-8">
        <div className="container gap-x-grid relative grid grid-cols-12 sm:grid-cols-4">
          <div className="col-span-5 lg:col-span-8 sm:col-span-full">
            <h2 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-18">
              Talk to us about how Bytebase can help your team with database management.
            </p>
            <Button href={Route.CONTACTS} theme="primary-filled" size="md" className="mt-8">
              Contact Us
            </Button>
          </div>
          <Logos />
        </div>
      </div>
    </section>
  );
};

export default EnterpriseInquiry;
