import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';

import LocaleSwitcher from '@/components/locale-switcher';
import SupabaseLogo from '@/components/supabase-logo';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: PropsWithChildren) {
  const t = useTranslations('Layout');

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
          <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
            <div className="flex items-center gap-5 font-semibold">
              <Link href="/">
                <SupabaseLogo />
              </Link>
            </div>
            <ul className="flex gap-2">
              <li>
                <Link href="/docs">{t('docs_link')}</Link>
              </li>
              <li>
                <Link href="/pricing">{t('pricing_link')}</Link>
              </li>
            </ul>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/sign-in">{t('sign_in_link')}</Link>
              </Button>
              <Button asChild size="sm" variant="default">
                <Link href="/sign-up">{t('sign_up_link')}</Link>
              </Button>
            </div>
          </div>
        </nav>
        <div className="flex max-w-5xl flex-1 flex-col gap-20 p-5">
          {children}
        </div>
        <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
          <p>
            Powered by
            {' '}
            <b>Supabase</b>
          </p>
          <ThemeSwitcher />
          <LocaleSwitcher />
        </footer>
      </div>
    </main>
  );
};
