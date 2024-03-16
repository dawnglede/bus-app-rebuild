'use client'
import Image from 'next/image'
import SearchIcon from '../../../public/search-icon.svg'
import CloseIcon from '../../../public/close-style2.svg'
import Checkbox from '@/components/Checkbox'
import { ChangeEvent, useState } from 'react'
import SearchList from '@/components/SearchList'
import SideMenu from '@/components/SideMenu'

export default function SearchBus() {
  const [checked, setChecked] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const handleCheckStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  return (
    <div className='px-[16px]'>
      <SideMenu />
      <select className='mb-[12px] mt-[56px] bg-[transparent] text-2xl'>
        <option>全部縣市</option>
      </select>
      <div className='relative'>
        <input
          type='text'
          className='h-[56px] w-full rounded px-[13px] pl-[16px] shadow-md focus:outline-primary-default'
          value={keyword}
          onChange={handleInputChange}
          placeholder='請輸入公車路線/起訖站名'
        />
        {keyword === '' ? (
          <div className='absolute right-[18px] top-[50%] flex h-[24px] w-[24px] translate-y-[-50%] items-center justify-center'>
            <Image alt='search' src={SearchIcon} />
          </div>
        ) : (
          <Image
            alt='close'
            className='absolute right-[18px] top-[50%] translate-y-[-50%]'
            src={CloseIcon}
          />
        )}
      </div>
      <div className='px-[4px] py-[8px] leading-7'>
        <Checkbox checked={checked} onChange={handleCheckStatus}>
          僅顯示提供無障礙的公車路線
        </Checkbox>
      </div>
      <div>
        <p className='text-sm text-gray-600'>歷史搜尋</p>
        <SearchList
          data={
            [
              // {
              //   RouteName: { Zh_tw: '8501' },
              //   start: '義大世界',
              //   end: '高鐵左營站',
              //   region: '高雄',
              //   accessible: true
              // },
              // {
              //   RouteName: { Zh_tw: '紅1(延駛中鋼公司)' },
              //   start: '義大世界',
              //   end: '高鐵左營站',
              //   region: '高雄',
              //   accessible: false
              // }
            ]
          }
          type='history'
        />
      </div>
    </div>
  )
}
