'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { blogReoMapping } from '@data/blog-reo-mapping';

const ReoScript = () => {
  const pathname = usePathname();

  // Handle null pathname case
  if (!pathname) {
    return null;
  }

  // Don't load reo script on /resources, /reference paths
  if (pathname.startsWith('/resources') || pathname.startsWith('/reference')) {
    return null;
  }

  // Handle blog post filtering
  // Regex handles both URL formats: /blog/slug (default locale) and /locale/blog/slug (non-default locale)
  // Also handles optional trailing slash
  const blogPathMatch = pathname.match(/^(?:\/[^/]+)?\/blog\/([^/]+)\/?$/);
  if (blogPathMatch) {
    const slug = blogPathMatch[1];
    // Use pre-generated mapping for instant lookup
    const shouldLoad = blogReoMapping[slug as keyof typeof blogReoMapping];
    if (!shouldLoad) {
      return null;
    }
  }

  return (
    <Script
      id="reo"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
      !function(){var e,t,n;e="91f044180a1552d",t=function(){Reo.init({clientID:"91f044180a1552d"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.defer=!0,n.onload=t,document.head.appendChild(n)}();
`,
      }}
    />
  );
};

export default ReoScript;
