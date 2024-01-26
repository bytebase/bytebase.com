'use client';

import { ReactNode } from 'react';
import { I18nProviderClient } from './client';

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export const I18nProvider = ({ locale, children }: ProviderProps) => (
  <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
);

export default I18nProvider;
