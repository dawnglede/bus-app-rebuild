'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import useMap, { Location } from '@/hooks/useMap'
import { Drawer } from '@/components/drawer/Drawer'
import {
  createStopItem,
  sortStopInfo,
  StopItemProps,
  StopItem,
} from '@/components/StopItem'

type TabStyle = {
  [key: string]: string
}

const tabStyle: TabStyle = {
  active: 'h-[3px] rounded-t-[3px] absolute bottom-0 w-full bg-primary-default',
  normal: 'h-[1px] absolute bottom-0 w-full bg-primary-default opacity-30',
}

export default function Info({ locale }: { locale: string }) {
  const [tabStatus, setTabStatus] = useState({
    left: 'active',
    right: 'normal',
  })
  const language = locale === 'en' ? 'En' : 'Zh_tw'
  const [expanded, setExpanded] = useState(false)
  const [departureStopLocation, setDepartureStopLocation] = useState<
    Array<Location & google.maps.LatLngLiteral> | []
  >([])
  const [returningStopLocation, setReturningStopLocation] = useState<
    Array<Location & google.maps.LatLngLiteral> | []
  >([])
  const [departureStopInfo, setDepartureStopInfo] = useState<
    Array<StopItemProps> | []
  >([])
  const [returningStopInfo, setReturningStopInfo] = useState<
    Array<StopItemProps> | []
  >([])
  const [routeName, setRouteName] = useState('')
  const [busLocation, setBusLocation] = useState<Array<Record<string, string>>>(
    [],
  )
  useMap({
    // locations: [
    //   { lat: 22.6273, lng: 120.3014, start: true },
    //   { lat: 21.6273, lng: 119.3014, end: true },
    // ],
    locations:
      tabStatus.left === 'active'
        ? departureStopLocation
        : returningStopLocation,
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
        setDepartureStopInfo(createStopItem(departure[0].Stops, language))
        setDepartureStopLocation(sortStopInfo(departure[0].Stops))
        const returning = data.data.filter(
          (item: { Direction: number }) => item.Direction === 1,
        )
        setReturningStopLocation(sortStopInfo(returning[0].Stops))
        setReturningStopInfo(createStopItem(returning[0].Stops, language))
      }
    }
    const getBusLocation = async () => {
      const res = await fetch(location.origin + '/api/getArrivalTime', {
        body: JSON.stringify({ city: 'Taipei', routeUID: 'TPE10132' }),
        method: 'POST',
      })
      if (res.ok) {
        const data = (await res.json()).data
        const departureTime: Record<string, any> = {}
        const returningTime: Record<string, any> = {}
        data
          .filter((item: { Direction: number }) => item.Direction === 0)
          .forEach((item: { StopUID: string; EstimateTime: string }) => {
            departureTime[item.StopUID] = {
              EstimateTime: item.EstimateTime,
            }
          })
        data
          .filter((item: { Direction: number }) => item.Direction === 1)
          .forEach((item: { StopUID: string; EstimateTime: string }) => {
            returningTime[item.StopUID] = {
              EstimateTime: item.EstimateTime,
            }
          })
        setBusLocation([departureTime, returningTime])
      }
    }
    Promise.all([getBusStop(), getBusLocation()])
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
                  {departureStopInfo[0]?.stopName ?? ''}
                  <span className={tabStyle[tabStatus.left]}></span>
                </div>
                <div
                  className={`relative flex w-[50%] items-center justify-center text-xs ${
                    tabStatus.right === 'normal' &&
                    'cursor-pointer text-gray-500'
                  }`}
                  onClick={() => onTabClick('right')}
                >
                  {returningStopInfo[0]?.stopName ?? ''}
                  <span className={tabStyle[tabStatus.right]}></span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <StopItem
              items={
                tabStatus.left === 'active'
                  ? departureStopInfo
                  : returningStopInfo
              }
              busTime={
                tabStatus.left === 'active' ? busLocation[0] : busLocation[1]
              }
            />
          </div>
        </div>
      </Drawer>
    </div>
  )
}
