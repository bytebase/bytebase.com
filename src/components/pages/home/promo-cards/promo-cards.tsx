'use client';

import clsx from 'clsx';

import Route from '@/lib/route';

import Card, { type CardProps } from './card';

const cards: CardProps[] = [
  {
    color: 'blue',
    href: Route.DOCS_CHANGE_DATABASE,
    cover: '/images/page/main/hero/change-database.webp',
    title: 'Database CI/CD',
    description:
      'Standardized database schema migrations and data changes with review, linting, and GitOps.',
  },
  {
    color: 'red',
    href: Route.DOCS_DATABASE_PERMISSION,
    cover: '/images/page/main/hero/secure-access.webp',
    title: 'Just-in-Time Access',
    description:
      'Just-in-Time (JIT) IAM-based database permissions with approval flow and audit logging.',
  },
  {
    color: 'green',
    href: Route.DOCS_SQL_EDITOR,
    cover: '/images/page/main/hero/query-data.webp',
    title: 'Dynamic Data Masking',
    description:
      'Role-based multi-level masking with data classification, custom algorithm, policy-as-code.',
  },
];

const PromoCards = () => {
  return (
    <div
      className={clsx('container mt-20 grid grid-cols-3 gap-12 sm:mt-12 sm:grid-cols-1 sm:gap-8')}
    >
      {cards.map((card) => {
        return <Card key={card.href} {...card} />;
      })}
    </div>
  );
};

export default PromoCards;
