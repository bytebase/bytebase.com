import Script from 'next/script';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import WechatQRCode from '@/components/wechat-qr-code';

import I18nProvider from '@/locales/i18nProvider';
import PlausibleProvider from 'next-plausible';
import { getStaticParams } from '@/locales/server';
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
      </head>
      <body className="flex h-full flex-col">
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
        <Script
          id="apollo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"66346f168e72ee0560df182c"})},
document.head.appendChild(o)}initApollo();
`,
          }}
        />
        <Script
          id="rb2b"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function () {var reb2b = window.reb2b = window.reb2b || [];
if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = ["identify", "collect"];
reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);
args.unshift(method);reb2b.push(args);return reb2b;};};
for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}
reb2b.load = function (key) {var script = document.createElement("script");script.type = "text/javascript";script.async = true;
script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
var first = document.getElementsByTagName("script")[0];
first.parentNode.insertBefore(script, first);};
reb2b.SNIPPET_VERSION = "1.0.1";reb2b.load("9NMMZHPVM0NW");}();
`,
          }}
        />
        <PlausibleProvider domain="bytebase.com">
          <I18nProvider locale={locale}>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="relative z-20 shrink-0 grow basis-auto pt-[128px] md:pt-[112px]">
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
