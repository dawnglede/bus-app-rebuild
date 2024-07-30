import React, { forwardRef } from 'react'
interface Props extends React.HTMLAttributes<HTMLDivElement> {}
// before:absolute before:top-[10px] before:h-[3px] before:w-[50px] before:rounded-[10px] before:bg-gray-400 before:content-[""]
export const Header = forwardRef<HTMLDivElement, Props>(function Header(
  { children, ...props },
  ref,
) {
  return (
    <div
      className='relative cursor-grab touch-none rounded-t-[12px]  bg-gray-white'
      style={{ height: 'var(--header-height)' }}
      {...props}
      ref={ref}
    >
      <span className='absolute left-[50%] top-[10px] block h-[2px] w-[40px] translate-x-[-50%] rounded-[10px] bg-[#CACCD2]'></span>
      {children}
    </div>
  )
})
