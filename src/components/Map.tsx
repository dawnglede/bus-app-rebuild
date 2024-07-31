import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export type Location = {
  lat: number
  lng: number
  position?: 'start' | 'end'
}

type MapProps = {
  locations: Array<Location>
  type?: 'pin' | 'pinWithLine'
}

export default function Map({ locations, type }: MapProps) {
  const center: [number, number] =
    locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : [25.033964, 121.564472]
  const busStopEndIcon = L.icon({
    iconUrl: '/bus-stop-end.svg',
    iconAnchor: [16, 16],
  })
  const busStopStartIcon = L.icon({
    iconUrl: '/bus-stop-start.svg',
    iconAnchor: [16, 16],
  })
  const busStopIcon = L.icon({
    iconUrl: '/bus-stop-icon.svg',
    iconAnchor: [16, 16],
  })
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className='h-[100vh] w-[100%]'
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
            location?.position === 'start'
              ? busStopStartIcon
              : location?.position === 'end'
              ? busStopEndIcon
              : busStopIcon
          }
        />
      ))}
      {type === 'pinWithLine' && (
        <Polyline
          pathOptions={{ color: '#7550cc', weight: 2 }}
          positions={locations.map((loc) => [loc.lat, loc.lng])}
        />
      )}
    </MapContainer>
  )
}
