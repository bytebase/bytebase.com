import Script from 'next/script';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import WechatQRCode from '@/components/wechat-qr-code';
import { Cal } from '@/components/cal';
import I18nProvider from '@/locales/i18nProvider';
import PlausibleProvider from 'next-plausible';
import { getStaticParams } from '@/locales/server';
import ReoScript from '@/components/reo-script';
import '@/styles/main.css';

export function generateStaticParams() {
  return getStaticParams();
}

interface Props {
  params: { locale: string };
  children: React.ReactNode;
}

export default function RootLayout({ params: { locale }, children }: Props) {
  const hostname = process.env.NEXT_PUBLIC_DEFAULT_SITE_URL;

  return (
    <html className="h-full">
      <head>
        {!hostname?.includes('bytebase.com') && <meta name="robots" content="noindex, nofollow" />}
        {/* Next.js doesn't support metadata in not-found yet, viewport comes with metadata */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://static.reo.dev" />
        <link rel="dns-prefetch" href="https://static.reo.dev" />
      </head>
      <body className="flex h-full flex-col">
        <Cal />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-4BZ4JH7449`}
          strategy="lazyOnload"
        />
        <Script
          id="ga"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4BZ4JH7449', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <ReoScript />
        <PlausibleProvider domain="bytebase.com">
          <I18nProvider locale={locale}>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="relative z-20 shrink-0 grow basis-auto pt-[58px] md:pt-[42px]">
                {children}
              </main>
              <Footer />
            </div>
            <WechatQRCode />
          </I18nProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
