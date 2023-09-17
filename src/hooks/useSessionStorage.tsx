'use client'

type obj = {
  [key: string]: any
}

export default function useSessionStorage(name: string) {
  const getSessionData = (): obj | void => {
    const storeItem = sessionStorage.getItem(name)
    if (storeItem) {
      return JSON.parse(storeItem)
    }
  }
  const setSessionData = (value: string | obj): void => {
    if (typeof value === 'object') {
      sessionStorage.setItem(name, JSON.stringify(value))
    } else {
      sessionStorage.setItem(name, value)
    }
  }
  return {
    getSessionData,
    setSessionData
  }
}
