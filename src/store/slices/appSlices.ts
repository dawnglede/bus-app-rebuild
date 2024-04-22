import { StateCreator } from 'zustand'

const resetters: (() => void)[] = []
const initialAppState = {
  cityCode: null,
  isGeolocationAvailable: false
}

export interface AppSlice {
  cityCode: Array<{ [key: string]: string }> | null,
  setCityCode(cityCode: Array<{ [key: string]: string }>): void,
  isGeolocationAvailable: boolean
  setGeolocationAvailable(isGeolocationAvailable: boolean): void
}

const createAppSlice: StateCreator<AppSlice> = (set) => {
  resetters.push(() => set(initialAppState))
  return {
    ...initialAppState,
    setCityCode: (cityCode) => set(() => ({ cityCode })),
    setGeolocationAvailable: (isGeolocationAvailable) => set(() => ({ isGeolocationAvailable }))
  }
}

export default createAppSlice
