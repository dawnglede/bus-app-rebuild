'use client'

import { useEffect, useState } from 'react'
import StopList from './StopList'
import getNearBus from '@/app/api/getNearBus'
import useLocation from '@/hooks/useLocation'

export default function Location() {
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
  const refreshTimer = (resetTimer: Function, stopTimer: Function) => {
    stopTimer()
    getNearStops().then((res) => {
      if (res) resetTimer()
    })
  }
  // useEffect(() => {
  //   if (position && !dataSource) {
  //     getNearStops()
  //   }
  // }, [position, dataSource])
  return (
    <>
      {
        !isLocationAllowed &&
        <div className='flex flex-col items-center'>
          <div className='mb-[5px] font-bold text-primary-850'>
            開啟裝置定位功能，以便為您提供更好的服務。
          </div>
          <div className='mb-[15px] text-xs text-primary-700'>
            我們將用在提供您所在位置附近的交通等資訊。
          </div>
          <button className='flex w-[328px] items-center justify-center rounded-[30px] border border-solid border-primary-default px-[10px] py-[13px] font-medium text-primary-default'>
            開啟定位功能
          </button>
        </div>
      }
      {/* {dataSource && <StopList data={dataSource} refreshTimer={refreshTimer} />} */}
    </>
  )
}
