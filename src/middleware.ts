import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const i18nMiddleware = createI18nMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|healthz|_next/static|_next/image|favicon|sitemap.xml|robots.txt|manifest.json).*)',
  ],
};
