import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import OAuthSignIn from '../_components/oath-sign-in';
import SignInForm from '../_components/sign-in-form';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function SignInPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return (
    <main className="flex w-1/5 flex-col gap-6">
      <OAuthSignIn />
      <SignInForm />
    </main>
  );
}
