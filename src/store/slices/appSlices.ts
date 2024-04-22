import { StateCreator } from 'zustand'

const resetters: (() => void)[] = []
const initialAppState = {
  cityCode: null
}

export interface AppSlice {
  cityCode: Array<{ [key: string]: string }> | null,
  setCityCode(cityCode: Array<{ [key: string]: string }>): void
}

const createAppSlice: StateCreator<AppSlice> = (set) => {
  resetters.push(() => set(initialAppState))
  return {
    ...initialAppState,
    setCityCode: (cityCode) => set(() => ({ cityCode }))
  }
}

export default createAppSlice
