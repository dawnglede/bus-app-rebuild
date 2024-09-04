'use client'
import dynamic from 'next/dynamic'
import SideMenu from '@/components/SideMenu'
import StopList from './stopList'
import { Drawer } from '@/components/drawer/Drawer'
import { useState } from 'react'
const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function SearchStop({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <SideMenu locale={locale} />
      <div>
        <Map type='pinWithLine' locations={[]} />
      </div>
      <Drawer header={<div></div>} expanded={expanded} onChange={setExpanded}>
        <StopList />
      </Drawer>
    </>
  )
}
