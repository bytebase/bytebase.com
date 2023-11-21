import Script from 'next/script';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { FrontChat } from '@/components/front-chat';
//import { Intercom } from '@/components/intercom';

import I18nProvider from '@/locales/i18nProvider';
import { getStaticParams } from '@/locales/server';
import '@/styles/main.css';

export function generateStaticParams() {
  return getStaticParams();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <head>
        {/* Next.js doesn't support metadata in not-found yet, viewport comes with metadata */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <script data-domain="bytebase.com" src="https://plausible.io/js/script.js" defer />
      </head>
      <body className="flex h-full flex-col">
        <FrontChat />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-4BZ4JH7449`}
          strategy="afterInteractive"
        />
        <Script
          id="ga"
          strategy="afterInteractive"
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
        <Script
          id="ga"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_eaojgtkcg', {"optOut":false,"useDecimalCurrencyValues":true});rdt('track', 'PageVisit');
`,
          }}
        />
        <I18nProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header hasBanner />
            <main className="relative z-20 shrink-0 grow basis-auto pt-[128px] md:pt-[112px]">
              {children}
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
