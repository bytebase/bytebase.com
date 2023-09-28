'use client';

import { I18nProviderClient } from './client';

export const I18nProvider = ({ children }: { children: React.ReactNode }) => (
  <I18nProviderClient>{children}</I18nProviderClient>
);

export default I18nProvider;
