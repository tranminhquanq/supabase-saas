import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import SignUpForm from '../_components/sign-up-form';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return (
    <main className="flex w-1/5 flex-col gap-6">
      <SignUpForm />
    </main>
  );
}
