'use client'
import dynamic from 'next/dynamic'
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
import { LatLngExpression } from 'leaflet'
import { useRouter } from 'next/navigation'
const Map = dynamic(() => import('@/components/Map'), { ssr: false })

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div
          role='status'
          className='fixed left-[50%] top-[50%] z-[2000] translate-x-[-50%] translate-y-[-50%]'
        >
          <svg
            aria-hidden='true'
            className='inline h-8 w-8 animate-spin fill-primary-default text-gray-200 dark:text-gray-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
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
