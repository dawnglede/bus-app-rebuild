type Payload = {
  latitude: number | undefined
  longitude: number | undefined
  token: string | undefined
}

export default async function getNearBus(payload: Payload) {
  const { latitude, longitude, token } = payload
  const headers = {
    authorization: `Bearer ${token}`
  }
  const res = await fetch(
    `https://tdx.transportdata.tw/api/advanced/v2/Bus/EstimatedTimeOfArrival/NearBy?%24top=30&%24spatialFilter=nearby%28${latitude}%2C%20${longitude}%2C%20500%29&%24format=JSON`,
    { method: 'GET', headers }
  )
  if (!res.ok) {
    throw new Error('fail to fetch token')
  }
  return res.json()
}
