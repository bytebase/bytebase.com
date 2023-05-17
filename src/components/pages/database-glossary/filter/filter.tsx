type ActiveFilters = string[];

type FilterProps = {
  className: string;
  fieldsList: [string, number][];
  activeFilters: ActiveFilters;
  toggleFilter: (filter: string) => void;
};

const Filter = ({ className, fieldsList, activeFilters, toggleFilter }: FilterProps) => {
  if (fieldsList?.length === 0) return null;

  return (
    <form className={className}>
      <div className="sticky top-10 ml-[25px] border-l border-gray-90 pl-5 2xl:ml-0">
        <fieldset>
          <legend className="mt-10 text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
            Category
          </legend>
          <ul className="mt-5 flex flex-col gap-y-4">
            {fieldsList.map((filter) => {
              const [name, count] = filter;
              const key: string = name.toLocaleLowerCase() + '-' + count;

              return (
                <li className="flex items-center gap-x-2" key={key}>
                  <input
                    className="h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-30 bg-[50%_30%] bg-no-repeat transition-colors duration-100 checked:border-primary-1 checked:bg-primary-1 checked:bg-[url('/images/check-checkbox.svg')]"
                    type="checkbox"
                    name={key}
                    checked={activeFilters.includes(name)}
                    id={key}
                    value={name}
                    onChange={() => toggleFilter(name)}
                  />
                  <label
                    className="flex cursor-pointer items-center gap-x-2 font-medium text-gray-30"
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
      </div>
    </form>
  );
};

export default Filter;
