import qs from 'qs'
import { cookies } from 'next/headers'
export type Token = {
  access_token: string
  expires_in: number
  token_type: string
}

export default async function getToken(): Promise<Token> {
  const payload = {
    grant_type: 'client_credentials',
    client_id: process.env.client_id,
    client_secret: process.env.client_secret
  }
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const res = await fetch(
    'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
    {
      method: 'POST',
      body: qs.stringify(payload),
      headers
    }
  )
  if (!res.ok) {
    throw new Error('fail to fetch token')
  }
  const resJson = await res.json()
  const expiredTime = Date.now() + resJson.expires_in * 1000
  cookies().set({
    name: 'BusAppToken',
    value: resJson.access_token,
    httpOnly: true,
    maxAge: expiredTime/1000,
    secure: true
  })
  return resJson
}
