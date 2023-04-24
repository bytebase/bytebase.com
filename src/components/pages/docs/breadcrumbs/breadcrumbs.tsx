import Link from '@/components/shared/link';

import { Breadcrumb } from '@/types/docs';

import Route from '@/lib/route';

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => (
  <nav>
    <ul className="text-15 font-medium mb-7 text-gray-30 flex items-center  gap-x-[11px]">
      {breadcrumbs.map(({ title: breadcrumbTitle, url }, index) => (
        <li className="inline-flex items-center gap-x-[11px]" key={url}>
          {index !== 0 && <span>/</span>}
          {url ? (
            <Link
              className="text-15 font-medium leading-none text-gray-15 hover:text-primary-1"
              href={Route.DOCS + url}
            >
              {breadcrumbTitle}
            </Link>
          ) : (
            <span key={breadcrumbTitle} className="text-15 font-medium leading-none text-gray-15">
              {breadcrumbTitle}
            </span>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default Breadcrumbs;
