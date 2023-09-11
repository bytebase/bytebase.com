'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useCurrentLocale, useI18n } from '@/locales/client';
import Icon from './icon';

interface Props {
  className?: string;
}

const LocaleSwitcher = (props: Props) => {
  const { className } = props;
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value;
    if (locale === 'zh') {
      window.location.href = `/zh/${pathname}`;
    } else {
      window.location.href = `/en/${pathname}`;
    }
  }

  return (
    <label
      className={clsx(
        'relative flex flex-row items-center justify-start text-16 font-medium tracking-tight xs:text-14',
        className,
      )}
    >
      <p className="sr-only">{t('common.language')}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={currentLocale}
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
