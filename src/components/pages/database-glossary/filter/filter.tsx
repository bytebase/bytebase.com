import BackToTopIcon from '@/svgs/back-to-top.inline.svg';

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

type ActiveFilters = string[];

export type FilterProps = {
  title: string;
  className: string;
  fieldsList: [string, number][];
  activeFilters: ActiveFilters;
  toggleFilter: (filter: string) => void;
};

const Filter = ({ title, className, fieldsList, activeFilters, toggleFilter }: FilterProps) => {
  if (fieldsList?.length === 0) return null;

  return (
    <form className={className}>
      <div className="sticky top-[144px] ml-[25px] 2xl:ml-0">
        <fieldset className="-mt-3 border-l border-gray-90 pl-5">
          <legend className="pt-3 text-14 font-bold uppercase leading-none -tracking-tight text-gray-15">
            {title}
          </legend>
          <ul className="mt-5 flex flex-col gap-y-4">
            {fieldsList.map((filter) => {
              const [name, count] = filter;
              const key: string = name.toLocaleLowerCase() + '-' + count;

              return (
                <li className="group flex items-center" key={key}>
                  <input
                    className="h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-30 bg-[50%_40%] bg-no-repeat transition-colors duration-100 checked:border-primary-1 checked:bg-primary-1 checked:bg-[url('/images/check-checkbox.svg')]"
                    type="checkbox"
                    name={`${title.toLocaleLowerCase()}[]`}
                    checked={activeFilters.includes(name)}
                    id={key}
                    value={name}
                    onChange={() => toggleFilter(name)}
                  />
                  <label
                    className="flex cursor-pointer items-center gap-x-2 pl-2 font-medium text-gray-30 transition-colors duration-200 group-hover:text-gray-60"
                    htmlFor={key}
                  >
                    {name}
                    {count > 0 && (
                      <span className="flex min-w-[20px] items-center justify-center rounded-full bg-gray-94 px-[5px] pt-1 pb-0.5 text-14 font-medium leading-none text-gray-30">
                        {count}
                      </span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <button
          className="mt-8 flex w-full items-center gap-x-2 border-t border-gray-90 pt-8 font-medium leading-none text-gray-30 transition-colors duration-200 hover:text-gray-60"
          type="button"
          onClick={backToTop}
        >
          <BackToTopIcon className="h-[18px] w-[18px]" />
          <span>Back to top</span>
        </button>
      </div>
    </form>
  );
};

export default Filter;
