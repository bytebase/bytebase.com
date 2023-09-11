'use client';

import Script from 'next/script';

import Banner from '@/components/shared/banner';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

import PROMO_DATA from '@/lib/promo-data';
import { I18nProviderClient, useCurrentLocale } from '@/locales/client';
import '@/styles/main.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentLocale = useCurrentLocale();
  const topBanner = PROMO_DATA.TOP_BANNER;

  return (
    <html lang={currentLocale} className="h-full">
      <head>
        {/* Next.js doesn't support metadata in not-found yet, viewport comes with metadata */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <script data-domain="bytebase.com" src="https://plausible.io/js/script.js" defer />
      </head>
      <body className="flex h-full flex-col">
        <Script
          id="intercom-settings"
          dangerouslySetInnerHTML={{
            __html: `window.intercomSettings = {
            api_base: "https://api-iam.intercom.io",
            app_id: "wedzquzc"
          };`,
          }}
        />

        <Script
          id="intercom-popup"
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wedzquzc';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`,
          }}
        />

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
        <I18nProviderClient locale={currentLocale}>
          {topBanner && <Banner bannerText={topBanner.title} bannerUrl={topBanner.pathname} />}
          <div className="relative flex min-h-screen flex-col">
            <Header hasBanner />
            <main className="relative z-20 shrink-0 grow basis-auto">{children}</main>
            <Footer />
          </div>
        </I18nProviderClient>
      </body>
    </html>
  );
}
