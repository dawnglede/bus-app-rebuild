'use client'
import { useState, useEffect } from 'react'

export default function useTimer({ time }: { time: number }) {
  const [seconds, setSeconds] = useState<number>(time)
  const [timerId, setTimerId] = useState<NodeJS.Timer>()
  const countDown = () => {
    return setInterval(() => {
      setSeconds((num) => num - 1)
    }, 1000)
  }
  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId)
    }
  }
  const resetTimer = () => {
    clearInterval(timerId)
    setSeconds(time)
  }
  useEffect(() => {
    let timer: NodeJS.Timer
    if (seconds === time) {
      timer = countDown()
      setTimerId(timer)
    } else if (seconds === 0) {
      clearInterval(timerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])
  return { seconds, stopTimer, resetTimer }
}
