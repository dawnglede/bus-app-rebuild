'use client'
import { useState } from 'react'

type Stops = {
  name: string,
  direction: string,
  content: string
}
    
export default function StopList() {
  const [stops, setStops] = useState<Stops[]|null>(null)
  return (
    <div className="px-[20px] grid grid-rows-[35px_auto] h-full">
      <div className="text-sm text-gray-500 mb-[15px]">附近站牌</div>
      <div className="overflow-y-scroll scroll-style">
        <div className="mr-[2px]">
          { stops && stops.length > 0 ?
          stops?.map((item,index) => (
            <div key={index} className="border-[#C6B7EA] border-[1px] rounded-[6px] p-[10px] mb-[10px]">
              <div className="font-bold text-gray-800 text-base mb-[5px] flex items-center">
                {item.name} 
                <span className="ml-[6px] rounded-[12px] bg-gray-500 px-[8px] py-[3px] text-xs font-medium text-gray-white">
                  {item.direction}
                </span>
              </div>
              <div className="text-xs text-primary-700">
                {item.content}
              </div>
            </div>
            ))
            : <div className='flex justify-center text-gray-500 mt-[20px]'>附近找不到站牌</div>
          }
        </div>
      </div>
    </div>
  )
}
