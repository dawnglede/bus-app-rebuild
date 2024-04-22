import { useState, useEffect } from 'react'
import useStore from '@/store/useStore'

export default function useLocation() {
  const [position, setPosition] = useState<GeolocationCoordinates>()
  const [isLocationAllowed, setIsLocationAllowed] = useState<boolean>(false)
  const { setGeolocationAvailable } = useStore()

  useEffect(() => {
    const geolocation: Geolocation = navigator.geolocation
    let watchId: number
    const watchGeoPosition = () => {
      watchId = geolocation.watchPosition((position: GeolocationPosition) =>
          setPosition(position.coords)
      )
    }
    if ('geolocation' in navigator) {
      setGeolocationAvailable(true)
    } else {
      setGeolocationAvailable(false)
      return
    }
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        watchGeoPosition()
        setIsLocationAllowed(true)
      } else if (result.state === 'prompt') {
        geolocation.getCurrentPosition(() =>{})
      } else if (result.state === 'denied') {
        setGeolocationAvailable(false)
      }
    })
    return () => geolocation.clearWatch(watchId)
  }, [isLocationAllowed])
  return { position, isLocationAllowed }
}
