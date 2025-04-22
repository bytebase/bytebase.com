import LogoList from '@/components/shared/logo-list';
import { Solution } from '@/lib/solutions-data';
import Pill from '@/components/shared/pill';
import Link from '@/components/shared/link';
import Features from '@/components/shared/features';
import QuoteIcon from '@/svgs/quote.inline.svg';

type LandingProps = {
  solution: Solution;
};

const Landing = ({ solution }: LandingProps) => {
  return (
    <section className="pb-20 pt-[64px] lg:pb-16 md:pb-[54px] md:pt-24 sm:pb-11">
      <div className="container max-w-[1396px] 2xl:max-w-full">
        <Pill theme="secondary-1" className="col-span-full">
          <h1>{solution.title}</h1>
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
        <div className="">
          <LogoList {...solution.logoList} list={solution.logoList.list} />
        </div>
        {solution.quote && (
          <div className="mt-12 flex flex-col items-center border-2 bg-tones-purple-light p-8 text-24 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] group-hover:shadow-[inset_6px_6px_0_#fff,0_8px_20px_rgba(172,178,210,0.7)] 2xl:mt-10 xl:mt-8 sm:mt-6 sm:p-4 sm:text-18">
            <QuoteIcon className="mb-2 h-6 sm:h-3" />
            <p className="ml-2">{solution.quote}</p>
            <p className="mt-4 italic">{solution.author}</p>
          </div>
        )}

        {solution.caseStudyList.length > 0 && (
          <div className="mt-20 2xl:mt-10 xl:mt-8 sm:mt-6">
            <h2 className="text-44 font-bold leading-extra-tight xl:text-36 md:text-30">
              Customer Stories
            </h2>
            <div className="mt-11 xl:mt-10 md:mt-9">
              {solution.caseStudyList.map((post, index) => (
                <li key={post.slug} className="mt-4 text-24 hover:underline xl:text-20 md:text-16">
                  <Link href={`/blog/${post.slug}`}> {post.title} </Link>
                </li>
              ))}
            </div>
          </div>
        )}
        <Features className="mt-20 2xl:mt-10 xl:mt-8 sm:mt-6" />
      </div>
    </section>
  );
};

export default Landing;
