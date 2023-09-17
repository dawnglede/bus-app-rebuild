'use client'
import Image from 'next/image'
import refreshIcon from '../../public/Refresh.svg'
import RightArrow from '../../public/right-arrow.svg'
import { useEffect, useState } from 'react'
import useTimer from '@/hooks/useTimer'

type obj = {
  [key: string]: any
}

export default function StopList({
  data,
  refreshTimer = () => {}
}: {
  data: Array<obj>
  refreshTimer: Function
}) {
  const [dataSource, setDataSource] = useState<Array<obj>>()
  const [stopName, setStopName] = useState<string>()
  const { seconds, resetTimer, stopTimer } = useTimer({ time: 10 })

  useEffect(() => {
    const nearStop = data[0].StopName.Zh_tw
    const newData = data.filter((stop) => stop.StopName.Zh_tw === nearStop)
    setDataSource(newData)
    setStopName(nearStop)
  }, [data])
  // useEffect(() => {
  //   if (seconds === 0) {
  //     refreshTimer(resetTimer, stopTimer)
  //   }
  // }, [seconds])
  const sortStops = (a: any, b: any) => {
    if (a.EstimateTime) {
      return (
        new Date(a.EstimateTime).getTime() - new Date(b.EstimateTime).getTime()
      )
    } else {
      return (
        new Date(a.NextBusTime).getTime() - new Date(b.NextBusTime).getTime()
      )
    }
  }

  return (
    <div className='h-full rounded-tr-[60px] bg-gray-white px-[16px] pb-[34px] pt-[24px]'>
      <div>
        <div className='text-sm text-gray-600'>最近站牌</div>
        <div className='flex items-center justify-between'>
          <div className='font-bold text-gray-800'>
            {stopName}
            {/* <span className='ml-[6px] rounded-[12px] bg-gray-500 px-[8px] py-[3px] text-xs font-medium text-gray-white'>
              北行
            </span> */}
          </div>
          <div className='text-xs text-gray-700'>
            {seconds}秒後更新
            <span onClick={() => refreshTimer(resetTimer, stopTimer)}>
              <Image
                src={refreshIcon}
                alt=''
                className='ml-[3px] inline-block cursor-pointer'
              />
            </span>
          </div>
        </div>
      </div>
      <div>
        {dataSource
          ?.sort((a, b) => sortStops(a, b))
          .map((stop, i) => {
            const nextTime = stop?.NextBusTime
            const miuntes = stop?.EstimateTime
            const nextHours = new Date(nextTime).getHours()
            const nextMiuntes = new Date(nextTime).getMinutes()
            const lessThenTen = Math.floor(nextMiuntes / 10) === 0
            const time = `${nextHours}:${
              lessThenTen ? '0' + nextMiuntes : nextMiuntes
            }`
            return (
              <div
                key={i}
                className='stop-info flex h-[60px] border-b-[1px] border-solid border-[#E0E0E0] py-[10px]'
              >
                <div className='flex w-[73px] items-center justify-center text-base text-gray-600'>
                  <span className='text-md mr-[6px] text-xl font-bold text-primary-850'>
                    {miuntes ? miuntes : time}
                  </span>
                  {miuntes && '分'}
                </div>
                <div className='flex items-center justify-between px-[12px]'>
                  <div>
                    <div className='font-bold text-primary-850'>
                      {stop.RouteName.Zh_tw}
                    </div>
                    {/* <div className='text-xs font-medium text-gray-600'>開往 小灣</div> */}
                  </div>
                  <div className='flex h-[24px] w-[24px] items-center justify-center'>
                    <Image src={RightArrow} alt='' />
                  </div>
                </div>
              </div>
            )
          })}

        {/* <div className='stop-info flex h-[60px] border-b-[1px] border-solid border-[#E0E0E0] py-[10px]'>
          <div className='flex items-center justify-center px-[20px] text-base  text-gray-600'>
            <span className='text-md mr-[6px] text-xl font-bold text-primary-850'>
              3
            </span>
            分
          </div>
          <div className='flex w-full items-center justify-between px-[12px]'>
            <div>
              <div className='font-bold text-primary-850'>911</div>
              <div className='text-xs font-medium text-gray-600'>開往 小灣</div>
            </div>
            <div className='flex h-[24px] w-[24px] items-center justify-center'>
              <Image src={RightArrow} alt='' />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
