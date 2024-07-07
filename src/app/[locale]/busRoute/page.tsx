'use client'
import useMap from '@/hooks/useMap'

export default function BusRoute() {
  const getMap = useMap({
    locations: [
      { lat: 25.033964, lng: 121.564472 },
      { lat: 25.0585, lng: 121.52014 }
    ]
  })
  return (
    <div>
      <div id='map' className='h-[100vh] w-[100%]'></div>
    </div>
  )
}
