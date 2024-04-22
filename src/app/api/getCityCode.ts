export default async function getCityCode() {
  const res = await fetch('https://tdx.transportdata.tw/api/basic/v2/Basic/City?%24format=JSON', { method: 'GET' })
  if (!res.ok) {
    throw new Error('fail to fetch city code')
  }

  return await res.json()
}
