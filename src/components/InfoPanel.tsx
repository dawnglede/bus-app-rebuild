'use client'
import { useEffect, useRef } from "react"

function dragElement(elmnt: HTMLElement, headerRef: HTMLElement, contentRef: HTMLElement) {
    let pos1 = 0, pos2 = 0
    const windowHeight = window.innerHeight
    const halfHeight = Math.floor(windowHeight * 0.4)
    const topHeight = Math.floor(windowHeight - elmnt.clientHeight)
    const initialHeight = Math.floor(windowHeight * 0.7)
    const panelPaddingTop = 37
    elmnt.style.top = initialHeight + 'px'
    contentRef.style.height = windowHeight - panelPaddingTop - initialHeight + 'px'

    if (headerRef) {
      headerRef.onmousedown = dragMouseDown
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
        contentRef.style.height = windowHeight - panelPaddingTop - (elmnt.offsetTop - pos1) + 'px'
      }
    }
    function closeDragElement() {
      if (elmnt.offsetTop < halfHeight) {
        elmnt.style.top = topHeight + 'px'
        contentRef.style.height = windowHeight - panelPaddingTop - topHeight + 'px'
      }
      if (elmnt.offsetTop > halfHeight && elmnt.offsetTop < initialHeight) {
        elmnt.style.top = halfHeight + 'px'
        contentRef.style.height = windowHeight - panelPaddingTop - halfHeight + 'px'
      }
      if (elmnt.offsetTop > halfHeight && elmnt.offsetTop > initialHeight) {
        elmnt.style.top = initialHeight + 'px'
        contentRef.style.height = windowHeight - panelPaddingTop - initialHeight + 'px'
      }
      document.onmouseup = null
      document.onmousemove = null
    }
  }

export default function InfoPanel({ children }: { children?: React.ReactNode }) {
  const dragRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (dragRef.current && contentRef.current && headerRef.current) {
      dragElement(dragRef.current, headerRef.current, contentRef.current)   
    }
  }, [])
  return (
    <div ref={dragRef} className="top-[9999px] pb-[10px] absolute left-0 bg-gray-white w-full z-10 rounded-t-[12px] border-[1px] border-[#EEEFF1] max-h-[95vh]">
      <div ref={headerRef} className="w-full h-[27px] flex justify-center pt-[8px]">
        <span className="block w-[40px] h-[2px] bg-[#CACCD2] rounded-[10px]"></span>
      </div>
      <div ref={contentRef} className="h-full">
        {children}
      </div>
    </div>
  )
}
