import { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import BusStopStartIcon from '../../public/bus-stop-start.png'

type Location = {
  lat: number
  lng: number
  [key: string]: any
}

export default function useMap({
  locations,
}: {
  locations: Array<google.maps.LatLngLiteral>
}) {
  const parser = new DOMParser()
  const loader = new Loader({
    apiKey: process.env.google_map || '',
    version: 'weekly',
    language: 'zh-TW',
    region: 'TW',
  })

  let map: google.maps.Map
  const initMap = async (): Promise<void> => {
    const { Map } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary

    map = new Map(document.getElementById('map') as HTMLElement, {
      // center: { lat: -34.397, lng: 150.644 },
      zoom: 16,
      center: locations[0],
      mapId: 'DEMO_MAP_ID',
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    })
    const image = document.createElement('img')
    image.src = BusStopStartIcon.src
    const markers = locations.map((position) => {
      const marker = new AdvancedMarkerElement({
        position,
        content: image,
      })
      return marker
    })
    new MarkerClusterer({ map, markers })

    let polyline = new google.maps.Polyline({
      path: locations,
      geodesic: true,
      strokeColor: '#7550CC',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })
    polyline.setMap(map)
  }
  useEffect(() => {
    loader.load().then(async () => {
      initMap()
      // eslint-disable-next-line no-console
      console.log('map loaded')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {}
}
