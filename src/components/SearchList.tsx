'use client'
import Image from 'next/image'
import clockIcon from '../../public/clock-icon.svg'
import rightArrow from '../../public/right-arrow.svg'
import wheelChair from '../../public/wheelchair-icon.svg'

type Obj = {
  [key: string]: any
}

type Type = 'history' | 'result'

export default function SearchList({
  data,
  type
}: {
  data: Array<Obj>
  type: Type
}) {
  return (
    <div>
      {type === 'result' && (!data || data?.length === 0) && (
        <div className='mt-[22px] flex w-[100%] justify-center text-center text-base leading-7 text-gray-600'>
          唉呀!查無結果
          <br />
          請重新搜尋關鍵字或切換縣市
        </div>
      )}
      {data?.map((stop, index) => {
        return (
          <div
            key={index}
            className='my-[6px] flex justify-between border-b-[1px] border-solid border-[#E0E0E0] py-[6px]'
          >
            <div className='flex'>
              <div className='flex h-[24px] w-[24px] items-center justify-center'>
                {type === 'history' && <Image src={clockIcon} alt='' />}
                {type === 'result' && stop.accessible && (
                  <Image src={wheelChair} alt='accessible-bus' />
                )}
              </div>
              <div>
                <div className='w-[200px] overflow-hidden text-ellipsis text-sm font-bold'>
                  {stop.RouteName.Zh_tw}
                </div>
                <div className='text-xs leading-5 text-gray-600'>
                  <span>{stop.start}</span> - <span>{stop.end}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <span className='text-xs leading-5 text-gray-600'>
                {stop.region}
              </span>
              <div className='flex h-[24px] w-[24px] items-center justify-center'>
                <Image src={rightArrow} alt='' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
