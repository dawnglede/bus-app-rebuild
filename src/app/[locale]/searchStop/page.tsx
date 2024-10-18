'use client'
import dynamic from 'next/dynamic'
import SideMenu from '@/components/SideMenu'
import StopList from './stopList'
import { Drawer } from '@/components/drawer/Drawer'
import { useEffect, useState } from 'react'
import useLocation from '@/hooks/useLocation'
import Spinner from '@/components/Spinner'
const Map = dynamic(() => import('@/components/Map'), { ssr: false })

type Stop = {
  StationPosition: {
    PositionLat: number
    PositionLon: number
  }
  StationName: {
    Zh_tw: string
  }
}

type SearchStopProps = {
  params: { locale: string }
}

export default function SearchStop({ params: { locale } }: SearchStopProps) {
  const [stops, setStops] = useState([])
  const [expanded, setExpanded] = useState(false)
  const { position } = useLocation()
  useEffect(() => {
    const getStopByPosition = async (position: GeolocationCoordinates) => {
      const { latitude, longitude } = position
      const res = await fetch('/api/getStopByPosition', {
        body: JSON.stringify({ latitude, longitude }),
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        setStops(data.data)
      }
    }
    if (position && stops.length === 0) {
      getStopByPosition(position)
    }
  }, [position, stops])

  return (
    <>
      <SideMenu locale={locale} />
      <div>
        {position && stops.length > 0 ? (
          <Map
            type='pin'
            locations={stops.map((stop: Stop) => ({
              lat: stop.StationPosition.PositionLat,
              lng: stop.StationPosition.PositionLon,
              name: stop.StationName.Zh_tw,
            }))}
            zoom={20}
            center={[position?.latitude || 0, position?.longitude || 0]}
          />
        ) : (
          <Spinner size='large' />
        )}
      </div>
      <div>
        <Drawer header={<div></div>} expanded={expanded} onChange={setExpanded}>
          {stops.length > 0 ? (
            <StopList data={stops} />
          ) : (
            <Spinner size='medium' />
          )}
        </Drawer>
      </div>
    </>
  )
}
