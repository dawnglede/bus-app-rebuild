import { useTranslation } from '@/app/i18n'
import headerDecoIcon from '../../public/header-deco-icon.svg'
import headerLogo from '../../public/Index-header-logo.svg'
import Image from 'next/image'

interface NavBarProps {
  locale: string
}

export default async function NavBar({ locale }: NavBarProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale)
  return (
    <div className='relative flex h-[100px] flex-col items-end justify-center rounded-bl-[60px] bg-primary-gradients-deep pr-[24px] text-gray-200 shadow-md'>
      <Image className='absolute left-4 top-[2px]' src={headerLogo} alt='' />
      <Image
        className='absolute bottom-0 right-0'
        src={headerDecoIcon}
        alt=''
      />
      <div className='text-2xl'>{t('websiteTitle')}</div>
      <div className='text-sm font-light'>{t('websiteSubtitle')}</div>
    </div>
  )
}
