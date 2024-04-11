type Payload = {
  cityName: string
  keyword: string
  token: string
}

export default async function getRoute(payload: Payload) {
  const {
    cityName,
    keyword,
    token
  } = payload

  const headers = {
    authorization: `Bearer ${token}`
  }
  const res = await fetch(`https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/${cityName}/${encodeURIComponent(keyword)}?%24top=30&%24format=JSON`, {method: 'GET', headers})
  if (!res) {
    throw new Error('fail to fetch route')
  }

  return res.json()
}
