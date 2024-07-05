import InfoPanel from '@/components/InfoPanel'
import SideMenu from '@/components/SideMenu'

type InfoProps = {
  params: {
    locale: string
  }
}

const tabStatus = {
  active: 'h-[3px] rounded-t-[3px] absolute bottom-0 w-full bg-primary-default',
  normal: 'h-[1px] absolute bottom-0 w-full bg-primary-default opacity-30',
}

function BusTime({ last = false, time = '', coming = false, near = false }) {
  if (time && !coming) {
    return (
      <span className='text-base font-bold text-primary-default'>
        {time}
        <span className='font-normal text-gray-600'> 分</span>
      </span>
    )
  }
  if (coming && time) {
    return <span className='text-red-100 text-base'>{time} 分</span>
  }
  if (near) {
    return <span className='text-red-100 text-base'>進站中</span>
  }
  if (last) {
    return (
      <span className='rounded-[4px] bg-gray-500 px-[6px] py-[6px] text-[10px] text-gray-white'>
        末班已過
      </span>
    )
  }
}

function BusLocation({ current = false, start = false, end = false,  }) {
  if (current) {
    return (
      <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
        <span className='inline-block h-[11px] w-[11px] rounded-[50%] bg-primary-default'></span>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
      </div>
    )
  }
  if (start) {
    return (
      <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
        <span className='bg-transparent inline-block h-[50%] w-[1px]'></span>
        <span className='inline-block h-[11px] w-[11px] rounded-[50%] border-[1px] border-gray-400'></span>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
      </div>
    )
  }
  if (end) {
    return (
      <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
        <span className='inline-block h-[11px] w-[11px] rounded-[50%] border-[1px] border-gray-400'></span>
        <span className='inline-block h-[50%] w-[1px] bg-transparent'></span>
      </div>
    )
  }
  return (
    <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
      <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
      <span className='inline-block h-[11px] w-[11px] rounded-[50%] border-[1px] border-gray-400'></span>
      <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
    </div>
  )
}

function StopItem() {
  return (
    <>
      <div className='border-gray-300 relative flex h-[60px] gap-x-[10px] border-b-[1px]'>
        <div className='flex w-[73px] items-center justify-center'>
          <BusTime last />
        </div>
        <div className='flex w-full items-center text-sm'>1.瑞豐站</div>
        <BusLocation />
      </div>
      <div className='border-gray-300 relative flex h-[60px] gap-x-[10px] border-b-[1px]'>
        <div className='flex w-[73px] items-center justify-center'>
          <BusTime near />
        </div>
        <div className='flex w-full items-center text-sm'>2.永豐路口</div>
        <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
          <span className='bg-gray-400 inline-block h-[50%] w-[1px]'></span>
          <span className='inline-block h-[11px] w-[11px] rounded-[50%] bg-primary-default'></span>
          <span className='bg-gray-400 inline-block h-[50%] w-[1px]'></span>
        </div>
      </div>
      <div className='border-gray-300 relative flex h-[60px] gap-x-[10px] border-b-[1px]'>
        <div className='flex w-[73px] items-center justify-center'>
          <BusTime time='1' coming />
        </div>
        <div className='flex w-full items-center text-sm'>3.岡山市場</div>
        <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
          <span className='bg-gray-400 inline-block h-[50%] w-[1px]'></span>
          <span className='border-gray-400 inline-block h-[11px] w-[11px] rounded-[50%] border-[1px]'></span>
          <span className='bg-gray-400 inline-block h-[50%] w-[1px]'></span>
        </div>
      </div>
      <div className='border-gray-300 relative flex h-[60px] gap-x-[10px] border-b-[1px]'>
        <div className='flex w-[73px] items-center justify-center'>
          <BusTime time='3' />
        </div>
        <div className='flex w-full items-center text-sm'>3.岡山市場</div>
        <div className='absolute right-1 top-[50%] flex h-full translate-y-[-50%] flex-col items-center'>
          <span className='bg-gray-400 inline-block h-[50%] w-[1px]'></span>
          <span className='border-gray-400 inline-block h-[11px] w-[11px] rounded-[50%] border-[1px]'></span>
          <span className='bg-gray-400 inline-block h-[50%] w-[1px]'></span>
        </div>
      </div>
    </>
  )
}

export default function Info({ params: { locale } }: InfoProps) {
  return (
    <div>
      <SideMenu locale={locale} />
      <InfoPanel>
        <div className='px-[20px] py-[10px]'>
          <div className='mb-[10px] text-2xl text-gray-800'>100百貨幹線</div>
          <div>
            <div className='flex h-[40px] w-[100%]'>
              <div className='relative flex w-[50%] items-center justify-center text-xs'>
                高雄車站(中山路)
                <span className={tabStatus.active}></span>
              </div>
              <div className='relative flex w-[50%] items-center justify-center text-xs text-gray-500'>
                瑞豐站(瑞榮路)
                <span className={tabStatus.normal}></span>
              </div>
            </div>
          </div>
          <div>
            <StopItem />
          </div>
        </div>
      </InfoPanel>
    </div>
  )
}
