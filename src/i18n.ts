import { getRequestConfig } from 'next-intl/server';

export async function getMessages(locale: string) {
  return (await import(`./locales/${locale}.json`)).default;
}

export default getRequestConfig(async ({ locale }) => {
  const messages = await getMessages(locale);
  return {
    messages,
  };
});
