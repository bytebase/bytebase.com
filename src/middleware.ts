import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const i18nMiddleware = createI18nMiddleware(['en', 'zh'] as const, 'en', {
  urlMappingStrategy: 'rewrite',
});

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
