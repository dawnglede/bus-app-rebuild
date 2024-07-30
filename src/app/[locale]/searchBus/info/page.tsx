'use client'
import InfoPanel from '@/components/InfoPanel'
import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import useMap, { Location } from '@/hooks/useMap'
import { Drawer } from '@/components/drawer/Drawer'
import getBusStop from '../../../api/getBusStop'

type TabStyle = {
  [key: string]: string
}

const tabStyle: TabStyle = {
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
    return <span className='text-base text-red-100'>{time} 分</span>
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

type StopItemProps = {
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

function StopItem({ items }: { items: Array<StopItemProps> | [] }) {
  if (!items.length) return null
  return (
    <>
      {/* <div className='relative flex h-[60px] gap-x-[10px] border-b-[1px] border-gray-300'>
        <div className='flex w-[73px] items-center justify-center'>
          <BusTime last />
        </div>
        <div className='flex w-full items-center text-sm'>{stopName}</div>
        <BusLocation />
      </div> */}
      {items.map((item) => (
        <div
          key={item.stopUID}
          className='relative flex h-[60px] gap-x-[10px] border-b-[1px] border-gray-300'
        >
          <div className='flex w-[73px] items-center justify-center'>
            <BusTime {...item.busTime} />
          </div>
          <div className='flex w-full items-center text-sm'>
            {item.stopName}
          </div>
          <BusLocation {...(item?.busLocation ?? {})} />
        </div>
      ))}
    </>
  )
}

const items = [
  {
    stopName: '1.高雄車站(中山路)',
    id: 1,
    busLocation: {
      start: true,
    },
    busTime: {
      time: '3',
    },
  },
  {
    stopName: '2.高雄車站(中山路)',
    id: 2,
    busTime: {
      coming: true,
      time: '1',
    },
  },
  {
    stopName: '3.高雄車站(中山路)',
    id: 3,
    busLocation: {
      current: true,
    },
    busTime: {
      near: true,
    },
  },
  {
    stopName: '4.高雄車站(中山路)',
    id: 4,
    busLocation: {
      end: true,
    },
    busTime: {
      time: '3',
    },
  },
  {
    stopName: '4.高雄車站(中山路)',
    id: 5,
    busLocation: {
      end: true,
    },
    busTime: {
      time: '3',
    },
  },
  {
    stopName: '4.高雄車站(中山路)',
    id: 6,
    busLocation: {
      end: true,
    },
    busTime: {
      time: '3',
    },
  },
]

function sortStopInfo(data: Array<any>) {
  return data.map((stop, index) => ({
    lat: stop.StopPosition.PositionLat,
    lng: stop.StopPosition.PositionLon,
    start: index === 0,
    end: index === data.length - 1,
  }))
}

function createStopItem(data: Array<any>) {
  return data.map((stop, index) => ({
    stopName: stop.StopName.Zh_tw,
    stopUID: stop.StopUID,
    busLocation: {
      start: index === 0,
      end: index === data.length - 1,
    },
    busTime: {},
  }))
}

export default function Info() {
  const [tabStatus, setTabStatus] = useState({
    left: 'active',
    right: 'normal',
  })
  const [expanded, setExpanded] = useState(false)
  const [departureStop, setDepartureStop] = useState<
    Array<Location & google.maps.LatLngLiteral> | []
  >([])
  const [returningStop, setReturningStop] = useState<
    Array<Location & google.maps.LatLngLiteral> | []
  >([])
  const [departStopItem, setDepartStopItem] = useState<
    Array<StopItemProps> | []
  >([])
  const [returningStopItem, setReturningStopItem] = useState<
    Array<StopItemProps> | []
  >([])
  const [routeName, setRouteName] = useState('')
  useMap({
    // locations: [
    //   { lat: 22.6273, lng: 120.3014, start: true },
    //   { lat: 21.6273, lng: 119.3014, end: true },
    // ],
    locations: tabStatus.left === 'active' ? departureStop : returningStop,
  })

  const onTabClick = (tab: string) => {
    if (tab === 'left') {
      setTabStatus({
        left: 'active',
        right: 'normal',
      })
    }
    if (tab === 'right') {
      setTabStatus({
        left: 'normal',
        right: 'active',
      })
    }
  }
  useEffect(() => {
    const getBusStop = async () => {
      const res = await fetch(location.origin + '/api/getBusStop', {
        body: JSON.stringify({ city: 'Taipei', routeUID: 'TPE10132' }),
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        setRouteName(data.data[0].RouteName.Zh_tw)
        const departure = data.data.filter(
          (item: { Direction: number }) => item.Direction === 0,
        )
        setDepartStopItem(createStopItem(departure[0].Stops))
        setDepartureStop(sortStopInfo(departure[0].Stops))
        const returning = data.data.filter(
          (item: { Direction: number }) => item.Direction === 1,
        )
        setReturningStop(sortStopInfo(returning[0].Stops))
        setReturningStopItem(createStopItem(returning[0].Stops))
      }
    }
    // getBusStop({ city: 'Taipei', routeUID: 'TPE10132' }).then((res) => {
    //   const departure = res.filter((item) => item.Direction === 0)
    //   departure[0].Stops.map((stop) => ({lan: stop.StopPosition.PositionLat, lng: stop.StopPosition.PositionLon}))
    // })
    getBusStop()
  }, [])
  return (
    <div>
      <div id='map' className='h-[100vh] w-full'></div>
      <Drawer header={<div></div>} expanded={expanded} onChange={setExpanded}>
        <div className='px-[20px] py-[10px]'>
          <div className=''>
            <div className='mb-[10px] flex items-start justify-between'>
              <div className='text-2xl text-gray-800'>{routeName}</div>
              <Image
                src='/info-icon.svg'
                alt='info'
                width={21}
                height={21}
                className='cursor-pointer'
              />
            </div>
            <div>
              <div className='flex h-[40px] w-[100%]'>
                <div
                  className={`relative flex w-[50%] items-center justify-center text-xs ${
                    tabStatus.left === 'normal' &&
                    'cursor-pointer text-gray-500'
                  }`}
                  onClick={() => onTabClick('left')}
                >
                  {departStopItem[0]?.stopName ?? ''}
                  <span className={tabStyle[tabStatus.left]}></span>
                </div>
                <div
                  className={`relative flex w-[50%] items-center justify-center text-xs ${
                    tabStatus.right === 'normal' &&
                    'cursor-pointer text-gray-500'
                  }`}
                  onClick={() => onTabClick('right')}
                >
                  {returningStopItem[0]?.stopName ?? ''}
                  <span className={tabStyle[tabStatus.right]}></span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <StopItem
              items={
                tabStatus.left === 'active' ? departStopItem : returningStopItem
              }
            />
          </div>
        </div>
      </Drawer>
    </div>
  )
}
