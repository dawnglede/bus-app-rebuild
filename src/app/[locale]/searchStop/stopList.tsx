type Stop = {
  StopUID: string
  StopName: {
    Zh_tw: string
    En: string
  }
  RouteName: {
    Zh_tw: string
    En: string
  }
  RouteUID: string
}

type Stops = {
  StationUID: string
  StationName: {
    Zh_tw: string
  }
  Stops: Stop[]
  Bearing: string
}

type StopListProps = {
  data: Stops[] | null | undefined
}

export default function StopList({ data = [] }: StopListProps) {
  const convertBearing = (bearing: string) => {
    return {
      E: '東行',
      W: '西行',
      N: '北行',
      S: '南行',
    }[bearing]
  }
  return (
    <div className='grid h-full grid-rows-[35px_auto] px-[20px]'>
      <div className='mb-[15px] text-sm text-gray-500'>附近站牌</div>
      <div className='scroll-style overflow-y-scroll'>
        <div className='mr-[2px]'>
          {data!.length > 0 ? (
            data?.map((item) => (
              <div
                key={item.StationUID}
                className='mb-[10px] rounded-[6px] border-[1px] border-[#C6B7EA] p-[10px]'
              >
                <div className='mb-[5px] flex items-center text-base font-bold text-gray-800'>
                  {item.StationName.Zh_tw}
                  <span className='ml-[6px] rounded-[12px] bg-gray-500 px-[8px] py-[3px] text-xs font-medium text-gray-white'>
                    {convertBearing(item.Bearing)}
                  </span>
                </div>
                <div className='text-xs text-primary-700'>
                  {item.Stops.map((stop) => stop.RouteName.Zh_tw).join('、')}
                </div>
              </div>
            ))
          ) : (
            <div className='mt-[20px] flex justify-center text-gray-500'>
              附近找不到站牌
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
