import Button from '@/components/shared/button';

import GitHubIcon from '@/svgs/github.inline.svg';

//TODO: add github stars fetching

const GithubStarsButton = () => (
  <Button
    className="group max-w-[120px] text-14 font-bold leading-none md:max-w-full md:rounded-full md:bg-gray-30 md:py-2 md:text-13 md:uppercase md:text-white"
    href="https://github.com/bytebase/bytebase"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="flex items-center justify-center rounded-l border border-gray-90 bg-gray-97 px-3 py-1.5 transition-colors duration-200 group-hover:border-gray-80 group-hover:bg-gray-90 md:border-0 md:bg-transparent md:p-0 md:group-hover:bg-transparent">
      <GitHubIcon className="mr-1.5 h-4.5 w-4.5 fill-black md:mr-3 md:h-8 md:w-8 md:fill-white" />
      <span className="tracking-wider md:tracking-wide">Star</span>
    </div>
    <span
      className="inline-flex rounded-r border border-l-0 border-gray-90 px-3 py-2 transition-colors duration-200 group-hover:border-gray-80 md:items-center md:border-0 md:bg-transparent md:p-0 md:before:mx-1.5 md:before:block md:before:h-[9px] md:before:w-[1.5px] md:before:bg-white"
      aria-label="5200 stars on Github"
    >
      5,221
    </span>
  </Button>
);

export default GithubStarsButton;
