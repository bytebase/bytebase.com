type Item = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

const Logos = ({ items }: { items: Item[] }) => {
  return (
    <div className="col-span-5 mt-9 border-t border-gray-90 pt-9 lg:col-span-8 lg:mt-0 lg:border-none lg:pt-0 sm:col-span-full">
      <p className="text-18 leading-extra-tight text-gray-40">
        Trusted by fast-growing companies worldwide
      </p>
      <ul className="place-items-left mt-7 grid auto-rows-fr grid-cols-[repeat(4,auto)] items-center gap-x-9 gap-y-5 lg:gap-x-8 sm:gap-x-6 xs:mt-6 xs:flex xs:flex-wrap">
        {items.map((logo, index) => (
          <li key={index} className="w-full xs:w-fit 2xs:w-[26%]">
            <img {...logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logos;
