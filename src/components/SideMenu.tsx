'use client'
import { useState } from 'react'
import Image from 'next/image'
import menuIcon from '../../public/menu.svg'
import menuStyle from '../../public/hamburger-style.svg'
import closeIcon from '../../public/close-style3.svg'
import menuStyle2 from '../../public/hamburger-style2.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/i18n/clients'

export default function SideMenu({ locale }: { locale: string }) {
  const pathname = usePathname()
  const { t } = useTranslation(locale)
  const [isShow, setIsShow] = useState<boolean>(false)
  const handleMenuClick = () => {
    setIsShow((prev) => !prev)
  }
  const changeLanPathname = (lng: string) => {
    const splitPathname = pathname.split('/')
    splitPathname.splice(1, 1, lng)
    return splitPathname.join('/')
  }
  return (
    <>
      {!isShow && (
        <div
          onClick={handleMenuClick}
          className='absolute right-0 top-0 z-[9999] h-[60px] w-[64px] cursor-pointer overflow-hidden rounded-bl-[60px] bg-primary-gradients-dark shadow-md'
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
          <div className='fixed left-[50%] top-0 z-[9999] h-[100%] min-w-[512px] bg-[#000000] opacity-30 translate-x-[-50%]'></div>
          <div
            onClick={handleMenuClick}
            className='absolute right-0 top-0 z-[10000] h-[60px] w-[64px] cursor-pointer overflow-hidden rounded-bl-[60px] bg-gray-gradients shadow-md'
          >
            <Image src={menuStyle2} className='absolute left-0 top-0' alt='' />
            <Image
              src={closeIcon}
              className='absolute right-[17px] top-[18px]'
              alt='menu'
            />
          </div>
          <div className='absolute right-0 top-0 z-[9999] min-h-[475px] w-[235px] overflow-hidden rounded-bl-[180px] bg-primary-gradients'>
            <div className='absolute right-[-185px] top-[63px] h-[441px] w-[441px] rounded-full bg-[#ffffff]/10'></div>
            <ul className='absolute right-[40px] top-[110px] text-right text-[20px] text-gray-white'>
              <Link
                href={`/${locale}`}
                className='mb-[40px] block cursor-pointer'
              >
                {t('back-to-home')}
              </Link>
              <Link
                href={`/${locale}/searchBusRoute`}
                className='mb-[40px] block cursor-pointer'
              >
                {t('nav1')}
              </Link>
              <Link
                href={`/${locale}/searchBusStop`}
                className='mb-[40px] block cursor-pointer'
              >
                {t('nav2')}
              </Link>
              <li>
                <Link
                  href={changeLanPathname('zh-TW')}
                  className='mb-[40px] cursor-pointer'
                >
                  中文
                </Link>
                &nbsp;|&nbsp;
                <Link
                  href={changeLanPathname('en')}
                  className='mb-[40px] cursor-pointer'
                >
                  English
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}
