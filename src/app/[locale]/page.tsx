import NavBar from '@/components/NavBar'
import Image from 'next/image'
import Location from '@/components/Location'
import Link from 'next/link'
import { Locale } from '../../../i18n-config'
import { useTranslation } from '../i18n'

interface HomeProps {
  params: {
    locale: Locale
  }
}

export default async function Home({ params: { locale } }: HomeProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale)
  return (
    <>
      <NavBar locale={locale} />
      <main className='mb-[58px] mt-[24px] flex flex-col items-center gap-3'>
        <Link
          href={`/${locale}/searchBus`}
          className='relative block h-[80px] w-[334px] cursor-pointer pr-[6px] pt-[9px]'
        >
          <div className='flex h-full w-full flex-col justify-center rounded-[4px] bg-gray-white pl-[15px] pr-[70px] shadow-card'>
            <div className='text-base font-bold leading-7 text-primary-850'>
              {t('nav1')}
            </div>
            <div className='text-xs leading-5 text-gray-600'>
              {t('nav1-desc')}
            </div>
            <Image
              src='/Index-section-image04_m.svg'
              alt=''
              className='absolute right-0 top-0 h-[auto] w-[auto]'
              width={0}
              height={0}
            />
          </div>
        </Link>
        <div className='relative h-[80px] w-[334px] pr-[6px] pt-[9px]'>
          <div className='flex h-full w-full cursor-pointer flex-col justify-center rounded-[4px] bg-gray-white pl-[15px] shadow-card'>
            <div className='text-base font-bold leading-7 text-primary-850'>
              {t('nav2')}
            </div>
            <div className='text-xs leading-5 text-gray-600'>
              {t('nav2-desc')}
            </div>
            <Image
              src='/Index-section-image01_m.svg'
              alt=''
              className='absolute right-0 top-0 h-[auto] w-[auto]'
              width={0}
              height={0}
            />
          </div>
        </div>
        {/* <div className='relative h-[80px] w-[334px] pr-[6px] pt-[9px]'>
          <div className='flex h-full w-full cursor-pointer flex-col justify-center rounded-[4px] bg-gray-white pl-[15px] shadow-card'>
            <div className='text-base font-bold leading-7 text-primary-850'>
              推薦公車路線
            </div>
            <div className='text-xs leading-5 text-gray-600'>
              依起點及目的地搜尋路線
            </div>
            <Image src='/Index-section-image02_m.svg' alt='' className='absolute right-0 top-0 w-[auto] h-[auto]' width={0} height={0}/>
          </div>
        </div> */}
      </main>
      <Location locale={locale} />
      <div className='fixed bottom-0 w-full max-w-[512px]'>
        <div className='bottom-0 h-[36px] w-full rounded-tl-[60px] bg-primary-700 text-gray-white'></div>
      </div>
    </>
  )
}
