'use client'
import { useState } from 'react'
import Image from 'next/image'
import menuIcon from '../../public/menu.svg'
import menuStyle from '../../public/hamburger-style.svg'
import closeIcon from '../../public/close-style3.svg'
import menuStyle2 from '../../public/hamburger-style2.svg'

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
          <div
            onClick={handleMenuClick}
            className='bg-gray-gradients absolute right-0 top-0 z-50 h-[60px] w-[64px] cursor-pointer overflow-hidden rounded-bl-[60px] shadow-md'
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
            <ul className='text-gray-white'>
              <li>回首頁</li>
              <li>公車快找</li>
              <li>該搭哪台公車</li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}
