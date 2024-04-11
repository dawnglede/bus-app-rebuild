'use client'

import getCityCode from '@/app/api/getCityCode'
import { useEffect, useState } from 'react'
import useStore from '@/store/useStore'
import useSessionStorage from './useSessionStorage'

type CityData = {
  [key: string]: string
}

export default function useCityCode() {
  // const [cityCode, setCityCode] = useState<Array<CityData>|null>(null)
  const { token, setCityCode, cityCode } = useStore()
  const { setSessionData, getSessionData } = useSessionStorage('cityCode')
  useEffect(() => {
    const savedCityCode = getSessionData()
    if (savedCityCode && !cityCode) {
      setCityCode(savedCityCode)
    }
    if (!cityCode && token?.access_token) {
      getCityCode(token.access_token).then((res) => {
        setCityCode(res)
        setSessionData(res)
      })
    }
  }, [token.access_token, cityCode])

  return
}
