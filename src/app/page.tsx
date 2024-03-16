'use client'

import NavBar from '@/components/NavBar'
import btnIcon1 from '../../public/Index-section-image04_m.svg'
import btnIcon2 from '../../public/Index-section-image01_m.svg'
import btnIcon3 from '../../public/Index-section-image02_m.svg'
import Image from 'next/image'
import Location from '@/components/Location'
import useToken from '@/hooks/useToken'
import { useEffect } from 'react'
import useStore from '@/store/useStore'
import Link from 'next/link'

export default function Home() {
  const { refreshToken, hasToken, token } = useToken()
  const { updateToken } = useStore()
  useEffect(() => {
    if (hasToken && token) updateToken(token)
  }, [hasToken])
  return (
    <>
      <NavBar />
      <main className='mb-[58px] mt-[24px] flex flex-col items-center gap-3'>
        <div className='relative h-[80px] w-[334px] cursor-pointer pr-[6px] pt-[9px]'>
          <div className='flex h-full w-full flex-col justify-center rounded-[4px] bg-gray-white pl-[15px] shadow-card'>
            <Link
              href='/searchBus'
              className='text-base font-bold leading-7 text-primary-850'
            >
              公車快找
            </Link>
            <div className='text-xs leading-5 text-gray-600'>
              直接輸入路線名稱獲得資訊！
            </div>
            <Image src={btnIcon1} alt='' className='absolute right-0 top-0' />
          </div>
        </div>
        <div className='relative h-[80px] w-[334px] pr-[6px] pt-[9px]'>
          <div className='flex h-full w-full cursor-pointer flex-col justify-center rounded-[4px] bg-gray-white pl-[15px] shadow-card'>
            <div className='text-base font-bold leading-7 text-primary-850'>
              查詢站牌
            </div>
            <div className='text-xs leading-5 text-gray-600'>
              附近站牌 / 公車動態及路線圖
            </div>
            <Image src={btnIcon2} alt='' className='absolute right-0 top-0' />
          </div>
        </div>
        <div className='relative h-[80px] w-[334px] pr-[6px] pt-[9px]'>
          <div className='flex h-full w-full cursor-pointer flex-col justify-center rounded-[4px] bg-gray-white pl-[15px] shadow-card'>
            <div className='text-base font-bold leading-7 text-primary-850'>
              推薦公車路線
            </div>
            <div className='text-xs leading-5 text-gray-600'>
              依起點及目的地搜尋路線
            </div>
            <Image src={btnIcon3} alt='' className='absolute right-0 top-0' />
          </div>
        </div>
      </main>
      <Location />
      <div className='fixed bottom-0 w-full'>
        <div className='bottom-0 h-[36px] w-full rounded-tl-[60px] bg-primary-700 text-gray-white'></div>
      </div>
    </>
  )
}
