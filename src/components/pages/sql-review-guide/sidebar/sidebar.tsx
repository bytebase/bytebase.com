import { en, getRuleLocalizationKey } from '@/utils/sql-review';

import { RuleCategory } from '@/types/sql-review';

const Sidebar = ({
  className,
  categoryList,
}: {
  className: string;
  categoryList: RuleCategory[];
}) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const id = e.currentTarget.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // Changing hash without default jumps to anchor
    if (history.pushState) {
      history.pushState(null, '', `#${id}`);
    } else {
      // Old browser support
      window.location.hash = `#${id}`;
    }
  };

  return (
    <aside className={className}>
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
              <ul className="mt-4 flex flex-col">
                {ruleList.map(({ type }) => {
                  const key: string = getRuleLocalizationKey(type);

                  return (
                    <li className="group flex leading-tight" key={type}>
                      <a
                        className="py-[5px] text-14 leading-tight tracking-tight text-gray-40 hover:text-primary-1 group-first:pt-0 group-last:pb-0"
                        href={`#${key}`}
                        onClick={onClick}
                      >
                        {en.rule[key].title}
                      </a>
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
};

export default Sidebar;
