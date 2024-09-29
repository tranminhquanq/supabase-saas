'use client';

import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import type {
  FC,
  PropsWithChildren,
} from 'react';
import {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { createClient } from './supabase/client';

type SupabaseAuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

type SupabaseAuthProviderProps = PropsWithChildren & {
  userPromise: Promise<SupabaseAuthContextType['user']>;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType | null>(null);

export const SupabaseAuthProvider: FC<SupabaseAuthProviderProps> = (
  { userPromise, ...props },
) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(use(userPromise));

  const contextValues = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const supabase = createClient();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        if (session?.user) {
          setUser(session.user);
        }
      } else if (event === 'SIGNED_IN') {
        if (session?.user) {
          setUser(session.user);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        router.push('/');
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
        // console.info('PASSWORD_RECOVERY');
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
        // console.info('TOKEN_REFRESH');
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
        // console.info('USER_UPDATED');
      }
    });

    return () => data.subscription.unsubscribe();
  }, [router]);

  return <SupabaseAuthContext.Provider value={contextValues} {...props} />;
};

export function useUser(): SupabaseAuthContextType {
  const context = useContext(SupabaseAuthContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
