import { cookies } from 'next/headers'

type Payload = {
  city: string
  routeUID: string
}

export default async function getBusStop(payload: Payload) {
  const { city, routeUID } = payload

  const res = await fetch(
    `https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/${city}?%24filter=RouteUID%20eq%20%27${routeUID}%27&%24top=30&%24format=JSON`,
    {
      method: 'GET',
    },
  )
  if (!res.ok) {
    throw new Error('fail to fetch route')
  }
  return res.json()
}
