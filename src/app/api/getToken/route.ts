import qs from 'qs'
import { cookies } from 'next/headers'
export const dynamic = 'force-dynamic'
export type Token = {
  access_token: string
  expires_in: number
  token_type: string
}

export async function GET() {
  const payload = {
    grant_type: 'client_credentials',
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
  }
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  const res = await fetch(
    'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
    {
      method: 'POST',
      body: qs.stringify(payload),
      headers,
    },
  )
  if (!res.ok) {
    throw new Error('fail to fetch token')
  }
  const resJson = await res.json()
  cookies().set({
    name: 'BusAppToken',
    value: resJson.access_token,
    httpOnly: true,
    maxAge: resJson.expires_in,
    secure: true,
  })
  return Response.json(resJson)
}
