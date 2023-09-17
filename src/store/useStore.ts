import { create } from 'zustand'
import { AppSlice } from './slices/appSlices'
import createAppSlice from './slices/appSlices'

const useStore = create<AppSlice>()((...a) => ({
  ...createAppSlice(...a)
}))

export default useStore
