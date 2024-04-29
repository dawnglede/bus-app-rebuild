import { NextResponse, NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import getToken from './app/api/getToken'
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
  const { hostname, pathname } = req.nextUrl
  let token = req.cookies.get('BusAppToken')

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (
    (!pathnameIsMissingLocale && hostname !== 'tds.transportdata.tw') ||
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

  if (hostname === 'tds.transportdata.tw') {
    if (!token) {
      const tokenData = await getToken()
      if (tokenData)
        token = { name: 'BusAppToken', value: tokenData.access_token }
    }
    req.headers.set('Authorization', `Bearer ${token}`)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
