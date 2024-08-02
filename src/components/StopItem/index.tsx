type BusTime = {
  last?: boolean
  time?: number | null
  coming?: boolean | 0 | null
  near?: boolean | 0 | null
}

export type StopItemProps = {
  stopName: string
  stopUID: string | number
  busLocation?: {
    current?: boolean
    start?: boolean
    end?: boolean
  }
  busTime?: {
    time?: string
    last?: boolean
    coming?: boolean
    near?: boolean
  }
}

function BusTime({
  last = false,
  time = null,
  coming = false,
  near = false,
}: BusTime) {
  if (time && !coming) {
    return (
      <span className='text-base font-bold text-primary-default'>
        {time}
        <span className='font-normal text-gray-600'> 分</span>
      </span>
    )
  }
  if (coming && time) {
    return <span className='text-base text-red-100'>{time ?? ''} 分</span>
  }
  if (near) {
    return <span className='text-base text-red-100'>進站中</span>
  }
  if (last) {
    return (
      <span className='rounded-[4px] bg-gray-500 px-[6px] py-[6px] text-[10px] text-gray-white'>
        末班已過
      </span>
    )
  }
}

function BusLocation({ current = false, start = false, end = false }) {
  if (current) {
    return (
      <div className='absolute right-1 top-[50%] flex h-full flex-col items-center translate-y-[-50%]'>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
        <span className='inline-block h-[11px] w-[11px] rounded-[50%] bg-primary-default'></span>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
      </div>
    )
  }
  if (start) {
    return (
      <div className='absolute right-1 top-[50%] flex h-full flex-col items-center translate-y-[-50%]'>
        <span className='bg-transparent inline-block h-[50%] w-[1px]'></span>
        <span className='inline-block h-[11px] w-[11px] rounded-[50%] border-[1px] border-gray-400'></span>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
      </div>
    )
  }
  if (end) {
    return (
      <div className='absolute right-1 top-[50%] flex h-full flex-col items-center translate-y-[-50%]'>
        <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
        <span className='inline-block h-[11px] w-[11px] rounded-[50%] border-[1px] border-gray-400'></span>
        <span className='bg-transparent inline-block h-[50%] w-[1px]'></span>
      </div>
    )
  }
  return (
    <div className='absolute right-1 top-[50%] flex h-full flex-col items-center translate-y-[-50%]'>
      <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
      <span className='inline-block h-[11px] w-[11px] rounded-[50%] border-[1px] border-gray-400'></span>
      <span className='inline-block h-[50%] w-[1px] bg-gray-400'></span>
    </div>
  )
}

// {
//   stopName: '1.高雄車站(中山路)',
//   id: 1,
//   busLocation: {
//     start: true,
//   },
//   busTime: {
//     time: '3',
//   },
// }

export function StopItem({
  items,
  busTime,
}: {
  items: Array<StopItemProps> | []
  busTime: Record<string, any>
}) {
  if (!items.length) return null
  return (
    <>
      {items.map((item) => {
        const EstimateTime = busTime?.[item.stopUID]?.EstimateTime
        const secondToMiunte = EstimateTime
          ? Math.floor(EstimateTime / 60)
          : null
        const timeInfo = {
          time: secondToMiunte && secondToMiunte < 60 ? secondToMiunte : null,
          last: false,
          coming: secondToMiunte && secondToMiunte <= 2,
          near: secondToMiunte && secondToMiunte <= 1,
        }
        return (
          <div
            key={item.stopUID}
            className='relative flex h-[60px] gap-x-[10px] border-b-[1px] border-gray-300'
          >
            <div className='flex w-[73px] items-center justify-center'>
              <BusTime {...timeInfo} />
            </div>
            <div className='flex w-full items-center text-sm'>
              {item.stopName}
            </div>
            <BusLocation {...(item?.busLocation ?? {})} />
          </div>
        )
      })}
    </>
  )
}

export function sortStopInfo(data: Array<any>) {
  return data.map((stop, index) => ({
    lat: stop.StopPosition.PositionLat,
    lng: stop.StopPosition.PositionLon,
    start: index === 0,
    end: index === data.length - 1,
  }))
}

export function createStopItem(data: Array<any>, locale: string = 'Zh_tw') {
  return data.map((stop, index) => ({
    stopName: stop.StopName[locale],
    stopUID: stop.StopUID,
    busLocation: {
      start: index === 0,
      end: index === data.length - 1,
    },
  }))
}
