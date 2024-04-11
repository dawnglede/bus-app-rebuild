'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import useToken from '@/hooks/useToken'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '機智公車族+',
  description: ''
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const getToken = useToken()
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
