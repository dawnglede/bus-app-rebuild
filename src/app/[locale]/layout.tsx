'use client'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { i18n, type Locale } from '../../../i18n-config'
import { useTranslation } from '../i18n'
import { languages, fallbackLng } from '../i18n/settings'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: '機智公車族+',
//   description: ''
// }

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng)
  return {
    title: t('websiteTitle'),
  }
}

interface LayoutProps {
  children?: React.ReactNode
  params: { locale: Locale }
}

export default function RootLayout({
  children,
  params
}: LayoutProps) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  )
}
