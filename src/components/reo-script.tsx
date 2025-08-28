'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

const ReoScript = () => {
  const pathname = usePathname();

  // Don't load reo script on /resources paths
  if (pathname.startsWith('/resources')) {
    return null;
  }

  return (
    <Script
      id="reo"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
      !function(){var e,t,n;e="91f044180a1552d",t=function(){Reo.init({clientID:"91f044180a1552d"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.defer=!0,n.onload=t,document.head.appendChild(n)}();
`,
      }}
    />
  );
};

export default ReoScript;
