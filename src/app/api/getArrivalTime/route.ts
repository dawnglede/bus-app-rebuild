import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

async function getValidToken(origin: string) {
  const tokenResponse = await fetch(`${origin}/api/getToken`)
  const tokenData = await tokenResponse.json()

  return tokenData.access_token
}

export async function POST(req: Request) {
  const busAppToken = cookies().get('BusAppToken')
  const url = new URL(req.url)

  const token = busAppToken?.value ?? (await getValidToken(url.origin))

  let res
  const { city, routeUID } = await req.json()
  try {
    res = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/${city}?%24filter=RouteUID%20eq%20%27${routeUID}%27&%24top=30&%24format=JSON`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!res.ok) {
      throw new Error('Fail to fetch arrival time, status code :' + res.status)
    }
    const data = await res.json()
    return NextResponse.json({ data, success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    )
  }
}
