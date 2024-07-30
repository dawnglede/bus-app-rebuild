import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const busAppToken = cookies().get('BusAppToken')
  let tokenFromApi
  if (!busAppToken) {
    const url = new URL(req.url)
    tokenFromApi = await fetch(`${url.origin}/api/getToken`)
    tokenFromApi = await tokenFromApi.json()
  }
  const token = busAppToken?.value ?? tokenFromApi.access_token

  let res
  const { city, routeUID } = await req.json()
  try {
    res = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/${city}?%24filter=RouteUID%20eq%20%27${routeUID}%27&%24top=30&%24format=JSON`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!res.ok) {
      throw new Error('fail to fetch stop info')
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error })
  }
  return NextResponse.json({ data: await res.json(), success: true })
}
