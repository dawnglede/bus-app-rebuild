import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const busAppToken = cookies().get('BusAppToken')
  let tokenFromApi
  if (!busAppToken) {
    const url = new URL(req.url)
    tokenFromApi = await fetch(`${url.origin}/api/getToken`)
    tokenFromApi = await tokenFromApi.json()
  }
  const token = busAppToken?.value ?? tokenFromApi.access_token
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await fetch(
    'https://tdx.transportdata.tw/api/basic/v2/Basic/City?%24format=JSON',
    { method: 'GET', headers },
  )

  if (!res.ok) {
    throw new Error('fail to fetch city code: ' + res.statusText)
  }
  const data = await res.json()
  return Response.json(data)
}
