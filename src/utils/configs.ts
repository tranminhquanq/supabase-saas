import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix,
};

export const ProtectedRoutes = ['/protected'];

export const AuthRoutes = ['/sign-in', '/sign-up', '/forgot-password'];
