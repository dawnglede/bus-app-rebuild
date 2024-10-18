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
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const { latitude, longitude } = await req.json()
  try {
    const res = await fetch(
      `https://tdx.transportdata.tw/api/advanced/v2/Bus/Station/NearBy?%24top=30&%24spatialFilter=nearby%28${latitude}%2C${longitude}%2C%20500%29&%24format=JSON`,
      { method: 'GET', headers },
    )
    if (!res.ok) {
      throw new Error('Fail to fetch stops, status code: ' + res.status)
    }
    return NextResponse.json({ data: await res.json(), success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    )
  }
}
