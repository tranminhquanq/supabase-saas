import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import HeaderAuth from '@/components/header-auth';
import SupabaseLogo from '@/components/supabase-logo';
import { getUserServer } from '@/libs/supabase/server';
import { SupabaseAuthProvider } from '@/libs/supabase-auth';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SupabaseAuthProvider userPromise={getUserServer()}>
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex w-full flex-1 flex-col items-center gap-20">
          <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
            <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
              <div className="flex items-center gap-5 font-semibold">
                <Link href="/">
                  <SupabaseLogo />
                </Link>
              </div>
              <HeaderAuth />
            </div>
          </nav>
          <div>{children}</div>
        </div>
      </main>
    </SupabaseAuthProvider>
  );
};
