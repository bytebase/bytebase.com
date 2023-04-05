import GitHubIcon from '@/svgs/github.inline.svg';

import Button from '@/components/shared/button';

//TODO: add github stars fetching

const GithubStarsButton = () => (
  <Button
    additionalClassName="group max-w-[120px] lg:max-w-full lg:bg-gray-30 lg:text-white lg:py-2 lg:uppercase font-bold text-14 leading-none lg:text-13 lg:rounded-full"
    to="https://github.com/bytebase/bytebase"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="bg-gray-97 flex items-center justify-center px-3 py-1.5 border border-gray-90 lg:border-0 rounded-l group-hover:bg-gray-90 lg:p-0 group-hover:border-gray-80 transition-colors duration-200 lg:bg-transparent">
      <GitHubIcon className="fill-black mr-1.5 h-4.5 w-4.5 lg:w-8 lg:h-8 lg:mr-3 lg:fill-white" />
      <span className="tracking-wide lg:tracking-tighter">Star</span>
    </div>
    <span
      className="inline-flex lg:items-center lg:before:block lg:before:mx-1.5 lg:before:h-[9px] lg:before:w-[1.5px] lg:before:bg-white px-3 py-2 border border-gray-90 lg:border-0 border-l-0 group-hover:border-gray-80 transition-colors duration-200 lg:bg-transparent rounded-r lg:p-0"
      aria-label="5200 stars on Github"
    >
      5,221
    </span>
  </Button>
);

export default GithubStarsButton;
