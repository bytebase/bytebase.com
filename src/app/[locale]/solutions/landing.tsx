import LogoList from '@/components/shared/logo-list';
import { Solution } from '@/lib/solutions-data';

type LandingProps = {
  solution: Solution;
};

const Landing = ({ solution }: LandingProps) => {
  return (
    <section className="pb-20 pt-[64px] lg:pb-16 md:pb-[54px] md:pt-24 sm:pb-11">
      <div className="container max-w-[1396px] 2xl:max-w-full">
        <LogoList {...solution.logoList} title={`Bytebase for ${solution.logoList.title}`} />
      </div>
    </section>
  );
};

export default Landing;
