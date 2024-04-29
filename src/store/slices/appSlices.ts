import { StateCreator } from 'zustand'

const resetters: (() => void)[] = []
const initialAppState = {
  cityCode: null,
  isGeolocationAvailable: false,
}

export interface AppSlice {
  cityCode: Array<{ [key: string]: string }> | null
  // eslint-disable-next-line no-unused-vars
  setCityCode(cityCode: Array<{ [key: string]: string }>): void
  isGeolocationAvailable: boolean
  // eslint-disable-next-line no-unused-vars
  setGeolocationAvailable(isGeolocationAvailable: boolean): void
}

const createAppSlice: StateCreator<AppSlice> = (set) => {
  resetters.push(() => set(initialAppState))
  return {
    ...initialAppState,
    setCityCode: (cityCode) => set(() => ({ cityCode })),
    setGeolocationAvailable: (isGeolocationAvailable) =>
      set(() => ({ isGeolocationAvailable })),
  }
}

export default createAppSlice
