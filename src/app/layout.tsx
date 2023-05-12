import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

import Script from 'next/script';
import '@/styles/main.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
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
        <Header />
        <main className="relative z-20 shrink-0 grow basis-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
