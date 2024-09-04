import React, { forwardRef } from 'react'
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Header = forwardRef<HTMLDivElement, Props>(function Header(
  { children, ...props },
  ref,
) {
  return (
    <div
      className='relative cursor-grab touch-none rounded-t-[12px]  bg-gray-white'
      style={{ height: '20px' }}
      {...props}
      ref={ref}
    >
      <span className='absolute left-[50%] top-[10px] block h-[2px] w-[40px] rounded-[10px] bg-[#CACCD2] translate-x-[-50%]'></span>
      {children}
    </div>
  )
})
