'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { createClient } from '@/libs/supabase/client';
import { useUser } from '@/libs/supabase-auth';

import { Button } from './ui/button';

function useSignOut() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };
  return { loading, signOut };
}

const HeaderAuth = () => {
  const t = useTranslations('Layout');
  const { user } = useUser();
  const { loading, signOut } = useSignOut();

  return (
    <div className="flex items-center gap-2">
      <span>
        Hey!
        {' '}
        <b>{user?.email}</b>
      </span>
      <Button
        asChild
        size="sm"
        variant="default"
        className="cursor-pointer"
        disabled={loading}
        onClick={signOut}
      >
        <span>{t('sign_out_link')}</span>
      </Button>
    </div>
  );
};

export default HeaderAuth;
