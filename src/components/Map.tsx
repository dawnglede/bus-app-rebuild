import React, { useMemo, useState, useCallback, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LatLngExpression } from 'leaflet'

export type Location = {
  lat: number
  lng: number
  start?: boolean
  end?: boolean
  name?: string
}

type MapProps = {
  locations: Array<Location> | []
  type?: 'pin' | 'pinWithLine'
  routeLine?: LatLngExpression[][]
  setPosition?: Function
  zoom?: number
  isCenter: boolean
}

type LocationUpdateProps = {
  setPosition?: Function
  zoom: number
}

const LocationUpdate = ({ setPosition, zoom }: LocationUpdateProps) => {
  const map = useMapEvents({
    locationfound(e) {
      console.log(e.latlng)
      if (setPosition) {
        setPosition(e.latlng)
        map?.flyTo(e.latlng, zoom)
      }
    },
    locationerror(e) {
      console.error('Error getting location:', e.message)
      // Handle location error (e.g., show a message to the user)
    },
  })
  return null
}

export default function Map({
  locations,
  type,
  routeLine,
  setPosition,
  zoom = 13,
  isCenter = false,
}: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null)
  const centerPoint: [number, number] | null =
    !isCenter && locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : null
  const updatePosition = useCallback(() => {
    if (map) {
      console.log(map.locate())
      map.locate({
        setView: true,
      })
    }
  }, [map])

  const busStopEndIcon = L.icon({
    iconUrl: '/bus-stop-end.svg',
    iconAnchor: [20, 20],
  })
  const busStopStartIcon = L.icon({
    iconUrl: '/bus-stop-start.svg',
    iconAnchor: [20, 20],
  })
  const busStopIcon = L.icon({
    iconUrl: '/bus-stop-icon.svg',
    iconAnchor: [20, 20],
  })
  const activeIcon = L.divIcon({
    html: `
          <div class="w-full h-full" style="position: relative; text-align: center;">
      <img src="/bus-active-blank.svg"/>
      <div class="bg-primary-gradients-dark bg-clip-text text-[transparent] text-[20px] font-bold" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        A
      </div>
    </div>
    `,
    className: 'border-none bg-transparent w-[unset] w-[unset]',
    iconSize: [41, 40],
    iconAnchor: [20, 20],
  })

  // useEffect(() => {
  //   if (map) {
  //     map.on('locationfound', (e) => {
  //       console.log(e)
  //       map.flyTo(e.latlng, zoom)
  //     })
  //   }
  //   return () => {
  //     map?.off('locationfound')
  //   }
  // }, [map])

  return useMemo(
    () => (
      <MapContainer
        center={centerPoint ?? map?.getCenter()}
        zoom={zoom}
        scrollWheelZoom={true}
        className='h-[100vh] w-[100%]'
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {locations.map((location: Location, index: number) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={
              location?.start
                ? busStopStartIcon
                : location?.end
                ? busStopEndIcon
                : busStopIcon
            }
            eventHandlers={{
              click: (e) => {
                e.target.setIcon(activeIcon)
              },
            }}
          >
            {location.name && <Tooltip>{location.name}</Tooltip>}
          </Marker>
        ))}
        {type === 'pinWithLine' && routeLine && (
          <Polyline
            pathOptions={{ color: '#7550cc', weight: 2 }}
            positions={routeLine}
          />
        )}
        <div
          className='absolute left-4 top-4 z-[2000] cursor-pointer bg-gray-white'
          onClick={updatePosition}
        >
          <button>Update Position</button>
        </div>
        <LocationUpdate setPosition={setPosition} zoom={zoom} />
      </MapContainer>
    ),
    [centerPoint, zoom, locations, type, routeLine],
  )
}
