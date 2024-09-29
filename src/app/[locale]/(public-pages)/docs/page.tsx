import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Docs',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function DocsPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('Docs');

  return <h2 className="text-5xl font-bold">{t('meta_description')}</h2>;
};
