import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { createClient } from '@/libs/supabase/server';
import { getI18nPath } from '@/utils/common';
import { AppConfig, AuthRoutes, ProtectedRoutes } from '@/utils/configs';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  try {
    const supabase = createClient();
    const { user } = await supabase.auth.getUser().then(({ data }) => data);

    const locale = request.cookies.get('NEXT_LOCALE')?.value ?? AppConfig.defaultLocale;
    const path = request.nextUrl.pathname;

    const isProtectedRoute = ProtectedRoutes.map(route =>
      getI18nPath(route, locale),
    ).includes(path);
    const isAuthRoute = AuthRoutes.map(route => getI18nPath(route, locale))
      .includes(path);

    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    } else if (isAuthRoute && user) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }
    return intlMiddleware(request);
  } catch (e) {
    console.error(e);
    return intlMiddleware(request);
  }
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next|monitoring).*)',
    '/',
    '/(api|trpc)(.*)',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ], // Also exclude tunnelRoute used in Sentry from the matcher
};
