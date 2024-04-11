export default async function getCityCode(token: string | undefined) {
  if (!token || token === '') {
    throw new Error('token does not exist!')
  }
  const headers = {
    authorizqtion: `Bearer ${token}`
  }

  const res = await fetch('https://tdx.transportdata.tw/api/basic/v2/Basic/City?%24format=JSON', { method: 'GET', headers })
  if (!res.ok) {
    throw new Error('fail to fetch city code')
  }

  return res.json()
}
