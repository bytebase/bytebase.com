import Button from '@/components/shared/button';
import ArrowIcon from '@/svgs/arrow.inline.svg';

const DocLinkBlock = ({ url, title }: { url: string; title: string }) => (
  <div className="not-prose group my-11">
    <Button
      href={url}
      theme="primary-outline"
      className="inline-flex h-auto min-h-[52px] w-full items-center gap-2 !py-2 text-center"
      size="md"
    >
      {title}
      <ArrowIcon className="h-2.5 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </Button>
  </div>
);

export default DocLinkBlock;
