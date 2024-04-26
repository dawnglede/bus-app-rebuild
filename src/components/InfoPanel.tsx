'use client'
import { useEffect, useRef } from "react"

function dragElement(elmnt: HTMLElement, headerRef: React.RefObject<HTMLElement>) {
    let pos1 = 0, pos2 = 0
    const windowHeight = window.innerHeight
    const halfHeight = Math.floor(windowHeight * 0.4)
    const topHeight = Math.floor(windowHeight - elmnt.clientHeight)
    const initialHeight = Math.floor(windowHeight * 0.7)
    elmnt.style.top = initialHeight + 'px'

    if (headerRef && headerRef.current) {
      headerRef.current.onmousedown = dragMouseDown
    } else {
      elmnt.onmousedown = dragMouseDown
    }
    function dragMouseDown(e: MouseEvent) {
      e = e || window.event
      e.preventDefault()
      pos2 = e.clientY
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }
    function elementDrag(e: MouseEvent) {
      e = e || window.event
      e.preventDefault()
      pos1 = pos2 - e.clientY
      pos2 = e.clientY
      
      if (elmnt.offsetTop - pos1 > topHeight) {
        elmnt.style.top = elmnt.offsetTop - pos1 + 'px'
      }
    }
    function closeDragElement() {
      if (elmnt.offsetTop < halfHeight) {
        elmnt.style.top = topHeight + 'px'
      }
      if (elmnt.offsetTop > halfHeight && elmnt.offsetTop < initialHeight) {
        elmnt.style.top = halfHeight + 'px'
      }
      if (elmnt.offsetTop > halfHeight && elmnt.offsetTop > initialHeight) {
        elmnt.style.top = initialHeight + 'px'
      }
      document.onmouseup = null
      document.onmousemove = null
    }
  }

export default function InfoPanel({ children }: { children?: React.ReactNode }) {
  const dragRef = useRef<InstanceType<typeof HTMLDivElement>>(null)
  const headerRef = useRef<InstanceType<typeof HTMLDivElement>>(null)
  
  useEffect(() => {
    if (dragRef.current) dragElement(dragRef.current, headerRef)
  }, [])
  return (
    <div ref={dragRef} className="absolute left-0 bg-gray-white h-[95vh] w-full z-10 rounded-t-[12px] border-[1px] border-[#EEEFF1]">
      <div ref={headerRef} className="w-full h-[27px] flex justify-center pt-[8px]">
        <span className="block w-[40px] h-[2px] bg-[#CACCD2] rounded-[10px]"></span>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
