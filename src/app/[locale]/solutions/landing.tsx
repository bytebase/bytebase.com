import LogoList from '@/components/shared/logo-list';
import { Solution } from '@/lib/solutions-data';
import Pill from '@/components/shared/pill';
import RelatedPosts from '@/components/pages/blog/related-posts';
import Features from '@/components/shared/features';

type LandingProps = {
  solution: Solution;
};

const Landing = ({ solution }: LandingProps) => {
  return (
    <section className="pb-20 pt-[64px] lg:pb-16 md:pb-[54px] md:pt-24 sm:pb-11">
      <div className="container max-w-[1396px] 2xl:max-w-full">
        <Pill theme="secondary-1" className="col-span-full">
          {solution.title}
        </Pill>
        <ul>
          {solution.values.map((value, index) => (
            <li
              key={index}
              className="col-span-full mt-3.5 text-left font-title text-88 font-semibold leading-none xl:text-68 xl:leading-104 md:mt-2 md:text-54 sm:text-48 sm:leading-95"
            >
              {value}
            </li>
          ))}
        </ul>
        <div className="mt-10 2xl:mt-5 xl:mt-4 sm:mt-3">
          <LogoList {...solution.logoList} list={solution.logoList.list} />
        </div>
        <Features className="mt-20 2xl:mt-10 xl:mt-8 sm:mt-6" />
        <RelatedPosts posts={solution.posts} module="LANDING" />
      </div>
    </section>
  );
};

export default Landing;
