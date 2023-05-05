import { en, getRuleLocalizationKey } from '@/utils/sql-review';

import Link from '@/components/shared/link';

import { GuidelineTemplate } from '@/types/sql-review';

const Sidebar = ({ categoryList }: { categoryList: GuidelineTemplate[] }) => (
  <aside className="col-span-3">
    <h3 className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
      Rules
    </h3>
    <ul className="mt-10 flex flex-col gap-y-11 border-l border-gray-90 pl-5">
      {categoryList.map(({ id, ruleList }) => {
        const lowerCaseId: string = id.toLocaleLowerCase();

        return (
          <li key={id}>
            <h4 className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
              {en.category[lowerCaseId]}
            </h4>
            <ul className="mt-4">
              {ruleList.map(({ type }) => {
                const key: string = getRuleLocalizationKey(type);

                return (
                  <li className="group" key={type}>
                    <Link
                      className="py-[5px] text-14 leading-tight tracking-tight text-gray-40 group-first:pt-0 group-last:pb-0"
                      href={`#${key}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(key);
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }
                      }}
                    >
                      {en.rule[key].title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  </aside>
);

export default Sidebar;
