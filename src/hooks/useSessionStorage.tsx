'use client'

export default function useSessionStorage(name: string) {
  const getSessionData = () => {
    const storeItem = sessionStorage.getItem(name)
    if (storeItem) {
      return JSON.parse(storeItem)
    }
  }
  const setSessionData = (value: any) => {
    if (typeof value === 'object') {
      sessionStorage.setItem(name, JSON.stringify(value))
    } else {
      sessionStorage.setItem(name, value)
    }
  }
  return {
    getSessionData,
    setSessionData,
  }
}
