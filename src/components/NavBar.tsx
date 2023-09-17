import headerDecoIcon from '../../public/header-deco-icon.svg'
import headerLogo from '../../public/Index-header-logo.svg'
import Image from 'next/image'

export default function NavBar() {
  return (
    <div className='relative flex h-[100px] flex-col items-end justify-center rounded-bl-[60px] bg-primary-gradients-deep pr-[24px] text-gray-200 shadow-md'>
      <Image className='absolute left-4 top-[2px]' src={headerLogo} alt='' />
      <Image
        className='absolute bottom-0 right-0'
        src={headerDecoIcon}
        alt=''
      />
      <div className='text-2xl'>機智公車族+</div>
      <div className='text-sm font-light'>全台公車動態時刻查詢應用服務</div>
    </div>
  )
}
