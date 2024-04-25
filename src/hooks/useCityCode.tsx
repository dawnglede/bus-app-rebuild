'use client'

import getCityCode from '@/app/api/getCityCode'
import { useEffect, useState } from 'react'
import useStore from '@/store/useStore'
import useSessionStorage from './useSessionStorage'

type CityData = {
  [key: string]: string
}

export default function useCityCode() {
  const { setCityCode, cityCode } = useStore()
  const { setSessionData, getSessionData } = useSessionStorage('cityCode')
  useEffect(() => {
    const savedCityCode = getSessionData()
    if (savedCityCode && !cityCode) {
      setCityCode(savedCityCode)
      return
    }
    if (!cityCode && !savedCityCode) {
      getCityCode().then((res) => {
        setCityCode(res)
        setSessionData(res)
      })
    }
  }, [cityCode])

  return
}
