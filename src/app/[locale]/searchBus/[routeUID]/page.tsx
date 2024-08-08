'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Location } from '@/components/Map'
import { Drawer } from '@/components/drawer/Drawer'
import {
  createStopItem,
  sortStopInfo,
  StopItemProps,
  StopItem,
} from '@/components/StopItem'
import Map from '@/components/Map'
import { LatLngExpression } from 'leaflet'
import { useRouter } from 'next/navigation'

type TabStyle = {
  [key: string]: string
}

const tabStyle: TabStyle = {
  active: 'h-[3px] rounded-t-[3px] absolute bottom-0 w-full bg-primary-default',
  normal: 'h-[1px] absolute bottom-0 w-full bg-primary-default opacity-30',
}

export default function Info({
  params: { routeUID, locale },
  searchParams: { city },
}: {
  params: { routeUID: string; locale: string }
  searchParams: { city: string }
}) {
  const router = useRouter()
  const [tabStatus, setTabStatus] = useState({
    left: 'active',
    right: 'normal',
  })
  const language = locale === 'en' ? 'En' : 'Zh_tw'
  const [expanded, setExpanded] = useState(false)
  const [departureStopLocation, setDepartureStopLocation] = useState<
    Array<Location> | []
  >([])
  const [returningStopLocation, setReturningStopLocation] = useState<
    Array<Location> | []
  >([])
  const [departureRouteLine, setDepartureRouteLine] = useState<
    LatLngExpression[][] | []
  >([])
  const [returningRouteLine, setReturningRouteLine] = useState<
    LatLngExpression[][] | []
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
        body: JSON.stringify({ city, routeUID }),
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        setRouteName(data.data[0].RouteName.Zh_tw)
        const departure = data.data.filter(
          (item: { Direction: number }) => item.Direction === 0,
        )
        setDepartureStopInfo(
          createStopItem(departure[0]?.Stops ?? [], language),
        )
        setDepartureStopLocation(sortStopInfo(departure[0]?.Stops ?? []))
        const returning = data.data.filter(
          (item: { Direction: number }) => item.Direction === 1,
        )
        setReturningStopLocation(sortStopInfo(returning[0]?.Stops ?? []))
        setReturningStopInfo(
          createStopItem(returning[0]?.Stops ?? [], language),
        )
      }
    }
    const getBusLocation = async () => {
      const res = await fetch(location.origin + '/api/getArrivalTime', {
        body: JSON.stringify({ city, routeUID }),
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
    const getGeoShape = async () => {
      const res = await fetch(location.origin + '/api/getGeoShape', {
        body: JSON.stringify({ city, routeUID }),
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        const departure = data.data
          .filter((item: { Direction: number }) => item.Direction === 0)[0]
          ?.Geometry.replace('LINESTRING', '')
          .replace('(', '')
          .replace(')', '')
          .split(',')
        const returning = data.data
          .filter((item: { Direction: number }) => item.Direction === 1)[0]
          ?.Geometry.replace('LINESTRING', '')
          .replace('(', '')
          .replace(')', '')
          .split(',')
        setDepartureRouteLine(
          departure?.map((node: string) => {
            const [lon, lat] = node.trim().split(' ')
            return [parseFloat(lat), parseFloat(lon)]
          }) ?? [],
        )
        setReturningRouteLine(
          returning?.map((node: string) => {
            const [lon, lat] = node.trim().split(' ')
            return [parseFloat(lat), parseFloat(lon)]
          }) ?? [],
        )
      }
    }
    Promise.all([getBusStop(), getBusLocation(), getGeoShape()])
  }, [])

  return (
    <div>
      <div
        className='absolute left-[16px] top-[16px] z-[2000] flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-[22px] bg-gray-white px-[10px] py-[10px] shadow-md'
        onClick={() => router.back()}
      >
        <Image
          src='/back-icon.svg'
          className='h-full w-full'
          alt='back'
          width={0}
          height={0}
        />
      </div>
      {departureStopLocation.length > 0 || returningStopLocation.length > 0 ? (
        <Map
          type='pinWithLine'
          locations={
            tabStatus.left === 'active'
              ? departureStopLocation
              : returningStopLocation
          }
          routeLine={
            tabStatus.left === 'active'
              ? departureRouteLine
              : returningRouteLine
          }
        />
      ) : (
        <svg
          className='absolute left-[50%] top-[50%] h-[20px] w-[20px] animate-spin translate-x-[-50%] translate-y-[-50%]'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
        </svg>
      )}
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
