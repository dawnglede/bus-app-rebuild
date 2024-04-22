import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getToken from './api/getToken'

export const config = {
  matcher: ''
}

export async function middleware(req: NextRequest) {
  const { hostname } = req.nextUrl
  let token = req.cookies.get('BusAppToken')
  
  if (!token) {
    const tokenData = await getToken()
    if (tokenData) token = req.cookies.get('BusAppToken')
  }

  if (hostname === 'tds.transportdata.tw') {
    req.headers.set('Authorization', `Bearer ${token}`)
  }
  return NextResponse.next()
}
