import { cookies } from 'next/headers'

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

  const { cityName, keyword } = await req.json()
  const res = await fetch(
    `https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/${cityName}/${encodeURIComponent(
      keyword,
    )}?%24top=30&%24format=JSON`,
    { method: 'GET', headers },
  )
  if (!res) {
    throw new Error('fail to fetch route')
  }
  return Response.json(await res.json())
}
