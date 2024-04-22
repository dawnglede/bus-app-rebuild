type Payload = {
  cityName: string
  keyword: string
}

export default async function getRoute(payload: Payload) {
  const {
    cityName,
    keyword
  } = payload

  const res = await fetch(`https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/${cityName}/${encodeURIComponent(keyword)}?%24top=30&%24format=JSON`, { method: 'GET' })
  if (!res) {
    throw new Error('fail to fetch route')
  }

  return res.json()
}
