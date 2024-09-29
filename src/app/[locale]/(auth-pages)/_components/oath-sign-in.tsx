'use client';

import type { Provider } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import { createClient } from '@/libs/supabase/client';

const supabase = createClient();

export default function OAuthSignIn() {
  const signWithOAuth = (provider: Provider) => {
    return async () => await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={signWithOAuth('google')}>Google</Button>
      <Button onClick={signWithOAuth('facebook')}>Facebook</Button>
    </div>
  );
}
