'use client'
// import { SessionStorage } from '@/utils/tools'
import useSessionStorage from './useSessionStorage'
import getToken from '@/app/api/getToken'
import { useEffect, useState } from 'react'
import { Token } from '@/app/api/getToken'

export default function useToken() {
  const { setSessionData, getSessionData } = useSessionStorage('token')
  const [hasToken, setHasToken] = useState<boolean>(false)
  const [token, setToken] = useState<Token>()
  const refreshToken = async () => {
    const token = await getToken()
    if (token) {
      setHasToken(true)
      setToken(token)
    }
    setSessionData(token)
    return token
  }
  useEffect(() => {
    const token = getSessionData()
    if (!token) refreshToken()
  }, [])
  return { refreshToken, hasToken, token }
}
