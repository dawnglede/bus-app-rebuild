'use client'
import Image from 'next/image'
import clockIcon from '../../public/clock-icon.svg'
import rightArrow from '../../public/right-arrow.svg'
import wheelChair from '../../public/wheelchair-icon.svg'
import Link from 'next/link'

export default function SearchList({
  data,
  type,
  city,
  locale,
}: {
  data: Array<{ [key: string]: any }> | null
  type: 'history' | 'result'
  city: string
  locale: string
}) {
  const hasLowFloor = (stop: { [key: string]: any }) => {
    const { TimeTables = [] } = stop
    return TimeTables[0]?.IsLowFloor === true
  }
  const routeLocale = locale === 'zh-TW' ? 'Zh_tw' : 'En'
  const stopNameLocale = locale === 'zh-TW' ? 'Zh' : 'En'
  return (
    <div>
      {type === 'result' && data?.length === 0 && (
        <div className='mt-[22px] flex w-[100%] justify-center text-center text-base leading-7 text-gray-600'>
          唉呀!查無結果
          <br />
          請重新搜尋關鍵字或切換縣市
        </div>
      )}
      {data?.map((stop) => {
        return (
          <Link
            href={`/${locale}/searchBusRoute/${stop.RouteUID}?city=${stop.City}`}
            key={stop.RouteUID}
            className='my-[6px] flex cursor-pointer justify-between border-b-[1px] border-solid border-[#E0E0E0] py-[6px]'
          >
            <div className='flex'>
              <div className='flex h-[24px] w-[24px] items-center justify-center'>
                {type === 'history' && <Image src={clockIcon} alt='' />}
                {type === 'result' && hasLowFloor(stop) && (
                  <Image src={wheelChair} alt='accessible-bus' />
                )}
              </div>
              <div>
                <div className='w-[200px] overflow-hidden text-ellipsis text-sm font-bold'>
                  {stop.RouteName[routeLocale]}
                </div>
                <div className='text-xs leading-5 text-gray-600'>
                  <span>{stop[`DepartureStopName${stopNameLocale}`]}</span> -{' '}
                  <span>{stop[`DestinationStopName${stopNameLocale}`]}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <span className='text-xs leading-5 text-gray-600'>{city}</span>
              <div className='flex h-[24px] w-[24px] items-center justify-center'>
                <Image src={rightArrow} alt='' />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
