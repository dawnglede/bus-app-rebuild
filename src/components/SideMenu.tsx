'use client'
import { useState } from 'react'
import Image from 'next/image'
import menuIcon from '../../public/menu.svg'
import menuStyle from '../../public/hamburger-style.svg'
import closeIcon from '../../public/close-style3.svg'
import menuStyle2 from '../../public/hamburger-style2.svg'
import Link from 'next/link'

export default function SideMenu() {
  const [isShow, setIsShow] = useState<boolean>(false)
  const handleMenuClick = () => {
    setIsShow((prev) => !prev)
  }
  return (
    <>
      {!isShow && (
        <div
          onClick={handleMenuClick}
          className='absolute right-0 top-0 z-50 h-[60px] w-[64px] cursor-pointer overflow-hidden rounded-bl-[60px] bg-primary-gradients-dark shadow-md'
        >
          <Image src={menuStyle} className='absolute left-0 top-0' alt='' />
          <Image
            src={menuIcon}
            className='absolute right-[17px] top-[18px]'
            alt='menu'
          />
        </div>
      )}
      {isShow && (
        <>
          <div className='bg-[#000000] opacity-30 fixed top-0 left-[50%] min-w-[512px] z-10 h-[100%] translate-x-[-50%]'></div>
          <div
            onClick={handleMenuClick}
            className='bg-gray-gradients absolute right-0 top-0 z-50 h-[60px] w-[64px] cursor-pointer overflow-hidden rounded-bl-[60px] shadow-md z-30'
          >
            <Image src={menuStyle2} className='absolute left-0 top-0' alt='' />
            <Image
              src={closeIcon}
              className='absolute right-[17px] top-[18px]'
              alt='menu'
            />
          </div>
          <div className='absolute right-0 top-0 z-40 min-h-[475px] w-[235px] overflow-hidden rounded-bl-[180px] bg-primary-gradients'>
            <div className='absolute right-[-185px] top-[63px] h-[441px] w-[441px] rounded-full bg-[#ffffff]/10'></div>
            <ul className='absolute text-gray-white text-[20px] top-[110px] right-[40px] text-right'>
              <Link href='/' className='block cursor-pointer mb-[40px]'>回首頁</Link>
              <li className='cursor-pointer mb-[40px]'>公車快找</li>
              <li className='cursor-pointer mb-[40px]'>查詢公車</li>
              <li className='cursor-pointer mb-[40px]'>該搭哪台公車</li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}
