import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import UserJson from './_components/user-json';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Protected',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function ProtectedPage(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return <UserJson />;
}
