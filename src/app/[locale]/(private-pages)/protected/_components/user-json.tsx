'use client';

import { useUser } from '@/libs/supabase-auth';

const UserJson = () => {
  const { user } = useUser();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default UserJson;
