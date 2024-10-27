import { useState, useEffect } from 'react'
import useStore from '@/store/useStore'

export default function useLocation() {
  const [position, setPosition] = useState<GeolocationCoordinates>()
  const [isLocationAllowed, setIsLocationAllowed] = useState<boolean>(false)
  const [watchId, setWatchId] = useState<number | null>(null)
  const { setGeolocationAvailable } = useStore()

  const getCurrentPosition = () => {
    const geolocation: Geolocation = navigator?.geolocation
    let newPosition: GeolocationCoordinates
    return new Promise<GeolocationCoordinates>((resolve) => {
      geolocation.getCurrentPosition((position: GeolocationPosition) => {
        newPosition = position.coords
        setPosition(newPosition)
        resolve(newPosition)
      })
    })
  }
  const watchGeoPosition = () => {
    const geolocation: Geolocation = navigator?.geolocation
    setWatchId(
      geolocation.watchPosition((position: GeolocationPosition) =>
        setPosition(position.coords),
      ),
    )
  }
  useEffect(() => {
    const geolocation: Geolocation = navigator?.geolocation

    if ('geolocation' in navigator) {
      setGeolocationAvailable(true)
    } else {
      setGeolocationAvailable(false)
      return
    }
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        setIsLocationAllowed(true)
        getCurrentPosition()
      } else if (result.state === 'prompt') {
        getCurrentPosition()
      } else if (result.state === 'denied') {
        setGeolocationAvailable(false)
      }
    })
    return () => {
      if (watchId) geolocation.clearWatch(watchId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocationAllowed])
  return { position, isLocationAllowed, getCurrentPosition, watchGeoPosition }
}
