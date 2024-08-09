import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LatLngExpression } from 'leaflet'

export type Location = {
  lat: number
  lng: number
  start: boolean
  end: boolean
}

type MapProps = {
  locations: Array<Location> | []
  type?: 'pin' | 'pinWithLine'
  routeLine?: LatLngExpression[][]
}

export default function Map({ locations, type, routeLine }: MapProps) {
  const center: [number, number] =
    locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : [25.033964, 121.564472]
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
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className='h-[100vh] w-[100%]'
      zoomControl={false}
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
        />
      ))}
      {type === 'pinWithLine' && routeLine && (
        <Polyline
          pathOptions={{ color: '#7550cc', weight: 2 }}
          positions={routeLine}
        />
      )}
    </MapContainer>
  )
}
