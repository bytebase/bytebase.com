import Button from '@/components/shared/button';

import GitHubIcon from '@/svgs/github.inline.svg';

//TODO: add github stars fetching

const GithubStarsButton = () => (
  <Button
    additionalClassName="group max-w-[120px] md:max-w-full md:bg-gray-30 md:text-white md:py-2 md:uppercase font-bold text-14 leading-none md:text-13 md:rounded-full"
    to="https://github.com/bytebase/bytebase"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-gray-97 flex items-center justify-center px-3 py-1.5 border border-gray-90 md:border-0 rounded-l group-hover:bg-gray-90 md:p-0 group-hover:border-gray-80 transition-colors duration-200 md:bg-transparent">
      <GitHubIcon className="fill-black mr-1.5 h-4.5 w-4.5 md:w-8 md:h-8 md:mr-3 md:fill-white" />
      <span className="tracking-wide md:tracking-tighter">Star</span>
    </div>
    <span
      className="inline-flex md:items-center md:before:block md:before:mx-1.5 md:before:h-[9px] md:before:w-[1.5px] md:before:bg-white px-3 py-2 border border-gray-90 md:border-0 border-l-0 group-hover:border-gray-80 transition-colors duration-200 md:bg-transparent rounded-r md:p-0"
      aria-label="5200 stars on Github"
    >
      5,221
    </span>
  </Button>
);

export default GithubStarsButton;
