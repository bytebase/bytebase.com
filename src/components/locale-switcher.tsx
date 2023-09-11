'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { ChangeEvent, useTransition } from 'react';
import Icon from './icon';

interface Props {
  className?: string;
}

const LocaleSwitcher = (props: Props) => {
  const { className } = props;
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        'relative flex flex-row items-center justify-start text-16 font-medium tracking-tight xs:text-14',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
        className,
      )}
    >
      <p className="sr-only">{t('label')}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        <option value={'en'}>English</option>
        <option value={'zh'}>中文</option>
      </select>
      <Icon.ChevronDown className="pointer-events-none h-auto w-4 -translate-x-6 opacity-80" />
    </label>
  );
};

export default LocaleSwitcher;
