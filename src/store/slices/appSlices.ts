import { StateCreator } from 'zustand'
import { Token } from '@/app/api/getToken'

const resetters: (() => void)[] = []
const initialAppState = {
  token: { access_token: '', expires_in: 0, token_type: '' }
}

export interface AppSlice {
  token: Token
  updateToken(token: Token): void
}

const createAppSlice: StateCreator<AppSlice> = (set) => {
  resetters.push(() => set(initialAppState))
  return {
    ...initialAppState,
    updateToken: (token) => set(() => ({ token }))
  }
}

export default createAppSlice
