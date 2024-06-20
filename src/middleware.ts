import { NextResponse, NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '../i18n-config'

const defaultLocale = 'zh-TW'
const locales = ['en', 'zh-TW']

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  const locale = matchLocale(languages, locales, defaultLocale)
  return locale
}

const images = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (
    !pathnameIsMissingLocale ||
    images.some((ext) => pathname.endsWith(ext))
  ) {
    return
  }

  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        req.url,
      ),
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
