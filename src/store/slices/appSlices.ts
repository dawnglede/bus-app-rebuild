import { StateCreator } from 'zustand'
import { Token } from '@/app/api/getToken'

const resetters: (() => void)[] = []
const initialAppState = {
  token: { access_token: '', expires_in: 0, token_type: '' },
  cityCode: null
}

export interface AppSlice {
  token: Token
  updateToken(token: Token): void,
  cityCode: Array<{ [key: string]: string }> | null,
  setCityCode(cityCode: Array<{ [key: string]: string }>): void
}

const createAppSlice: StateCreator<AppSlice> = (set) => {
  resetters.push(() => set(initialAppState))
  return {
    ...initialAppState,
    updateToken: (token) => set(() => ({ token })),
    setCityCode: (cityCode) => set(() => ({ cityCode }))
  }
}

export default createAppSlice
