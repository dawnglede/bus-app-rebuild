'use client'
// import { SessionStorage } from '@/utils/tools'
import useSessionStorage from './useSessionStorage'
import getToken from '@/app/api/getToken'
import { useEffect, useState } from 'react'
import { Token } from '@/app/api/getToken'
import useStore from '@/store/useStore'

export default function useToken() {
  const { setSessionData, getSessionData } = useSessionStorage('token')
  const [hasToken, setHasToken] = useState<boolean>(false)
  const { token: tokenState, updateToken } = useStore()
  // const [token, setToken] = useState<Token>()
  const refreshToken = async () => {
    const token = await getToken()
    if (token) {
      setHasToken(true)
      updateToken(token)
    }
    setSessionData(token)
    return token
  }
  useEffect(() => {
    const token = getSessionData()
    if (token && tokenState.access_token === '') {
      updateToken(token)
      setHasToken(true)
    }
    if (!token && tokenState.access_token === '') refreshToken()
  }, [])
  return { refreshToken, hasToken }
}
