import Link from '@/components/shared/link';
import { Breadcrumb } from '@/types/breadcrumb';

const BreadcrumbItem = ({ url, title }: Breadcrumb) =>
  !url ? (
    <>{title}</>
  ) : (
    <Link className="text-gray-30 transition-colors duration-200 hover:text-gray-50" href={url}>
      {title}
    </Link>
  );

type BreadcrumbsProps = {
  items: Breadcrumb[];
  className?: string;
};

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav className={className}>
    <ul className="inline-flex flex-wrap items-center gap-x-[11px] font-medium">
      {items.map((item, index) => (
        <li key={index}>
          <BreadcrumbItem {...item} />
          {index < items.length - 1 && <span className="ml-[11px] text-gray-30">/</span>}
        </li>
      ))}
    </ul>
  </nav>
);

export default Breadcrumbs;
