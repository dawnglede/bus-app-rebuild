'use client'

import { useEffect, useState } from 'react'
import StopList from './StopList'
import getNearBus from '@/app/api/getNearBus'
import useLocation from '@/hooks/useLocation'
import { useTranslation } from '@/app/i18n/clients'

interface LocationProps {
  locale: string
}

export default function Location({ locale }: LocationProps) {
  const { t } = useTranslation(locale)
  const { position, isLocationAllowed } = useLocation()
  const [dataSource, setDataSource] = useState<any>(null)

  const getNearStops = async () => {
    const payload = {
      latitude: position?.latitude,
      longitude: position?.longitude,
    }
    const data = await getNearBus(payload)
    setDataSource(data)
    return data
  }
  // const refreshTimer = (resetTimer: Function, stopTimer: Function) => {
  //   stopTimer()
  //   getNearStops().then((res) => {
  //     if (res) resetTimer()
  //   })
  // }
  // useEffect(() => {
  //   if (position && !dataSource) {
  //     getNearStops()
  //   }
  // }, [position, dataSource])
  return (
    <>
      {!isLocationAllowed && (
        <div className='flex flex-col items-center'>
          <div className='mb-[5px] font-bold text-primary-850'>
            {t('location-desc1')}
          </div>
          <div className='mb-[15px] text-xs text-primary-700'>
            {t('location-desc2')}
          </div>
          <button className='flex w-[328px] items-center justify-center rounded-[30px] border border-solid border-primary-default px-[10px] py-[13px] font-medium text-primary-default'>
            {t('location-btn')}
          </button>
        </div>
      )}
      {/* {dataSource && <StopList data={dataSource} refreshTimer={refreshTimer} />} */}
    </>
  )
}
