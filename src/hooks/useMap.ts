import { useEffect, useId } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

type Location = {
  lat: string,
  lng: string,
  [key: string]: any
}

export default function useMap({ locations }: { locations: Array<Location> }) {
  const mapId = useId()
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAP || '',
    version: 'weekly',
    language: 'zh-TW',
    region: 'TW'
  })

  let map: google.maps.Map
  const initMap = async (): Promise<void> => {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary

    
    map = new Map(document.getElementById('map') as HTMLElement, {
      // center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      mapId
    })
    const markers = locations.map((position) => {
      const marker = new AdvancedMarkerElement({
        position
      })
      return marker
    })
    new MarkerClusterer({map, markers})
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
